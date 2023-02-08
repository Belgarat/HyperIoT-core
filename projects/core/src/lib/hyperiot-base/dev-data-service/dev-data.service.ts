import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { BaseDataService } from '../base-data.service';
import { DataChannel } from '../models/data-channel';
import { PacketData } from '../models/packet-data';

export interface DevDataSettings {
  interval?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DevDataService extends BaseDataService {

  settings: DevDataSettings = {
    interval: 1000,
  }

  constructor() {
    super();
    this.connect();
  }

  connect() {

    interval(this.settings.interval).subscribe(
      res => {
        for (const id in this.dataChannels) {
          const channelData: DataChannel = this.dataChannels[id];
          
          let fields: PacketData = {};
          Object.keys(channelData.packet.fields).forEach(fieldId => {
            const fieldName = channelData.packet.fields[fieldId];
            fields[fieldName] = Math.random();
          });
          fields.timestamp = new Date();
          channelData.subject.next([fields]);

        }
      }
    );

  }


}
