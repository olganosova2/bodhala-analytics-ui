import {environment} from '../../../environments/environment';

export const BASE_URL = environment.apiUrl;
export const HOST = environment.host;
export const IS_LOCAL = window.location.host.indexOf('127.0.0.1') >= 0 ? true : false;
export const SAVED_FILTERS_NAME = 'ELEMENTS_dataFilters_';

export const END_POINTS_URLS = {
  // top level common
  errorStub: {url: BASE_URL + 'errorStub', showLoading: false},
  getCurrentUser: {url: BASE_URL + 'getCurrentUser', showLoading: false},
  getClientCounts: {url: BASE_URL + 'analytics/getClientCounts', showLoading: true},
  getUserSideBar: {url: BASE_URL + 'user-sidebar.json', showLoading: true},
  getMenuItems: {url: BASE_URL + 'user-sidebar.json', showLoading: false},
  keepAlive: {url: BASE_URL + 'keepalive', showLoading: false},
  // filters
  getOptionsForFilter: {url: BASE_URL + 'analytics/getOptionsForFilter?&threshold=4', showLoading: false},
  getOptionsForTag: {url: BASE_URL + 'analytics/matter/tagtype/{id}/options', showLoading: false},
  getFilters: {url: BASE_URL + 'analytics/getFilters', showLoading: true},
  savedViews: {url: BASE_URL + 'analytics/view', showLoading: false},
  deleteView: {url: BASE_URL + 'analytics/view/{id}', showLoading: false},
  oldSavedViews: {url: BASE_URL + 'admin/savedviews', showLoading: false},
  getDateRange: {url: BASE_URL + 'analytics/getMinMaxDates', showLoading: false},
  getAnnotations: {url: BASE_URL + 'client/annotations', showLoading: false},
  // launchpad
  getClientInsights: {url: BASE_URL + 'client/insights', showLoading: true},
  getTopMatters: {url: BASE_URL + 'analytics/getTopMatters', showLoading: true},
  getTopMattersForFirm: {url: BASE_URL + 'analytics/getTopMatters', showLoading: false},
  getTopFirms: {url: BASE_URL + 'analytics/getTopFirms', showLoading: true},
  getTopMattersAndLeadPartners: {url: BASE_URL + 'analytics/getTopMattersAndLeadPartners', showLoading: true},
  getTopLeadPartners: {url: BASE_URL + 'analytics/getTopLeadPartners', showLoading: true},
  getMattersByHighestAverageRate: {url: `${BASE_URL}analytics/getMattersByHighestAverageRate`, showLoading: true},
  getActiveSpend: {url: BASE_URL + 'analytics/getActiveSpend', showLoading: true},
  getInvoiceIQReports: {url: BASE_URL + 'analytics/getInvoiceIQReportsAndTotals', showLoading: true},
  getBlockBillingFirms: {url: BASE_URL + 'analytics/getBlockBillingFirms', showLoading: true},


  spendByPracticeAreas: {url: BASE_URL + 'analytics/getTopPracticeAreas', showLoading: true},
  // firm
  getFirm: {url: BASE_URL + 'lawFirm/{id}', showLoading: false},
  getBillingTotals: {url: BASE_URL + 'analytics/billingTotals', showLoading: false},
  reportCardBillingTotals: {url: BASE_URL + 'analytics/reportCardBillingTotals', showLoading: false},
  getTopTimekeepers: {url: BASE_URL + 'analytics/getTopTimekeepers', showLoading: false},
  spendByMonth: {url: BASE_URL + 'analytics/spendByMonth', showLoading: false},
  getFirmographicInfo: {url: BASE_URL + 'analytics/getFirmographicInfo', showLoading: false},
  getDiversityData: {url: BASE_URL + 'analytics/getDiversityData', showLoading: false},
  getFirmScore: {url: BASE_URL + 'analytics/playbook/firm/{id}/scores', showLoading: false},
  getFirmTrends: {url: BASE_URL + 'analytics/playbook/firm/{id}/trends', showLoading: false},
  getSpendByUtbmsCodes: {url: BASE_URL + 'analytics/getSpendByUtbmsCodes', showLoading: false},
  getPhaseTaxonomySpend: {url: BASE_URL + 'analytics/getPhaseTaxonomySpend', showLoading: false},
  getFirmTopSummary: {url: BASE_URL + 'analytics/getFirmTopSummary', showLoading: false},
  getFirmsListByClient: {url: BASE_URL + 'analytics/getFirmListByClient', showLoading: false},
  getMinMaxMatterCost: {url: BASE_URL + 'analytics/getMinMaxMatterCost', showLoading: false},
  saveExport: {url: BASE_URL + 'analytics/saveExport', showLoading: true},
  getSavedExports: {url: BASE_URL + 'analytics/getSavedExports', showLoading: true},
  deleteSavedExport: {url: BASE_URL + 'analytics/deleteSavedExport', showLoading: true},
  reportCardComparisonBillingTotals: {url: BASE_URL + 'analytics/reportCardComparisonBillingTotals', showLoading: true},
  getDiscountsByClientPAs: {url: BASE_URL + 'analytics/getDiscountsByClientPAs', showLoading: true},
  spendByQuarter: {url: BASE_URL + 'analytics/playbook/spendByQuarter', showLoading: true},
  getFirmsWithGroupId: {url: BASE_URL + 'analytics/getFirmsWithGroupId', showLoading: false},
  getDiversityChartData: {url: BASE_URL + 'analytics/getDiversityChartData', showLoading: true},
  // executive summary
  getExecutiveSummaryBillingTotals: {url: BASE_URL + 'analytics/executiveSummaryBillingTotals', showLoading: false},
  getExecutiveSummaryData: {url: BASE_URL + 'analytics/getExecutiveSummaryData', showLoading: false},
  // practice areas
  getPracticeArea: {url: BASE_URL + 'analytics/getSpendByMatterTypeTable', showLoading: false},
  getBodhalaPracticeArea: {url: BASE_URL + 'analytics/getSpendByBodhalaPATable', showLoading: false},
  getPracticeAreasListByClient: {url: BASE_URL + 'analytics/getPracticeAreaListByClient', showLoading: false},
  getPracticeAreaScore: {url: BASE_URL + 'analytics/playbook/practice-area/{client_matter_type}/scores', showLoading: false},
  getPracticeAreaTrends: {url: BASE_URL + 'analytics/playbook/practice-area/{client_matter_type}/trends', showLoading: false},
  getPracticeAreas: {url: BASE_URL + 'client/getPracticeAreas', showLoading: true},
  getPracticeAreasAndId: {url: BASE_URL + 'client/getPracticeAreasAndId', showLoading: true},
  // benchmarks
  getBenchmarks: {url: BASE_URL + 'analytics/getBenchmarks', showLoading: true},
  deleteBenchmark: { url: BASE_URL + 'client/benchmarking/deleteBenchmark/{id}', showLoading: true},
  saveBenchmark: {url: BASE_URL + 'client/benchmarking/saveBenchmark', showLoading: true},
  saveBenchmarkPAs: {url: BASE_URL + 'client/benchmarking/saveBenchmarkPAs', showLoading: true},
  // savings calculator
  getSavingsCalculator: {url: BASE_URL + 'analytics/getSavingsCalculator', showLoading: true},
  getRatesForCategoryAndLawyer:  {url: BASE_URL + 'client/getRatesForCategoryAndLawyer', showLoading: true},
  getOverstaffing: {url: BASE_URL + 'analytics/getOverstaffing', showLoading: true},
  getSavingsCalculatorTable: {url: BASE_URL + 'analytics/getSavingsCalculatorTable', showLoading: false},
  getPastSavings: {url: BASE_URL + 'analytics/getPastSavings', showLoading: true},
  getTrainingMaterialsArticle: {url: BASE_URL + 'public/getTrainingMaterialsArticle', showLoading: false},
  // matter
  getCirpMatterSummary:  {url: BASE_URL + 'analytics/getCirpMatterSummary', showLoading: true},
  // TBD
  getTaskCost: {url: BASE_URL + 'analytics/getTaskSpendByColumn', showLoading: false},
  getLeadAttorneyTable: {url: BASE_URL + 'analytics/getLeadAttorneysTable', showLoading: true},

  // Client Recommendations
  getClientRecommendationReports: {url: BASE_URL + 'analytics/getRecommendationReports', showLoading: true},
  getRecommendationTypesClient: {url: BASE_URL + 'analytics/getRecommendationTypes', showLoading: true},
  getRecommendationReportClient: {url: BASE_URL + 'analytics/getRecommendationReport', showLoading: true},
  getFirmStatsClient: {url: BASE_URL + 'analytics/getFirmStats', showLoading: true},
  getFirmBlockBillingDataClient: {url: BASE_URL + 'analytics/getFirmBlockBillingData', showLoading: true},
  getFirmRateIncreaseDataClient: {url: BASE_URL + 'analytics/getFirmRateIncreaseData', showLoading: true},
  getFirmStaffingClient: {url: BASE_URL + 'analytics/getFirmStaffing', showLoading: true},
  getFirmsByPracticeAreaClient: {url: BASE_URL + 'analytics/getFirmsByPracticeArea', showLoading: true},
  getRateIncreaseByFirm: {url: BASE_URL + 'analytics/getRateIncreaseByFirm', showLoading: false},

  // QBRs
  getClientQBRs: {url: BASE_URL + 'analytics/getClientQBRs', showLoading: true},
  generateClientQBR: {url: BASE_URL + 'analytics/generateClientQBR', showLoading: true},
  getQBRExecutiveSummary: {url: BASE_URL + 'analytics/getQBRExecutiveSummary', showLoading: true},
  getClientQBRData: {url: BASE_URL + 'analytics/getClientQBRData', showLoading: true},
  getQBRRecommendations: {url: BASE_URL + 'analytics/getQBRRecommendations', showLoading: true},
  getClientRateIncreaseData: {url: BASE_URL + 'analytics/getClientRateIncreaseData', showLoading: true},
  saveQBRRecommendation: {url: BASE_URL + 'analytics/saveQBRRecommendation', showLoading: true},
  saveQBRNextStep: {url: BASE_URL + 'analytics/saveQBRNextStep', showLoading: true},
  saveQBRMetrics: {url: BASE_URL + 'analytics/saveQBRMetrics', showLoading: true},
  getClientQBR: {url: BASE_URL + 'analytics/getClientQBR', showLoading: true},
  deleteQBRRecommendation: {url: BASE_URL + 'analytics/deleteQBRRecommendation', showLoading: true},
  finilazeQBR: {url: BASE_URL + 'analytics/finalizeQBR', showLoading: true},
  deleteQBR: {url: BASE_URL + 'analytics/deleteQBR', showLoading: true},


  // RATES ANALYSIS

  getFirmRateAnalysisIncreaseData: {url: BASE_URL + 'analytics/getFirmRateAnalysisIncreaseData', showLoading: true},
  getRateBenchmarks: {url: BASE_URL + 'analytics/getRateBenchmarks', showLoading: true},
  getRateBenchmark: {url: BASE_URL + 'analytics/getRateBenchmark', showLoading: true},
  getAssociateGranularityRateData: {url: BASE_URL + 'analytics/getAssociateGranularityRateData', showLoading: true},
  getPartnerGranularityRateData: {url: BASE_URL + 'analytics/getPartnerGranularityRateData', showLoading: true},
  getBenchmarkInsight: {url: BASE_URL + 'analytics/getBenchmarkInsight', showLoading: true},
  getRateBMNamedTKData: {url: BASE_URL + 'analytics/getRateBMNamedTKData', showLoading: true},
  getGranularityPageData: {url: BASE_URL + 'analytics/getGranularityPageData', showLoading: true},
  getPanelFirmData: {url: BASE_URL + 'analytics/getPanelFirmData', showLoading: true},
  savePanelFirmData: {url: BASE_URL + 'analytics/savePanelFirmData', showLoading: true},

  // Matter Analysis
  getMatterExecSummary: {url: BASE_URL + 'analytics/getMatterExecSummary', showLoading: true},
  getMatterDocuments: {url: BASE_URL + 'analytics/getMatterNERData', showLoading: false},
  getMatterListByClient: {url: BASE_URL + 'analytics/getMatterListByClient', showLoading: true},
  getMatterInsight: {url: BASE_URL + 'client/getMatterInsight', showLoading: false},
  getFirmsForMatter: {url: BASE_URL + 'analytics/getFirmsForMatter', showLoading: false},
  getMatterBreakdownByName: {url: BASE_URL + 'analytics/getMatterBreakdownByName', showLoading: false},
  getMatterDocsMarketData: {url: BASE_URL + 'analytics/getMatterDocsMarketData', showLoading: true},
  getBenchmarkMatters: {url: BASE_URL + 'analytics/getBenchmarkMatters', showLoading: true},
  getBenchmarkMattersConfig: {url: BASE_URL + 'analytics/getBenchmarkMattersConfig', showLoading: true},
  checkBenchmarkMatterEligibility: {url: BASE_URL + 'analytics/checkBenchmarkMatterEligibility', showLoading: true},
  getCustomInternalMatters: {url: BASE_URL + 'analytics/getCustomInternalMatters', showLoading: true},
  saveBMCustomInternalMatters: {url: BASE_URL + 'analytics/saveBMCustomInternalMatters', showLoading: true},
  deleteBMCustomInternalMatters: {url: BASE_URL + 'analytics/deleteBMCustomInternalMatters', showLoading: true},
  getBMEligibleMattersByPA: {url: BASE_URL + 'analytics/getBMEligibleMattersByPA', showLoading: true},
  getClientBMMatters: {url: BASE_URL + 'analytics/getClientBMMatters', showLoading: true},
  getNamedTKforBMMatter: {url: BASE_URL + 'analytics/getNamedTKforBMMatter', showLoading: false},
  getNamedTKforBMDocument: {url: BASE_URL + 'analytics/getNamedTKforBMDocument', showLoading: false},


  // ADMIN
  getAnalyticsClients: {url: BASE_URL + 'adminx/getAnalyticsClients', showLoading: false},
  getAdminBenchmarks: {url: BASE_URL + 'admin/benchmarking/benchmarks'},
  getAdminBenchmark: {url: BASE_URL + 'admin/benchmarking/benchmarks/{id}'},
  getFirmsForBenchmark: {url: BASE_URL + 'getFirmNamesLike', showLoading: false},
  updateBenchmarkPA: {url: BASE_URL + 'admin/benchmarking/saveBenchmarkPAs', showLoading: true},
  getEffectiveRates: {url: BASE_URL + 'admin/getEffectiveRates', showLoading: true},
  getEffectiveRatesForAllClients: {url: BASE_URL + 'admin/getEffectiveRatesForAllClients', showLoading: true},
  getClientConfigs: {url: BASE_URL + 'admin/getClientConfigs', showLoading: true},
  getAllConfigsExtended: {url: BASE_URL + 'admin/getAllConfigsExtended', showLoading: true},
  saveClientConfig: {url: BASE_URL + 'admin/saveClientConfig', showLoading: true},
  deleteClientConfig: {url: BASE_URL + 'admin/deleteClientConfig', showLoading: true},
  getClientDistinctConfigNames: {url: BASE_URL + 'admin/getClientDistinctConfigNames', showLoading: true},
  getConfigByName: {url: BASE_URL + 'admin/getConfigByName', showLoading: true},
  getRecommendationReportsAdmin: {url: BASE_URL + 'admin/getClientRecommendationReports', showLoading: true},
  getRecommendationTypes: {url: BASE_URL + 'admin/getRecommendationTypes', showLoading: true},
  getAnalyticsFirmsByClient: {url: BASE_URL + 'adminx/getAnalyticsFirmsByClient', showLoading: true},
  getFirmsByClient: {url: BASE_URL + 'admin/getFirmsByClient', showLoading: true},
  getPracticeAreaListByClientAdmin: {url: BASE_URL + 'admin/getPracticeAreaListByClient', showLoading: true},
  getAdminFirmStats: {url: BASE_URL + 'admin/getFirmStats', showLoading: true},
  getFirmStaffing: {url: BASE_URL + 'admin/getFirmStaffing', showLoading: true},
  getPracticeAreasByFirm: {url: BASE_URL + 'admin/getPracticeAreasByFirm', showLoading: true},
  getFirmRateIncreaseData: {url: BASE_URL + 'admin/getFirmRateIncreaseData', showLoading: true},
  getFirmsByPracticeArea: {url: BASE_URL + 'admin/getFirmsByPracticeArea', showLoading: true},
  getOrgPracticeAreaSetting: {url: BASE_URL + 'admin/organization/{id}/practiceAreaSettings', showLoading: true},
  getFirmBlockBillingData: {url: BASE_URL + 'admin/getFirmBlockBillingData', showLoading: true},
  getRecommendationReport: {url: BASE_URL + 'admin/getRecommendationReport', showLoading: true},

  saveRecommendationReport: {url: BASE_URL + 'admin/recommendation-report', showLoading: true},
  deleteClientRecommendationReport: {url: BASE_URL + 'admin/deleteRecommendationReport', showLoading: true},
  deleteClientRecommendation: {url: BASE_URL + 'admin/deleteClientRecommendation', showLoading: true},

  getTkWorkDistribution: {url: BASE_URL + 'admin/getTkWorkDistribution', showLoading: true},
  publishRecommendationReport: {url: BASE_URL + 'admin/publishRecommendationReport', showLoading: true},
  getTkWorkDistributionByPA: {url: BASE_URL + 'admin/getTkWorkDistributionByPA', showLoading: true},
  removeLawFirmDupes: {url: BASE_URL + 'admin/removeLawFirmDupes', showLoading: true},
  getSubscriptionsList: {url: BASE_URL + 'admin/getSubscriptionsList', showLoading: true},
  deleteSubscription: { url: BASE_URL + 'admin/entityFeature/{id}', showLoading: false},
  addSubscription: { url: BASE_URL + 'admin/entityFeature', showLoading: false},
  getAutoLEDESImports: { url: BASE_URL + 'admin/getAutoLEDESImports', showLoading: false},
  createFirm: { url: BASE_URL + 'admin/createFirm', showLoading: false},
  reuploadLedes: { url: BASE_URL + 'admin/reuploadLedes', showLoading: false},
  findFirm: { url: BASE_URL + 'admin/findFirm', showLoading: false},
  getLEDESUpload: { url: BASE_URL + 'admin/getLEDESUpload', showLoading: false},
  getRateBenchmarksAdmin: { url: BASE_URL + 'admin/getRateBenchmarks', showLoading: false},
  getFirmsByClientCluster: { url: BASE_URL + 'admin/getFirmsByClientIdAndCluster', showLoading: false},
  deleteRateBenchmark: { url: BASE_URL + 'admin/deleteRateBenchmark', showLoading: false},
  saveRateBenchmark: { url: BASE_URL + 'admin/saveRateBenchmark', showLoading: false},
  getAdminInsights: {url: BASE_URL + 'admin/uploads/insights', showLoading: true},
  getAdminMatterInsight: {url: BASE_URL + 'admin/getMatterInsight', showLoading: true},
  getInsightsSummary: {url: BASE_URL + 'admin/insights/summary', showLoading: false},
  saveClientInsight: {url: BASE_URL + 'admin/uploads/insights', showLoading: true},
  saveBenchmarkMattersConfig: {url: BASE_URL + 'admin/saveBenchmarkMattersConfig', showLoading: true},
  getAdminRateInsight: {url: BASE_URL + 'admin/getAdminRateInsight', showLoading: true},
  getPeerFirmData: {url: BASE_URL + 'admin/getPeerFirmData', showLoading: true},
  saveMarketFirmData: {url: BASE_URL + 'admin/saveMarketFirmData', showLoading: true},
  getQAHealthChecks: {url: BASE_URL + 'admin/getQAHealthChecks', showLoading: true},
};

