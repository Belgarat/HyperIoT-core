import { Component, OnInit } from '@angular/core';

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
  private chartData: TimeSeries[] = [];

  ngOnInit() {
    // Create time series to display for this chart
    const temperatureSerie = new TimeSeries('temperature');
    const humiditySerie = new TimeSeries('humidity');
    this.chartData.push(temperatureSerie, humiditySerie);
    // Bind time series to the chart
    this.addTimeSeries(this.chartData);
    // Create the real time data channel
    this.subscribeRealTimeStream(new DataPacketFilter(14, ['temperature', 'humidity']), (eventData) => {
      const date = eventData[0];
      const field = eventData[1];
      Object.keys(field).map((k) => {
        const series = this.chartData.find((ts) => ts.name === k);
        if (series != null) {
          this.addTimeSeriesData(series, date, field[k]);
        }
      });
    });
    // TODO: the connection should happen somewhere else in the main page
    this.dataStreamService.connect();
  }
}
