import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {
  MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule,
  MatSlideToggleModule, MatSortModule, MatTableModule, MatButtonToggleModule, MatTabsModule, MatSliderModule
} from '@angular/material';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {MomentModule} from 'angular2-moment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BodhalaUiCommonModule, HttpService, UserService} from 'bodhala-ui-common';
import {BodhalaUiElementsModule} from 'bodhala-ui-elements';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import borderRadius from 'highcharts-border-radius';
import { ChartModule } from 'angular2-highcharts';
import { DropdownModule } from 'primeng/dropdown';
import * as CONFIG from './shared/services/config';
import { LaunchpadComponent } from './launchpad/launchpad.component';
import {RouterModule} from '@angular/router';
import {appRouterConfig} from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SliderModule} from 'primeng/slider';
import {FiltersService} from './shared/services/filters.service';
import {UserFiltersModel} from './shared/models/user-filters';
import { CardComponent } from './launchpad/card/card.component';
import { PillComponent } from './launchpad/card/cells/pill/pill.component';
import { CellComponent } from './launchpad/card/cells/cell.component';
import { LinkComponent } from './launchpad/card/cells/link/link.component';
import {TopMattersFirmsService} from './launchpad/services/top-matters-firms.service';
import { ActiveSpendComponent } from './launchpad/card/active-spend/active-spend.component';
import {DatePipe} from '@angular/common';
import { InsightsComponent } from './launchpad/insights/insights.component';
import { FirmComponent } from './firm/firm.component';
import { BillingTotalsComponent } from './firm/billing-totals/billing-totals.component';
import { BillingTotalItemComponent } from './firm/billing-totals/billing-total-item/billing-total-item.component';
import { TopTimekeepersComponent } from './firm/top-timekeepers/top-timekeepers.component';
import { TopMattersComponent } from './firm/top-matters/top-matters.component';
import { SpendByMonthComponent } from './firm/spend-by-month/spend-by-month.component';
import { DiversityComponent } from './firm/diversity/diversity.component';
import { BodhalaChartLegendComponent } from './shared/components/bodhala-chart-legend/bodhala-chart-legend.component';
import { ScoreTrendComponent } from './firm/score-trend/score-trend.component';
import { UtbmsComponent } from './firm/utbms/utbms.component';
import { ScoreBadgeComponent } from './firm/score-trend/score-badge/score-badge.component';
import { FirmDropdownComponent } from './firm/firm-dropdown/firm-dropdown.component';
import { BenchmarksEntryComponent } from './benchmarks/benchmarks-entry/benchmarks-entry.component';
import { BenchmarkOverviewComponent } from './benchmarks/benchmark-overview/benchmark-overview.component';
import { BenchmarkRowComponent } from './benchmarks/benchmark-row/benchmark-row.component';
import { BenchmarksGridComponent } from './benchmarks/benchmarks-grid/benchmarks-grid.component';
import { TwoBarsComponent } from './benchmarks/two-bars/two-bars.component';
import {OverlayPanelModule} from 'primeng';
import { BenchmarkFirmDetailComponent } from './benchmarks/benchmark-firm-detail/benchmark-firm-detail.component';
import { IeBannerComponent } from './shared/components/ie-banner/ie-banner.component';
import { ErrorMessagesComponent } from './shared/components/error-messages/error-messages.component';
import { MattersComponent } from './matters/matters.component';
import { PracticeAreaComponent } from './practice-area/practice-area.component';
import { PracticeAreaDropdownComponent } from './practice-area/practice-area-dropdown/practice-area-dropdown.component';
import { PaTopFirmsComponent } from './practice-area/pa-top-firms/pa-top-firms.component';
import { PaTopLeadPartnersComponent } from './practice-area/pa-top-lead-partners/pa-top-lead-partners.component';
import { FirmRateCardComponent } from './firm/firm-rate-card/firm-rate-card.component';
import { ExecutiveSummaryComponent } from './launchpad/executive-summary/executive-summary.component';
import { SpendOverviewComponent } from './launchpad/executive-summary/spend-overview/spend-overview.component';
import { EsTotalItemComponent } from './launchpad/executive-summary/spend-overview/es-total-item/es-total-item.component';
import { RateCardTablesComponent } from './firm/firm-rate-card/rate-card-tables/rate-card-tables.component';
import { EsTableComponent } from './launchpad/executive-summary/es-table/es-table.component';
import { SavingsCalculatorComponent } from './savings-calculator/savings-calculator.component';
import { SavingsWidgetComponent } from './savings-calculator/savings-widget/savings-widget.component';
import { ProgressSemiCircleComponent } from './savings-calculator/progress-semi-circle/progress-semi-circle.component';
import { OverstaffingGridComponent } from './savings-calculator/overstaffing-grid/overstaffing-grid.component';


export function initUser(config: UserService) {
  return () => config.load();
}
export function initHttp(service: HttpService) {
  return () => service.loadConfig(CONFIG);
}
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
@NgModule({
  declarations: [
    AppComponent,
    LaunchpadComponent,
    CardComponent,
    PillComponent,
    CellComponent,
    LinkComponent,
    ActiveSpendComponent,
    InsightsComponent,
    FirmComponent,
    BillingTotalsComponent,
    BillingTotalItemComponent,
    TopTimekeepersComponent,
    TopMattersComponent,
    SpendByMonthComponent,
    DiversityComponent,
    BodhalaChartLegendComponent,
    ScoreTrendComponent,
    UtbmsComponent,
    ScoreBadgeComponent,
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
    PracticeAreaComponent,
    PracticeAreaDropdownComponent,
    PaTopFirmsComponent,
    PaTopLeadPartnersComponent,
    FirmRateCardComponent,
    ExecutiveSummaryComponent,
    SpendOverviewComponent,
    EsTotalItemComponent,
    RateCardTablesComponent,
    EsTableComponent,
    SavingsCalculatorComponent,
    SavingsWidgetComponent,
    ProgressSemiCircleComponent,
    OverstaffingGridComponent,
  ],
  entryComponents: [
    PillComponent,
    LinkComponent,
    OverstaffingGridComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRouterConfig),
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
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
    MatExpansionModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSliderModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    MatBadgeModule,
    MatDialogModule,
    BodhalaUiCommonModule,
    BodhalaUiElementsModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatTabsModule,
    ChartModule,
    DropdownModule,
    OverlayPanelModule,
    SliderModule,
    AgGridModule.withComponents([])
  ],
  providers: [CookieService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initHttp,
      deps: [HttpService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initUser,
      deps: [UserService],
      multi: true
    },
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    DatePipe,
    FiltersService,
    UserFiltersModel,
    TopMattersFirmsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
