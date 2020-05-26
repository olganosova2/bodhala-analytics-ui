import { TestBed } from '@angular/core/testing';

import {BenchmarkService, BM_COLORS} from './benchmark.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';
import {RateStatuses} from './model';
import {MOCK_BM_RATE, MOCK_BM_ROW} from '../shared/unit-tests/mock-data/benchmarking';

describe('BenchmarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub }
      ]
    }).compileComponents();
  });
  it('BenchmarkService should be created', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    expect(service).toBeTruthy();
  });
  it('BenchmarkService should mapColorToStatus BM_COLORS.Excellent', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const result = service.mapColorToStatus(BM_COLORS.Excellent);
    expect(result).toBe(RateStatuses.Excellent);
  });
  it('BenchmarkService should mapColorToStatus BM_COLORS.Poor', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const result = service.mapColorToStatus(BM_COLORS.Poor);
    expect(result).toBe(RateStatuses.Poor);
  });
  it('BenchmarkService should mapColorToStatus BM_COLORS.Fair', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const result = service.mapColorToStatus(BM_COLORS.Fair);
    expect(result).toBe(RateStatuses.Fair);
  });
  it('BenchmarkService should cleanUpRate', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const rate = Object.assign({}, MOCK_BM_RATE);
    service.cleanUpRate('junior_associate', rate);
    expect(rate.junior_associate.client_rate).toBe(0);
  });
  it('BenchmarkService should handleMissingRates for junior_associate', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const row = Object.assign({}, MOCK_BM_ROW);
    const rate = Object.assign({}, MOCK_BM_RATE);
    rate.junior_associate.client_rate = 0;
    service.handleMissingRates(row, rate);
    expect(row.nonEmptyAssociate).toBe(0);
  });
  it('BenchmarkService should handleMissingRates for mid_associate', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const row = Object.assign({}, MOCK_BM_ROW);
    const rate = Object.assign({}, MOCK_BM_RATE);
    rate.mid_associate.client_rate = 0;
    service.handleMissingRates(row, rate);
    expect(row.nonEmptyAssociate).toBe(0);
  });
  it('BenchmarkService should handleMissingRates for senior_associate', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const row = Object.assign({}, MOCK_BM_ROW);
    const rate = Object.assign({}, MOCK_BM_RATE);
    rate.senior_associate.client_rate = 0;
    service.handleMissingRates(row, rate);
    expect(row.nonEmptyAssociate).toBe(0);
  });
  it('BenchmarkService should processAssociate when avg_associate_rate=0', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const row = Object.assign({}, MOCK_BM_ROW);
    const rate = Object.assign({}, MOCK_BM_RATE);
    row.nonEmptyAssociate = 0;
    service.processAssociate(row, rate);
    expect(row.nonEmptyAssociate).toBe(0);
  });
  it('BenchmarkService should processPartner when avg_partner_rate=0', () => {
    const service: BenchmarkService = TestBed.get(BenchmarkService);
    const row = Object.assign({}, MOCK_BM_ROW);
    const rate = Object.assign({}, MOCK_BM_RATE);
    row.nonEmptyPartner = 0;
    service.processPartner(row, rate);
    expect(row.nonEmptyPartner).toBe(0);
  });
});
