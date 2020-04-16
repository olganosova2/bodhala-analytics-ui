import {CURRENT_USER} from './mock-data/user';
import {Observable, of, throwError} from 'rxjs';
import {TOP_MATTERS} from './mock-data/top-matters';
import {TOP_FIRMS} from './mock-data/top-firms';
import {MOCK_DIVERSITY_DATA, MOCK_FIRM, MOCK_FIRM_DATA} from './mock-data/firm';
import {convertToParamMap} from '@angular/router';
import {MOCK_BILLING_TOTALS} from './mock-data/billing-totals';

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
        return of(TOP_MATTERS);
      case 'getTopFirms':
        return of(TOP_FIRMS);
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
      case 'getTopLeadPartners':
        return of([]);
      case 'getFirmTrends':
        return of({result: { firm_trends: [], client_trends: [], peer_trends: []}});
      case 'getFirmScore':
        return of({result: { report_cards: [], rank: []}});
      case 'getFirmographicInfo':
        return of({result: MOCK_FIRM_DATA});
      case 'getDiversityData':
        return of({result: MOCK_DIVERSITY_DATA});
      case 'getFirm':
        return of({result: [ MOCK_FIRM ]});
      case 'getBillingTotals':
        return of(MOCK_BILLING_TOTALS);
      case 'spendByMonth':
        return of({result: []});
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
      topMatters: Promise.resolve([]),
      topFirms: Promise.resolve([]),
      spendByPractice: Promise.resolve([]),
      topLeadPartners: Promise.resolve([]),
      mattersByHighestAverageRate: Promise.resolve([]),
      activeSpend: Promise.resolve([]),
      topBlockBillers: Promise.resolve([]),
      invoiceIQReports: Promise.resolve([]),
    };
  }
}
export class ActivatedRouteMock {
  public paramMap = of(convertToParamMap({
    id: '123',
    anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
  }));
}
