import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule,
  MatSlideToggleModule, MatSortModule, MatTableModule, MatButtonToggleModule
} from '@angular/material';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {MomentModule} from 'angular2-moment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BodhalaUiCommonModule, HttpService, UserService} from 'bodhala-ui-common';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import { ChartModule } from 'angular2-highcharts';

import * as CONFIG from './shared/services/config';
import { LaunchpadComponent } from './launchpad/launchpad.component';
import {RouterModule} from '@angular/router';
import {appRouterConfig} from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FiltersService} from './shared/services/filters.service';
import {UserFiltersModel} from './shared/models/user-filters';
import { CardComponent } from './launchpad/card/card.component';
import { PillComponent } from './launchpad/card/cells/pill/pill.component';
import { CellComponent } from './launchpad/card/cells/cell.component';
import { LinkComponent } from './launchpad/card/cells/link/link.component';
import {TopMattersFirmsService} from './launchpad/services/top-matters-firms.service';
import { TopPartnersChartComponent } from './launchpad/card/top-partners-chart/top-partners-chart.component';

export function initUser(config: UserService) {
  return () => config.load();
}
export function initHttp(service: HttpService) {
  return () => service.loadConfig(CONFIG);
}
export function highchartsFactory() {
  // return highcharts;
  const hc = require('highcharts');
  const dd = require('highcharts/modules/exporting');
  hc.setOptions({
    lang: {
      thousandsSep: ','
    }
  });
  dd(hc);

  return hc;
}
@NgModule({
  declarations: [
    AppComponent,
    LaunchpadComponent,
    CardComponent,
    PillComponent,
    CellComponent,
    LinkComponent,
    TopPartnersChartComponent
  ],
  entryComponents: [
    PillComponent,
    LinkComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRouterConfig),
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
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatRadioModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    MatBadgeModule,
    MatDialogModule,
    BodhalaUiCommonModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    ChartModule
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
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    FiltersService,
    UserFiltersModel,
    TopMattersFirmsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
