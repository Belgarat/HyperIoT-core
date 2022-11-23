import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HprojectsService } from '../../hyperiot-client/h-project-client/api-module';
import { BaseDataService } from '../base-data.service';
import { DataChannel } from '../models/data-channel';

interface PacketSessionData {
  rowKeyLowerBound: number;
  rowKeyUpperBound: number;
  totalCount: BehaviorSubject<number>;
  data: any[];
}

export interface DataPacketFilter {
  packetId: number;
  fields: string[];
  // tell to data stream service if send whole packet (filtered on the basis of selected fields)
  // or send one field by one
  wholePacketMode: boolean;
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

  hPacketMap: Map<number, PacketSessionData>;

  constructor(
    private hprojectsService: HprojectsService,
  ) {
    super();
    this.hPacketMap = new Map<number, PacketSessionData>();    this.countEventSubject = new Subject<PageStatus>();    this.countEventSubject = new Subject<PageStatus>();
    this.countEventSubject = new Subject<PageStatus>();
  }

  public resetService(hProjectId: number): Subject<number[]> {
    this.hProjectId = hProjectId;
    this.subscriptions = [];
    this.hPacketMap.clear();
    this.dashboardPackets = new Subject<number[]>();
    return this.dashboardPackets;
  }

  addDataChannel(widgetId: number, dataPacketFilter: DataPacketFilter) {

    if (!this.subscriptions.some(x => x.widgetId === widgetId)) {
      this.subscriptions.push({ widgetId: widgetId, packetId: dataPacketFilter.packetId });
      if (!this.hPacketMap.has(dataPacketFilter.packetId)) {
        this.hPacketMap.set(dataPacketFilter.packetId, {
          rowKeyLowerBound: 0,
          rowKeyUpperBound: 0,
          totalCount: new BehaviorSubject(0),
          data: []
        });
        this.dashboardPackets.next([...this.hPacketMap.keys()]);
      }
    }

    const dataChannel = super.addDataChannel(widgetId, dataPacketFilter);
    dataChannel.controller = this.hPacketMap.get(dataPacketFilter.packetId).totalCount;
    return dataChannel;
  }

  removeDataChannel(widgetId: number) {

    this.subscriptions.filter(y => y.widgetId !== widgetId).forEach(s=> {
      this.hPacketMap.delete(s.packetId);
      this.dashboardPackets.next([...this.hPacketMap.keys()]);
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
      [...this.hPacketMap.keys()].toString(),
      ""
    ).subscribe((res) => {
      this.hPacketMap.forEach((value, key: number) => {
        const currentPacket = this.hPacketMap.get(key);
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
    const currentPacket = this.hPacketMap.get(packetId)
    return this.hprojectsService.scanHProject(this.hProjectId, currentPacket.rowKeyLowerBound, currentPacket.rowKeyUpperBound, packetId, deviceId, alarmState).pipe(
      map(res => {
        const convertData = this.convertData(res.values);
        currentPacket.rowKeyLowerBound = res.rowKeyUpperBound + 1;
        currentPacket.data = currentPacket.data.concat(convertData);
        return convertData;
      })
    );

    // return new Observable(obs => {
    //   const currentPacket = this.hPacketMap.get(packetId)
    //   this.hprojectsService.scanHProject(this.hProjectId, currentPacket.rowKeyLowerBound, currentPacket.rowKeyUpperBound, packetId, deviceId, alarmState).subscribe(
    //     res=> {
    //       const packetData = res;
    //       currentPacket.rowKeyLowerBound = packetData.rowKeyUpperBound + 1;
    //       currentPacket.data = currentPacket.data.concat(packetData.values);
    //       obs.next(packetData.values);
    //     }
    //   );
    // });
  }

  public getEventCountEmpty() {
    this.hPacketMap.forEach((value, key: number) => {
      const currentPacket = this.hPacketMap.get(key);
      currentPacket.data = [];
      currentPacket.rowKeyLowerBound = 0;
      currentPacket.rowKeyUpperBound = 0;
      currentPacket.totalCount.next(0);
    });
  }


  public getPacketDataSubject(hPacketId: number): Subject<number> {
    return this.hPacketMap.has(hPacketId) ? this.hPacketMap.get(hPacketId).totalCount : null;
  }


  loadNextData(packetId, deviceId, alarmState, lowerBound, widgetId): void {
    lowerBound = lowerBound * this.DEFAULT_CHUNK_LENGTH;
    if (this.hPacketMap.has(packetId)) {
      const packetSession = this.hPacketMap.get(packetId);
      if( packetSession.data.length >= lowerBound + this.DEFAULT_CHUNK_LENGTH || packetSession.data.length === packetSession.totalCount.value) {
        //get datachanel.subject.next(packetSession.data.slice(lowerBound, lowerBound + this.DEFAULT_CHUNK_LENGTH)
        this.dataChannels[widgetId].subject.next(packetSession.data.slice(lowerBound, lowerBound + this.DEFAULT_CHUNK_LENGTH))
      } else {
        //get datachanel.subject.next(packetSession.data.slice(lowerBound, lowerBound + this.DEFAULT_CHUNK_LENGTH)
        this.scanAndSaveHProject(packetId, deviceId, alarmState).subscribe(
          res => this.dataChannels[widgetId].subject.next(res)
        );
      }
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

// TODO non posso mettere un replaySubject perché dopo tutti i widget che fanno riferimento allo stesso paccchetto
// TODO scaricano gli stessi dati ma ognuno dovrebbe richiedere solo i suoi. Non posso mettere un canale
// TODO per ogni widget perché la fonte dei dati deve essere la stessa se no widget con lo stesso pacchetto
// TODO scaricheranno i dati ognuno per conto suo

// TODO Quello che forse si può fare è avere tanti canali quanti i widget e inserire mano a mano i dati che vengono richiesti grazie al packetsessiondata.data
// TODO ma anche così fando dal widget dovrei comunque attacarmi  al getPacketDataSubject per vedere eventuli reset e counter.
// TODO a meno che non prevedo un invio di valori con il type (totalCount, data, reset...)