export const ROUTES = [
  {name: 'app.client-dashboard.launchpad', routePath: 'analytics-ui/analytics.html', fragment: '/analytics.html'},
  {name: 'app.client-dashboard.firm-spend', routePath: null, fragment: '/firm/', refreshNav: true},
  {name: 'analytics.benchmarks', routePath: 'analytics-ui/benchmarking', fragment: '/benchmarking'},
  {name: 'analytics.savings.calculator', routePath: 'analytics-ui/savings-calculator', fragment: '/savings-calculator'},
  {name: 'app.client-dashboard.practice-area', routePath: null, fragment: '/practiceArea', refreshNav: true},
  {name: 'app.benchmarking.list', routePath: 'analytics-ui/admin/benchmarks', fragment: '/benchmarks'},
  {name: 'analytics.benchmarking.setup', routePath: 'analytics-ui/benchmarks-setup', fragment: '/benchmarks-setup'},
  {name: 'app.rate.increase', routePath: 'analytics-ui/admin/rate-increase', fragment: '/rate-increase'},
  {name: 'app.client.configs', routePath: 'analytics-ui/admin/client-configs', fragment: '/client-configs'},
  {name: 'analytics.pastsavings', routePath: 'analytics-ui/past-savings', fragment: '/past-savings'},
  {name: 'app.work.distribution', routePath: 'analytics-ui/admin/work-distribution', fragment: '/work-distribution'},
  {name: 'app.lawfirm.duplicates', routePath: 'analytics-ui/admin/law-firm-duplicates', fragment: '/law-firm-duplicates'},
  {name: 'app.subscription.list', routePath: 'analytics-ui/admin/subscription-list', fragment: '/subscription-list'},
  {name: 'app.client.recommendations', routePath: 'analytics-ui/admin/client-recommendations', fragment: '/client-recommendations'},
  {name: 'app.ledes.imports', routePath: 'analytics-ui/admin/ledes-imports', fragment: '/ledes-imports'},
  {name: 'analytics.qbrs.dashboard', routePath: 'analytics-ui/qbrs/dashboard', fragment: '/qbrs/'},
  {name: 'app.matter.benchmarking', routePath: 'analytics-ui/matter-benchmarking', fragment: '/matter-benchmarking'},
  {name: 'app.uploads-manage-launchpad', routePath: 'analytics-ui/admin/insights', fragment: '/admin/insights'},
  // app.client.recommendations
  // {name: 'app.client-dashboard.task-cost', routePath: 'analytics-ui/task-cost', fragment: '/task-cost'} analytics.pastsavings
  {name: 'matter.benchmarking', routePath: 'analytics-ui/admin/matter-benchmarks', fragment: '/admin/matter-benchmarks'},
  {name: 'app.rates-benchmarking.list', routePath: 'analytics-ui/admin/rate-benchmarks', fragment: '/admin/rate-benchmarks'},
  {name: 'app.yoy.rate.increase', routePath: 'analytics-ui/yoy-rate-increase', fragment: '/yoy-rate-increase'},
  {name: 'app.qa-dashboard', routePath: 'analytics-ui/admin/qa-dashboard', fragment: '/qa-dashboard'},
];


export const uiTitleString = 'Bodhala Analytics';
export const EST_TIME_ZONE = 'America/New York';
export const KEEP_ALIVE_SEC = 600000;
export const TOP_RECORDS_NUMBER = 10;
export const TOP_RECORDS_NUMBER_ES = 5;
export const BM_MATTER_CONFIG_NAME = 'benchmarks.matter.config';
export const BM_MATTER_GENERIC_CONFIG_NAME = 'benchmarks.matter.thresholds';

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
  overstaffingNumber: '3',
  detailsDialogConfig : {
    height: '85vh',
    width: '80vw',
  },
  topFirmsNumber: 10,
  yearsRange: 3,
  defaultPercentAnnualIncrease: 0.03
};
export const HELP_MODAL_CONFIG = {
    height: '100%',
    width: '900px',
  };
export const FRESH_DESK_ARTICLES = {
  BlockBilling: '24000060478',
  Overstaffing: '24000060537',
  RateIncrease: '24000060502',
  EntityConfig: '24000072358'
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
