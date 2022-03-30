import {CURRENT_USER} from './mock-data/user';
import {Observable, of, throwError} from 'rxjs';
import {TOP_MATTERS} from './mock-data/top-matters';
import {TOP_FIRMS} from './mock-data/top-firms';
import {MOCK_DIVERSITY_DATA, MOCK_FIRM, MOCK_FIRM_DATA, MOCK_FIRMS, MOCK_TOP_FIRM_SUMMARY, MOCK_PHASE_TAXONOMY, MOCK_UTBMS_CODES, MOCK_SPEND_BY_QUARTER_DATA} from './mock-data/firm';
import {convertToParamMap} from '@angular/router';
import {MOCK_BILLING_TOTALS, MOCK_BILLING_TOTALS_RC, MOCK_EXECUTIVE_SUMMARY_BILLING_TOTALS, MOCK_BILLING_TOTALS_RC_COMP} from './mock-data/billing-totals';
import {MOCK_SCORE, MOCK_TRENDS} from './mock-data/score-trend';
import {MOCK_INSIGHT, MOCK_INSIGHTS} from './mock-data/insights';
import {BM_CHECK_RATES, MOCK_ADMIN_BENCHMARK, MOCK_ADMIN_BMS, MOCK_BENCHMARKS, MOCK_FIRMS_WITH_GROUP_ID, MOCK_PA_AND_ID} from './mock-data/benchmarking';
import {MOCK_OPTIONS_FOR_FILTER} from './mock-data/user-filters';
import {MOCK_MIN_MAX_DATES, MOCK_PRACTICE_AREAS, MOCK_TOP_LPS} from './mock-data/practice-area';
import {MOCK_CLIENT_SAVINGS, SAVINGS_DATA} from './mock-data/savings-calculator';
import {EXECUTIVE_SUMMARY} from './mock-data/execitive-summary';
import {SPEND_BY_UTBMS_CODES} from './mock-data/uybms-codes';
import {MOCK_TASK_COST} from './mock-data/task-cost';
import {MOCK_ANNOTATIONS} from './mock-data/annotations';
import {FRESHDESK_ARTICLE} from './mock-data/freshdesk-article';
import {NgZone} from '@angular/core';
import {MOCK_OVERSTAFFING} from './mock-data/saving-calc-mock';
import {MOCK_SAVINGS_BY_FIRM} from './mock-data/savings-by-firm';
import {MOCK_PAST_SAVINGS} from './mock-data/past-savings';
import {MOCK_CLIENT_CONFIGS, MOCK_CLIENTS_CONFIGS_EXTENDED, MOCK_DISTINCT_NAMES, MOCK_SAMPLE_CONFIGS} from './mock-data/client-configs';
import {MOCK_SMART_PAS} from './mock-data/discounts';
import {MOCK_CIRP_SUMMARY} from './mock-data/cirp-matter-summary';
import {MOCK_RECOMMENDATION_REPORTS, MOCK_RECOMMENDATION_TYPES, MOCK_PA_SETTING, MOCK_RECOMMENDATION_REPORT, MOCK_RECOMMENDATION_DISCOUNT_DATA, MOCK_RECOMMENDATION_STAFFING_DATA,
  MOCK_RECOMMENDATION_BB_DATA, MOCK_RECOMMENDATION_RATE_DATA, MOCK_FIRM_OPTIONS, MOCK_STAFFING_SAVINGS, MOCK_RATE_INCREASE_SAVINGS, MOCK_SHIFT_WORK_RESULT, MOCK_DISCOUNT_SAVINGS, MOCK_BLOCK_BILLING_TOTALS,
  MOCK_RECOMMENDATION_TYPES_RESULT, MOCK_RECOMMENDATION_BB_DATA_RESULT, MOCK_FIRMS_BY_PA, MOCK_PRACTICE_AREAS_BY_FIRM} from './mock-data/recommendations';
