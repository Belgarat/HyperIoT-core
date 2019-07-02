import { Injectable } from '@angular/core';
import { DataPacket } from '../widgets/data/data-packet';
import { Subject } from 'rxjs';
import { HPacket, HPacketField } from '../../hyperiot-client/h-packet-client/api-module';

export class ChannelData {
  packet: DataPacket;
  subject: Subject<[any, any]>;
  _interval: any;

  constructor(packet: DataPacket) {
    this.packet = packet;
    this.subject = new Subject<any>();
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataChannelService {
  /**
   * List of data channels requested by widgets.
   * Once connected to the main data stream (via websocket)
   * this service will filter the incoming data based on
   * the requested data channels and will only send (emit) data
   * that are explicitly requested by widgets or other components.
   */
  dataChannels: { [id: string]: ChannelData; } = {};
  /**
   * Connection status
   */
  isConnected: boolean;

  private wsUrl = '/hyperiot/ws/project';
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
   * Adds a new data channel for subscribing to packet streaming events.
   *
   * @param widgetId The widget identifier.
   * @param dataPacket Data packet which defines the packet id and packet fields to receive.
   */
  addDataChannel(widgetId: string, dataPacket: DataPacket): ChannelData {
    // TODO: maybe allow an array of data packets to be passed in,
    //       so that a widget can receive packets from multiple sources.
    const channelData = new ChannelData(dataPacket);
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
    for (const id in this.dataChannels) {
      if (this.dataChannels.hasOwnProperty(id)) {
        const channelData: ChannelData = this.dataChannels[id];
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
