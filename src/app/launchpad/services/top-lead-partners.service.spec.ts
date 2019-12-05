import {inject, TestBed} from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS, SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import { TopLeadPartnersService } from './top-lead-partners.service';
import {TOP_LEAD_PARTNERS} from '../../shared/unit-tests/mock-data/top-lead-partners';
import {ITopLeadPartner} from '../../shared/models/top-lead-partner';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('TopLeadPartnersService', () => {
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

  it('should be created', () => {
    const service: TopLeadPartnersService = TestBed.get(TopLeadPartnersService);
    expect(service).toBeTruthy();
  });
  it('TopLeadPartnersService should fetchLeadPartners', inject([TopLeadPartnersService], (service: TopLeadPartnersService) => {
    const result = service.fetchLeadPartners();
    expect(result).toBeTruthy();
  }));

  it('TopLeadPartnersService should process partners', inject([TopLeadPartnersService], (service: TopLeadPartnersService) => {
    const partners = TOP_LEAD_PARTNERS.result as unknown as Array<ITopLeadPartner>;
    const processed = service.processLeadPartners(partners);
    expect(processed.length).toBe(10);
    expect(processed[0].top_matter_id).toBe('201400025');
    expect(processed[0].top_matter_name).toBe('201400025');
    expect(processed[0].y).toBe(2438890);
  }));

});
