
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LicenseManager} from 'ag-grid-enterprise';

if (environment.production) {
  enableProdMode();
}
LicenseManager.setLicenseKey('CompanyName=Bodhala Inc,LicensedApplication=Bodhala Plaform,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=2,LicensedProductionInstancesCount=1,AssetReference=AG-028552,SupportServicesEnd=29_June_2023_[v2]_MTY4Nzk5MzIwMDAwMA==365fcc3d1c92ebac61d434810febd9c2');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
