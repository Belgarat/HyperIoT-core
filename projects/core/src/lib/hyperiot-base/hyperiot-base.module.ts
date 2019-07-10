import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStreamService } from './services/data-stream.service';
import { WidgetChartComponent } from './widgets/widget-chart.component';

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

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

export { PlotlyModule, PlotlyJS };
