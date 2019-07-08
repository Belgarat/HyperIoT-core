import { Component, OnInit, Input } from '@angular/core';
import { DataPacketFilter, WidgetComponent } from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';

@Component({
  selector: 'app-sensor-value',
  templateUrl: './sensor-value.component.html',
  styleUrls: ['../../../assets/widgets/styles/widget-commons.css', './sensor-value.component.css']
})
export class SensorValueComponent extends WidgetComponent implements OnInit {
  @Input()
  widget;
  sensorValue: number;

  pause(): void {
    throw new Error('Method not implemented.');
  }
  play(): void {
    throw new Error('Method not implemented.');
  }
  getOfflineData(startDate: Date, endDate: Date) {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    const cfg = this.widget.config;
    const dataPacketFilter = new DataPacketFilter(cfg.packetId, cfg.packetFields);
    this.subscribeRealTimeStream(dataPacketFilter, (eventData) => {
      const date = eventData[0];
      const field = eventData[1];
      const value = Math.round(field[cfg.packetFields[0]] * 10) / 10;
      this.sensorValue = value;
    });
  }

}
