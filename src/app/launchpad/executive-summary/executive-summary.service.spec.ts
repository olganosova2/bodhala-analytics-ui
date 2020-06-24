import { TestBed } from '@angular/core/testing';

import { ExecutiveSummaryService } from './executive-summary.service';

describe('ExecutiveSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutiveSummaryService = TestBed.get(ExecutiveSummaryService);
    expect(service).toBeTruthy();
  });
});