import {MOCK_WORK_DISTRIBUTION, MOCK_WORK_DISTRIBUTION_BY_PA} from './mock-data/work-distribution';
import {MOCK_LAW_FIRM_DUPLICATES} from './mock-data/remove-firm-duplicates';
import {MOCK_ADD_SUBSCRIPTION_RESPONSE, MOCK_SUBSCRIPTIONS} from './mock-data/subscriptions';
import {MOCK_LEDES_IMPORTS, MOCK_UPLOAD_DATA, MOCK_CREATE_FIRM_RESULT, MOCK_FIND_FIRM_RESULT, MOCK_LEDES_IMPORT} from './mock-data/ledes-imports';
import {MOCK_YOY_RATE_INCREASE} from './mock-data/yoy-rate-increase';
import {MOCK_QBR_DATA, MOCK_QBR_RECOMMENDATIONS, MOCK_QBRS} from './mock-data/qbr-executive-summary';
import { MOCK_QBR, MOCK_QUARTER_DATES, MOCK_SAVED_QBR_RECOMMENDATIONS } from './mock-data/qbr';
import {MOCK_RATE_BENCHMARKS, MOCK_ADMIN_RATE_BENCHMARKS, MOCK_FIRM_CLUSTER_RES, MOCK_SAVED_BENCHMARK, MOCK_RATE_ANALYSIS_RESULT, MOCK_RATE_BENCHMARK_RESULT, MOCK_BENCHMARK} from './mock-data/rate-benchmarking';
import {MOCK_BM_CONFIG, MOCK_BM_MATTERS, MOCK_FIRMS_FOR_MATTER, MOCK_MARKET_DOCS, MOCK_MATTER_BREAKDOWN_BYNAME, MOCK_MATTER_DOCUMENTS, MOCK_MATTER_ELIGIBILITY, MOCK_MATTER_LIST_BY_CLIENT, MOCK_MATTER_OVERVIEW} from './mock-data/matter-overview';

export const ngWindow = {
  location: {
    href: ''
  }
};

export class UserStub {
  entitlements: [any];
  // config: {};
  config: {'analytics.practice.bodhala.areas': {configs: [{description: 'config for analytics practice areas', value: 'Client Practice Areas', json_config: 'Client Practice Areas'}]}};
  errorMessage: any;
  userId: number = 80;
  currentUser = CURRENT_USER.result.user;

  public load() {
    return of(this.currentUser);
  }

  public hasEntitlement(ent) {
    return true;
  }
}

export class FiltersStub {
  userFilters: {};
  startDate: string = '2019-01-01';  // only for debugging on localhost:4000, on the server it always will be overwritten
  endDate: string = '2019-06-24';

  public setCurrentUserFilters() {
  }

  public getCurrentUserCombinedFilters() {
    return {clientId: 190, startdate: this.startDate, enddate: this.endDate};
  }

  public getCommonFilters() {
    return {clientId: 190, startdate: this.startDate, enddate: this.endDate};
  }

  public parseLSDateString() {
    return {clientId: 190, startdate: this.startDate, enddate: this.endDate};
  }

  public parseLSQueryString() {
    return {clientId: 190, startdate: this.startDate, enddate: this.endDate};
  }
  public getSelectedFilters() {
    return [];
  }
}

export class DataStub {
  public downloadAttachment() {
  }


  public makePostRequest(url: string, request: any): Observable<any> {
    switch (url) {
      case 'deleteMatter':
        if (request && request.id === 505) {
          return throwError({errorStatus: 505});
        }
        return of({});
      case 'getTopMattersAndLeadPartners':
        return of({result: TOP_MATTERS});
      case 'getTopFirms':
        return of({result: TOP_FIRMS});
      case 'getAnnotations':
        return of({result: MOCK_ANNOTATIONS.result[0]});
      case 'saveClientConfig':
        return of({result: {}});
      case 'deleteClientRecommendationReport':
        return of({result: true});
      case 'deleteClientRecommendation':
        return of({result: true});
      case 'publishClientRecommendation':
        return of({result: true, error: null});
      case 'removeLawFirmDupes':
        return of(MOCK_LAW_FIRM_DUPLICATES);
      case 'addSubscription':
        return of(MOCK_ADD_SUBSCRIPTION_RESPONSE);
      case 'createFirm':
        return of(MOCK_CREATE_FIRM_RESULT);
      case 'findFirm':
        return of(MOCK_FIND_FIRM_RESULT);
      case 'reuploadLedes':
        return of({result: true});
      case 'getClientQBRs':
        return of(MOCK_QBRS);
      case 'getClientQBRData':
        return of(MOCK_QBR_DATA);
      case 'saveQBRRecommendation':
        return of({result: true});
      case 'saveQBRNextStep':
        return of({result: MOCK_SAVED_QBR_RECOMMENDATIONS[0]});
      case 'deleteQBR':
        return of({result: MOCK_SAVED_QBR_RECOMMENDATIONS[4]});
      case 'generateClientQBR':
        return of({result: MOCK_QBR});
      case 'getMatterDocsMarketData':
        return of (MOCK_MARKET_DOCS);
      case 'saveRateBenchmark':
        return of (MOCK_SAVED_BENCHMARK);
      default:
        return of([]);
    }
    return of({});
  }

