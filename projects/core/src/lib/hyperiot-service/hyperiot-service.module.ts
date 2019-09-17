import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './hyperiot-logger/logger.service';
import { Logger } from './hyperiot-logger/logger';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [LoggerService]
})
export class HyperiotServiceModule { }
