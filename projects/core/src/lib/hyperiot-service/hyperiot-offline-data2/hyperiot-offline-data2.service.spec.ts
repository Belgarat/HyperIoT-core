import { TestBed } from '@angular/core/testing';

import { HyperiotOfflineData2Service } from './hyperiot-offline-data2.service';

describe('HyperiotOfflineData2Service', () => {
  let service: HyperiotOfflineData2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HyperiotOfflineData2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
