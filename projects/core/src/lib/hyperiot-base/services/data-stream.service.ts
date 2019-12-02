import { Injectable } from '@angular/core';
import { DataPacketFilter } from './data-packet-filter';
import { Subject } from 'rxjs';

import { Type } from 'avsc';
import { HPacket } from '../../../public_api';

export class DataChannel {
  packet: DataPacketFilter;
  subject: Subject<[any, any]>;
  _interval: any;

  constructor(packet: DataPacketFilter) {
    this.packet = packet;
    this.subject = new Subject<any>();
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * A service for connecting to HyperIoT events stream
 * via WebSocket.
 */
export class DataStreamService {
  /**
   * List of data channels requested by widgets.
   * Once connected to the main data stream (via websocket)
   * this service will deliver incoming data to the widgets
   * based on data filters specified in the StreamSubscription.
   */
  dataChannels: { [id: string]: DataChannel; } = {};
  /**
   * Connection status
   */
  isConnected: boolean;
  eventStream: Subject<any>;

  private timer;
  private wsUrl = 'ws://' + location.hostname + (location.port ? ':' + location.port : '') + '/hyperiot/ws/project?projectId=';
  private ws: WebSocket;

  pingMessage = {
    cmd: null,
    type: 'PING',
    payload: ''
  };
  packetSchema: Type;

  constructor() {
    this.eventStream = new Subject<any>();
  }

  /**
   * Opens the WebSocket session for data streaming.
   * 
   * @param url WebSocket endpoint url
   */
  connect(projectId: number, url?: string) {
    console.log('Connecting websocket...');
    this.disconnect();
    this.ws = new WebSocket(url != null ? url : this.wsUrl + projectId);
    this.ws.onmessage = this.onWsMessage.bind(this);
    this.ws.onerror = this.onWsError.bind(this);
    this.ws.onclose = this.onWsClose.bind(this);
    this.ws.onopen = this.onWsOpen.bind(this);
    this.keepAlive();
  }


  keepAlive() {
    this.timer = setTimeout(() => {
      if (this.ws != null && this.ws.readyState == this.ws.OPEN) {
        console.log('Sending heartbeat to websocket...');
        this.ws.send(JSON.stringify(this.pingMessage));
      }
      this.keepAlive();
    }, 40000);
  }

  cancelKeepAlive() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * Closes the WebSocket session.
   */
  disconnect() {
    if (this.ws != null) {
      this.ws.close();
      this.ws = null;
    }
    this.cancelKeepAlive();
    this.isConnected = false;
  }

  /**
   * Adds a new data channel that can be used for subscribing to data streaming events.
   *
   * @param widgetId The widget identifier.
   * @param dataPacketFilter Data packet filter which defines the packet id and packet fields to receive.
   */
  addDataStream(widgetId: string, dataPacketFilter: DataPacketFilter): DataChannel {
    // TODO: maybe allow an array of data packets to be passed in,
    //       so that a widget can receive packets from multiple sources.
    const channelData = new DataChannel(dataPacketFilter);
    return this.dataChannels[widgetId] = channelData;
  }
  /**
   * Removes a data channel.
   *
   * @param widgetId The widget id.
   */
  removeDataChannel(widgetId: string) {
    // TODO: maybe it should also clear any pending subscriptions
    delete this.dataChannels[widgetId];
  }

  private onWsOpen() {
    this.isConnected = true;
  }
  private onWsClose() {
    this.isConnected = false;
  }
  private onWsError() {
    // TODO: report error
  }
  private onWsMessage(event: MessageEvent) {
    // read AVRO-serialized HPacket from Kafka-Flux
    const wsData = JSON.parse(event.data);
    // decode base-64 payload
    const decodedWsPayload = atob(wsData.payload);
    // TODO: add specific type 'SCHEMA' instead of using 'INFO'
    if (wsData.type === 'INFO') {
      this.packetSchema = Type.forSchema(JSON.parse(decodedWsPayload));
      return;
    } else if (!this.packetSchema) {
      // cannot continue without schema definition
      return;
    }
    // decode AVRO data to HPacket instance
    const hpacket = this.packetSchema.fromBuffer(new Buffer(decodedWsPayload, 'binary')) as HPacket;
    // route received HPacket to eventStream subscribers
    this.eventStream.next({ data: hpacket });
    if (wsData.type === 'APPLICATION') {
      // extract and route subscribed fields to data channels
      for (const id in this.dataChannels) {
        if (this.dataChannels.hasOwnProperty(id)) {
          const channelData: DataChannel = this.dataChannels[id];
          // check if message is valid for the current
          // channel, if so emit a new event
          if (hpacket.id == channelData.packet.packetId) {
            Object.keys(channelData.packet.fields).map((fieldId: any) => {
              const fieldName = channelData.packet.fields[fieldId];
              if (hpacket.fields.hasOwnProperty(fieldName)) {
                const field = {};
                const value = hpacket.fields[fieldName].value;
                // based on the type, the input packet field value
                // will be stored in the corresponding type property
                // eg. if packet field is "DOUBLE" then the effective value
                // will be stored into 'value.double' property
                const valueKey = Object.keys(value)[0];
                field[fieldName] = hpacket.fields[fieldName].value[valueKey];
                let timestamp = new Date();
                // get timestamp from packet if present
                if (hpacket.fields['timestamp']) {
                  timestamp = new Date(hpacket.fields['timestamp'].value.long);
                }
                channelData.subject.next([timestamp, field]);
              }
            });
          }
        }
      }
    } else if (wsData.type === 'ERROR') {
      console.error('Error on websocket:', hpacket);
    } else {
      console.error('Invalid packet type:', wsData.type);
    }
  }
}
