import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, share } from 'rxjs';
import { HprojectsService } from '../../hyperiot-client/h-project-client/api-module';
import { BaseDataService } from '../base-data.service';
import { DataChannel } from '../models/data-channel';
import { DataPacketFilter } from '../models/data-packet-filter';
import { OfflineDataChannelController } from './OfflineDataChannelController';

interface PacketSessionData {
  rowKeyLowerBound: number;
  rowKeyUpperBound: number;
  totalCount: BehaviorSubject<number>;
  data: any[];
  actualSubscription?: Observable<any>; // todo handle multiple data request same time (va rivisto poi con questione dati dinamici)
}

enum PageStatus {
  Loading = 0,
  Standard = 1,
  New = 2,
  Error = -1
}

interface WidgetPacket {
  packetId: number;
  widgetId: number;
}

@Injectable({
  providedIn: 'root'
})
export class OfflineDataService extends BaseDataService {

  dataChannels: { [id: number]: DataChannel; } = {};

  countEventSubject: Subject<PageStatus>;

  private subscriptions: WidgetPacket[] = [];

  DEFAULT_CHUNK_LENGTH = 50;
  hProjectId;
  rowKeyUpperBound = 0;

  dashboardPackets: Subject<number[]>;

  hPacketSessionMap: Map<number, PacketSessionData>;

  constructor(
    private hprojectsService: HprojectsService,
  ) {
    super();
    this.hPacketSessionMap = new Map<number, PacketSessionData>();    this.countEventSubject = new Subject<PageStatus>();    this.countEventSubject = new Subject<PageStatus>();
    this.countEventSubject = new Subject<PageStatus>();
  }

  public resetService(hProjectId: number): Subject<number[]> {
    this.hProjectId = hProjectId;
    this.subscriptions = [];
    this.hPacketSessionMap.clear();
    this.dashboardPackets = new Subject<number[]>();
    return this.dashboardPackets;
  }

  addDataChannel(widgetId: number, dataPacketFilter: DataPacketFilter) {
    // TODO migliorare logica se possbile
    if (this.dataChannels[widgetId]) {
      return super.addDataChannel(widgetId, dataPacketFilter);
    }

    if (!this.subscriptions.some(x => x.widgetId === widgetId)) {
      this.subscriptions.push({ widgetId: widgetId, packetId: dataPacketFilter.packetId });
      if (!this.hPacketSessionMap.has(dataPacketFilter.packetId)) {
        this.hPacketSessionMap.set(dataPacketFilter.packetId, {
          rowKeyLowerBound: 0,
          rowKeyUpperBound: 0,
          totalCount: new BehaviorSubject(0),
          data: []
        });
        this.dashboardPackets.next([...this.hPacketSessionMap.keys()]);
      }
    }

    const dataChannel = super.addDataChannel(widgetId, dataPacketFilter);
    dataChannel.controller = new OfflineDataChannelController(this.hPacketSessionMap.get(dataPacketFilter.packetId).totalCount);
    return dataChannel;
  }

  removeDataChannel(widgetId: number) {

    this.subscriptions.filter(y => y.widgetId !== widgetId).forEach(s=> {
      this.hPacketSessionMap.delete(s.packetId);
      this.dashboardPackets.next([...this.hPacketSessionMap.keys()]);
    })
    this.subscriptions = this.subscriptions.filter(y => y.widgetId !== widgetId);

    // if (this.hPacketMap.has(packetId) && !this.subscriptions.some(y => y.packetId === packetId)) {
    //   this.hPacketMap.delete(packetId);
    //   this.dashboardPackets.next([...this.hPacketMap.keys()]);
    // }

    super.removeDataChannel(widgetId);
  }

