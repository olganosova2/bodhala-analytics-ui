import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF, DatePipe, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpService, UserService} from 'bodhala-ui-common';
import {MessagingService} from 'bodhala-ui-common';


import { appRouterConfig } from '../../app.routes';
import { UtilService } from 'bodhala-ui-common';
import {CookieService} from 'ngx-cookie-service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatAccordion, MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDialogRef, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as mockServices from '../unit-tests/mock-services';

import { AppComponent } from '../../app.component';
import {UserFiltersModel} from '../models/user-filters';
import {LaunchpadComponent} from '../../launchpad/launchpad.component';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {MomentModule} from 'angular2-moment';
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
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';
import borderRadius from 'highcharts-border-radius';
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
import {OverlayPanelModule} from 'primeng';
import {BenchmarkFirmDetailComponent} from '../../benchmarks/benchmark-firm-detail/benchmark-firm-detail.component';
import {IeBannerComponent} from '../components/ie-banner/ie-banner.component';
import {ErrorMessagesComponent} from '../components/error-messages/error-messages.component';
import {MattersComponent} from '../../matters/matters.component';
import {AgGridModule} from 'ag-grid-angular';
import {LeadAttorneyComponent} from '../../lead-attorney/lead-attorney.component';
import {FirmRateCardComponent} from '../../firm/firm-rate-card/firm-rate-card.component';
import {RateCardTablesComponent} from '../../firm/firm-rate-card/rate-card-tables/rate-card-tables.component';
import {PracticeAreaComponent} from '../../practice-area/practice-area.component';
import {PaTopLeadPartnersComponent} from '../../practice-area/pa-top-lead-partners/pa-top-lead-partners.component';
import {PracticeAreaDropdownComponent} from '../../practice-area/practice-area-dropdown/practice-area-dropdown.component';
import {PaTopFirmsComponent} from '../../practice-area/pa-top-firms/pa-top-firms.component';
import {ExecutiveSummaryComponent} from '../../launchpad/executive-summary/executive-summary.component';

export function highchartsFactory() {
  // return highcharts;
  const hc = require('highcharts');
  borderRadius(hc);
  const dd = require('highcharts/modules/exporting');
  hc.setOptions({
    lang: {
      thousandsSep: ','
    }
  });
  dd(hc);

  return hc;
}

export const IMPORTS = [
  ReactiveFormsModule,
  FormsModule,
  RouterModule.forRoot(appRouterConfig, { useHash: false }),
  RouterTestingModule,
  HttpClientTestingModule,
  MatTableModule,
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
  MomentModule,
  NgIdleKeepaliveModule.forRoot(),
  MatProgressBarModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatStepperModule,
  NgbModule,
  ChartModule,
  DropdownModule,
  OverlayPanelModule,
  AgGridModule.withComponents([])
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
  LeadAttorneyComponent,
  FirmRateCardComponent,
  RateCardTablesComponent,
  PracticeAreaComponent,
  PaTopLeadPartnersComponent,
  PracticeAreaDropdownComponent,
  PaTopFirmsComponent,
  ExecutiveSummaryComponent
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
  {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  },
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
