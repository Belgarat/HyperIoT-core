import { Injectable } from '@angular/core';
import { HprojectalgorithmsService } from '../../hyperiot-client/hproject-algorithms-client/api-module';

interface WidgetAlgorithm {
  algorithmId: number;
  widgetId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlgorithmOfflineDataService {

  private subscriptions: WidgetAlgorithm[] = [];

  private hProjectId: number;

  public totalDataCount = [];

  constructor(
    private hprojectAlgorithmsService: HprojectalgorithmsService
  ) { }

  public resetService(hProjectId: number): void {
    this.hProjectId = hProjectId;
    this.subscriptions = [];
  }

  addWidget(widgetId: number, algorithmId: number) {
    if (!this.subscriptions.some(x => x.widgetId === widgetId)) {
      this.subscriptions.push({ widgetId: widgetId, algorithmId: algorithmId });
    }
  }

  removeWidget(widgetId: number, algorithmId: number) {
    this.subscriptions = this.subscriptions.filter(y => y.widgetId !== widgetId);
  }

  getData(algorithmId) {
    return this.hprojectAlgorithmsService.getAlgorithmOutputs(this.hProjectId, algorithmId);
  }

}
