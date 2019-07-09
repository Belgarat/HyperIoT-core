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
  sensorUnitSymbol: string;

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
      // get the sensor value
      let value = +field[cfg.packetFields[0]];
      // apply configured display unit
      switch (cfg.displayUnit.toLowerCase()) {
        case 'fahrenheit':
          // convert value from celsius to Fahrenheit
          value = (value * 9 / 5) + 32;
          this.sensorUnitSymbol = '&#8457;';
          break;
        case 'kelvin':
          value = value + 273.15;
          this.sensorUnitSymbol = '&#8490;';
          break;
        default:
            this.sensorUnitSymbol = '&#8451;';
            break;
      }
      // round up to 1 decimal digit
      this.sensorValue = Math.round(value * 10) / 10;
    });
  }

}
