import { Component } from '@angular/core';

import { WidgetComponent } from './widget.component';
import { PlotlyService } from 'angular-plotly.js';
import { DataStreamService } from '../services/data-stream.service';
import { TimeSeries } from './data/time-series';

@Component({
  selector: 'hyperiot-widget-chart',
  template: ''
})
export class WidgetChartComponent extends WidgetComponent {
  /**
   * Structure that stores configuration for the Plotly chart
   */
  graph = {
    data: [],
    layout: {
      responsive: true,
      autosize: true,
      margin: { l: 32, r: 16, t: 32, b: 32, pad: 8 },
      font: {
        size: 9
      },
      title: {
        font: { size: 14, color: '#16A4FA' },
        xref: 'container', yref: 'container',
        x: 0, y: 1,
        pad: { t: 10, l: 10 },
        text: 'Statistics'
      },
      xaxis: {
        showgrid: false,
        range: []
      }
    }
  };

  constructor(public dataStreamService: DataStreamService, public plotly: PlotlyService) {
    super(dataStreamService);
  }

  /**
   * Adds time series to the chart data
   *
   * @param timeSeriesData Array of time series
   */
  addTimeSeries(timeSeriesData: TimeSeries[]) {
    timeSeriesData.forEach(ts => {
      const timeSerie = {
        name: ts.name,
        x: ts.x,
        y: ts.y,
        fill: 'tozeroy',
        type: 'scatter',
        line: { simplify: false, width: 4, smoothing: 1.3 },
        connectgaps: true
      };
      this.graph.data.push(timeSerie);
    });
  }
}