  public makeGetRequest(url: string, request?: any): Observable<any> {
    switch (url) {
      case 'getTopMatters':
        return of(TOP_MATTERS);
      case 'getTopMattersForFirm':
        return of(TOP_MATTERS);
      case 'getCurrentUser':
        return of(CURRENT_USER);
      case 'getFirmTrends':
        return of(MOCK_TRENDS);
      case 'getFirmScore':
        return of(MOCK_SCORE);
      case 'getFirmographicInfo':
        return of({result: MOCK_FIRM_DATA});
      case 'getDiversityData':
        return of({result: MOCK_DIVERSITY_DATA});
      case 'getFirm':
        return of({result: [MOCK_FIRM]});
      case 'getBillingTotals':
        return of(MOCK_BILLING_TOTALS);
      case 'getExecutiveSummaryBillingTotals':
        return of(MOCK_EXECUTIVE_SUMMARY_BILLING_TOTALS);
      case 'reportCardBillingTotals':
        return of(MOCK_BILLING_TOTALS_RC);
      case 'reportCardComparisonBillingTotals':
        return of(MOCK_BILLING_TOTALS_RC_COMP);
      case 'spendByMonth':
        return of({result: []});
      case 'spendByQuarter':
        return of(MOCK_SPEND_BY_QUARTER_DATA);
      case 'getBlockBillingFirms':
        return of({result: []});
      case 'getInvoiceIQReports':
        return of({result: []});
      case 'spendByPracticeAreas':
        return of({result: []});
      case 'getTopLeadPartners':
        return of(MOCK_TOP_LPS);
      case 'getTopMattersAndLeadPartners':
        return of(TOP_MATTERS);
      case 'getTopFirms':
        return of(TOP_FIRMS);
      case 'getMattersByHighestAverageRate':
        return of({result: []});
      case 'getActiveSpend':
        return of({result: {data: []}});
      case 'getClientInsights':
        return of(MOCK_INSIGHTS);
      case 'getBenchmarks':
        return of(MOCK_BENCHMARKS);
      case 'getFirmsListByClient':
        return of(MOCK_FIRMS);
      case 'getPracticeAreasListByClient':
        return of(MOCK_PRACTICE_AREAS);
      case 'getSpendByUtbmsCodes':
        return of(SPEND_BY_UTBMS_CODES);
      case 'getPhaseTaxonomySpend':
        return of(MOCK_PHASE_TAXONOMY);
      case 'getOptionsForFilter':
        return of(MOCK_OPTIONS_FOR_FILTER);
      case 'getFirmTopSummary':
        return of(MOCK_TOP_FIRM_SUMMARY);
      case 'getPracticeArea':
        return of(MOCK_PRACTICE_AREAS);
      case 'getDateRange':
        return of(MOCK_MIN_MAX_DATES);
      case 'getSavingsCalculator':
        return of(SAVINGS_DATA);
      case 'getExecutiveSummaryData':
        return of(EXECUTIVE_SUMMARY);
      case 'getTaskCost':
        return of(MOCK_TASK_COST);
      case 'getAnnotations':
        return of(MOCK_ANNOTATIONS);
      case 'getTrainingMaterialsArticle':
        return of(FRESHDESK_ARTICLE);
      case 'getFirmsWithGroupId':
        return of(MOCK_FIRMS_WITH_GROUP_ID);
      case 'getRatesForCategoryAndLawyer':
        return of(BM_CHECK_RATES);
      case 'getPracticeAreasAndId':
        return of(MOCK_PA_AND_ID);
      case 'getAdminBenchmark':
        return of(MOCK_ADMIN_BENCHMARK);
      case 'getAdminBenchmarks':
        return of(MOCK_ADMIN_BMS);
      case 'getOverstaffing':
        return of(MOCK_OVERSTAFFING);
      case 'getSavingsCalculatorTable':
        return of(MOCK_SAVINGS_BY_FIRM);
      case 'getEffectiveRatesForAllClients':
        return of(MOCK_CLIENT_SAVINGS);
      case 'getPastSavings':
        return of(MOCK_PAST_SAVINGS);
      case 'getClientConfigs':
        return of(MOCK_CLIENT_CONFIGS);
      case 'getAllConfigsExtended':
        return of(MOCK_CLIENTS_CONFIGS_EXTENDED);
      case 'getClientDistinctConfigNames':
        return of(MOCK_DISTINCT_NAMES);
      case 'getConfigByName':
        return of(MOCK_SAMPLE_CONFIGS);
      case 'getDiscountsByClientPAs':
        return of(MOCK_SMART_PAS);
      case 'getCirpMatterSummary':
        return of(MOCK_CIRP_SUMMARY);
      case 'getRecommendationReportsAdmin':
        return of(MOCK_RECOMMENDATION_REPORTS);
      case 'getFirmsByClient':
        return of(MOCK_FIRMS);
      case 'getFirmsListByClient':
        return of(MOCK_FIRMS);
      case 'getRecommendationReportClient':
        return of(MOCK_RECOMMENDATION_REPORT);
      case 'getRecommendationReport':
        return of(MOCK_RECOMMENDATION_REPORT);
      case 'getPracticeAreaListByClientAdmin':
        return of (MOCK_PRACTICE_AREAS);
      case 'getRecommendationTypesClient':
        return of(MOCK_RECOMMENDATION_TYPES_RESULT);
      case 'getRecommendationTypes':
        return of (MOCK_RECOMMENDATION_TYPES_RESULT);
      case 'getAdminFirmStats':
        return of(MOCK_RECOMMENDATION_DISCOUNT_DATA);
      case 'getFirmStatsClient':
        return of(MOCK_RECOMMENDATION_DISCOUNT_DATA);
      case 'getFirmBlockBillingData':
        return of(MOCK_RECOMMENDATION_BB_DATA_RESULT);
      case 'getFirmBlockBillingDataClient':
        return of(MOCK_RECOMMENDATION_BB_DATA_RESULT);
      case 'getFirmRateIncreaseData':
        return of(MOCK_RECOMMENDATION_RATE_DATA);
      case 'getFirmRateIncreaseDataClient':
        return of(MOCK_RECOMMENDATION_RATE_DATA);
      case 'getFirmStaffing':
        return of({result: MOCK_RECOMMENDATION_STAFFING_DATA});
      case 'getFirmStaffingClient':
        return of({result: MOCK_RECOMMENDATION_STAFFING_DATA});
      case 'getOrgPracticeAreaSetting':
        return of(MOCK_PA_SETTING);
      case 'getFirmsByPracticeAreaClient':
        return of(MOCK_FIRMS_BY_PA);
      case 'getPracticeAreasByFirm':
        return of(MOCK_PRACTICE_AREAS_BY_FIRM);
      case 'getFirmsByPracticeArea':
        return of(MOCK_FIRMS_BY_PA);

      case 'getTkWorkDistribution':
        return of(MOCK_WORK_DISTRIBUTION);
      case 'getTkWorkDistributionByPA':
        return of(MOCK_WORK_DISTRIBUTION_BY_PA);
      case 'getSubscriptionsList':
        return of(MOCK_SUBSCRIPTIONS);
      case 'getAutoLEDESImports':
        return of(MOCK_LEDES_IMPORTS);
      case 'getLEDESUpload':
        return of(MOCK_LEDES_IMPORT);
      case 'getRateIncreaseByFirm':
        return of(MOCK_YOY_RATE_INCREASE);
      case 'getClientQBRs':
        return of(MOCK_QBRS);
      case 'getClientQBR':
        return of(MOCK_QBR);
      case 'getClientQBRData':
        return of(MOCK_QBR_DATA);
      case 'getQBRRecommendations':
        return of(MOCK_QBR_RECOMMENDATIONS);
      case 'getMatterExecSummary':
        return of(MOCK_MATTER_OVERVIEW);
      case 'getMatterNERData':
        return of (MOCK_MATTER_DOCUMENTS);
      case 'getMatterDocsMarketData':
        return of (MOCK_MARKET_DOCS);
      case 'getMatterBreakdownByName':
        return of (MOCK_MATTER_BREAKDOWN_BYNAME);
      case 'getMatterDocuments':
        return of (MOCK_MATTER_DOCUMENTS);
      case 'getFirmsForMatter':
        return of (MOCK_FIRMS_FOR_MATTER);
      case 'getRateBenchmarks':
        return of (MOCK_RATE_BENCHMARKS);
      case 'getRateBenchmarksAdmin':
        return of (MOCK_ADMIN_RATE_BENCHMARKS);
      case 'getFirmsByClientCluster':
        return of (MOCK_FIRM_CLUSTER_RES);
      case 'getFirmRateAnalysisIncreaseData':
        return of (MOCK_RATE_ANALYSIS_RESULT);
      case 'getRateBenchmark':
        return of (MOCK_RATE_BENCHMARK_RESULT);
      case 'getMatterInsight':
        return of (MOCK_INSIGHT);
      case 'getMatterListByClient':
        return of (MOCK_MATTER_LIST_BY_CLIENT);
      case 'getBenchmarkMattersConfig':
        return of (MOCK_BM_CONFIG);
      case 'getBenchmarkMatters':
        return of (MOCK_BM_MATTERS);
      case 'checkBenchmarkMatterEligibility':
        return of (MOCK_MATTER_ELIGIBILITY);
      default:
        return of([]);
    }
    return of({});
  }

