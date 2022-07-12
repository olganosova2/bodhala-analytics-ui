import { TestBed } from '@angular/core/testing';

import { FrcServiceService } from './frc-service.service';

describe('FrsServiceService', () => {
  let service: FrcServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrcServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
