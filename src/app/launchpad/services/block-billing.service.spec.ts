import {inject, TestBed} from '@angular/core/testing';
import { BlockBillingService } from './block-billing.service';
import {DECLARATIONS, IMPORTS, SCHEMAS, SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {TOP_BLOCK_BILLING} from '../../shared/unit-tests/mock-data/top-block-billing';
import {IBlockBillingFirms} from '../../shared/models/top-block-billers';
import {FiltersService} from '../../shared/services/filters.service';

describe('BlockBillingService', () => {
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
    }).compileComponents();
  });
  it('should be created', () => {
    const service: BlockBillingService = TestBed.get(BlockBillingService);
    expect(service).toBeTruthy();
  });
  it('BlockBillingService should getBlockBillingFirms', inject([BlockBillingService], (service: BlockBillingService) => {
    const result = service.getBlockBillingFirms();
    expect(result).toBeTruthy();
  }));

  it('BlockBillingService should process partners', inject([BlockBillingService], (service: BlockBillingService) => {
    const pas = TOP_BLOCK_BILLING.result as unknown as Array<IBlockBillingFirms>;
    const processed = service.processBlockBillingFirms(pas);
    expect(processed.length).toBe(2);
    expect(processed[0].name).toBe('William Hickey');
    expect(processed[0].law_firm).toBe('Law Firm 8');
    expect(processed[0].y.toFixed(2)).toBe("46.35");
    expect(processed[1].law_firm).toBe('Law Firm 27');
    expect(processed[1].name).toBe('Johnny Royal');
    expect(processed[1].y.toFixed(2)).toBe("29.60");
  }));
});
