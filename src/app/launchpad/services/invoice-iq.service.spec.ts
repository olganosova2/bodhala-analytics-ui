import { TestBed } from '@angular/core/testing';

import { InvoiceIqService } from './invoice-iq.service';

describe('InvoiceIqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceIqService = TestBed.get(InvoiceIqService);
    expect(service).toBeTruthy();
  });
});
