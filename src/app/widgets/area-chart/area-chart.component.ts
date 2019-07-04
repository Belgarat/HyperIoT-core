import { Component, OnInit, Input } from '@angular/core';

import {
  DataPacketFilter,
  WidgetChartComponent,
  TimeSeries
} from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent extends WidgetChartComponent implements OnInit {
  @Input() packetId: number;
  @Input() packetFields: string[];
  private chartData: TimeSeries[] = [];

  ngOnInit() {
    // Create time series to display for this chart
    const seriesItems: TimeSeries[] = [];
    this.packetFields.forEach((fieldName) => {
      seriesItems.push(new TimeSeries(fieldName));
    });
    this.chartData.push(...seriesItems);
    // Bind time series to the chart
    this.addTimeSeries(this.chartData);
    // Create the real time data channel
    const dataPacketFilter = new DataPacketFilter(this.packetId, this.packetFields);
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
