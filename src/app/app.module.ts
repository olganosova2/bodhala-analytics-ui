import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {LicenseManager} from 'ag-grid-enterprise';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import {CheckboxModule} from 'primeng/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BodhalaUiCommonModule, HttpService, UserService} from 'bodhala-ui-common';
import {BodhalaUiElementsModule} from 'bodhala-ui-elements';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import borderRadius from 'highcharts-border-radius';
import rounded from 'highcharts-rounded-corners/rounded-corners.js';
import { ChartModule } from 'angular2-highcharts';
import { DropdownModule } from 'primeng/dropdown';
import * as CONFIG from './shared/services/config';
import { LaunchpadComponent } from './launchpad/launchpad.component';
import {RouterModule} from '@angular/router';
import {appRouterConfig} from './app.routes';
import { InjectionToken } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatStepperModule } from '@angular/material/stepper';


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
import {OverlayPanelModule} from 'primeng/overlaypanel';
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
import { SavedReportsModalComponent } from './firm/saved-reports-modal/saved-reports-modal.component';
import { TaskCostComponent } from './task-cost/task-cost.component';
import { AnnotationsComponent } from './shared/components/annotations/annotations.component';
import { AnnotaionsModalComponent } from './shared/components/annotations/annotaions-modal/annotaions-modal.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { AnnotationLabelsComponent } from './shared/components/annotations/annotation-labels/annotation-labels.component';
import {ClickOutsideModule} from 'ng-click-outside';
import { SpendTrendChartComponent } from './firm/firm-rate-card/spend-trend-chart/spend-trend-chart.component';
import { ReportCardBillingTotalsComponent } from './firm/firm-rate-card/report-card-billing-totals/report-card-billing-totals.component';
import { ReportCardBillingTotalItemComponent } from './firm/firm-rate-card/report-card-billing-totals/report-card-billing-total-item/report-card-billing-total-item.component';
import { HelpModalComponent } from './shared/components/help-modal/help-modal.component';
import { AdminBenchmarksComponent } from './admin/admin-benchmarks/admin-benchmarks.component';
import { ClientDropDownComponent } from './shared/components/client-drop-down/client-drop-down.component';
import { RouterLinkRendererComponent } from './shared/components/router-link-renderer/router-link-renderer.component';
import { AddEditBenchmarkComponent } from './admin/admin-benchmarks/add-edit-benchmark/add-edit-benchmark.component';
import { BenchmarkingSetupComponent } from './benchmarking-setup/benchmarking-setup.component';
import { EditBenchmarkRateComponent } from './admin/admin-benchmarks/edit-benchmark-rate/edit-benchmark-rate.component';
import { ObjectKeysPipe } from './shared/pipes/object-keys.pipe';
import { RateIncreaseComponent } from './admin/rate-increase/rate-increase.component';
import { SavingsFirmGridComponent } from './savings-calculator/savings-firm-grid/savings-firm-grid.component';
import { PastSavingsComponent } from './savings-calculator/past-savings/past-savings.component';
import { ClientConfigsComponent } from './admin/client-configs/client-configs.component';
import { AddEditConfigComponent } from './admin/client-configs/add-edit-config/add-edit-config.component';
import {AceEditorModule} from 'ng2-ace-editor';
import { FirmDiscountsComponent } from './firm/firm-discounts/firm-discounts.component';
import { CirpMatterSummaryComponent } from './matters/cirp-matter-summary/cirp-matter-summary.component';
import { ClientRecommendationsComponent } from './admin/client-recommendations/client-recommendations.component';
import { CreateClientRecommendationsComponent } from './admin/client-recommendations/create-client-recommendations/create-client-recommendations.component';
import { AddEditRecommendationComponent } from './admin/client-recommendations/create-client-recommendations/add-edit-recommendation/add-edit-recommendation.component';
import { ViewClientRecommendationComponent } from './admin/client-recommendations/view-client-recommendation/view-client-recommendation.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ViewRecommendationsComponent } from './recommendations/view-recommendations/view-recommendations.component';
import { WorkDistributionComponent } from './admin/work-distribution/work-distribution.component';
import { PublishCheckboxComponent } from './admin/client-recommendations/publish-checkbox/publish-checkbox.component';
import { WorkDistributionByPaComponent } from './admin/work-distribution/work-distribution-by-pa/work-distribution-by-pa.component';
import { LawFirmDuplicatesComponent } from './admin/law-firm-duplicates/law-firm-duplicates.component';
import { SubscriptionListComponent } from './admin/subscription-list/subscription-list.component';
import { SubscriptionGridComponent } from './admin/subscription-list/subscription-grid/subscription-grid.component';
import { CheckboxCellComponent } from './shared/components/checkbox-cell/checkbox-cell.component';
import { LedesImportsComponent } from './admin/ledes-imports/ledes-imports.component';
import { ImportDetailComponent } from './admin/ledes-imports/import-detail/import-detail.component';
import { RerunUploadComponent } from './admin/ledes-imports/rerun-upload/rerun-upload.component';
import { YoyRateIncreaseComponent } from './savings-calculator/yoy-rate-increase/yoy-rate-increase.component';
import { YoyDrillByTkComponent } from './savings-calculator/yoy-rate-increase/yoy-drill-by-tk/yoy-drill-by-tk.component';
import { QbrExecutiveSummaryComponent } from './qbr/qbr-executive-summary/qbr-executive-summary.component';
import { YoyNumberWidgetComponent } from './qbr/yoy-number-widget/yoy-number-widget.component';
import { QbrExecutiveSummaryRightComponent } from './qbr/qbr-executive-summary/qbr-executive-summary-right/qbr-executive-summary-right.component';
rounded(highcharts);
import { QbrComponent } from './qbr/qbr.component';
import { QbrCreationComponent } from './qbr/qbr-creation/qbr-creation.component';
import { QbrDeckComponent } from './qbr/qbr-deck/qbr-deck.component';
import { QbrGenericMetricComponent } from './qbr/qbr-generic-metric/qbr-generic-metric.component';
import { QbrTopPasComponent } from './qbr/qbr-top-pas/qbr-top-pas.component';
import { QbrTotalSpendComponent } from './qbr/qbr-total-spend/qbr-total-spend.component';
import { GenericMetricsRightComponent } from './qbr/qbr-top-pas/generic-metrics-right/generic-metrics-right.component';
import { QbrTimekeepersComponent } from './qbr/qbr-top-pas/qbr-timekeepers/qbr-timekeepers.component';
import { QbrTopPasFirmsComponent } from './qbr/qbr-top-pas/qbr-top-pas-firms/qbr-top-pas-firms.component';
import { QbrTopPasMattersComponent } from './qbr/qbr-top-pas/qbr-top-pas-matters/qbr-top-pas-matters.component';
import { QbrAgendaComponent } from './qbr/qbr-text-pages/qbr-agenda/qbr-agenda.component';
import { QbrDashboardComponent } from './qbr/qbr-dashboard/qbr-dashboard.component';
import { QbrInsightsComponent } from './qbr/qbr-creation/qbr-insights/qbr-insights.component';
import { QbrCoverComponent } from './qbr/qbr-text-pages/qbr-cover/qbr-cover.component';
import { QbrKeyTrendsComponent } from './qbr/qbr-text-pages/qbr-key-trends/qbr-key-trends.component';
import { QbrNextStepsComponent } from './qbr/qbr-creation/qbr-insights/qbr-next-steps/qbr-next-steps.component';
import { NextStepInputsComponent } from './qbr/qbr-creation/qbr-insights/qbr-next-steps/next-step-inputs/next-step-inputs.component';
import { QbrRecommendationComponent } from './qbr/qbr-recommendation/qbr-recommendation.component';
import { MoreYouActComponent } from './qbr/qbr-text-pages/more-you-act/more-you-act.component';
import { MatterExecutiveSummaryComponent } from './matters/matter-executive-summary/matter-executive-summary.component';
import { MatterTitleBarComponent } from './matters/matter-executive-summary/matter-title-bar/matter-title-bar.component';
import { MatterTotalPanelComponent } from './matters/matter-executive-summary/matter-total-panel/matter-total-panel.component';
import {InsightsCardComponent} from './admin/insights/insights-card/insights-card.component';
import {AdminInsightsComponent} from './admin/insights/insights.component';
import {BlendedRateCardComponent} from './admin/insights/blended-rate-card/blended-rate-card.component';
import { MatterInsightsComponent } from './admin/insights/matter-insights/matter-insights.component';
import { MatterTotalSpendComponent } from './matters/matter-executive-summary/matter-total-spend/matter-total-spend.component';
import { MatterTotalsMetricsComponent } from './matters/matter-executive-summary/matter-totals-metrics/matter-totals-metrics.component';
import { MatterStaffingComponent } from './matters/matter-executive-summary/matter-staffing/matter-staffing.component';
import { MatterSummaryCardComponent } from './matters/matter-executive-summary/matter-summary-card/matter-summary-card.component';
import { MatterMetricTableComponent } from './matters/matter-executive-summary/matter-total-spend/matter-metric-table/matter-metric-table.component';
import { MatterDocumentsComponent } from './matters/matter-executive-summary/matter-documents/matter-documents.component';
import { MatterDocumentsOverviewComponent } from './matters/matter-executive-summary/matter-documents-overview/matter-documents-overview.component';
import { MatterDocumentModalComponent } from './matters/matter-executive-summary/matter-documents-overview/matter-document-modal/matter-document-modal.component';
import { InternalMattersOverlayComponent } from './matters/matter-executive-summary/internal-matters-overlay/internal-matters-overlay.component';

