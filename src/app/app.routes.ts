import {Routes} from '@angular/router';
import {LaunchpadComponent} from './launchpad/launchpad.component';
import {FirmComponent} from './firm/firm.component';
import {BenchmarksEntryComponent} from './benchmarks/benchmarks-entry/benchmarks-entry.component';
import {BenchmarkOverviewComponent} from './benchmarks/benchmark-overview/benchmark-overview.component';

export const appRouterConfig: Routes = [
  {path: '', redirectTo: 'launchpad', pathMatch: 'full'},
  {path: 'launchpad', component: LaunchpadComponent},
  {path: 'firm/:id', component: FirmComponent},
  {path: 'analytics-ui/firm/:id', component: FirmComponent},
  {path: 'firm', component: FirmComponent},
  {path: 'analytics-ui/firm', component: FirmComponent},
  {path: 'benchmarking', component: BenchmarkOverviewComponent},
  {path: 'analytics-ui/benchmarking', component: BenchmarkOverviewComponent},
  // {path: 'analytics.html', component: LaunchpadComponent},
  {path: '**',  component: LaunchpadComponent}
  ];
