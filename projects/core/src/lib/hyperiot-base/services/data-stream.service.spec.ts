import { TestBed } from '@angular/core/testing';

import { DataStreamService } from './data-stream.service';

describe('DataStreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStreamService = TestBed.get(DataStreamService);
    expect(service).toBeTruthy();
  });
});
