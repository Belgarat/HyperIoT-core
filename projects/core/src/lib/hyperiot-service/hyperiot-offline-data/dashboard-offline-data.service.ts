import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HprojectsService } from '../../hyperiot-client/h-project-client/api-module';
import { HyperiotIndexeddbService } from '../hyperiot-indexeddb/hyperiot-indexeddb.service';

interface Slot {
  start: number;
  end: number;
  count: number;
}
interface OfflineDataSub {
  hpacketId: number;
  totalCount: number;
  slots: Slot[];
}

interface OfflineDataMap {
  hPacketId: number;
  data: [];
}

interface WidgetPacket {
  packetId: number;
  widgetId: number;
}

enum PageStatus {
  Loading = 0,
  Standard = 1,
  New = 2,
  Error = -1
}

@Injectable({
  providedIn: 'root'
})
export class DashboardOfflineDataService {

  private subscriptions: WidgetPacket[] = [];

  private OfflineCountMap: Map<number, OfflineDataSub> = new Map<number, OfflineDataSub>();

  private offlineDataMap: Map<number, any>;

  /**
   * HPackets belonging to a particular HProject, grouped by HPacket ID
   */
  private hPacketMap: Map<number, Subject<any>>;
  private hProjectId: number;
  
  private HBASE_CLIENT_SCANNER_MAX_RESULT_SIZE = 50;

  public totalDataCount = [];

  countEventSubject: Subject<PageStatus>;

  constructor(
    private hprojectsService: HprojectsService,
    private indexeddbService: HyperiotIndexeddbService
  ) {
    this.hPacketMap = new Map<number, Subject<any>>();
    this.offlineDataMap = new Map<number, any>();
    this.countEventSubject = new Subject<PageStatus>();
  }

  dashboardPackets: Subject<number[]>;

  public resetService(hProjectId: number): Subject<number[]> {
    this.hProjectId = hProjectId;
    this.subscriptions = [];
    this.hPacketMap.clear();
    this.dashboardPackets = new Subject<number[]>();
    return this.dashboardPackets;
  }

  addWidget(widgetId: number, packetId: number) {
    if (!this.subscriptions.some(x => x.widgetId === widgetId)) {
      this.subscriptions.push({ widgetId: widgetId, packetId: packetId });
      if (!this.hPacketMap.has(packetId)) {
        this.hPacketMap.set(packetId, new Subject());
        this.dashboardPackets.next([...this.hPacketMap.keys()]);
      }
    }
  }

  removeWidget(widgetId: number, packetId: number) {
    this.subscriptions = this.subscriptions.filter(y => y.widgetId !== widgetId);
    if (this.hPacketMap.has(packetId) && !this.subscriptions.some(y => y.packetId === packetId)) {
      this.hPacketMap.delete(packetId);
      this.dashboardPackets.next([...this.hPacketMap.keys()]);
    }
  }

  // PRIMA CHIAMATA ARRIVA DALLA DASHBOARD DOPO SELEZIONE VERDE
  // SETTA OfflineCountMap
  public getEventCount(rowKeyLowerBound: number, rowKeyUpperBound: number): void {
    this.hprojectsService.timelineEventCount(
      this.hProjectId,
      rowKeyLowerBound,
      rowKeyUpperBound,
      this.HBASE_CLIENT_SCANNER_MAX_RESULT_SIZE,
      [...this.hPacketMap.keys()].toString()
    ).subscribe(
      (res: OfflineDataSub[]) => {
        const hPacketIds: string = [...this.hPacketMap.keys()].toString();
        this.hprojectsService.scanHProject(this.hProjectId, hPacketIds, rowKeyLowerBound, rowKeyUpperBound)
          .subscribe(data => {
            // retrieve first data slots for every widget
            if (Array.isArray(data))
              data.forEach(element => this.offlineDataMap.set(element.hPacketId, element));
            else
              this.offlineDataMap.set(data.hPacketId, data);

            // update count of data slots
            this.OfflineCountMap.clear();
            res.forEach(r => {
              this.OfflineCountMap.set(r.hpacketId, r);
              if (this.hPacketMap.has(r.hpacketId)) {
                this.hPacketMap.get(r.hpacketId).next(r.totalCount);
              } else {
                throw new Error(r.hpacketId + ' non è nella mappa')
              }
            });
            this.countEventSubject.next(PageStatus.Standard);
          },
          err => {
            this.countEventSubject.next(PageStatus.Error);
          });
      },
      err => {
        this.countEventSubject.next(PageStatus.Error);
      }
    );
  }

  public getEventCountEmpty() {
    this.OfflineCountMap.forEach((value, key: number) => {
      this.OfflineCountMap.set(key, null);
    });
    this.hPacketMap.forEach((value, key: number) => {
      this.hPacketMap.get(key).next(0);
    });
  }

  // getSlot(packetId: number, slotIndex: number) {
  //   const { tStart, tStop } = this.OfflineCountMap[packetId];
  //   this.checkOfflineData(packetId, tStart, tStop).then(
  //     offlineDataId => {
  //       if (offlineDataId === -1) {
  //         this.getHPacketMap(tStart, tStop);
  //       } else {
  //         this.indexeddbService.getOfflineDataByOfflineDataId(offlineDataId).then(res => {
  //           this.hPacketMap.get(packetId).next(res);
  //         });
  //       }
  //     }
  //   );
  // }

  private checkOfflineData(packetId: number, tStart: number, tStop: number): Promise<number> {
    return this.indexeddbService.getCoveredDataByPacketId(packetId).then(
      coveredData => {
        coveredData.forEach(y => {
          if (y.covered[0] <= tStart && y.covered[1] >= tStop) {
            return y.offlineDataId;
          }
        });
        return -1;
      }
    ).catch(err => {
      return -1;
    });
  }

  public getPacketDataSubject(hPacketId: number): Subject<any> {
    return this.hPacketMap.has(hPacketId) ? this.hPacketMap.get(hPacketId) : null;
  }

  public getHPacketMap(rowKeyLowerBound: number, rowKeyUpperBound: number): void {
    this.hprojectsService.scanHProject(
      this.hProjectId,
      [...this.hPacketMap.keys()].toString(),
      rowKeyLowerBound,
      rowKeyUpperBound)
      .subscribe(
        (res: any[]) => {
          res.forEach(element => {
            if (this.hPacketMap.has(element.hPacketId)) {
              this.hPacketMap.get(element.hPacketId).next(element.values);
            } else {
              throw new Error(element.hPacketId + ' non è nella mappa')
            }
          });
        },
        err => { console.log(err); }
      );
  }

  getData(packetId, indexes): Observable<any> {
    const slot: Slot = this.OfflineCountMap.get(packetId).slots[Math.floor(indexes[0] / this.HBASE_CLIENT_SCANNER_MAX_RESULT_SIZE)];
    if (this.offlineDataMap.has(packetId)) {
      // client has claimed for first data slot, retrieve it
      const result: Array<any> = this.offlineDataMap.get(packetId);
      this.offlineDataMap.delete(packetId);
      return of(result);
    }
    // client has navigated through widget pages, get data from server
    return this.hprojectsService.scanHProject(this.hProjectId, packetId, slot.start, slot.end + 1);
  }

}
