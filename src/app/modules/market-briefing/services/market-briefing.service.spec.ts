import { TestBed } from '@angular/core/testing';

import { MarketBriefingService } from './market-briefing.service';

describe('MarketBriefingService', () => {
  let service: MarketBriefingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketBriefingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
