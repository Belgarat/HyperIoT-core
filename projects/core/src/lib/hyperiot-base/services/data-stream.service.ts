import { Injectable } from '@angular/core';
import { DataPacketFilter } from './data-packet-filter';
import { Subject } from 'rxjs';

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
    type: "PING",
    payload: ""
  }

  constructor() {
    this.eventStream = new Subject<any>();
  }

  /**
   * Opens the WebSocket session for data streaming.
   * 
   * @param url WebSocket endpoint url
   */
  connect(projectId: number, url?: string) {
    console.log("Connecting websocket....");
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
        console.log("Sending heartbeat to websocket...");
        this.ws.send(JSON.stringify(this.pingMessage));
      }
      this.keepAlive();
    }, 120000);
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
    // Serialized packet from Kafka-Flux
    let wsData = JSON.parse(event.data);
    //web socket payload
    let decodedWsPayload = atob(wsData.payload);
    //so event.data will contain all the info
    this.eventStream.next({ data: decodedWsPayload });
    let wsPayload = JSON.parse(decodedWsPayload);
    //HPacket payload
    let payload = JSON.parse(wsPayload.payload);
    if (wsData.type == "APPLICATION") {
      for (const id in this.dataChannels) {
        if (this.dataChannels.hasOwnProperty(id)) {
          const channelData: DataChannel = this.dataChannels[id];
          // check if message is valid for the current
          // channel, if so emit a new event
          if (payload.id == channelData.packet.packetId) {
            channelData.packet.fields.map((fieldName: string) => {
              if (payload.hasOwnProperty(fieldName)) {
                const field = {};
                field[fieldName] = payload[fieldName];
                let timestamp = new Date();
                // get timestamp from packet if present
                if (field['timestamp']) {
                  timestamp = new Date(field['timestamp']);
                }
                channelData.subject.next([timestamp, field]);
              }
            });
          }
        }
      }
    }
    else if (wsData.type == 'ERROR') {
      console.error("Error on websocket:", wsPayload)
    } else {
      console.error("Invalid packet type : ", wsData.type)
    }
  }
}
