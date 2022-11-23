import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoggerService } from './hyperiot-logger/logger.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    LoggerService,
  ]
})
export class HyperiotServiceModule { }
