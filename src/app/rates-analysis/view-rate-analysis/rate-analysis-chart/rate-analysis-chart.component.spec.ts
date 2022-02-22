import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAnalysisChartComponent } from './rate-analysis-chart.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {RatesAnalysisService} from '../../rates-analysis.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import { moneyFormatter, percentFormatter } from '../../rates-analysis.model';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import { Pipe, PipeTransform } from '@angular/core';
import {MOCK_MARKET_DATA, MOCK_INTERNAL_DATA, MOCK_SELECTED_FIRM_DATA} from '../../../shared/unit-tests/mock-data/rate-benchmarking';


describe('RateAnalysisChartComponent', () => {
  let component: RateAnalysisChartComponent;
  let fixture: ComponentFixture<RateAnalysisChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAnalysisChartComponent ]
    })
    .compileComponents();
  }));

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(RateAnalysisChartComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: RatesAnalysisService, useClass: mockServices.RatesAnalysisServiceStub},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    console.log("DECLARATIONS: ", DECLARATIONS)
    fixture = TestBed.createComponent(RateAnalysisChartComponent);
    component = fixture.componentInstance;
    component.rateType = 'Blended';
    component.selectedFirm = 'Paul, Weiss, Rifkind, Wharton & Garrison';
    component.internalData = MOCK_INTERNAL_DATA
    component.marketAverageData = MOCK_MARKET_DATA;
    component.selectedFirmData = MOCK_SELECTED_FIRM_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.rateType = 'Blended';
    component.selectedFirmData.blended_rate = 900;
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.selectedFirmData.blended_rate = 600;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();

    fixture.detectChanges();
    component.selectedFirmData.blended_rate = 720;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();
  });

  it('should create for associates', () => {
    component.rateType = 'Associate';
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.selectedFirmData.avg_associate_rate = 650;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();

    fixture.detectChanges();
    component.selectedFirmData.avg_associate_rate = 550;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();

    fixture.detectChanges();
    component.selectedFirmData.avg_associate_rate = 800;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();

  });

  it('should create for partners', () => {
    component.rateType = 'Partner';
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.selectedFirmData.avg_partner_rate = 900;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();

    fixture.detectChanges();
    component.selectedFirmData.avg_partner_rate = 600;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();

    fixture.detectChanges();
    component.selectedFirmData.avg_partner_rate = 1200;
    component.calculateChartMetrics();
    expect(component).toBeTruthy();

  });
});
