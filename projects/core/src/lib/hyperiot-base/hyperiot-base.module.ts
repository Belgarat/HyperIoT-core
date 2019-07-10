import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStreamService } from './services/data-stream.service';
import { WidgetChartComponent } from './widgets/widget-chart.component';

declare const require;

@NgModule({
  declarations: [
    WidgetChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WidgetChartComponent
  ],
  providers: [
    DataStreamService
  ]
})
export class HyperiotBaseModule { }

export * from './services/data-stream.service';
export * from './widgets/widget.component';
export * from './widgets/widget-chart.component';
export * from './widgets/data/data-packet-filter';
export * from './widgets/data/time-series';

// FIXME: This old-fashoned import/patch is due to the following issue
// FIXME: https://github.com/plotly/plotly.js/issues/3518
// FIXME: it should be fixed in Plotly >= 2.0.0
var PlotlyJS = require('./plotly.patched');
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

export { PlotlyModule, PlotlyJS };
