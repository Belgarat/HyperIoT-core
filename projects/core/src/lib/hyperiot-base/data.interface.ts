import { DataChannel } from './models/data-channel';
import { DataPacketFilter } from './models/data-packet-filter';

export interface IDataService {

    addDataChannel(widgetId: number, dataPacketFilter: DataPacketFilter): DataChannel;
    removeDataChannel(widgetId: number): void;
    loadNextData?(packetId, deviceId, alarmState, lowerBound, widgetId): void;
    
}
