import { inject, TestBed } from '@angular/core/testing';

import {QbrService} from './qbr.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '../shared/services/common.service';
import {SERVICE_PROVIDERS} from '../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../shared/unit-tests/mock-services';
import {QbrType} from './qbr-model';
import {BenchmarkService} from '../benchmarks/benchmark.service';
import {MOCK_QUARTER_DATES, MOCK_GENERIC_QBR_RECOMMENDATIONS, MOCK_SAVED_QBR_RECOMMENDATIONS, MOCK_QBR} from '../shared/unit-tests/mock-data/qbr';
import { MOCK_QBR_DATA } from '../shared/unit-tests/mock-data/qbr-executive-summary';
import * as _moment from 'moment';

const moment = _moment;

describe('QbrService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: CommonService, useClass: mockServices.CommonServiceStub },
        { provide: UserService, useClass: mockServices.UserStub },
        { provide: HttpService, useClass: mockServices.DataStub },
        { provide: CommonService, useClass: mockServices.CommonServiceStub }
      ]
    }).compileComponents();
  });
  it('QbrService should be created', () => {
    const service: QbrService = TestBed.inject(QbrService);
    expect(service).toBeTruthy();
  });
  it('QbrService should formatPayloadDates', () => {
    const service: QbrService = TestBed.inject(QbrService);
    const result = service.formatPayloadDates('2020-03-01', QbrType.YoY);
    expect(moment(result.comparisonStartDate).year()).toBe(2019);
  });

  it('QbrService should constructSelectableQuarterDates', inject([QbrService], (service: QbrService) => {
    const qbrService: QbrService = TestBed.inject(QbrService);
    const startDate = '2019-03-01';
    const result = qbrService.constructSelectableQuarterDates(startDate);
    expect(result).toEqual(MOCK_QUARTER_DATES);
  }));

  it('QbrService should formatShortTKLabel', inject([QbrService], (service: QbrService) => {
    const qbrService: QbrService = TestBed.inject(QbrService);
    let tk = 'Partner';
    let result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('PA');
    tk = 'Associate';
    result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('AS');
    tk = 'Paralegal';
    result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('PL');
    tk = 'Other';
    result = qbrService.formatShortTKLabel(tk);
    expect(result).toEqual('Other');
  }));

  it('QbrService should formatQbrType', inject([QbrService], (service: QbrService) => {
    const qbrService: QbrService = TestBed.inject(QbrService);
    let reportType = 'YoY';
    let result = qbrService.formatQbrType(reportType);
    expect(result).toEqual('Annual QBR');
    reportType = 'blahblah';
    result = qbrService.formatQbrType(reportType);
    expect(result).toEqual('Annual QBR');
    reportType = 'QoQAnnual';
    result = qbrService.formatQbrType(reportType);
    expect(result).toEqual('Quarterly Annual QBR');
  }));

  it('QbrService should processGenericRecommendations', inject([QbrService], (service: QbrService) => {
    const result = service.processGenericRecommendations(MOCK_GENERIC_QBR_RECOMMENDATIONS);
    expect(result.length).toEqual(6);
  }));

  it('QbrService should processSavedRecommendations', inject([QbrService], (service: QbrService) => {
    const result = service.processSavedRecommendations(MOCK_SAVED_QBR_RECOMMENDATIONS);
    expect(result.length).toEqual(8);
  }));

  it('QbrService should saveRecommendation', inject([QbrService], (service: QbrService) => {
    const result = service.saveRecommendation(MOCK_GENERIC_QBR_RECOMMENDATIONS[0]);
    expect(result).toBeTruthy();
  }));

  it('QbrService should saveNextStep', inject([QbrService], (service: QbrService) => {
    const result = service.saveNextStep(MOCK_SAVED_QBR_RECOMMENDATIONS[4]);
    expect(result).toBeTruthy();
  }));

  it('QbrService should getClientQBRs', inject([QbrService], (service: QbrService) => {
    const result = service.getClientQBRs();
    expect(result).toBeTruthy();
  }));

  it('QbrService should getClientQBR', inject([QbrService], (service: QbrService) => {
    const result = service.getClientQBR(276);
    expect(result).toBeTruthy();
  }));

  it('QbrService should saveMetrics', inject([QbrService], (service: QbrService) => {
    const form = {
      controls: {
        associate_hourly_cost: {
          value: true
        },
        associate_hours_percent: {
          value: true
        },
        blended_rate: {
          value: false
        },
        block_billing_percent: {
          value: true
        },
        bodhala_price_index: {
          value: false
        },
        partner_hourly_cost: {
          value: true
        },
        partner_hours_percent: {
          value: true
        },
        total_spend: {
          value: true
        },
      }
    };
    const result = service.saveMetrics(MOCK_QBR, form);
    expect(result).toBeTruthy();
  }));

  it('QbrService should deleteQBRRecommendation', inject([QbrService], (service: QbrService) => {
    const result = service.deleteQBRRecommendation(MOCK_SAVED_QBR_RECOMMENDATIONS[4]);
    expect(result).toBeTruthy();
  }));

  it('QbrService should calculateDiscountSavings', inject([QbrService], (service: QbrService) => {
    let result = service.calculateDiscountSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[3], MOCK_QBR_DATA.result.report_timeframe_metrics, false, true);
    expect(result).toBeTruthy();

    result = service.calculateDiscountSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[3], MOCK_QBR_DATA.result.report_timeframe_metrics, true, true);
    expect(result).toBeTruthy();

    result = service.calculateDiscountSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[3], MOCK_QBR_DATA.result.report_timeframe_top_pas[0], false, false);
    expect(result).toBeTruthy();

    result = service.calculateDiscountSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[3], MOCK_QBR_DATA.result.report_timeframe_top_pas[0], true, false);
    expect(result).toBeTruthy();
  }));

  it('QbrService should calculateBlockBillingSavings', inject([QbrService], (service: QbrService) => {
    const rec = {
      id: 355,
      qbr_id: 276,
      recommendation_type_id: 4,
      practice_area: null,
      firm_id: null,
      title: 'Decrease Block Billing',
      subtitle: null,
      opportunity: 'Limiting block billing practices results in more accurate timekeeping and reduces inflationary billing practices.',
      why_it_matters: 'All firms are willing to negotiate discounts based on relationship, practice area or volume and these discounts can be highly impactful for managing legal spend.',
      recommendation: '$10,065,011\nTotal Spend\n12.8%\nTotal Spend Trend',
      section: 'Insights',
      included: true,
      created_on: '2021-11-17T09:24:50.578652',
      deleted_on: null,
      created_by: '447',
      type: 'Decrease Block Billing',
      firm_name: null,
      corresponding_insight_id: null,
      recommended_discount_pct_lower_range: null,
      recommended_discount_pct_upper_range: null,
      current_discount_pct: null,
      spend_increase_pct: null,
      rate_increase_pct: null,
      desired_rate_increase_pct: null,
      previous_firm_ids: null,
      recommended_firm_ids: null,
      desired_partner_pct_of_hours_worked: null,
      desired_associate_pct_of_hours_worked: null,
      desired_paralegal_pct_of_hours_worked: null,
      desired_block_billing_pct: 20,
      potential_savings: null
  };
    const result = service.calculateBlockBillingSavings(rec, MOCK_QBR_DATA.result.report_timeframe_metrics);
    expect(result).toBeTruthy();
  }));

  it('QbrService should calculateStaffingAllocationSavings', inject([QbrService], (service: QbrService) => {
    let result = service.calculateStaffingAllocationSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[2], MOCK_QBR_DATA.result.report_timeframe_metrics, false, true);
    expect(result).toBeTruthy();

    result = service.calculateStaffingAllocationSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[2], MOCK_QBR_DATA.result.report_timeframe_metrics, true, true);
    expect(result).toBeTruthy();

    result = service.calculateStaffingAllocationSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[2], MOCK_QBR_DATA.result.report_timeframe_top_pas[0], false, false);
    expect(result).toBeTruthy();

    result = service.calculateStaffingAllocationSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[2], MOCK_QBR_DATA.result.report_timeframe_top_pas[0], true, false);
    expect(result).toBeTruthy();
  }));

  it('QbrService should calculateShiftFirmsSavings', inject([QbrService], (service: QbrService) => {
    MOCK_QBR_DATA.result.report_timeframe_top_pas[0].firm_id = '1';
    MOCK_QBR_DATA.result.report_timeframe_top_pas[1].firm_id = '2';
    const result = service.calculateShiftFirmsSavings(MOCK_SAVED_QBR_RECOMMENDATIONS[3], MOCK_QBR_DATA.result.report_timeframe_top_pas[0], MOCK_QBR_DATA.result.report_timeframe_top_pas[1]);
    expect(result).toBeTruthy();
  }));

});
