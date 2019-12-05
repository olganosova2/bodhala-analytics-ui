import {inject, TestBed} from '@angular/core/testing';

import { FiltersService } from './filters.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../unit-tests/mock-app.imports';
import {UserService} from 'bodhala-ui-common';
import * as mockServices from '../unit-tests/mock-services';
import {FILTERS} from '../unit-tests/mock-data/filters';

describe('FiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub }]
    }).compileComponents();
  });

  it('FiltersService should be created', () => {
    const service: FiltersService = TestBed.get(FiltersService);
    expect(service).toBeTruthy();
  });
  it('should setCurrentUserFilters and check Start Date', inject([FiltersService], (service: FiltersService) => {
    const serializedState = JSON.stringify({start_date: '2019-01-01', end_date: '2019-06-24'});
    localStorage.setItem('savedDates80', serializedState);
    service.setCurrentUserFilters();
    localStorage.removeItem('savedDates80');
    expect(service.startDate).toBe('2019-01-01');
  }));
  it('should setCurrentUserFilters and check Filters', inject([FiltersService], (service: FiltersService) => {
    const serializedState = JSON.stringify(FILTERS);
    localStorage.setItem('filters_397', serializedState);
    service.setCurrentUserFilters();
    localStorage.removeItem('filters_397');
    expect(service.userFilters.linesOfBusiness.length).toBe(2);
  }));
  it('should setCurrentUserFilters and check Exclude Expenses', inject([FiltersService], (service: FiltersService) => {
    const serializedState = JSON.stringify(FILTERS);
    localStorage.setItem('app.client-dashboard.overview_397', serializedState);
    service.setCurrentUserFilters();
    localStorage.removeItem('app.client-dashboard.overview_397');
    expect(service.includeExpenses).toBeFalsy();
  }));
  it('should getCurrentUserCombinedFilters', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    const result = service.getCurrentUserCombinedFilters();
    expect(result.minFirmSize).toBe(10);
  }));
  it('should getCommonFilters', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    const result = service.getCommonFilters();
    expect(result.clientId).toBe(80);
  }));
  it('should getQueryString when excludes', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    service.userFilters.excludeFirms = true;
    service.userFilters.excludeMatters = true;
    service.userFilters.excludePracticeAreas = true;
    service.userFilters.excludeLineOfBusiness = true;
    service.userFilters.excludeOffices = true;
    service.userFilters.excludeClientCounsel = true;
    service.userFilters.excludeGeography = true;
    service.userFilters.excludeFirmType = true;
    service.userFilters.excludeCourtLocations = true;
    service.userFilters.excludeCourtTypes = true;
    service.userFilters.excludeUtbmsCodes = true;
    service.userFilters.excludeOpposingFirms = true;
    service.userFilters.excludeGenericFilter1 = true;
    service.userFilters.excludeGenericFilter2 = true;
    service.userFilters.excludeGenericFilter3 = true;
    service.userFilters.excludeGenericFilter4 = true;
    service.userFilters.excludeGenericFilter5 = true;
    service.userFilters.excludeGenericFilter6 = true;
    service.userFilters.excludeGenericFilter7 = true;
    service.userFilters.excludeGenericFilter8 = true;
    service.userFilters.excludeGenericFilter9 = true;
    service.userFilters.excludeGenericFilter10 = true;
    service.userFilters.excludeGenericFilter11 = true;
    service.userFilters.excludeGenericFilter12 = true;
    const result = service.getQueryString();
    expect(result.excludeMatterIds.length).toBe(15);
  }));
  it('should getQueryString when NOT excludes and dayOfMatter', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    service.userFilters.excludeFirms = false;
    service.userFilters.excludeMatters = false;
    service.userFilters.excludePracticeAreas = false;
    service.userFilters.excludeLineOfBusiness = false;
    service.userFilters.excludeOffices = false;
    service.userFilters.excludeClientCounsel = false;
    service.userFilters.excludeGeography = false;
    service.userFilters.excludeFirmType = false;
    service.userFilters.excludeCourtLocations = false;
    service.userFilters.excludeCourtTypes = false;
    service.userFilters.excludeUtbmsCodes = false;
    service.userFilters.excludeOpposingFirms = false;
    service.userFilters.excludeGenericFilter1 = false;
    service.userFilters.excludeGenericFilter2 = false;
    service.userFilters.excludeGenericFilter3 = false;
    service.userFilters.excludeGenericFilter4 = false;
    service.userFilters.excludeGenericFilter5 = false;
    service.userFilters.excludeGenericFilter6 = false;
    service.userFilters.excludeGenericFilter7 = false;
    service.userFilters.excludeGenericFilter8 = false;
    service.userFilters.excludeGenericFilter9 = false;
    service.userFilters.excludeGenericFilter10 = false;
    service.userFilters.excludeGenericFilter11 = false;
    service.userFilters.excludeGenericFilter12 = false;
    service.userFilters.dayOfMatterRange = 'Last';
    const result = service.getQueryString();
    expect(result.firms.length).toBe(12);
  }));
  it('should getQueryString when dayOfMatter is Between', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    service.userFilters.dayOfMatter.start = '2019-01-01';
    service.userFilters.dayOfMatter.end = '2019-08-01';
    service.userFilters.dayOfMatterRange = 'Between';
    const result = service.getQueryString();
    expect(result.dayOfMatter1).toBe('2019-01-01');
  }));
  it('should getQueryString when dayOfMatter is First', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    service.userFilters.dayOfMatter.start = '2019-01-01';
    service.userFilters.dayOfMatter.end = '2019-08-01';
    service.userFilters.dayOfMatterRange = 'First';
    const result = service.getQueryString();
    expect(result.dayOfMatter1).toBe('2019-01-01');
  }));
  it('should getQueryString when dayOfMatter is Last', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    service.userFilters.dayOfMatter.start = '2019-01-01';
    service.userFilters.dayOfMatter.end = '2019-08-01';
    service.userFilters.dayOfMatterRange = 'Last';
    const result = service.getQueryString();
    expect(result.dayOfMatter1).toBe('2019-01-01');
  }));
  it('should getQueryString when minFirmSize is 10', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    const result = service.getQueryString();
    expect(result.minFirmSize).toBe(10);
  }));
  it('should getQueryString when court_states not empty', inject([FiltersService], (service: FiltersService) => {
    service.userFilters = Object.assign({}, FILTERS.dataFilters as any );
    service.userFilters.courtLocations = ['1, ', '2, '];
    const result = service.getQueryString();
    expect(service.userFilters.courtLocations.length).toBe(2);
  }));
});
