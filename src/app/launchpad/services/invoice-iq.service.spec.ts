import { TestBed } from '@angular/core/testing';
import { DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS } from '../../shared/unit-tests/mock-app.imports';
import { InvoiceIqService } from './invoice-iq.service';

describe('InvoiceIqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    });
  });

  it('should be created', () => {
    const service: InvoiceIqService = TestBed.get(InvoiceIqService);
    expect(service).toBeTruthy();
  });
});