  public makeDeleteRequest(url: string, request?: any): Observable<any> {
    switch (url) {
      case 'deleteSavedExport':
        return of([]);
      case 'deleteClientConfig':
        return of({ result: {}});
      case 'deleteSubscription':
        return of({ result: {}});
      case 'deleteRateBenchmark':
        return of({ result: true});
      case 'deleteBMCustomInternalMatters':
        return of({ result: true});
      default:
        return of({ result: true});
    }
    return of({});
  }

  public fetch(url: string, params: any): Observable<any> {
    if (url.indexOf('errorStub') >= 0) {
      return throwError({errorStatus: 505});
    }
    return of({});
  }

  public makeFileNetGetRequest(url: string, docParams: any): Observable<any> {
    if (!docParams.applicationId) {
      return throwError({errorStatus: 505});
    }
    return of([]);
  }

  // ...
}

export class HttpStub {
  public post(url: string, payload: any, httpOpts?: any): Observable<any> {
    if (!payload) {
      return throwError({errorStatus: 505});
    }

    return of([]);
  }

  public get(url: string, params: any): Observable<any> {
    if (url.indexOf('errorStub') >= 0) {
      return throwError({errorStatus: 505});
    }
    return of([]);
  }

  public delete(url: string, params: any): Observable<any> {
    if (url.indexOf('errorStub') >= 0) {
      return throwError({errorStatus: 505});
    }
    return of([]);
  }
}

