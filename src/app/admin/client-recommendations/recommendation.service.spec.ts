import {inject, TestBed} from '@angular/core/testing';

import { RecommendationService } from './recommendation.service';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import {HttpService, UserService} from 'bodhala-ui-common';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_BM_RATE, MOCK_BM_ROW} from '../../shared/unit-tests/mock-data/benchmarking';
import {MOCK_RECOMMENDATION_REPORTS, MOCK_RECOMMENDATION_TYPES, MOCK_PA_SETTING, MOCK_RECOMMENDATION_REPORT, MOCK_RECOMMENDATION_DISCOUNT_DATA, MOCK_RECOMMENDATION_STAFFING_DATA,
  MOCK_RECOMMENDATION_BB_DATA, MOCK_RECOMMENDATION_BB_DATA_RESULT, MOCK_RECOMMENDATION_RATE_DATA, MOCK_FIRM_OPTIONS, MOCK_STAFFING_SAVINGS, MOCK_RATE_INCREASE_SAVINGS, MOCK_SHIFT_WORK_RESULT, MOCK_DISCOUNT_SAVINGS, MOCK_BLOCK_BILLING_TOTALS} from '../../shared/unit-tests/mock-data/recommendations';


describe('RecommendationService', () => {
  const recommendation = {
      id: 39,
      report_id: 60,
      type_id: 1,
      bh_lawfirm_id: 62,
      year: 2019,
      practice_area: 'Fraud/Misrepresentation/Larceny',
      is_smart_practice_area: false,
      comment: '<p>asdf</p>',
      discount_type: null,
      recommended_discount_pct_lower_range: 10,
      recommended_discount_pct_upper_range: 15,
      current_discount_pct: 5,
      spend_increase_pct: 0,
      rate_increase_pct: null,
      desired_rate_increase_pct: null,
      previous_firm_ids: [28],
      recommended_firm_ids: [6918],
      desired_partner_pct_of_hours_worked: null,
      desired_associate_pct_of_hours_worked: null,
      desired_paralegal_pct_of_hours_worked: null,
      desired_block_billing_pct: null,
      created_by: '889',
      created_on: '2021-05-20T17:29:05.174875',
      deleted_by: null,
      deleted_on: null,
      modified_by: '889',
      modified_on: '2021-05-20T18:50:32.767239',
      title: null,
      previous_firm_names: ['Quinn Emanuel Urquhart & Sullivan'],
      recommended_firm_names: ['Pugh, Jones & Johnson, P.C.'],
      selected_type: 'Shift Work From Firm(s) to Firm(s)',
      firm_name: 'Test'
  };
  const discountRecommendation =  {
    id: 39,
    report_id: 60,
    type_id: 1,
    bh_lawfirm_id: 62,
    year: 2019,
    practice_area: 'Fraud/Misrepresentation/Larceny',
    is_smart_practice_area: false,
    comment: '<p>asdf</p>',
    discount_type: null,
    recommended_discount_pct_lower_range: 10,
    recommended_discount_pct_upper_range: 15,
    current_discount_pct: 5,
    spend_increase_pct: 0,
    rate_increase_pct: null,
    desired_rate_increase_pct: null,
    previous_firm_ids: [],
    recommended_firm_ids: [],
    desired_partner_pct_of_hours_worked: null,
    desired_associate_pct_of_hours_worked: null,
    desired_paralegal_pct_of_hours_worked: null,
    desired_block_billing_pct: null,
    created_by: '889',
    created_on: '2021-05-20T17:29:05.174875',
    deleted_by: null,
    deleted_on: null,
    modified_by: '889',
    modified_on: '2021-05-20T18:50:32.767239',
    title: null,
    previous_firm_names: [],
    recommended_firm_names: [],
    selected_type: 'Discount',
    firm_name: 'Test'
  };
  const blockBillingRecommendation = {
    id: 42,
    report_id: 60,
    type_id: 4,
    bh_lawfirm_id: 62,
    year: 2019,
    practice_area: 'Fraud/Misrepresentation/Larceny',
    is_smart_practice_area: false,
    comment: '<p>bunch of monay</p><p><br></p>',
    discount_type: null,
    recommended_discount_pct_lower_range: null,
    recommended_discount_pct_upper_range: null,
    current_discount_pct: null,
    spend_increase_pct: null,
    rate_increase_pct: null,
    desired_rate_increase_pct: null,
    previous_firm_ids: [],
    recommended_firm_ids: [],
    desired_partner_pct_of_hours_worked: null,
    desired_associate_pct_of_hours_worked: null,
    desired_paralegal_pct_of_hours_worked: null,
    desired_block_billing_pct: 3,
    created_by: '889',
    created_on: '2021-05-20T17:29:05.195529',
    deleted_by: null,
    deleted_on: null,
    modified_by: '889',
    modified_on: '2021-05-20T18:50:32.778520',
    title: null,
    previous_firm_names: [],
    recommended_firm_names: [],
    selected_type: 'Reduce / Eliminate Block Billing',
    firm_name: 'Test'
  };
  const staffingRecommendation = {
    id: 40,
    report_id: 60,
    type_id: 3,
    bh_lawfirm_id: 62,
    year: 2019,
    practice_area: null,
    is_smart_practice_area: false,
    comment: '<p>some savings possible</p>',
    discount_type: null,
    recommended_discount_pct_lower_range: null,
    recommended_discount_pct_upper_range: null,
    current_discount_pct: null,
    spend_increase_pct: 0,
    rate_increase_pct: null,
    desired_rate_increase_pct: null,
    previous_firm_ids: [],
    recommended_firm_ids: [],
    desired_partner_pct_of_hours_worked: 15,
    desired_associate_pct_of_hours_worked: 50,
    desired_paralegal_pct_of_hours_worked: 35,
    desired_block_billing_pct: null,
    created_by: '889',
    created_on: '2021-05-20T17:29:05.183652',
    deleted_by: null,
    deleted_on: null,
    modified_by: '889',
    modified_on: '2021-05-20T18:50:32.771675',
    title: null,
    previous_firm_names: [],
    recommended_firm_names: [],
    selected_type: 'Modify Staffing Allocation',
    firm_name: 'Test'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [...SERVICE_PROVIDERS,
        { provide: HttpService, useClass: mockServices.DataStub }
      ]
    }).compileComponents();
  });

  it('RecommendationService should be created', () => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    expect(recService).toBeTruthy();
  });
  it('RecommendationService should getRecommendationTypes', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const result = recService.getRecommendationTypes();
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should getOrgPracticeAreaSetting', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const result = recService.getOrgPracticeAreaSetting(190);
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should getFirms', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const result = recService.getFirms(190);
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should getReport', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const result = recService.getReport(60);
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should getDiscountData', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = recommendation;
    const result = recService.getDiscountData(rec, 190, 'Smart Practice Areas');
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should getBlockBillingData', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = recommendation;
    const result = recService.getBlockBillingData(rec, 190, 'Smart Practice Areas');
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should getStaffingData', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = recommendation;
    const result = recService.getStaffingData(rec, 190);
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should getRateIncreaseData', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = recommendation;
    let result = recService.getRateIncreaseData(rec, 190, 'Smart Practice Areas');
    expect(result).toBeTruthy();

    result = recService.getRateIncreaseData(rec, 190, 'Client Practice Areas');
    expect(result).toBeTruthy();

    result = recService.getRateIncreaseData(rec, 190, 'Both');
    expect(result).toBeTruthy();

    rec.practice_area = null;
    result = recService.getRateIncreaseData(rec, 190, 'Both');
    expect(result).toBeTruthy();

  }));
  it('RecommendationService should getFirmsByPracticeArea', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = recommendation;
    const result = recService.getFirmsByPracticeArea(rec, 190, 'Client Practice Areas');
    expect(result).toBeTruthy();
  }));
  it('RecommendationService should calcDiscountSavings', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = discountRecommendation;
    const discData = [{
      total_billed: 3547084.32,
      client_matter_type: 'Fraud/Misrepresentation/Larceny',
      year: 2018
    }];
    const result = recService.calcDiscountSavings(discData, rec);
    expect(result.estimated_spend_with_rec_disc_lower).toEqual(3369730.104);
  }));
  it('RecommendationService should calcStaffingAllocationSavings', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = staffingRecommendation;
    const result = recService.calcStaffingAllocationSavings(MOCK_RECOMMENDATION_STAFFING_DATA, rec, 2019);
    expect(result.estimated_spend_with_old_staffing).toEqual(3670518.95);
  }));
  it('RecommendationService should calcBlockBillingSavings', inject([RecommendationService], (service: RecommendationService) => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    const rec = blockBillingRecommendation;
    const result = recService.calcBlockBillingSavings(MOCK_RECOMMENDATION_BB_DATA_RESULT.result, rec, 2019);
    expect(result.estimated_bb_savings).toEqual(53977.45032);
  }));


  it('should roundNumber RecommendationService', () => {
    const recService: RecommendationService = TestBed.inject(RecommendationService);
    let rounded = recService.roundNumber(7560);
    expect(rounded).toEqual(8000);

    rounded = recService.roundNumber(12500);
    expect(rounded).toEqual(20000);
  });

});