  // PRIMA CHIAMATA ARRIVA DALLA DASHBOARD DOPO SELEZIONE VERDE
  // SETTA OfflineCountMap
  public getEventCount(
    rowKeyLowerBound: number,
    rowKeyUpperBound: number
  ): void {
    this.rowKeyUpperBound = rowKeyUpperBound;
    this.hprojectsService.timelineEventCount(
      this.hProjectId,
      rowKeyLowerBound,
      this.rowKeyUpperBound,
      [...this.hPacketSessionMap.keys()].toString(),
      ""
    ).subscribe((res) => {
      this.hPacketSessionMap.forEach((value, key: number) => {
        const currentPacket = this.hPacketSessionMap.get(key);
        currentPacket.data = [];
        currentPacket.rowKeyLowerBound = rowKeyLowerBound;
        currentPacket.rowKeyUpperBound = rowKeyUpperBound;
        currentPacket.totalCount.next(res.find(x=>x.hpacketId==key).totalCount);
        this.countEventSubject.next(PageStatus.Standard);
      });
    },
    err => {
      this.countEventSubject.next(PageStatus.Error);
    });
  }

  scanAndSaveHProject(packetId, deviceId, alarmState): Observable<any> {
    const currentPacketSession = this.hPacketSessionMap.get(packetId)
    if(currentPacketSession.actualSubscription) {
      return currentPacketSession.actualSubscription;
    }
    return currentPacketSession.actualSubscription = this.hprojectsService.scanHProject(this.hProjectId, currentPacketSession.rowKeyLowerBound, currentPacketSession.rowKeyUpperBound, packetId, deviceId, alarmState).pipe(
      map(res => {
        const convertData = this.convertData(res.values);
        currentPacketSession.rowKeyLowerBound = res.rowKeyUpperBound + 1;
        currentPacketSession.data = currentPacketSession.data.concat(convertData);
        currentPacketSession.actualSubscription = null;
        return convertData;
      }),
      share()
    );

  }

  public getEventCountEmpty() {
    this.hPacketSessionMap.forEach((value, key: number) => {
      const currentPacket = this.hPacketSessionMap.get(key);
      currentPacket.data = [];
      currentPacket.rowKeyLowerBound = 0;
      currentPacket.rowKeyUpperBound = 0;
      currentPacket.totalCount.next(0);
    });
  }


  public getPacketSessionDataSubject(hPacketId: number): Subject<number> {
    return this.hPacketSessionMap.has(hPacketId) ? this.hPacketSessionMap.get(hPacketId).totalCount : null;
  }


  loadNextData(packetId, deviceId, alarmState, widgetId): void {

    // todo si potrebbe richiamre questa funzione dal datachannel? così abbiamo tutto il contesto
    // todo in parte già fatto spostando lowerbound nel datachannel
    if (!this.hPacketSessionMap.has(packetId)) {
      return;
    }

    // selezione la packetSession e il dataChannel
    const packetSession = this.hPacketSessionMap.get(packetId);
    const dataChannel = this.dataChannels[widgetId];
    const lowerBound = dataChannel.controller.lowerBound;

    // controllo se packetSession ha già dati da inviare al canale (cache) altrimenti li richiedo alla scan
    if(packetSession.data.length >= lowerBound + this.DEFAULT_CHUNK_LENGTH || packetSession.data.length === packetSession.totalCount.value) {
      dataChannel.subject.next(packetSession.data.slice(lowerBound, lowerBound + this.DEFAULT_CHUNK_LENGTH));
      dataChannel.controller.lowerBound = lowerBound + this.DEFAULT_CHUNK_LENGTH;
    } else {
      this.scanAndSaveHProject(packetId, deviceId, alarmState).subscribe(
        res => {
          dataChannel.subject.next(res);
          dataChannel.controller.lowerBound = lowerBound + this.DEFAULT_CHUNK_LENGTH;
        }
      );
    }

  }

  private convertData(packetValues: any) {
    return packetValues.map(pv => {
      const convertedPV = {};
      pv.fields.forEach(field => {
        convertedPV[field.name] = field.value;
      });
      // TODO inserire conversione da numero a date
      return convertedPV;
      
      // TODO usato foreach per chiarezza ma si può usare direttamente anche reduce()
      // return pv.fields.reduce((prev, curr) => {
      //   prev[curr.name] = curr.value
      //   return prev;
      // }, {});
    
    });
  }

}
