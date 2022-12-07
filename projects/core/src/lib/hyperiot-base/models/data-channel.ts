import { Subject } from 'rxjs';
import { DataPacketFilter } from './data-packet-filter';
import { PacketData } from './packet-data';

export class DataChannel {
  packet: DataPacketFilter;
  controller?: any;
  subject: Subject<PacketData[]>;

  constructor(packet: DataPacketFilter) {
    this.packet = packet;
    this.subject = new Subject<PacketData[]>();
  }
}
