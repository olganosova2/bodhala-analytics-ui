import {Routes} from '@angular/router';
import {LaunchpadComponent} from './launchpad/launchpad.component';
import {FirmComponent} from './firm/firm.component';
import {BenchmarksEntryComponent} from './benchmarks/benchmarks-entry/benchmarks-entry.component';
import {BenchmarkOverviewComponent} from './benchmarks/benchmark-overview/benchmark-overview.component';
import {BenchmarkFirmDetailComponent} from './benchmarks/benchmark-firm-detail/benchmark-firm-detail.component';
import {MattersComponent} from './matters/matters.component';
import {LeadAttorneyComponent} from './lead-attorney/lead-attorney.component';
import {PracticeAreaComponent} from './practice-area/practice-area.component';
import {FirmRateCardComponent} from './firm/firm-rate-card/firm-rate-card.component';
import {SavingsCalculatorComponent} from './savings-calculator/savings-calculator.component';

export const appRouterConfig: Routes = [
  {path: '', redirectTo: 'launchpad', pathMatch: 'full'},
  {path: 'launchpad', component: LaunchpadComponent},
  {path: 'firm/:id', component: FirmComponent},
  {path: 'analytics-ui/firm/:id', component: FirmComponent},
  {path: 'firm', component: FirmComponent},
  {path: 'analytics-ui/firm', component: FirmComponent},
  {path: 'benchmarking', component: BenchmarkOverviewComponent},
  {path: 'analytics-ui/benchmarking', component: BenchmarkOverviewComponent},
  {path: 'matter', component: MattersComponent},
  {path: 'analytics-ui/matter', component: MattersComponent},
  {path: 'lead-attorney', component: LeadAttorneyComponent},
  {path: 'analytics-ui/lead-attorney', component: LeadAttorneyComponent},
  {path: 'analytics-ui/benchmarking/firm/:id', component: BenchmarkFirmDetailComponent},
  {path: 'benchmarking/firm/:id', component: BenchmarkFirmDetailComponent},
  {path: 'analytics-ui/practiceArea/:client_matter_type', component: PracticeAreaComponent},
  {path: 'analytics-ui/practiceArea/', component: PracticeAreaComponent},
  {path: 'practiceArea', component: PracticeAreaComponent},
  {path: 'analytics-ui/firm/report-card/:id', component: FirmRateCardComponent},
  {path: 'firm/report-card/:id', component: FirmRateCardComponent},
  {path: 'analytics-ui/savings-calculator', component: SavingsCalculatorComponent},
  {path: 'savings-calculator', component: SavingsCalculatorComponent},
  // {path: 'analytics.html', component: LaunchpadComponent},
  {path: '**',  component: LaunchpadComponent}
  ];
