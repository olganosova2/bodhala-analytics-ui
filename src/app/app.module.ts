import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
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
import { InjectionToken } from '@angular/core';
import { QuillModule } from 'ngx-quill';


import {SliderModule} from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
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
import {BaseCell} from './launchpad/card/cells/base-cell';
import { TaskCostComponent } from './task-cost/task-cost.component';
import { AnnotationsComponent } from './shared/components/annotations/annotations.component';
import { AnnotaionsModalComponent } from './shared/components/annotations/annotaions-modal/annotaions-modal.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { AnnotationLabelsComponent } from './shared/components/annotations/annotation-labels/annotation-labels.component';

export const WindowToken = new InjectionToken('Window');
export function windowProvider() { return window; }

export function initUser(config: UserService) {
  return () => config.load();
}
export function initHttp(service: HttpService) {
  return () => service.loadConfig(CONFIG);
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
    TaskCostComponent,
    AnnotationsComponent,
    AnnotaionsModalComponent,
    SafePipe,
    AnnotationLabelsComponent
  ],
  entryComponents: [
    PillComponent,
    LinkComponent,
    OverstaffingGridComponent,
    AnnotaionsModalComponent
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
    NgIdleKeepaliveModule.forRoot(),
    MatBadgeModule,
    MatDialogModule,
    BodhalaUiCommonModule,
    BodhalaUiElementsModule,
    MatButtonToggleModule,
    MatTabsModule,
    SplitButtonModule,
    ChartModule.forRoot(highcharts),
    DropdownModule,
    OverlayPanelModule,
    SliderModule,
    AgGridModule.withComponents([]),
    QuillModule.forRoot()
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
    DatePipe,
    FiltersService,
    UserFiltersModel,
    { provide: WindowToken, useFactory: windowProvider },
    TopMattersFirmsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
