import { TestBed } from '@angular/core/testing';

import { RatesAnalysisService } from './rates-analysis.service';

describe('RatesAnalysisService', () => {
  let service: RatesAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatesAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
