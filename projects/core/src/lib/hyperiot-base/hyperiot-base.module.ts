import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStreamService } from './services/data-stream.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    DataStreamService
  ]
})
export class HyperiotBaseModule { }

export * from './services/data-stream.service';
export * from './services/data-packet-filter';