export const WindowToken = new InjectionToken('Window');
export function windowProvider() { return window; }

export function initUser(config: UserService) {
  return () => config.load();
}
export function initHttp(service: HttpService) {
  return () => service.loadConfig(CONFIG);
}
highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});
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
    SavedReportsModalComponent,
    TaskCostComponent,
    AnnotationsComponent,
    AnnotaionsModalComponent,
    SafePipe,
    AnnotationLabelsComponent,
    SpendTrendChartComponent,
    ReportCardBillingTotalsComponent,
    ReportCardBillingTotalItemComponent,
    HelpModalComponent,
    AdminBenchmarksComponent,
    ClientDropDownComponent,
    RouterLinkRendererComponent,
    AddEditBenchmarkComponent,
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
    ClientRecommendationsComponent,
    CreateClientRecommendationsComponent,
    AddEditRecommendationComponent,
    ViewClientRecommendationComponent,
    RecommendationsComponent,
    ViewRecommendationsComponent,
    WorkDistributionComponent,
    PublishCheckboxComponent,
    WorkDistributionByPaComponent,
    LawFirmDuplicatesComponent,
    SubscriptionListComponent,
    SubscriptionGridComponent,
    CheckboxCellComponent,
    LedesImportsComponent,
    ImportDetailComponent,
    RerunUploadComponent,
    YoyRateIncreaseComponent,
    YoyDrillByTkComponent,
    CheckboxCellComponent,
    YoyRateIncreaseComponent,
    QbrExecutiveSummaryComponent,
    YoyNumberWidgetComponent,
    QbrExecutiveSummaryRightComponent,
    QbrComponent,
    QbrCreationComponent,
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
    QbrInsightsComponent,
    QbrNextStepsComponent,
    QbrCoverComponent,
    QbrKeyTrendsComponent,
    NextStepInputsComponent,
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
    MatterDocumentsComponent,
    MatterDocumentsOverviewComponent,
    MatterDocumentModalComponent,
    MatterMetricTableComponent,
    InternalMattersOverlayComponent
  ],
  entryComponents: [
    PillComponent,
    LinkComponent,
    OverstaffingGridComponent,
    AnnotaionsModalComponent,
    HelpModalComponent,
    SavingsFirmGridComponent,
    AddEditConfigComponent,
    FirmDiscountsComponent
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
    MatStepperModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    CheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSliderModule,
    NgIdleKeepaliveModule.forRoot(),
    MatBadgeModule,
    MatDialogModule,
    MatAutocompleteModule,
    BodhalaUiCommonModule,
    BodhalaUiElementsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatTooltipModule,
    SplitButtonModule,
    ChartModule.forRoot(highcharts),
    DropdownModule,
    OverlayPanelModule,
    SliderModule,
    AgGridModule.withComponents([ RouterLinkRendererComponent ]),
    QuillModule.forRoot(),
    ClickOutsideModule,
    MultiSelectModule,
    AceEditorModule
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
