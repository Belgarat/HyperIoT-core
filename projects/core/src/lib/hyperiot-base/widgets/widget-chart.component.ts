import { Component, Output } from '@angular/core';

import { WidgetComponent } from './widget.component';
import { PlotlyService } from 'angular-plotly.js';
import { DataStreamService } from '../services/data-stream.service';
import { TimeSeries } from './data/time-series';
import { DataPacketFilter } from './data/data-packet-filter';

interface BufferedData {
  series: TimeSeries;
  x: Date[];
  y: number[];
}

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

  private isPaused: boolean;
  private dataBuffer: BufferedData[] = [];

  constructor(public dataStreamService: DataStreamService, public plotly: PlotlyService) {
    super(dataStreamService);
  }

  // Base class abstract methods implementation

  pause(): void {
    this.isPaused = true;
  }

  play(): void {
    this.isPaused = false;
    if (this.dataBuffer != null) {
      this.dataBuffer.forEach((bd) => {
        bd.series.x.push(...bd.x);
        bd.series.y.push(...bd.y);
      });
      this.dataBuffer = [];
    }
  }

  getOfflineData(dataPacketFilter: DataPacketFilter, startDate: Date, endDate: Date): any {
    // TODO: ...
  }

  // WidgetChartComponent public methods

  /**
   * Adds new time series to the chart
   *
   * @param timeSeriesData Array of time series
   */
  addTimeSeries(timeSeriesData: TimeSeries[]): void {
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

  /**
   * Adds new data to a time series.
   *
   * @param series The series to add data to
   * @param x The x value (Date)
   * @param y The y value (number)
   */
  addTimeSeriesData(series: TimeSeries, x: Date, y: number): void {
    if (this.isPaused) {
    let bufferedData: BufferedData = this.dataBuffer.find((bd) => bd.series === series);
    if (bufferedData == null) {
      bufferedData = {
        series: series,
        x: [], y: []
      };
      this.dataBuffer.push(bufferedData);
    }
    bufferedData.x.push(x);
    bufferedData.y.push(y);
  } else {
      series.x.push(x);
      series.y.push(y);
      this.relayout(x);
    }
  }

  // Private methods

  private relayout(lastEventDate: Date) {
    // set x range to the last 30 seconds of data
    const rangeEnd = new Date(lastEventDate);
    const rangeStart = new Date(rangeEnd.getTime() - (1 * 30 * 1000));
    // relayout x-axis range with new data
    const Plotly = this.plotly.getPlotly();
    const graph = this.plotly.getInstanceByDivId(this.widgetId);
    Plotly.relayout(graph, {'xaxis.range': [rangeStart, rangeEnd]});
  }
}
