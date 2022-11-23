import { ReplaySubject, Subject } from 'rxjs';
import { DataPacketFilter } from './data-packet-filter';

const DEFUALT_BUFFER_SIZE = 50;

// TODO ha senso tipitizzare il dato che passiamo tramite il servizio?
// { [id: string]: any; }

export class DataChannel {
  packet: DataPacketFilter;
  controller?: any;
  subject: ReplaySubject<any[]>;

  constructor(packet: DataPacketFilter, bufferSize?: number) {
    this.packet = packet;
    this.subject = new ReplaySubject<any>(bufferSize | DEFUALT_BUFFER_SIZE);
  }
}
