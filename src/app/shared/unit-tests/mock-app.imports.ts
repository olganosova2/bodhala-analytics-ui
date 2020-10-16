import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF, DatePipe, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpService, UserService} from 'bodhala-ui-common';
import {MessagingService} from 'bodhala-ui-common';
import * as highcharts from 'highcharts';


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
import {BodhalaUiElementsModule} from 'bodhala-ui-elements';
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
  AgGridModule.withComponents([]),
  QuillModule.forRoot()
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
  HelpModalComponent
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
