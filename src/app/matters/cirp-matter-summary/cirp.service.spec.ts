import { TestBed } from '@angular/core/testing';

import { CirpService } from './cirp.service';

describe('CirpService', () => {
  let service: CirpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CirpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
