import {Routes} from '@angular/router';
import {LaunchpadComponent} from './launchpad/launchpad.component';

export const appRouterConfig: Routes = [
  {path: '', redirectTo: 'launchpad', pathMatch: 'full'},
  {path: 'launchpad', component: LaunchpadComponent},
  {path: '**', redirectTo: 'launchpad'}
  ];
