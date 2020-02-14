import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface Value {
  num1: number;
  num2: number;
}

interface HYTDatabase extends DBSchema {
  offlineData: {
    key: number;
    value: Value;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HyperiotIndexeddbService {

  idb: IDBPDatabase<HYTDatabase>;

  openDataBase(): Promise<IDBPDatabase<HYTDatabase>> {
    return openDB<HYTDatabase>('HyperIoTdatabase', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('offlineData')) {
          db.createObjectStore(
            'offlineData',
            { autoIncrement: true }
          );
        }
      }
    }).then(db => {
      this.idb = db;
      return this.idb;
    });
  }

  async openDataBase2(): Promise<IDBPDatabase<HYTDatabase>> {
    return this.idb = await openDB<HYTDatabase>('HyperIoTdatabase', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('offlineData')) {
          db.createObjectStore(
            'offlineData',
            { autoIncrement: true }
          );
        }
      }
    });
  }

}
