import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './hyperiot-logger/logger.service';
import { DashboardOfflineDataService } from './hyperiot-offline-data/dashboard-offline-data.service';
import { Logger } from './hyperiot-logger/logger';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [LoggerService, DashboardOfflineDataService]
})
export class HyperiotServiceModule { }
