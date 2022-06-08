
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LicenseManager} from 'ag-grid-enterprise';

if (environment.production) {
  enableProdMode();
}
LicenseManager.setLicenseKey('CompanyName=Bodhala Inc,LicensedApplication=Bodhala Plaform,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-015937,ExpiryDate=29_June_2022_[v2]_MTY1NjQ1NzIwMDAwMA==a2b80056be3399d92dcfb0e2dd8ea106');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
