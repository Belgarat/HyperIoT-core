import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import {
  DataPacketFilter,
  WidgetChartComponent,
  TimeSeries
} from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class AreaChartComponent extends WidgetChartComponent implements OnInit, OnDestroy {
  private chartData: TimeSeries[] = [];

  ngOnInit() {
    const cfg = this.widget.config;
    cfg.packetId = this.widget.config.packetId || cfg.packetId;
    cfg.packetFields = this.widget.config.packetFields || cfg.packetFields;
    // Create time series to display for this chart
    const seriesItems: TimeSeries[] = [];
    cfg.packetFields.forEach((fieldName) => {
      seriesItems.push(new TimeSeries(fieldName));
    });
    this.chartData.push(...seriesItems);
    // Bind time series to the chart
    this.addTimeSeries(this.chartData);
    // Create the real time data channel
    const dataPacketFilter = new DataPacketFilter(cfg.packetId, cfg.packetFields);
    this.subscribeRealTimeStream(dataPacketFilter, (eventData) => {
      const date = eventData[0];
      const field = eventData[1];
      // Map received packet field to the corresponding time series
      Object.keys(field).map((k) => {
        const series = this.chartData.find((ts) => ts.name === k);
        if (series != null) {
          this.addTimeSeriesData(series, date, field[k]);
        }
      });
    });
    /*
    // get some history data to prepend to
    // the realtime data before now
    const startDate = new Date();
    const pastDate = new Date(startDate.getTime());
    pastDate.setDate(pastDate.getDate() - 1);
    this.getOfflineData(pastDate, startDate);
    */
  }
}
