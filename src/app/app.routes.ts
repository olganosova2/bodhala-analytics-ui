import {Routes} from '@angular/router';
import {LaunchpadComponent} from './launchpad/launchpad.component';
import {FirmComponent} from './firm/firm.component';

export const appRouterConfig: Routes = [
  {path: '', redirectTo: 'launchpad', pathMatch: 'full'},
  {path: 'launchpad', component: LaunchpadComponent},
  {path: 'firm/:id', component: FirmComponent},
  {path: 'firm', component: FirmComponent},
  {path: 'analytics.html', component: LaunchpadComponent},
  {path: '**', redirectTo: 'launchpad'}
  ];
