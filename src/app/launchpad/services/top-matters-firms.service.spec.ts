import {inject, TestBed} from '@angular/core/testing';

import { TopMattersFirmsService } from './top-matters-firms.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import {LaunchPadService} from '../launchpad.service';
import {FiltersService} from '../../shared/services/filters.service';
import {TOP_MATTERS} from '../../shared/unit-tests/mock-data/top-matters';
import {ITopMatter} from '../../shared/models/top-matters';
import {TOP_FIRMS} from '../../shared/unit-tests/mock-data/top-firms';
import {ITopFirm} from '../../shared/models/top-firms';
import {ACTIVE_SPEND} from '../../shared/unit-tests/mock-data/active-spend';
import {IActiveSpend} from '../../shared/models/active-spend';

describe('TopMattersFirmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub },
        { provide: FiltersService, useClass: mockServices.FiltersStub }
      ]
    }).compileComponents();
  });

  it('TopMattersFirmsService should be created', () => {
    const service: TopMattersFirmsService = TestBed.get(TopMattersFirmsService);
    expect(service).toBeTruthy();
  });
  it('TopMattersFirmsService should fetchMatters', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const result = service.fetchMatters();
    expect(result).toBeTruthy();
  }));
  it('TopMattersFirmsService should fetchActiveSpend', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const result = service.fetchActiveSpend();
    expect(result).toBeTruthy();
  }));
  it('TopMattersFirmsService should fetchFirms', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const result = service.fetchFirms();
    expect(result).toBeTruthy();
  }));
  it('TopMattersFirmsService should process matters', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const matters = TOP_MATTERS.result as Array<ITopMatter>;
    service.processTopMatters(matters);
    expect(matters.length).toBe(20);
  }));
  it('TopMattersFirmsService should process firms', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const firms = TOP_FIRMS.result as Array<any>;
    service.processTopFirms(firms);
    expect(firms.length).toBe(21);
  }));
  it('TopMattersFirmsService should process Active Spend', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const activeSpend = ACTIVE_SPEND.result as IActiveSpend;
    const result = service.processActiveSpend(activeSpend);
    expect(result.total_expenses).toBe(7339173.74);
  }));
  it('TopMattersFirmsService should process matters with IncludeExpenses = true', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const matters = TOP_MATTERS.result as Array<ITopMatter>;
    service.filters.includeExpenses = true;
    service.processTopMatters(matters);
    expect(matters.length).toBe(20);
  }));
  it('TopMattersFirmsService should process Active Spend with IncludeExpenses = true', inject([TopMattersFirmsService], (service: TopMattersFirmsService) => {
    const activeSpend = ACTIVE_SPEND.result as IActiveSpend;
    service.filters.includeExpenses = true;
    const result = service.processActiveSpend(activeSpend);
    expect(result.total_spend).toBe(51225930.36);
  }));
});
