import {CURRENT_USER} from './mock-data/user';
import {Observable, of, throwError} from 'rxjs';
import {TOP_MATTERS} from './mock-data/top-matters';
import {TOP_FIRMS} from './mock-data/top-firms';
import {MOCK_DIVERSITY_DATA, MOCK_FIRM, MOCK_FIRM_DATA, MOCK_FIRMS, MOCK_TOP_FIRM_SUMMARY, MOCK_PHASE_TAXONOMY, MOCK_UTBMS_CODES} from './mock-data/firm';
import {convertToParamMap} from '@angular/router';
import {MOCK_BILLING_TOTALS, MOCK_BILLING_TOTALS_RC, MOCK_EXECUTIVE_SUMMARY_BILLING_TOTALS} from './mock-data/billing-totals';
import {MOCK_SCORE, MOCK_TRENDS} from './mock-data/score-trend';
import {MOCK_INSIGHTS} from './mock-data/insights';
import {MOCK_BENCHMARKS} from './mock-data/benchmarking';
import {MOCK_OPTIONS_FOR_FILTER} from './mock-data/user-filters';
import {MOCK_MIN_MAX_DATES, MOCK_PRACTICE_AREAS, MOCK_TOP_LPS} from './mock-data/practice-area';
import {SAVINGS_DATA} from './mock-data/savings-calculator';
import {EXECUTIVE_SUMMARY} from './mock-data/execitive-summary';
import {SPEND_BY_UTBMS_CODES} from './mock-data/uybms-codes';
import {MOCK_TASK_COST} from './mock-data/task-cost';
import {MOCK_ANNOTATIONS} from './mock-data/annotations';

export const ngWindow = {
  location: {
    href: ''
  }
};

export class UserStub {
  entitlements: [any];
  config: object;
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
  public setCurrentUserFilters() {}
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
}
export class DataStub {
  public downloadAttachment() {}
  public makePostRequest(url: string, request: any): Observable<any> {
    switch (url) {
      case 'deleteMatter':
        if (request && request.id === 505) {
          return throwError({ errorStatus: 505 });
        }
        return of({});
      case 'getTopMattersAndLeadPartners':
        return of({result: TOP_MATTERS });
      case 'getTopFirms':
        return of({result: TOP_FIRMS });
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
        return of({result: [ MOCK_FIRM ]});
      case 'getBillingTotals':
        return of(MOCK_BILLING_TOTALS);
      case 'getExecutiveSummaryBillingTotals':
        return of(MOCK_EXECUTIVE_SUMMARY_BILLING_TOTALS);
      case 'reportCardBillingTotals':
        return of(MOCK_BILLING_TOTALS_RC);
      case 'spendByMonth':
        return of({result: []});
      case 'getBlockBillingFirms':
        return of({result: []});
      case 'getInvoiceIQReports':
        return of({result: []});
      case 'spendByPracticeAreas':
        return of({result: []});
      case 'getTopLeadPartners':
        return of(MOCK_TOP_LPS);
      case 'getTopMattersAndLeadPartners':
        return of( TOP_MATTERS);
      case 'getTopFirms':
        return of( TOP_FIRMS );
      case 'getMattersByHighestAverageRate':
        return of({result: []});
      case 'getActiveSpend':
        return of({result: { data: []}});
      case 'getClientInsights':
        return of(MOCK_INSIGHTS);
      case 'getBenchmarks':
        return of(MOCK_BENCHMARKS);
      case 'getFirmsListByClient':
        return of(MOCK_FIRMS);
      case 'getPracticeAreasListByClient':
        return of(MOCK_PRACTICE_AREAS);
      case 'getSpendByUtbmsCodes':
        return of (SPEND_BY_UTBMS_CODES);
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
      default:
        return of([]);
    }
    return of({});
  }
  public fetch(url: string, params: any): Observable<any> {
    if (url.indexOf('errorStub') >= 0) {
      return throwError({ errorStatus: 505 });
    }
    return of({});
  }

  public makeFileNetGetRequest(url: string, docParams: any): Observable<any> {
    if (!docParams.applicationId) {
      return throwError({ errorStatus: 505 });
    }
    return of([]);
  }
  // ...
}
export class HttpStub {
  public post(url: string, payload: any, httpOpts?: any): Observable<any> {
    if (!payload) {
      return throwError({ errorStatus: 505 });
    }

    return of([]);
  }

  public get(url: string, params: any): Observable<any> {
    if (url.indexOf('errorStub') >= 0) {
      return throwError({ errorStatus: 505 });
    }
    return of([]);
  }

  public delete(url: string, params: any): Observable<any> {
    if (url.indexOf('errorStub') >= 0) {
      return throwError({ errorStatus: 505 });
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
    return Promise.resolve({result: { data: []}});
  }

  public fetchMattersByHighestAverageRate() {
    return Promise.resolve({ result: { data: [] }});
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
export class ActivatedRouteMock {
  public paramMap = of(convertToParamMap({
    id: '4702',
    anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
    client_matter_type: 'LITIGATION'
  }));
  queryParams = new Observable(observer => {
    const urlParams = {
      year: '2020',
      param2: 'params'
    };
    observer.next(urlParams);
    observer.complete();
  });
}
