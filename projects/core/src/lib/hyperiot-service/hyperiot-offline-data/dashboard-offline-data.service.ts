import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HbaseconnectorsService } from '../../hyperiot-client/h-base-connectors-client/api-module';

@Injectable({
  providedIn: 'root'
})
export class DashboardOfflineDataService {

  /**
   * HPackets belonging to a particular HProject, grouped by HPacket ID
   */
  private hPacketMap: Map<number, any[]>;
  private hProjectId: number;
  private hPacketIds: string; //è la lista di pacchetti di cui tenere traccia nella dashboard

  constructor(private hbaseconnectorsService: HbaseconnectorsService) {
    this.hPacketMap = new Map<number, any[]>();
    this.hProjectId = 2941; // il project id è recuperato dal file di configurazione della dashboard? o dato in input al costruttore?
    this.hPacketIds = "2945"; //stessa cosa di quanto detto sopra
  }

  /**
   * Given an HPacket ID, this method returns HPacket instances related to it.
   * @param hPacketId 
   */
  public getHPacketList(hPacketId: number): any[] {
    return this.hPacketMap.has(hPacketId) ? this.hPacketMap.get(hPacketId) : [];
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
  public getHPacketMap(rowKeyLowerBound: number, rowKeyUpperBound: number): Observable<any> {
    return this.hbaseconnectorsService.scanHProject(this.hProjectId, this.hPacketIds, rowKeyLowerBound, rowKeyUpperBound);
  }

}
