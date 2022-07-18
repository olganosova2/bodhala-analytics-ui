import {Routes} from '@angular/router';
import {LaunchpadComponent} from './launchpad/launchpad.component';
import {FirmComponent} from './firm/firm.component';
import {BenchmarksEntryComponent} from './benchmarks/benchmarks-entry/benchmarks-entry.component';
import {BenchmarkOverviewComponent} from './benchmarks/benchmark-overview/benchmark-overview.component';
import {BenchmarkFirmDetailComponent} from './benchmarks/benchmark-firm-detail/benchmark-firm-detail.component';
import {MattersComponent} from './matters/matters.component';
import {PracticeAreaComponent} from './practice-area/practice-area.component';
import {FirmRateCardComponent} from './firm/firm-rate-card/firm-rate-card.component';
import {SavingsCalculatorComponent} from './savings-calculator/savings-calculator.component';
import {TaskCostComponent} from './task-cost/task-cost.component';
import {AdminBenchmarksComponent} from './admin/admin-benchmarks/admin-benchmarks.component';
import {AuthService} from './shared/services/auth/auth.service';
import {AddEditBenchmarkComponent} from './admin/admin-benchmarks/add-edit-benchmark/add-edit-benchmark.component';
import {BenchmarkingSetupComponent} from './benchmarking-setup/benchmarking-setup.component';
import {RateIncreaseComponent} from './admin/rate-increase/rate-increase.component';
import {PastSavingsComponent} from './savings-calculator/past-savings/past-savings.component';
import {ClientConfigsComponent} from './admin/client-configs/client-configs.component';
import {CirpMatterSummaryComponent} from './matters/cirp-matter-summary/cirp-matter-summary.component';
import {ClientRecommendationsComponent} from './admin/client-recommendations/client-recommendations.component';
import {CreateClientRecommendationsComponent} from './admin/client-recommendations/create-client-recommendations/create-client-recommendations.component';
import {ViewClientRecommendationComponent} from './admin/client-recommendations/view-client-recommendation/view-client-recommendation.component';
import {RecommendationsComponent} from './recommendations/recommendations.component';
import {ViewRecommendationsComponent} from './recommendations/view-recommendations/view-recommendations.component';
import {WorkDistributionComponent} from './admin/work-distribution/work-distribution.component';
import {LawFirmDuplicatesComponent} from './admin/law-firm-duplicates/law-firm-duplicates.component';
import {SubscriptionListComponent} from './admin/subscription-list/subscription-list.component';
import {LedesImportsComponent} from './admin/ledes-imports/ledes-imports.component';
import {RerunUploadComponent} from './admin/ledes-imports/rerun-upload/rerun-upload.component';
import {YoyRateIncreaseComponent} from './savings-calculator/yoy-rate-increase/yoy-rate-increase.component';
import {QbrExecutiveSummaryComponent} from './qbr/qbr-executive-summary/qbr-executive-summary.component';
import {QbrComponent} from './qbr/qbr.component';
import { QbrCreationComponent } from './qbr/qbr-creation/qbr-creation.component';
import {QbrDeckComponent} from './qbr/qbr-deck/qbr-deck.component';
import {QbrDashboardComponent} from './qbr/qbr-dashboard/qbr-dashboard.component';
import {RatesAnalysisComponent} from './rates-analysis/rates-analysis.component';
import {AdminRateBenchmarksComponent} from './admin/admin-rate-benchmarks/admin-rate-benchmarks.component';
import {ViewRateAnalysisComponent} from './rates-analysis/view-rate-analysis/view-rate-analysis.component';
import { GranularRateAnalysisComponent } from './rates-analysis/view-rate-analysis/granular-rate-analysis/granular-rate-analysis.component';
import { NamedTkAnalysisComponent } from './rates-analysis/view-rate-analysis/named-tk-analysis/named-tk-analysis.component';

