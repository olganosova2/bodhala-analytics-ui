import {inject, TestBed} from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS, SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import { InvoiceIqService } from './invoice-iq.service';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {SpendByPracticeAreaService} from './spend-by-practice-area.service';
import {INVOICE_IQ_REPORTS} from '../../shared/unit-tests/mock-data/invoice-iq';
import {IInvoiceIQ} from '../../shared/models/invoiceIq';
import {FiltersService} from '../../shared/services/filters.service';

describe('InvoiceIqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub },
        { provide: FiltersService, useClass: mockServices.FiltersStub }
      ],
      schemas: SCHEMAS
    });
  });

  it('InvoiceIqService should be created', () => {
    const service: InvoiceIqService = TestBed.get(InvoiceIqService);
    expect(service).toBeTruthy();
  });
  it('InvoiceIqService should fetchLeadPartners', inject([InvoiceIqService], (service: InvoiceIqService) => {
    const result = service.fetchIQReports();
    expect(result).toBeTruthy();
  }));

  it('InvoiceIqService should process partners', inject([InvoiceIqService], (service: InvoiceIqService) => {
    const res = INVOICE_IQ_REPORTS.result as unknown as Array<IInvoiceIQ>;
    const processed = service.processIQReports(res);
    expect(processed.length).toBe(2);
    expect(processed[0].name).toBe('My Report');
    expect(processed[0].y).toBe(234571501);
  }));
});
