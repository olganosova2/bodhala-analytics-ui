import { TestBed } from '@angular/core/testing';

import { QbrService } from './qbr.service';

describe('QbrService', () => {
  let service: QbrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QbrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
