import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF, DatePipe, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpService, UserService} from 'bodhala-ui-common';
import {MessagingService} from 'bodhala-ui-common';
import * as highcharts from 'highcharts';
import {RadioButtonModule} from 'primeng/radiobutton';


import { appRouterConfig } from '../../app.routes';
import { UtilService } from 'bodhala-ui-common';
import {CookieService} from 'ngx-cookie-service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuillModule} from 'ngx-quill';
import * as mockServices from '../unit-tests/mock-services';
import { MultiSelectModule } from 'primeng/multiselect';

import { AppComponent } from '../../app.component';
import {UserFiltersModel} from '../models/user-filters';
import {LaunchpadComponent} from '../../launchpad/launchpad.component';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {FiltersService} from '../services/filters.service';
import {TopMattersFirmsService} from '../../launchpad/services/top-matters-firms.service';
import {InsightsComponent} from '../../launchpad/insights/insights.component';
import {FirmComponent} from '../../firm/firm.component';
import {CommonService} from '../services/common.service';
import {BillingTotalsComponent} from '../../firm/billing-totals/billing-totals.component';
import {BillingTotalItemComponent} from '../../firm/billing-totals/billing-total-item/billing-total-item.component';
import {TopMattersComponent} from '../../firm/top-matters/top-matters.component';
import {TopTimekeepersComponent} from '../../firm/top-timekeepers/top-timekeepers.component';
import {SpendByMonthComponent} from '../../firm/spend-by-month/spend-by-month.component';
import {DiversityComponent} from '../../firm/diversity/diversity.component';
import {BodhalaChartLegendComponent} from '../components/bodhala-chart-legend/bodhala-chart-legend.component';
import {ScoreTrendComponent} from '../../firm/score-trend/score-trend.component';
import {AgGridService, BodhalaUiElementsModule} from 'bodhala-ui-elements';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import {ScoreBadgeComponent} from '../../firm/score-trend/score-badge/score-badge.component';
import {LinkComponent} from '../../launchpad/card/cells/link/link.component';
import {UtbmsComponent} from '../../firm/utbms/utbms.component';
import {FirmDropdownComponent} from '../../firm/firm-dropdown/firm-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import {BenchmarksEntryComponent} from '../../benchmarks/benchmarks-entry/benchmarks-entry.component';
import {BenchmarkOverviewComponent} from '../../benchmarks/benchmark-overview/benchmark-overview.component';
import {BenchmarkRowComponent} from '../../benchmarks/benchmark-row/benchmark-row.component';
import {BenchmarksGridComponent} from '../../benchmarks/benchmarks-grid/benchmarks-grid.component';
import {TwoBarsComponent} from '../../benchmarks/two-bars/two-bars.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {BenchmarkFirmDetailComponent} from '../../benchmarks/benchmark-firm-detail/benchmark-firm-detail.component';
import {IeBannerComponent} from '../components/ie-banner/ie-banner.component';
import {ErrorMessagesComponent} from '../components/error-messages/error-messages.component';
import {MattersComponent} from '../../matters/matters.component';
import {AgGridModule} from 'ag-grid-angular';
import {FirmRateCardComponent} from '../../firm/firm-rate-card/firm-rate-card.component';
import {RateCardTablesComponent} from '../../firm/firm-rate-card/rate-card-tables/rate-card-tables.component';
import {PracticeAreaComponent} from '../../practice-area/practice-area.component';
import {PaTopLeadPartnersComponent} from '../../practice-area/pa-top-lead-partners/pa-top-lead-partners.component';
import {PracticeAreaDropdownComponent} from '../../practice-area/practice-area-dropdown/practice-area-dropdown.component';
import {PaTopFirmsComponent} from '../../practice-area/pa-top-firms/pa-top-firms.component';
import {ExecutiveSummaryComponent} from '../../launchpad/executive-summary/executive-summary.component';
import {SavingsCalculatorComponent} from '../../savings-calculator/savings-calculator.component';
import {SavingsWidgetComponent} from '../../savings-calculator/savings-widget/savings-widget.component';
import {ProgressSemiCircleComponent} from '../../savings-calculator/progress-semi-circle/progress-semi-circle.component';
import {OverstaffingGridComponent} from '../../savings-calculator/overstaffing-grid/overstaffing-grid.component';
import {EsTableComponent} from '../../launchpad/executive-summary/es-table/es-table.component';
import {EsTotalItemComponent} from '../../launchpad/executive-summary/spend-overview/es-total-item/es-total-item.component';
import {SpendOverviewComponent} from '../../launchpad/executive-summary/spend-overview/spend-overview.component';
import {TaskCostComponent} from '../../task-cost/task-cost.component';
import {AnnotationsComponent} from '../components/annotations/annotations.component';
import {AnnotaionsModalComponent} from '../components/annotations/annotaions-modal/annotaions-modal.component';
import {AnnotationLabelsComponent} from '../components/annotations/annotation-labels/annotation-labels.component';
import {ReportCardBillingTotalsComponent} from '../../firm/firm-rate-card/report-card-billing-totals/report-card-billing-totals.component';
import {SpendTrendChartComponent} from '../../firm/firm-rate-card/spend-trend-chart/spend-trend-chart.component';
import {SafePipe} from '../pipes/safe.pipe';
import {HelpModalComponent} from '../components/help-modal/help-modal.component';
import {AddEditBenchmarkComponent} from '../../admin/admin-benchmarks/add-edit-benchmark/add-edit-benchmark.component';
import {RouterLinkRendererComponent} from '../components/router-link-renderer/router-link-renderer.component';
import {ClientDropDownComponent} from '../components/client-drop-down/client-drop-down.component';
import {BenchmarkingSetupComponent} from '../../benchmarking-setup/benchmarking-setup.component';
import {EditBenchmarkRateComponent} from '../../admin/admin-benchmarks/edit-benchmark-rate/edit-benchmark-rate.component';
import {ObjectKeysPipe} from '../pipes/object-keys.pipe';
import {RateIncreaseComponent} from '../../admin/rate-increase/rate-increase.component';
import {SavingsFirmGridComponent} from '../../savings-calculator/savings-firm-grid/savings-firm-grid.component';
import {PastSavingsComponent} from '../../savings-calculator/past-savings/past-savings.component';
import {ClientConfigsComponent} from '../../admin/client-configs/client-configs.component';
import {AddEditConfigComponent} from '../../admin/client-configs/add-edit-config/add-edit-config.component';
import {AceEditorModule} from 'ng2-ace-editor';
import {FirmDiscountsComponent} from '../../firm/firm-discounts/firm-discounts.component';
import {CirpMatterSummaryComponent} from '../../matters/cirp-matter-summary/cirp-matter-summary.component';
import {WorkDistributionComponent} from '../../admin/work-distribution/work-distribution.component';
import {WorkDistributionByPaComponent} from '../../admin/work-distribution/work-distribution-by-pa/work-distribution-by-pa.component';
import {LawFirmDuplicatesComponent} from '../../admin/law-firm-duplicates/law-firm-duplicates.component';
import {SubscriptionListComponent} from '../../admin/subscription-list/subscription-list.component';
import {SubscriptionGridComponent} from '../../admin/subscription-list/subscription-grid/subscription-grid.component';
import {CheckboxCellComponent} from '../components/checkbox-cell/checkbox-cell.component';
import {LedesImportsComponent} from '../../admin/ledes-imports/ledes-imports.component';
import {ImportDetailComponent} from '../../admin/ledes-imports/import-detail/import-detail.component';
import {YoyRateIncreaseComponent} from '../../savings-calculator/yoy-rate-increase/yoy-rate-increase.component';
import {YoyDrillByTkComponent} from '../../savings-calculator/yoy-rate-increase/yoy-drill-by-tk/yoy-drill-by-tk.component';
import {QbrExecutiveSummaryComponent} from '../../qbr/qbr-executive-summary/qbr-executive-summary.component';
import {YoyNumberWidgetComponent} from '../../qbr/yoy-number-widget/yoy-number-widget.component';
import {QbrExecutiveSummaryRightComponent} from '../../qbr/qbr-executive-summary/qbr-executive-summary-right/qbr-executive-summary-right.component';
import {QbrDeckComponent} from '../../qbr/qbr-deck/qbr-deck.component';
import {QbrGenericMetricComponent} from '../../qbr/qbr-generic-metric/qbr-generic-metric.component';
import { QbrTopPasComponent } from '../../qbr/qbr-top-pas/qbr-top-pas.component';
import {QbrTotalSpendComponent} from '../../qbr/qbr-total-spend/qbr-total-spend.component';
import {GenericMetricsRightComponent} from '../../qbr/qbr-top-pas/generic-metrics-right/generic-metrics-right.component';
import {QbrTimekeepersComponent} from '../../qbr/qbr-top-pas/qbr-timekeepers/qbr-timekeepers.component';
import {QbrTopPasFirmsComponent} from '../../qbr/qbr-top-pas/qbr-top-pas-firms/qbr-top-pas-firms.component';
import {QbrTopPasMattersComponent} from '../../qbr/qbr-top-pas/qbr-top-pas-matters/qbr-top-pas-matters.component';
import {QbrAgendaComponent} from '../../qbr/qbr-text-pages/qbr-agenda/qbr-agenda.component';
import {QbrDashboardComponent} from '../../qbr/qbr-dashboard/qbr-dashboard.component';
import {QbrCoverComponent} from '../../qbr/qbr-text-pages/qbr-cover/qbr-cover.component';
import {QbrKeyTrendsComponent} from '../../qbr/qbr-text-pages/qbr-key-trends/qbr-key-trends.component';
import {QbrRecommendationComponent} from '../../qbr/qbr-recommendation/qbr-recommendation.component';
import {MoreYouActComponent} from '../../qbr/qbr-text-pages/more-you-act/more-you-act.component';
import {MatterExecutiveSummaryComponent} from '../../matters/matter-executive-summary/matter-executive-summary.component';
import {MatterTitleBarComponent} from '../../matters/matter-executive-summary/matter-title-bar/matter-title-bar.component';
import {MatterTotalPanelComponent} from '../../matters/matter-executive-summary/matter-total-panel/matter-total-panel.component';
import {AdminInsightsComponent} from '../../admin/insights/insights.component';
import {InsightsCardComponent} from '../../admin/insights/insights-card/insights-card.component';
import {BlendedRateCardComponent} from '../../admin/insights/blended-rate-card/blended-rate-card.component';
import {MatterInsightsComponent} from '../../admin/insights/matter-insights/matter-insights.component';
import {MatterTotalSpendComponent} from '../../matters/matter-executive-summary/matter-total-spend/matter-total-spend.component';
import {MatterTotalsMetricsComponent} from '../../matters/matter-executive-summary/matter-totals-metrics/matter-totals-metrics.component';
import {MatterStaffingComponent} from '../../matters/matter-executive-summary/matter-staffing/matter-staffing.component';
import {MatterSummaryCardComponent} from '../../matters/matter-executive-summary/matter-summary-card/matter-summary-card.component';
import {MatterMetricTableComponent} from '../../matters/matter-executive-summary/matter-total-spend/matter-metric-table/matter-metric-table.component';
import {MatterDocumentsComponent} from '../../matters/matter-executive-summary/matter-documents/matter-documents.component';
import {MatterDocumentsOverviewComponent} from '../../matters/matter-executive-summary/matter-documents-overview/matter-documents-overview.component';
import {MatterDocumentModalComponent} from '../../matters/matter-executive-summary/matter-documents-overview/matter-document-modal/matter-document-modal.component';
import {InternalMattersOverlayComponent} from '../../matters/matter-executive-summary/internal-matters-overlay/internal-matters-overlay.component';
import {BenchmarkMattersComponent} from '../../admin/benchmark-matters/benchmark-matters.component';
import {CustomInternalMattersComponent} from '../../matters/matter-executive-summary/custom-internal-matters/custom-internal-matters.component';
import {MatterBenchmarkingLandingComponent} from '../../matters/matter-executive-summary/matter-benchmarking-landing/matter-benchmarking-landing.component';
import {TableHeaderSortComponent} from '../components/table-header-sort/table-header-sort.component';
import {BmTimekeepersTableComponent} from '../../matters/matter-executive-summary/bm-timekeepers-table/bm-timekeepers-table.component';
import {FrcPeerFirmsComponent} from '../../firm/frc-peer-firms/frc-peer-firms.component';
import {FrcKeyMetricsComponent} from '../../firm/frc-peer-firms/frc-key-metrics/frc-key-metrics.component';
import {KeyMetricItemComponent} from '../../firm/frc-peer-firms/key-metric-item/key-metric-item.component';
import {VisibleKeyMetricsComponent} from '../../firm/frc-peer-firms/visible-key-metrics/visible-key-metrics.component';
import {FrcNotesComponent} from '../../firm/frc-peer-firms/frc-notes/frc-notes.component';
import {FrcTablesComponent} from '../../firm/frc-peer-firms/frc-tables/frc-tables.component';
import {FrcFirmComparisonComponent} from '../../firm/frc-peer-firms/frc-firm-comparison/frc-firm-comparison.component';
import {FrcComparisonCellComponent} from '../../firm/frc-peer-firms/frc-firm-comparison/frc-comparison-cell/frc-comparison-cell.component';
import {QaDashboardGridComponent} from '../../admin/qa-dashboard/qa-dashboard-grid/qa-dashboard-grid.component';
import {QaDashboardComponent} from '../../admin/qa-dashboard/qa-dashboard.component';
import {FrcTrendsComponent} from '../../firm/frc-peer-firms/frc-trends/frc-trends.component';
import {FrcTrendsChartComponent} from '../../firm/frc-peer-firms/frc-trends-chart/frc-trends-chart.component';
import {FrcDashboardComponent} from '../../firm/frc-peer-firms/frc-dashboard/frc-dashboard.component';
import {FrcReportTitleComponent} from '../../firm/frc-peer-firms/frc-report-title/frc-report-title.component';
import {FrcComparisonHeaderComponent} from '../../firm/frc-peer-firms/frc-firm-comparison/frc-comparison-header/frc-comparison-header.component';
import {CreateRateBenchmarkComponent} from '../../rates-analysis/create-rate-benchmark/create-rate-benchmark.component';
import {BenchmarkGenericChartComponent} from '../components/benchmark-generic-chart/benchmark-generic-chart.component';



