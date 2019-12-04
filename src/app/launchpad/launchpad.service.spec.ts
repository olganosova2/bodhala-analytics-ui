import {inject, TestBed} from '@angular/core/testing';

import * as mockServices from '../shared/unit-tests/mock-services';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import {LaunchPadService} from './launchpad.service';
import {TopMattersFirmsService} from './services/top-matters-firms.service';
import {SpendByPracticeAreaService} from './services/spend-by-practice-area.service';
import {TopLeadPartnersService} from './services/top-lead-partners.service';
import {FiltersService} from '../shared/services/filters.service';

describe('LaunchPadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: TopMattersFirmsService, useClass: mockServices.MattersAndFirmsServiceStub },
        { provide: SpendByPracticeAreaService, useClass: mockServices.PracticeServiceStub },
        { provide: TopLeadPartnersService, useClass: mockServices.LeadPracticeServiceStub },
        { provide: FiltersService, useClass: mockServices.FiltersStub },
        { provide: HttpService, useClass: mockServices.DataStub }
      ]
    }).compileComponents();
  });

  it('LaunchPadService should be created', () => {
    const service: LaunchPadService = TestBed.get(LaunchPadService);
    expect(service).toBeTruthy();
  });
  it('LaunchPadService should fetch data', inject([LaunchPadService], (service: LaunchPadService) => {
    const result = service.fetchData();
    expect(result.topMatters).toBeTruthy();
  }));
});
