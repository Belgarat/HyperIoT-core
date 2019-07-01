import { TestBed } from '@angular/core/testing';

import { DataChannelService } from './data-channel.service';

describe('DataChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataChannelService = TestBed.get(DataChannelService);
    expect(service).toBeTruthy();
  });
});
