import { TestBed } from '@angular/core/testing';

import { DashboardOfflineDataService } from './dashboard-offline-data.service';

describe('DashboardOfflineDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardOfflineDataService = TestBed.get(DashboardOfflineDataService);
    expect(service).toBeTruthy();
  });
});