export class MattersAndFirmsServiceStub {
  public fetchMatters() {
    return Promise.resolve({result: []});
  }

  public fetchFirms() {
    return Promise.resolve({result: []});
  }

  public fetchActiveSpend() {
    return Promise.resolve({result: {data: []}});
  }

  public fetchMattersByHighestAverageRate() {
    return Promise.resolve({result: {data: []}});
  }
}

export class PracticeServiceStub {
  public fetch() {
    return Promise.resolve({result: []});
  }
}

export class LeadPracticeServiceStub {
  public fetchLeadPartners() {
    return Promise.resolve({result: []});
  }
}

export class LaunchPadServiceStub {
  public configureCards() {

  }

  public fetchData() {
    return {
      topMatters: Promise.resolve({result: []}),
      topFirms: Promise.resolve({result: []}),
      spendByPractice: Promise.resolve({result: []}),
      topLeadPartners: Promise.resolve({result: []}),
      mattersByHighestAverageRate: Promise.resolve({result: []}),
      activeSpend: Promise.resolve({result: []}),
      topBlockBillers: Promise.resolve({result: []}),
      invoiceIQReports: Promise.resolve({result: []}),
    };
  }
}

export class RecommendationsServicesStub {
  public getRecommendationTypes() {
    return Promise.resolve(MOCK_RECOMMENDATION_TYPES);
  }
  public getOrgPracticeAreaSetting(selectedOrgId: number) {
    return Promise.resolve(MOCK_PA_SETTING);
  }
  public getFirms(selectedClientId: number) {
    return Promise.resolve(MOCK_FIRM_OPTIONS);
  }
  public getReport() {
    return Promise.resolve(MOCK_RECOMMENDATION_REPORT);
  }
  public getDiscountData() {
    return Promise.resolve(MOCK_RECOMMENDATION_DISCOUNT_DATA);
  }
  public getStaffingData() {
    return Promise.resolve(MOCK_RECOMMENDATION_STAFFING_DATA);
  }
  public getRateIncreaseData() {
    return Promise.resolve(MOCK_RATE_INCREASE_SAVINGS);
  }
  public getBlockBillingData() {
    return Promise.resolve(MOCK_RECOMMENDATION_BB_DATA);
  }
  public getFirmsByPracticeArea() {
    return Promise.resolve(MOCK_FIRMS_BY_PA);
  }
  public calcStaffingAllocationSavings() {
    return(MOCK_STAFFING_SAVINGS);
  }
  public calculateRateIncreaseSavingsForFirm() {
    return(MOCK_RATE_INCREASE_SAVINGS);
  }
  public calcDiscountSavings() {
    return(MOCK_DISCOUNT_SAVINGS);
  }
  public calcBlockBillingSavings() {
    return(MOCK_BLOCK_BILLING_TOTALS);
  }
  public getRateIncreaseDataByClient() {
    return (MOCK_RATE_INCREASE_SAVINGS);
  }
  public roundNumber(unroundedNumber: number) {
    if (unroundedNumber !== null && unroundedNumber !== undefined) {
      if (unroundedNumber < 10000) {
        unroundedNumber = Math.ceil(unroundedNumber / 1000) * 1000;
      } else if (unroundedNumber >= 10000) {
        unroundedNumber = Math.ceil(unroundedNumber / 10000) * 10000;
      }
    } else {
      unroundedNumber = 0;
    }

    return unroundedNumber;
  }
}

