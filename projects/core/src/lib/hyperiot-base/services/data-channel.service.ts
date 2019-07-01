import { Injectable } from '@angular/core';
import { DataPacket } from '../widgets/data/data-packet';
import { Subject } from 'rxjs';

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

  constructor() { }

  connect() {
    // TODO: connect to websocket
    this.isConnected = true;
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

}

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
