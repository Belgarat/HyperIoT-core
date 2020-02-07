import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HbaseconnectorsService } from '../../hyperiot-client/h-base-connectors-client/api-module';

@Injectable({
  providedIn: 'root'
})
export class DashboardOfflineDataService {

  /**
   * HPackets belonging to a particular HProject, grouped by HPacket ID
   */
  private hPacketMap: Map<number, Subject<any[]>>;
  private hProjectId: number;
  private hPacketIds: number[] = [];

  constructor(private hbaseconnectorsService: HbaseconnectorsService) {
    this.hPacketMap = new Map<number, Subject<any[]>>();
    this.hPacketIds = [];
    // this.hProjectId = 2941; // il project id è recuperato dal file di configurazione della dashboard? o dato in input al costruttore?
    // this.hPacketIds = "2945"; //stessa cosa di quanto detto sopra
  }

  public getPacketDataSubject(hPacketId: number): Subject<any> {
    return this.hPacketMap.has(hPacketId) ? this.hPacketMap.get(hPacketId) : null;
  }

  public resetService(hProjectId: number, hPacketIds: number[]) {
    this.hProjectId = hProjectId;
    this.hPacketIds = hPacketIds;
    hPacketIds.forEach(x => {
      if (!this.hPacketMap.has(x)) {
        this.hPacketMap.set(x, new Subject());
      }
    });
    console.log(this.hPacketMap);
  }

  /**
   * Given a table and its column family and column member,
   * this method retrieves all records between row key lower bound and upper bound.
   * Records are HPacket belonging to a project, in Avro format.
   * Information about HProject id is contained in tableName (i.e. avro_hproject_<projectId>)
   * @param tableName Project table
   * @param columnFamily HBase column family
   * @param hPacketIds HPacket ids
   * @param rowKeyLowerBound Row key lower bound
   * @param rowKeyUpperBound Row key upper bound
   */
  public getHPacketMap(rowKeyLowerBound: number, rowKeyUpperBound: number): void {
    this.hbaseconnectorsService.scanHProject(this.hProjectId, this.hPacketIds.toString(), rowKeyLowerBound, rowKeyUpperBound).subscribe(
      (res: any[]) => {
        console.log(res);
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

}
