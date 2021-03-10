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

export const appRouterConfig: Routes = [
  {path: '', redirectTo: 'launchpad', pathMatch: 'full'},
  {path: 'launchpad', component: LaunchpadComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'firm/:id', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/firm/:id', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'firm', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
  {path: 'analytics-ui/firm', component: FirmComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}},
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
  // ADMIN
  {path: 'analytics-ui/admin/benchmarks', component: AdminBenchmarksComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/benchmark-edit/:id', component: AddEditBenchmarkComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/benchmark-add', component: AddEditBenchmarkComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/rate-increase', component: RateIncreaseComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  {path: 'analytics-ui/admin/client-configs', component: ClientConfigsComponent,  canActivate: [AuthService], data: {expectedRoles: ['ADMIN']}},
  // ClientConfigsComponent,
  {path: '**',  component: LaunchpadComponent,  canActivate: [AuthService], data: {expectedRoles: ['CLIENT']}}
  ];
