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
      console.log(eventData);
      const date = eventData[0];
      const field = eventData[1];
      Object.keys(field).map((k) => {
        const serie = this.chartData.find((ts) => ts.name === k);
        if (serie != null) {
          serie.x.push(date);
          serie.y.push(field[k]);
          this.relayout(date);
        }
      });
    });
    // TODO: the connection should happen somewhere else in the main page
    this.dataStreamService.connect();
  }

  private relayout(lastEventDate: Date) {
      // set x range to the last 30 seconds of data
      const rangeEnd = new Date(lastEventDate);
      const rangeStart = new Date(rangeEnd.getTime() - (1 * 30 * 1000));
      // relayout x-axis range with new data
      const Plotly = this.plotly.getPlotly();
      const graph = this.plotly.getInstanceByDivId('graph');
      Plotly.relayout(graph, {'xaxis.range': [rangeStart, rangeEnd]});
  }
}
