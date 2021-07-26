import { TestBed } from '@angular/core/testing';

import { LedesImportsService } from './ledes-imports.service';

describe('LedesImportsService', () => {
  let service: LedesImportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedesImportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
