import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { HprojectsService } from '../../hyperiot-client/h-project-client/api-module';

interface PacketSessionData {
  rowKeyLowerBound: number;
  rowKeyUpperBound: number;
  totalCount: Subject<number>;
  data: any[];
}

interface WidgetPacket {
  packetId: number;
  widgetId: number;
}

@Injectable({
  providedIn: "root",
})
export class HyperiotOfflineData2Service {
  private subscriptions: WidgetPacket[] = [];

  DEFAULT_CHUNK_LENGTH = 100;
  hProjectId;
  rowKeyUpperBound = 0;

  dashboardPackets: Subject<number[]>;

  fakeTimelineEventCount: (a, b, c, d) => Observable<any>;

  hPacketMap: Map<number, PacketSessionData>;

  constructor(
    private hprojectsService: HprojectsService,
  ) {
    this.hPacketMap = new Map<number, PacketSessionData>();
  }

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
        this.hPacketMap.set(packetId, {
          rowKeyLowerBound: 0,
          rowKeyUpperBound: 0,
          totalCount: new Subject(),
          data: []
        });
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
  public getEventCount(
    rowKeyLowerBound: number,
    rowKeyUpperBound: number
  ): void {
    this.rowKeyUpperBound = rowKeyUpperBound;
    this.fakeTimelineEventCount(
      this.hProjectId,
      rowKeyLowerBound,
      this.rowKeyUpperBound,
      [...this.hPacketMap.keys()].toString()
    ).subscribe((res) => {
      console.log('getEventCount()', res)
      this.hPacketMap.forEach((value, key: number) => {
        const currentPacket = this.hPacketMap.get(key);
        currentPacket.rowKeyLowerBound = rowKeyLowerBound;
        currentPacket.rowKeyUpperBound = rowKeyUpperBound;
        currentPacket.totalCount.next(res.find(x=>x.hpacketId==key).totalCount);
        currentPacket.totalCount = new Subject();
      });

    });
  }

  scanAndSaveHProject(packetId): Observable<any> {
    return new Observable(obs => {
      const currentPacket = this.hPacketMap.get(packetId)
      this.hprojectsService.scanHProject(this.hProjectId, packetId, currentPacket.rowKeyLowerBound, currentPacket.rowKeyUpperBound).subscribe(
        res=> {
          console.log('scanAndSaveHProject()', res)
          const packetData = res[0];
          currentPacket.rowKeyLowerBound = packetData.rowKeyUpperBound + 1;
          currentPacket.data.push(packetData.values);
          obs.next(currentPacket.data);
        }
      );
    });
  }

  public getPacketDataSubject(hPacketId: number): Subject<number> {
    return this.hPacketMap.has(hPacketId) ? this.hPacketMap.get(hPacketId).totalCount : null;
  }


  getData(packetId, lowerBound): Observable<any> {
    console.log('getData()', packetId, lowerBound)
    lowerBound = lowerBound * this.DEFAULT_CHUNK_LENGTH;
    if (this.hPacketMap.has(packetId)) {
      const packetSession = this.hPacketMap.get(packetId);
      if( packetSession.data.length > lowerBound + this.DEFAULT_CHUNK_LENGTH) {
        return of(packetSession.data.slice(lowerBound, lowerBound + this.DEFAULT_CHUNK_LENGTH));
      } else {
        return this.scanAndSaveHProject(packetId);
      }
    }
  }

}