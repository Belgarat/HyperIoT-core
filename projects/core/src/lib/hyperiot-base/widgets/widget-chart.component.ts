import { Component, Output, Input } from '@angular/core';

import { WidgetComponent } from './widget.component';
import { PlotlyService } from 'angular-plotly.js';
import { DataStreamService } from '../services/data-stream.service';
import { TimeSeries } from './data/time-series';

interface BufferedData {
  series: TimeSeries;
  x: Date[];
  y: number[];
}

@Component({
  selector: 'hyperiot-widget-chart',
  template: ''
})
/**
 * A widget for visualizing time series chart
 */
export class WidgetChartComponent extends WidgetComponent {
  /**
   * Time range to display in seconds
   */
  @Input() timeAxisRange = 30;
  /**
   * Max data points to display, older entries
   * will be deleted once new data is pushed
   */
  @Input() maxDataPoints = 100;

  /**
   * Max time window in seconds. Older data will be deleted.
   */
  @Input() timeWindow = 3600; // 1 hour

  /**
   * This array is used to set configuration and layout
   * options of each series.
   * See [Plotly documentation]{@link https://plot.ly/javascript/} for all available
   * configuration and layout settings.
   *
   * @example
   * <app-chart-widget
   *   [seriesConfig]="[{
   *       series: 'temperature',
   *       config: { yaxis: 'y2' },
   *       layout: {
   *           yaxis2: {
   *               title: 'temperature',
   *               titlefont: {color: '#00f'},
   *               tickfont: {color: '#00f'},
   *               anchor: 'free',
   *               overlaying: 'y',
   *               side: 'right',
   *               position: 1,
   *               range: [-50, 50]
   *             }
   *       }
   *   },
   *   {
   *       series: 'humidity',
   *       layout: {
   *           yaxis: {
   *               title: 'humidity',
   *               titlefont: {color: 'darkorange'},
   *               tickfont: {color: 'darkorange'}
   *           }
   *       }
   *   }]">
   *   </app-chart-widget>
   */
  @Input() seriesConfig: { series: string, config: any, layout: any }[] = [];

  /**
   * Structure that stores actual configuration for the Plotly chart
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
  private defaultSeriesConfig = {
    type: 'scatter',
    mode: 'lines+markers',
    line: { simplify: false, width: 3, shape: 'spline', smoothing: 1.3 },
    connectgaps: true
  };

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
        // keeps data length < this.maxDataPoints
        this.applySizeConstraints(bd.series);
      });
      this.dataBuffer = [];
    }
  }

  getOfflineData(startDate: Date, endDate: Date): any {
    // TODO: this method returns currently mocked data
    const timeSeriesArray = [];
    if (this.dataChannel != null) {
      this.dataChannel.packet.fields.forEach((fieldName) => {
        const timeSeries = new TimeSeries(fieldName + '-history');
        timeSeries.randomize(startDate, endDate, 60);
        const series = this.graph.data.find((ts: TimeSeries) => ts.name === fieldName);
        if (series != null) {
          series.x.push(...timeSeries.x);
          series.y.push(...timeSeries.y);
        }
        timeSeriesArray.push(timeSeries);
      });
    }
    // TODO: where to push the new data?
    return timeSeriesArray;
  }

  // WidgetChartComponent public methods

  /**
   * Adds new time series to the chart
   *
   * @param timeSeriesData Array of time series
   */
  addTimeSeries(timeSeriesData: TimeSeries[], config: any = this.defaultSeriesConfig): void {
    timeSeriesData.forEach(ts => {
      const tsd = {
        name: ts.name,
        x: ts.x,
        y: ts.y
      };
      // copy default settings
      Object.assign(tsd, this.defaultSeriesConfig);
      // apply config options stored in `this.seriesConfig` parameter
      this.applyStoredConfig(tsd);
      // override any setting passed via `config`
      Object.assign(tsd, config);
      // FIXME: should replace item with same name
      this.graph.data.push(tsd);
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
    // keeps data length < this.maxDataPoints
    this.applySizeConstraints(bufferedData);
  } else {
      series.x.push(x);
      series.y.push(y);
      // keeps data length < this.maxDataPoints
      this.applySizeConstraints(series);
      // reset x axis range to default
      this.relayout(x);
    }
  }

  // Private methods

  private relayout(lastEventDate: Date) {
    // set x range to the last 30 seconds of data
    const rangeEnd = new Date(lastEventDate);
    const rangeStart = new Date(rangeEnd.getTime() - (1 * this.timeAxisRange * 1000));
    // relayout x-axis range with new data
    const Plotly = this.plotly.getPlotly();
    const graph = this.plotly.getInstanceByDivId(this.widgetId);
    Plotly.relayout(graph, {'xaxis.range': [rangeStart, rangeEnd]});
  }

  private applyStoredConfig(timeSeriesData: any) {
    const sc = this.seriesConfig.find((cfg) => cfg.series === timeSeriesData.name);
    if (sc != null) {
      Object.assign(timeSeriesData, sc.config);
      if (sc.layout != null) {
        Object.assign(this.graph.layout, sc.layout);
      }
    }
  }

  private applySizeConstraints(data: { x: Date[], y: number[] }) {
    if (data.x.length > this.maxDataPoints && this.maxDataPoints > 0) {
      data.x.splice(0, data.x.length - this.maxDataPoints);
      data.y.splice(0, data.y.length - this.maxDataPoints);
    }
    const endDate = data.x[data.x.length - 1].getTime();
    while (
      this.timeWindow > 0 &&
      data.x.length > 0 &&
      (endDate - data.x[0].getTime()) / 1000 > this.timeWindow
    ) {
      data.x.shift();
      data.y.shift();
    }
  }
}
