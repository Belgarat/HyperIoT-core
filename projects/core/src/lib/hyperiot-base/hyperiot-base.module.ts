import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataChannelService } from './services/data-channel.service';
import { WidgetComponent } from './widgets/widget.component';
import { WidgetChartComponent } from './widgets/widget-chart.component';

@NgModule({
  declarations: [
    WidgetComponent,
    WidgetChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WidgetComponent,
    WidgetChartComponent
  ],
  providers: [
    DataChannelService
  ]
})
export class HyperiotBaseModule { }

export * from './services/data-channel.service';
export * from './widgets/widget.component';
export * from './widgets/widget-chart.component';
export * from './widgets/data/data-packet';
export * from './widgets/data/time-series';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

export { PlotlyModule, PlotlyJS };