export const IMPORTS = [
  ReactiveFormsModule,
  FormsModule,
  RouterModule.forRoot(appRouterConfig, { useHash: false }),
  RouterTestingModule,
  HttpClientTestingModule,
  MatTableModule,
  MatTooltipModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatSelectModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatChipsModule,
  MatIconModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSlideToggleModule,
  NgIdleKeepaliveModule.forRoot(),
  MatProgressBarModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatStepperModule,
  NgbModule,
  ChartModule.forRoot(highcharts),
  DropdownModule,
  OverlayPanelModule,
  MultiSelectModule,
  AgGridModule.withComponents([ RouterLinkRendererComponent ]),
  QuillModule.forRoot(),
  AceEditorModule,
  RadioButtonModule
];

export const DECLARATIONS = [
  AppComponent,
  LaunchpadComponent,
  InsightsComponent,
  LinkComponent,
  FirmComponent,
  BillingTotalsComponent,
  BillingTotalItemComponent,
  TopMattersComponent,
  TopTimekeepersComponent,
  SpendByMonthComponent,
  DiversityComponent,
  BodhalaChartLegendComponent,
  ScoreTrendComponent,
  ScoreBadgeComponent,
  UtbmsComponent,
  FirmDropdownComponent,
  BenchmarksEntryComponent,
  BenchmarkOverviewComponent,
  BenchmarkRowComponent,
  BenchmarksGridComponent,
  TwoBarsComponent,
  BenchmarkFirmDetailComponent,
  IeBannerComponent,
  ErrorMessagesComponent,
  MattersComponent,
  FirmRateCardComponent,
  RateCardTablesComponent,
  PracticeAreaComponent,
  PaTopLeadPartnersComponent,
  PracticeAreaDropdownComponent,
  PaTopFirmsComponent,
  ExecutiveSummaryComponent,
  EsTableComponent,
  EsTotalItemComponent,
  SpendOverviewComponent,
  SavingsCalculatorComponent,
  SavingsWidgetComponent,
  ProgressSemiCircleComponent,
  OverstaffingGridComponent,
  TaskCostComponent,
  AnnotationsComponent,
  AnnotaionsModalComponent,
  AnnotationLabelsComponent,
  SafePipe,
  ReportCardBillingTotalsComponent,
  SpendTrendChartComponent,
  HelpModalComponent,
  AddEditBenchmarkComponent,
  RouterLinkRendererComponent,
  ClientDropDownComponent,
  BenchmarkingSetupComponent,
  EditBenchmarkRateComponent,
  ObjectKeysPipe,
  RateIncreaseComponent,
  SavingsFirmGridComponent,
  PastSavingsComponent,
  ClientConfigsComponent,
  AddEditConfigComponent,
  FirmDiscountsComponent,
  CirpMatterSummaryComponent,
  WorkDistributionComponent,
  WorkDistributionByPaComponent,
  LawFirmDuplicatesComponent,
  SubscriptionListComponent,
  SubscriptionGridComponent,
  CheckboxCellComponent,
  LedesImportsComponent,
  ImportDetailComponent,
  YoyRateIncreaseComponent,
  YoyDrillByTkComponent,
  QbrExecutiveSummaryComponent,
  YoyNumberWidgetComponent,
  QbrExecutiveSummaryRightComponent,
  QbrDeckComponent,
  QbrGenericMetricComponent,
  QbrTopPasComponent,
  QbrTotalSpendComponent,
  GenericMetricsRightComponent,
  QbrTimekeepersComponent,
  QbrTopPasFirmsComponent,
  QbrTopPasMattersComponent,
  QbrAgendaComponent,
  QbrDashboardComponent,
  QbrCoverComponent,
  QbrKeyTrendsComponent,
  QbrRecommendationComponent,
  MoreYouActComponent,
  MatterExecutiveSummaryComponent,
  MatterTitleBarComponent,
  MatterTotalPanelComponent,
  AdminInsightsComponent,
  InsightsCardComponent,
  BlendedRateCardComponent,
  MatterInsightsComponent,
  MatterTotalSpendComponent,
  MatterTotalsMetricsComponent,
  MatterStaffingComponent,
  MatterSummaryCardComponent,
  MatterMetricTableComponent,
  MatterDocumentsOverviewComponent,
  MatterDocumentsComponent,
  MatterDocumentModalComponent,
  MatterMetricTableComponent,
  InternalMattersOverlayComponent,
  BenchmarkMattersComponent,
  CustomInternalMattersComponent,
  MatterBenchmarkingLandingComponent,
  TableHeaderSortComponent,
  BmTimekeepersTableComponent,
  FrcPeerFirmsComponent,
  FrcKeyMetricsComponent,
  KeyMetricItemComponent,
  VisibleKeyMetricsComponent,
  FrcNotesComponent,
  FrcTablesComponent,
  FrcFirmComparisonComponent,
  FrcComparisonCellComponent,
  BmTimekeepersTableComponent,
  QaDashboardGridComponent,
  QaDashboardComponent,
  FrcTrendsComponent,
  FrcTrendsChartComponent,
  FrcDashboardComponent,
  FrcReportTitleComponent,
  FrcComparisonHeaderComponent,
  CreateRateBenchmarkComponent,
  BenchmarkGenericChartComponent
];

export const PROVIDERS = [
  HttpClient,
  HttpHandler,
  UtilService,
  HttpTestingController,
  CookieService,
  HttpService,
  MessagingService,
  MatNativeDateModule,
  RouterModule,
  UserFiltersModel,
  TopMattersFirmsService,
  DatePipe,
  CommonService,
  AgGridService,
  { provide: FiltersService, useClass: mockServices.FiltersStub },
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  { provide: UserService, useClass: mockServices.UserStub }
];

export const SERVICE_PROVIDERS = [
  [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    CookieService,
    HttpService,
    UserFiltersModel,
    DatePipe,
    { provide: HttpClient, useClass: mockServices.HttpStub },
    { provide: UserService, useClass: mockServices.UserStub }
  ]
];
export const SCHEMAS =  [
  CUSTOM_ELEMENTS_SCHEMA
];
