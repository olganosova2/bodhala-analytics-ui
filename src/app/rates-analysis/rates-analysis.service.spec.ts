import { TestBed } from '@angular/core/testing';

import { RatesAnalysisService } from './rates-analysis.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';
import {MOCK_CLASSIFICATION_DATA, MOCK_FIRM_RATE_INCREASE_CLASS_DATA, MOCK_COHORT_RATE_INCREASE_CLASS_DATA, MOCK_RATE_ANALYSIS_RESULT, MOCK_BENCHMARK} from '../shared/unit-tests/mock-data/rate-benchmarking';

describe('RatesAnalysisService', () => {
  // const service: RatesAnalysisService;

  const mockBM = {
    id: 8,
    bh_client_id: 167,
    bh_lawfirm_id: 25,
    smart_practice_area: ['M&A'],
    year: [2019],
    peers: [
        'Skadden, Arps, Slate, Meagher & Flom',
        'Gibson, Dunn & Crutcher',
        'Sullivan & Cromwell',
        'Ropes & Gray',
        'Proskauer Rose'
    ],
    created_by: '579',
    created_on: '2022-02-04T14:35:39.119916',
    deleted_by: null,
    deleted_on: null,
    modified_by: null,
    modified_on: null,
    market_avg_firms: MOCK_BENCHMARK.benchmark.market_avg_firms,
    internal_firms: MOCK_BENCHMARK.benchmark.internal_firms,
    blended_market_hi: 1000,
    blended_market_lo: 900,
    blended_market_internal: 950,
    blended_market_num_firms: 4,
    blended_internal_num_firms: 4,
    partner_market_lo: 1200,
    partner_market_hi: 1300,
    partner_internal: 1100,
    partner_market_num_firms: 5,
    partner_internal_num_firms: 5,
    associate_market_lo: 800,
    associate_market_hi: 900,
    associate_internal: 850,
    associate_market_num_firms: 4,
    associate_internal_num_firms: 4,
    firm_partner_rate: 1000,
    firm_associate_rate: 900,
    firm_blended_rate: 950,
    firm_total_atty_hours: 100,
    firm_total_atty_billed: 1000000
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpService, useClass: mockServices.DataStub }
      ]
    }).compileComponents();
  });

  it('should be created service', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    expect(service).toBeTruthy();
  });

  it('should calculateRateIncreasePctClassification', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    const result = service.calculateRateIncreasePctClassification(MOCK_RATE_ANALYSIS_RESULT.result.firm_rate_result_classification, MOCK_RATE_ANALYSIS_RESULT.result.max_year, true, true, MOCK_RATE_ANALYSIS_RESULT.result.max_year);
    expect(result.total).toEqual(1341098.4893);
  });

  it('should calculateProjectedCostImpact', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    const firmResult = service.calculateRateIncreasePctClassification(MOCK_RATE_ANALYSIS_RESULT.result.firm_rate_result_classification, MOCK_RATE_ANALYSIS_RESULT.result.max_year, true, true, MOCK_RATE_ANALYSIS_RESULT.result.max_year);
    const cohortResult = service.calculateRateIncreasePctClassification(MOCK_RATE_ANALYSIS_RESULT.result.cohort_rate_result_classification, MOCK_RATE_ANALYSIS_RESULT.result.max_year, false, true, MOCK_RATE_ANALYSIS_RESULT.result.max_year);
    const result = service.calculateProjectedCostImpact(firmResult.classificationData, cohortResult.classificationData);
    expect(result.firmProjectedImpact).toEqual(1417273.2331419585);
  });

  it('should calculateHistoricalCostImpact', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    const firmData = MOCK_RATE_ANALYSIS_RESULT.result.firm_data[0][0];
    const result = service.calculateHistoricalCostImpact(mockBM);
    expect(result.cost_impact).toEqual('HIGH');
  });

  it('should calculateHistoricalCostImpact w/ blended in range', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    const firmData = MOCK_RATE_ANALYSIS_RESULT.result.firm_data[0][0];
    firmData.blended_rate = 700;
    const result = service.calculateHistoricalCostImpact(mockBM);
    expect(result.cost_impact).toEqual('HIGH');
  });

  it('should calculateHistoricalCostImpact w/ blended below range', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    const firmData = MOCK_RATE_ANALYSIS_RESULT.result.firm_data[0][0];
    firmData.blended_rate = 500;
    const result = service.calculateHistoricalCostImpact(mockBM);
    expect(result.cost_impact).toEqual('HIGH');
  });
});
