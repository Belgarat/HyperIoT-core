import { Injectable } from '@angular/core';
import { DataPacket } from '../widgets/data/data-packet';
import { Subject } from 'rxjs';
import { HPacket, HPacketField } from 'core/public_api';

export class ChannelData {
  packet: DataPacket;
  subject: Subject<[any, any]>;
  _interval: any;

  constructor(packet: DataPacket) {
    this.packet = packet;
    this.subject = new Subject<any>();
    // TODO: this is just for testing purpose:
    //       simulate incoming data from websocket packet stream
    const startDate = new Date();
    this._interval = setInterval(() => {
      this.subject.next([new Date(startDate.getTime()), 20 + (Math.random() * 15)]);
      startDate.setMinutes(startDate.getMinutes() + 5);
    }, 1000);
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
  isConnected: boolean;

  private wsUrl = '/hyperiot/ws';
  private ws: WebSocket;

  constructor() { }

  connect() {
    // TODO: connect to websocket
    if (this.ws != null) {
      this.ws.close();
      this.ws = null;
    }
    this.ws = new WebSocket(this.wsUrl);
    this.ws.onmessage = this.onWsMessage;
    this.ws.onerror = this.onWsError;
    this.ws.onclose = this.onWsClose;
    this.ws.onopen = this.onWsOpen;
  }

  disconnect() {
    // TODO: disconnect from websocket
    this.isConnected = false;
  }

  addDataChannel(widgetId: string, dataPacket: DataPacket): ChannelData {
    // TODO:
    const channelData = new ChannelData(dataPacket);
    return this.dataChannels[widgetId] = channelData;
  }
  removeDataChannel(widgetId: string) {
    // TODO:
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
    // TODO: this probably needs to be JSON-deserialized
    const packet: HPacket = event.data;
    console.log(packet);
    for (const id in this.dataChannels) {
      if (this.dataChannels.hasOwnProperty(id)) {
        const channelData: ChannelData = this.dataChannels[id];
        console.log(id, channelData);
        // check if message is valid for current channel
        // if so emit a new event
        if (packet.id === channelData.packet.packetId) {
          channelData.packet.fields.map((fieldName: string) => {
            const field = packet.fields.find((f: HPacketField) => f.name === fieldName);
            if (field != null) {
              channelData.subject.next([new Date(), field]);
            }
          });
        }
      }
    }
  }
}
