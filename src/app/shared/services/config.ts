import {environment} from '../../../environments/environment';

export const BASE_URL = environment.apiUrl;
export const IS_LOCAL = false; // (window.location.href.indexOf('localhost:4200') > 0 || window.location.href.indexOf('127.0.0.1:4200')) > 0 ? true : false;
export const HOST = environment.host;

export const END_POINTS_URLS = {
  errorStub: {url: BASE_URL + 'errorStub', showLoading: false},
  getCurrentUser: {url: BASE_URL + 'getCurrentUser', showLoading: false},
  getClientCounts: {url: BASE_URL + 'analytics/getClientCounts', showLoading: true},
  getUserSideBar: {url: BASE_URL + 'user-sidebar.json', showLoading: true},
  getMenuItems: {url: BASE_URL + 'user-sidebar.json', showLoading: false},
  keepAlive: {url: BASE_URL + 'keepalive', showLoading: false},
  getTopMatters: {url: BASE_URL + 'analytics/getTopMatters', showLoading: true},
  getTopMattersForFirm: {url: BASE_URL + 'analytics/getTopMatters', showLoading: false},
  getTopFirms: {url: BASE_URL + 'analytics/getTopFirms', showLoading: true},
  getTopMattersAndLeadPartners: {url: BASE_URL + 'analytics/getTopMattersAndLeadPartners', showLoading: true},
  spendByPracticeAreas: {url: BASE_URL + 'analytics/getTopPracticeAreas', showLoading: true},
  getTopLeadPartners: {url: BASE_URL + 'analytics/getTopLeadPartners', showLoading: true},
  getMattersByHighestAverageRate: {url: `${BASE_URL}analytics/getMattersByHighestAverageRate`, showLoading: true},
  getActiveSpend: {url: BASE_URL + 'analytics/getActiveSpend', showLoading: true},
  getInvoiceIQReports: {url: BASE_URL + 'analytics/getInvoiceIQReportsAndTotals', showLoading: true},
  getBlockBillingFirms: {url: BASE_URL + 'analytics/getBlockBillingFirms', showLoading: true},
  getClientInsights: {url: BASE_URL + 'client/insights', showLoading: true},

  getOptionsForFilter: {url: BASE_URL + 'analytics/getOptionsForFilter?&threshold=4', showLoading: false},
  getOptionsForTag: {url: BASE_URL + 'analytics/matter/tagtype/{id}/options', showLoading: false},
  getFilters: {url: BASE_URL + 'analytics/getFilters', showLoading: true},
  savedViews: {url: BASE_URL + 'analytics/view', showLoading: false},
  deleteView: {url: BASE_URL + 'analytics/view/{id}', showLoading: false},
  oldSavedViews: {url: BASE_URL + 'admin/savedviews', showLoading: false},
  getDateRange: {url: BASE_URL + 'analytics/getMinMaxDates', showLoading: false},

  getFirm: {url: BASE_URL + 'lawFirm/{id}', showLoading: false},
  getBillingTotals: {url: BASE_URL + 'analytics/billingTotals', showLoading: false},
  getTopTimekeepers: {url: BASE_URL + 'analytics/getTopTimekeepers', showLoading: false},
  spendByMonth: {url: BASE_URL + 'analytics/spendByMonth', showLoading: false},
  getFirmographicInfo: {url: BASE_URL + 'analytics/getFirmographicInfo', showLoading: false},
  getDiversityData: {url: BASE_URL + 'analytics/getDiversityData', showLoading: false},
  getFirmScore: {url: BASE_URL + 'analytics/playbook/firm/{id}/scores', showLoading: false},
  getFirmTrends: {url: BASE_URL + 'analytics/playbook/firm/{id}/trends', showLoading: false},
  getSpendByUtbmsCodes: {url: BASE_URL + 'analytics/getSpendByUtbmsCodes', showLoading: false},
  getPhaseTaxonomySpend: {url: BASE_URL + 'analytics/getPhaseTaxonomySpend', showLoading: false},
  // playbook/firm/4377/trends?clientId=110
};

export const ROUTES = [
  {name: 'app.client-dashboard.launchpad', routePath: 'analytics-ui/analytics.html', fragment: '/analytics.html'},
   {name: 'app.client-dashboard.firm-spend', routePath: null, fragment: '/firm/'},
];


export const uiTitleString = 'Bodhala Analytics';
export const EST_TIME_ZONE = 'America/New York';
export const KEEP_ALIVE_SEC = 600000;
export const TOP_RECORDS_NUMBER =  10;

export const MAXIMUM_TEXT_CHARACTERS = 500;

export const confirmDialogConfig = {
  height: '230px',
  width: '300px',
};
export const timeoutDialogConfig = {
  height: '230px',
  width: '500px',
  position: {top: '0'},
  disableClose: true,
  autoFocus: true,
  data: {countdown: environment.IDLE_KEEPALIVE_CONFIG.keepaliveSeconds}
};
export const RfpGridPageSize = 4;
export const RfpGridPageOptions = [2, 4, 6];

export const BODHALA_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};
export const outerAppLinks = {
  viewMatter: '#/app/client-dashboard/matter/',
  viewPracticeArea: '#/app/client-dashboard/practiceArea',
  viewFirm: '/analytics-ui/firm/',
  viewLeadPartner: '#/app/client-dashboard/lead-partner/',
  viewIQReport: '#/app/client-dashboard/textsearch-report?reportId=',
  viewBlockBilling: '#/app/client-dashboard/block-billing'
};

