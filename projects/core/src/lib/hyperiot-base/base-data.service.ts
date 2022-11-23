import { IDataService } from './data.interface';
import { DataChannel } from './models/data-channel';
import { DataPacketFilter } from './models/data-packet-filter';

export abstract class BaseDataService implements IDataService {

  dataChannels: { [id: number]: DataChannel; } = {};
  
  addDataChannel(widgetId: number, dataPacketFilter: DataPacketFilter): DataChannel {
    // TODO: maybe allow an array of data packets to be passed in,
    //       so that a widget can receive packets from multiple sources.

    if (this.dataChannels[widgetId]) {
      return this.dataChannels[widgetId];
    }
    const channelData = new DataChannel(dataPacketFilter);
    return this.dataChannels[widgetId] = channelData;
  }

  removeDataChannel(widgetId: number) {
    // TODO: maybe it should also clear any pending subscriptions
    // TODO use .observed if rxjs > 7
    if (this.dataChannels[widgetId] && !this.dataChannels[widgetId].subject.observers.length) {
      delete this.dataChannels[widgetId];
    }
  }

}
