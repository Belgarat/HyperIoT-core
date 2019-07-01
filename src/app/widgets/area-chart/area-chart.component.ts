import { Component, OnInit } from '@angular/core';

import {
  DataPacket,
  WidgetChartComponent,
  TimeSeries
} from '@hyperiot/core';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent extends WidgetChartComponent implements OnInit {
  private chartData: TimeSeries = new TimeSeries();

  ngOnInit() {
    // Adds some random data to the serie (the last three days)
    this.chartData.randomize(3);
    // Create the real time data channel
    this.setDataChannel('my-widget', new DataPacket(1, ['temperature', 'humidity']), (eventData) => {
      this.chartData.x.push(eventData[0]);
      this.chartData.y.push(eventData[1]);
      // set x range to the last hour of data
      const rangeEnd = new Date(eventData[0].getTime());
      const rangeStart = new Date(rangeEnd.getTime() - (1 * 60 * 60 * 1000));
      // relayout x-axis range with new data
      const Plotly = this.plotly.getPlotly();
      const graph = this.plotly.getInstanceByDivId('graph');
      Plotly.relayout(graph, {'xaxis.range': [rangeStart, rangeEnd]});
    });
    // Configure chart
    this.addTimeSeries(this.chartData);
  }

}
