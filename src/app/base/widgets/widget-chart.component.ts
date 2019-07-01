import { Component } from '@angular/core';

import { WidgetComponent } from './widget.component';
import { PlotlyService } from 'angular-plotly.js';
import { DataChannelService } from '../services/data-channel.service';

export class TimeSeries {
  /**
   * X-Axis time values
   */
  x: Date[];
  /**
   * Y-Axis data values
   */
  y: number[];

  constructor() {
    this.x = [];
    this.y = [];
  }

  /**
   * Generate random data for the given past days 
   *
   * @param days Number of past days of which to generate random data (starting from now)
   */
  randomize(days: number) {
    const today = new Date();
    while (days >= 0) {
      const pastDate: Date = new Date(today.getTime() - (24 * 60 * 60 * 1000) * days);
      pastDate.setHours(0, 0, 0, 0);
      // generate a value every 5 minutes for the current day
      const intervalMin = 5;
      for (let m = 0; m < 24 * (60 / intervalMin); m ++) {
        pastDate.setMinutes(pastDate.getMinutes() + intervalMin);
        if (days === 0 && pastDate.getTime() >= today.getTime()) {
          break;
        }
        this.x.push(new Date(pastDate.getTime()));
        const randomValue = 20 + (Math.random() * 15);
        this.y.push(randomValue);
      }
      days--;
    }
  }
}

@Component({
  selector: 'app-widget-chart',
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

  constructor(public dataChannelService: DataChannelService, public plotly: PlotlyService) {
    super(dataChannelService);
  }

  /**
   * Adds a new time serie to the chart data
   *
   * @param timeSeriesData Time series data
   */
  addTimeSeries(timeSeriesData: TimeSeries) {
    const timeSerie = {
      x: timeSeriesData.x,
      y: timeSeriesData.y,
      fill: 'tozeroy',
      type: 'scatter',
      line: { simplify: false, width: 4, smoothing: 1.3 },
      connectgaps: true
    };
    this.graph.data.push(timeSerie);
  }
}
