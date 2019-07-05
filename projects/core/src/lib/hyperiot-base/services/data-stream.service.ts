import { Injectable } from '@angular/core';
import { DataPacketFilter } from '../widgets/data/data-packet-filter';
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

  private wsUrl = 'ws://' + location.hostname + (location.port ? ':' + location.port : '') + '/hyperiot/ws/project';
  private ws: WebSocket;

  constructor() { }

  /**
   * Opens the WebSocket session for data streaming.
   * 
   * @param url WebSocket endpoint url
   */
  connect(url?: string) {
    this.disconnect();
    this.ws = new WebSocket(url != null ? url : this.wsUrl);
    this.ws.onmessage = this.onWsMessage.bind(this);
    this.ws.onerror = this.onWsError.bind(this);
    this.ws.onclose = this.onWsClose.bind(this);
    this.ws.onopen = this.onWsOpen.bind(this);
  }

  /**
   * Closes the WebSocket session.
   */
  disconnect() {
    if (this.ws != null) {
      this.ws.close();
      this.ws = null;
    }
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
    let packet = JSON.parse(event.data);
    packet = JSON.parse(packet.payload);
    console.log(packet);
    for (const id in this.dataChannels) {
      if (this.dataChannels.hasOwnProperty(id)) {
        const channelData: DataChannel = this.dataChannels[id];
        // check if message is valid for the current
        // channel, if so emit a new event
        if (packet.id == channelData.packet.packetId) {
          channelData.packet.fields.map((fieldName: string) => {
            if (packet.hasOwnProperty(fieldName)) {
              const field = {};
              field[fieldName] = packet[fieldName];
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
}
