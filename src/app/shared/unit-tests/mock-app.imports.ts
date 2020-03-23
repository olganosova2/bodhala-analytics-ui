import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF, DatePipe, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpService} from 'bodhala-ui-common';
import {MessagingService} from 'bodhala-ui-common';


import { appRouterConfig } from '../../app.routes';
import { UtilService } from 'bodhala-ui-common';
import {CookieService} from 'ngx-cookie-service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatAccordion, MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDialogRef, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as mockServices from '../unit-tests/mock-services';

import { AppComponent } from '../../app.component';
import {UserFiltersModel} from '../models/user-filters';
import {LaunchpadComponent} from '../../launchpad/launchpad.component';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {MomentModule} from 'angular2-moment';
import {FiltersService} from '../services/filters.service';
import {TopMattersFirmsService} from '../../launchpad/services/top-matters-firms.service';
import {InsightsComponent} from '../../launchpad/insights/insights.component';

export const IMPORTS = [
  ReactiveFormsModule,
  FormsModule,
  RouterModule.forRoot(appRouterConfig, { useHash: false }),
  RouterTestingModule,
  HttpClientTestingModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  BrowserAnimationsModule,
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
  MatDialogModule,
  MatSlideToggleModule,
  MomentModule,
  NgIdleKeepaliveModule.forRoot(),
  MatProgressBarModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatStepperModule
];

export const DECLARATIONS = [
  AppComponent,
  LaunchpadComponent,
  InsightsComponent
];

export const PROVIDERS = [
  HttpClient,
  HttpHandler,
  UtilService,
  HttpTestingController,
  CookieService,
  HttpService,
  MessagingService,
  MatNativeDateModule,
  RouterModule,
  UserFiltersModel,
  TopMattersFirmsService,
  DatePipe,
  { provide: FiltersService, useClass: mockServices.FiltersStub },
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
];

export const SERVICE_PROVIDERS = [
  [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    CookieService,
    HttpService,
    UserFiltersModel,
    DatePipe,
    { provide: HttpClient, useClass: mockServices.HttpStub }
  ]
];
export const SCHEMAS =  [
  CUSTOM_ELEMENTS_SCHEMA
];
