import {environment} from '../../../environments/environment';
import {Input} from '@angular/core';

export const BASE_URL = environment.apiUrl;
export const HOST = environment.host;
export const IS_LOCAL = window.location.host.indexOf('127.0.0.1') >= 0 ? true : false;
export const SAVED_FILTERS_NAME = 'ELEMENTS_dataFilters_';

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
  getExecutiveSummaryBillingTotals: {url: BASE_URL + 'analytics/executiveSummaryBillingTotals', showLoading: false},
  reportCardBillingTotals: {url: BASE_URL + 'analytics/reportCardBillingTotals', showLoading: false},
  getTopTimekeepers: {url: BASE_URL + 'analytics/getTopTimekeepers', showLoading: false},
  spendByMonth: {url: BASE_URL + 'analytics/spendByMonth', showLoading: false},
  getFirmographicInfo: {url: BASE_URL + 'analytics/getFirmographicInfo', showLoading: false},
  getDiversityData: {url: BASE_URL + 'analytics/getDiversityData', showLoading: false},
  getFirmScore: {url: BASE_URL + 'analytics/playbook/firm/{id}/scores', showLoading: false},
  getFirmTrends: {url: BASE_URL + 'analytics/playbook/firm/{id}/trends', showLoading: false},
  getPracticeAreaScore: {url: BASE_URL + 'analytics/playbook/practice-area/{client_matter_type}/scores', showLoading: false},
  getPracticeAreaTrends: {url: BASE_URL + 'analytics/playbook/practice-area/{client_matter_type}/trends', showLoading: false},
  getSpendByUtbmsCodes: {url: BASE_URL + 'analytics/getSpendByUtbmsCodes', showLoading: false},
  getPhaseTaxonomySpend: {url: BASE_URL + 'analytics/getPhaseTaxonomySpend', showLoading: false},
  getFirmsListByClient: {url: BASE_URL + 'analytics/getFirmListByClient', showLoading: false},
  getMinMaxMatterCost: {url: BASE_URL + 'analytics/getMinMaxMatterCost', showLoading: false},
  getExecutiveSummaryData: {url: BASE_URL + 'analytics/getExecutiveSummaryData', showLoading: false},

  getBenchmarks: {url: BASE_URL + 'analytics/getBenchmarks', showLoading: true},
  getLeadAttorneyTable: {url: BASE_URL + 'analytics/getLeadAttorneysTable', showLoading: true},

  getPracticeArea: {url: BASE_URL + 'analytics/getSpendByMatterTypeTable', showLoading: false},
  getPracticeAreasListByClient: {url: BASE_URL + 'analytics/getPracticeAreaListByClient', showLoading: false},
  getFirmTopSummary: {url: BASE_URL + 'analytics/getFirmTopSummary', showLoading: false},
  getTaskCost: {url: BASE_URL + 'analytics/getTaskSpendByColumn', showLoading: false},
  getAnnotations: {url: BASE_URL + 'client/annotations', showLoading: false},
  getSavingsCalculator: {url: BASE_URL + 'analytics/getSavingsCalculator', showLoading: true},
};

export const ROUTES = [
  {name: 'app.client-dashboard.launchpad', routePath: 'analytics-ui/analytics.html', fragment: '/analytics.html'},
  {name: 'app.client-dashboard.firm-spend', routePath: null, fragment: 'analytics-ui/firm/'},
  {name: 'analytics.benchmarks', routePath: 'analytics-ui/benchmarking', fragment: '/benchmarking'},
  {name: 'analytics.savings.calculator', routePath: 'analytics-ui/savings-calculator', fragment: '/savings-calculator'},
  {name: 'app.client-dashboard.practice-area', routePath: null, fragment: 'analytics-ui/practiceArea/'},
  {name: 'app.client-dashboard.task-cost', routePath: 'analytics-ui/task-cost', fragment: '/task-cost'}
  // {name: 'app.client-dashboard.lead-partners', routePath: 'analytics-ui/lead-attorney', fragment: '/lead-attorney'},
];


export const uiTitleString = 'Bodhala Analytics';
export const EST_TIME_ZONE = 'America/New York';
export const KEEP_ALIVE_SEC = 600000;
export const TOP_RECORDS_NUMBER = 10;
export const TOP_RECORDS_NUMBER_ES = 5;

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
  viewPracticeArea: '#/app/client-dashboard/practice-area',
  viewFirm: '/analytics-ui/firm/',
  viewLeadPartner: '#/app/client-dashboard/lead-partner/',
  viewIQReport: '#/app/client-dashboard/textsearch-report?reportId=',
  viewBlockBilling: '#/app/client-dashboard/block-billing',
  viewPracticeAreaDetail: '/analytics-ui/practiceArea/'
};
export const SAVINGS_CALCULATOR_CONFIG = {
  numberOfYears: 1,
  idealNumberOfPplInMeetings: 0.5,
  detailsDialogConfig : {
    height: '80vh',
    width: '80vw',
  }
};
export const UI_ANNOTATIONS_IDS = {
  executiveSummary: 'ExecutiveSummary'
};
export const quillConfig = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],               // custom button values
    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
    [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
    [{ direction: 'rtl' }],                         // text direction

    [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image']                         // link and image, video
  ]
};