import {MatterExecutiveSummaryComponent} from './matters/matter-executive-summary/matter-executive-summary.component';
import {AdminInsightsComponent} from './admin/insights/insights.component';
import {MatterStaffingComponent} from './matters/matter-executive-summary/matter-staffing/matter-staffing.component';
import {MatterDocumentsOverviewComponent} from './matters/matter-executive-summary/matter-documents-overview/matter-documents-overview.component';
import {BenchmarkMattersComponent} from './admin/benchmark-matters/benchmark-matters.component';
import {MatterBenchmarkingLandingComponent} from './matters/matter-executive-summary/matter-benchmarking-landing/matter-benchmarking-landing.component';
import {FrcPeerFirmsComponent} from './firm/frc-peer-firms/frc-peer-firms.component';
import {FrcFirmComparisonComponent} from './firm/frc-peer-firms/frc-firm-comparison/frc-firm-comparison.component';

export const appRouterConfig: Routes = [
  {path: '', redirectTo: 'launchpad', pathMatch: 'full'},
  {path: 'launchpad', component: LaunchpadComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'firm/:id', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/firm/:id', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'firm', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
 // {path: 'analytics-ui/firm', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'benchmarking', component: BenchmarkOverviewComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/benchmarking', component: BenchmarkOverviewComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'matter', component: MattersComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/matter', component: MattersComponent},
  {path: 'analytics-ui/benchmarking/firm/:id', component: BenchmarkFirmDetailComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'benchmarking/firm/:id', component: BenchmarkFirmDetailComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/practiceArea/:client_matter_type', component: PracticeAreaComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/practiceArea/', component: PracticeAreaComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'practiceArea', component: PracticeAreaComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/firm/report-card/:id', component: FirmRateCardComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'firm/report-card/:id', component: FirmRateCardComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/savings-calculator', component: SavingsCalculatorComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'savings-calculator', component: SavingsCalculatorComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/task-cost', component: TaskCostComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'task-cost', component: TaskCostComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/benchmarks-setup', component: BenchmarkingSetupComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/past-savings', component: PastSavingsComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'past-savings', component: PastSavingsComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/matter-cirp-summary', component: CirpMatterSummaryComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/recommendations', component: RecommendationsComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/recommendations/view/:reportId', component: ViewRecommendationsComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/qbrs', component: QbrComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/qbrs/new', component: QbrCreationComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/yoy-rate-increase', component: YoyRateIncreaseComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/qbrs/view', component: QbrDeckComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/qbrs/edit/:reportId', component: QbrCreationComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/qbrs/dashboard', component: QbrDashboardComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/rate-benchmarking', component: RatesAnalysisComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/rate-benchmarking/view/:id', component: ViewRateAnalysisComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/rate-benchmarking/view/detail/:id', component: GranularRateAnalysisComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/rate-benchmarking/view/named/:id', component: NamedTkAnalysisComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},

  {path: 'analytics-ui/matter-executive-summary', component: MatterExecutiveSummaryComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/matter-staffing', component: MatterStaffingComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/matter-tasks', component: MatterDocumentsOverviewComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/matter-benchmarking', component: MatterBenchmarkingLandingComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  // FRC
  {path: 'analytics-ui/frc-peer-firms', component: FrcPeerFirmsComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/firm/frc-peer-firms/:id', component: FrcPeerFirmsComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/frc-firm-comparison', component: FrcFirmComparisonComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},

  // ADMIN
  {path: 'analytics-ui/admin/benchmarks', component: AdminBenchmarksComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/benchmark-edit/:id', component: AddEditBenchmarkComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/benchmark-add', component: AddEditBenchmarkComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/rate-increase', component: RateIncreaseComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/client-configs', component: ClientConfigsComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/client-recommendations', component: ClientRecommendationsComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/client-recommendations/new/:clientId', component: CreateClientRecommendationsComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/client-recommendations/edit/:clientId', component: CreateClientRecommendationsComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/client-recommendations/view/:reportId', component: ViewClientRecommendationComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/work-distribution', component: WorkDistributionComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/law-firm-duplicates', component: LawFirmDuplicatesComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/subscription-list', component: SubscriptionListComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/ledes-imports', component: LedesImportsComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/ledes-imports/:clientId', component: RerunUploadComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/rate-benchmarks', component: AdminRateBenchmarksComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  // {path: 'analytics-ui/admin/rate-benchmarks/:clientId', component: AdminBenchmarksComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/insights', component: AdminInsightsComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/matter-benchmarks', component: BenchmarkMattersComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},

  //

  {path: '**',  component: LaunchpadComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}}
  ];
