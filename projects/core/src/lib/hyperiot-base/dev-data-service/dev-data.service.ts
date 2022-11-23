import { Injectable, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { BaseDataService } from '../base-data.service';
import { DataChannel } from '../models/data-channel';

export interface DevDataSettings {
  interval?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DevDataService extends BaseDataService implements OnInit {

  settings: DevDataSettings = {
    interval: 1000
  }

  ngOnInit() {

    interval(this.settings.interval).subscribe(
      res => {
        for (const id in this.dataChannels) {
          const channelData: DataChannel = this.dataChannels[id];
          
          let fields = {};
          Object.keys(channelData.packet.fields).forEach(fieldId => {
            const fieldName = channelData.packet.fields[fieldId];
            fields[fieldName] = Math.random();
          });
          const timestamp = new Date();
          channelData.subject.next([timestamp, fields]);

        }
      }
    );

  }


}
