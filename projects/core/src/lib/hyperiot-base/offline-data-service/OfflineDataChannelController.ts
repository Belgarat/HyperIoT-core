import { BehaviorSubject } from 'rxjs';

export class OfflineDataChannelController {
  $totalCount: BehaviorSubject<number>;
  private chunkLength: number;
  lowerBound: number = 0;

  constructor($totalCount: BehaviorSubject<number>, chunkLength: number = 50) {
    this.$totalCount = $totalCount;
    this.chunkLength = chunkLength;
  }

  loadNextData() {
    // todo capire se spostare qui metodo loadNextData
  }
}
