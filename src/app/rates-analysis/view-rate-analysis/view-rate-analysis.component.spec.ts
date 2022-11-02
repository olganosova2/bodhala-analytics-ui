import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRateAnalysisComponent } from './view-rate-analysis.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import { RatesAnalysisService } from '../rates-analysis.service';
import { MOCK_RATE_ANALYSIS_RESULT, MOCK_BENCHMARK } from 'src/app/shared/unit-tests/mock-data/rate-benchmarking';
import { rateBenchmarkingChartOptions } from '../rates-analysis.model';



describe('ViewRateAnalysisComponent', () => {
  let component: ViewRateAnalysisComponent;
  let fixture: ComponentFixture<ViewRateAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRateAnalysisComponent ]
    })
    .compileComponents();
  }));


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
    associate_internal_num_firms: 4
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ViewRateAnalysisComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: RatesAnalysisService, useClass: mockServices.RatesAnalysisServiceStub},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRateAnalysisComponent);
    component = fixture.componentInstance;
    component.benchmark = mockBM;
    component.firmId = mockBM.bh_lawfirm_id;
    component.practiceArea = mockBM.smart_practice_area;
    component.year = mockBM.year;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should getColor', () => {
    let result = component.getColor(8);
    expect(result).toEqual('#FF8B4A');
    fixture.detectChanges();

    result = component.getColor(5);
    expect(result).toEqual('#FFC327');
    fixture.detectChanges();

    result = component.getColor(-4);
    expect(result).toEqual('#3EDB73');
  });

  it('should toggleInsight', () => {
    component.toggleInsight(false);
    expect(component.insightExpanded).toEqual(false);
  });

  it('should export', () => {
    component.export();
    expect(component).toBeTruthy();
  });

  it('should goBack', () => {
    component.goBack();
    expect(component).toBeTruthy();
  });

  it('should goToDetail', () => {
    component.benchmark = mockBM;
    component.firmId = mockBM.bh_lawfirm_id;
    component.firmYearData = MOCK_RATE_ANALYSIS_RESULT.result.firm_data;
    component.overallSpendData = MOCK_RATE_ANALYSIS_RESULT.result.overall_spend;
    component.internalYearData = MOCK_RATE_ANALYSIS_RESULT.result.internal_data;
    component.marketAverageData = MOCK_RATE_ANALYSIS_RESULT.result.market_average;
    component.practiceArea = mockBM.smart_practice_area;
    component.year = mockBM.year;
    component.numPartnerTiers = 3;
    component.cluster = 1;
    component.goToDetail();
    expect(component).toBeTruthy();
  });

  xit('should saveInstanceTotal', () => {
    component.overallSpendData = MOCK_RATE_ANALYSIS_RESULT.result.overall_spend;
    component.firmTotalSpend = 1000000;
    const chartInstance = rateBenchmarkingChartOptions;
    component.saveInstanceTotal(chartInstance);
    expect(component).toBeTruthy();
  });

  xit('should saveInstancePATotal', () => {
    component.overallSpendPAData = MOCK_RATE_ANALYSIS_RESULT.result.overall_pa_spend;
    component.firmTotalSpend = 1000000;
    const chartInstance = rateBenchmarkingChartOptions;
    component.saveInstancePATotal(chartInstance);
    expect(component).toBeTruthy();
  });
});