export class QbrServiceStub {
  public getClientQBRs() {
    return({reports: MOCK_QBRS, firstReport: false, firstStartDate: '2019-03-01'});
  }
  public getClientQBR() {
    return(MOCK_QBR);
  }
  public constructSelectableQuarterDates(startDate) {
    return(MOCK_QUARTER_DATES);
  }
  public formatPayloadDates(date, reportType) {
    return({endDate: '2020-02-29', comparisonStartDate: '2018-03-01', comparisonEndDate: '2019-02-28'});
  }

  public getQBRRecommendations(reportId) {
    return({recommendations: MOCK_QBR_RECOMMENDATIONS.result});
  }

  public saveRecommendation(rec) {
    if (rec.id === null) {
      rec.id = 350;
    }
    return(rec);
  }

  public saveNextStep(rec) {
    if (rec.id === null) {
      rec.id = 350;
    }
    return(rec);
  }

  public calculateStaffingAllocationSavings(rec, data, overallNumbers, expenses) {
    return(rec);
  }

  public calculateDiscountSavings(rec, data, overallNumbers, expenses) {
    return(rec);
  }

  public calculateBlockBillingSavings(rec, data) {
    return(rec);
  }

  public calculateShiftFirmsSavings(rec, topFirmData, secondFirmData) {
    return(rec);
  }
}

export class RatesAnalysisServiceStub {
  public calculateHistoricalCostImpact(firmData, marketData) {
    return({
      blended_rate_lower_diff: 384294.37835892406,
      blended_rate_upper_diff: 508086.76304107625,
      blended_rate_lower_diff_pct: 0.2865519433695809,
      blended_rate_upper_diff_pct: 0.378858649901453,
      cost_impact: 'HIGH',
      blended_within_range: false
    });
  }

  public calculateRateIncreasePctClassification(classificationRateIncreaseData: Array<any>, clientMaxYear: number) {
    return {
      savings: 10000,
      classificationData: [
        {
            title: 'associate',
            avgRateIncrease: 0.028588881355932183,
            totalHours: 14114.8165,
            lastYearRate: 758.5843
        },
        {
            title: 'partner',
            avgRateIncrease: 0.03296267008756117,
            totalHours: 4479.6,
            lastYearRate: 1228.0386
        }
      ],
      rateIncreasePct: 5,
      total: 100000};
  }

  public calculateProjectedCostImpact() {
    return {
      firmProjectedImpact: 1417273.2331419585,
      marketProjectedImpact: 1381942.1148034632
    };
  }

  public getBenchmark() {
    return(MOCK_BENCHMARKS);
  }
}

export class ActivatedRouteMock {
  public paramMap = of(convertToParamMap({
    id: '4702',
    anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
    client_matter_type: 'LITIGATION'
  }));
  queryParams = new Observable(observer => {
    const urlParams = {
      year: '2020',
      param2: 'params',
      id: '11',
      matterId: '087260/818'
    };
    observer.next(urlParams);
    observer.complete();
  });
}
export class CommonServiceStub {
  public getTrainingMaterialsArticle(id: string): void {
    return;
  }
  public openHelpArticle(id: string): void {
    return;
  }
  public capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({result: true})
    };
  }
}

export class MockNgZone extends NgZone {
  // tslint:disable-next-line:ban-types
  run(fn: Function): any {
    return fn();
  }
}

export class LedesImportServiceStub {
  public data = MOCK_UPLOAD_DATA;
}


