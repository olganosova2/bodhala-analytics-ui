import { TestBed } from '@angular/core/testing';

import { RatesAnalysisService } from './rates-analysis.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';
import {MOCK_CLASSIFICATION_DATA, MOCK_FIRM_RATE_INCREASE_CLASS_DATA, MOCK_COHORT_RATE_INCREASE_CLASS_DATA, MOCK_RATE_ANALYSIS_RESULT} from '../shared/unit-tests/mock-data/rate-benchmarking';

describe('RatesAnalysisService', () => {
  // const service: RatesAnalysisService;

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
    const result = service.calculateHistoricalCostImpact(firmData, MOCK_RATE_ANALYSIS_RESULT.result.market_average[0]);
    expect(result.cost_impact).toEqual('HIGH');
  });

  it('should calculateHistoricalCostImpact w/ blended in range', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    const firmData = MOCK_RATE_ANALYSIS_RESULT.result.firm_data[0][0];
    firmData.blended_rate = 700;
    const result = service.calculateHistoricalCostImpact(firmData, MOCK_RATE_ANALYSIS_RESULT.result.market_average[0]);
    expect(result.cost_impact).toEqual('HIGH');
  });

  it('should calculateHistoricalCostImpact w/ blended below range', () => {
    const service: RatesAnalysisService = TestBed.inject(RatesAnalysisService);
    const firmData = MOCK_RATE_ANALYSIS_RESULT.result.firm_data[0][0];
    firmData.blended_rate = 500;
    const result = service.calculateHistoricalCostImpact(firmData, MOCK_RATE_ANALYSIS_RESULT.result.market_average[0]);
    expect(result.cost_impact).toEqual('POSITIVE');
  });
});
