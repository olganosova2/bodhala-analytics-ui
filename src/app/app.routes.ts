import {Routes} from '@angular/router';
import {LaunchpadComponent} from './launchpad/launchpad.component';
import {FirmComponent} from './firm/firm.component';
import {BenchmarksEntryComponent} from './benchmarks/benchmarks-entry/benchmarks-entry.component';

export const appRouterConfig: Routes = [
  {path: '', redirectTo: 'launchpad', pathMatch: 'full'},
  {path: 'launchpad', component: LaunchpadComponent},
  {path: 'firm/:id', component: FirmComponent},
  {path: 'analytics-ui/firm/:id', component: FirmComponent},
  {path: 'firm', component: FirmComponent},
  {path: 'analytics-ui/firm', component: FirmComponent},
  {path: 'benchmarks', component: BenchmarksEntryComponent},
  {path: 'analytics-ui/benchmarks', component: BenchmarksEntryComponent},
  // {path: 'analytics.html', component: LaunchpadComponent},
  {path: '**',  component: LaunchpadComponent}
  ];
