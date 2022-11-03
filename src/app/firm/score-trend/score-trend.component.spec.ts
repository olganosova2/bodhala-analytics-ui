import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {COLORS, ScoreTrendComponent, TrendChart} from './score-trend.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {DiversityComponent} from '../diversity/diversity.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';
import {QueryList} from '@angular/core';
import {ScoreBadgeComponent} from './score-badge/score-badge.component';
import {trendChart} from '../firm.model';


const chart = Object.assign({}, trendChart);
describe('ScoreTrendComponent', () => {
  let component: ScoreTrendComponent;
  let fixture: ComponentFixture<ScoreTrendComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ScoreTrendComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTrendComponent);
    component = fixture.componentInstance;
    component.firm =  MOCK_FIRM;
    component.firmId = 1;
    component.trends = {};
    component.trends.peer_trends = [];
    component.trends.client_trends = [];
    component.trends.firm_trends = [];
    // component.chart = chart;
    // tslint:disable-next-line:only-arrow-functions
    // component.chart.setData = function(data) {};
    component.scoreBadges = [] as unknown as QueryList<ScoreBadgeComponent>;
    fixture.detectChanges();
  });

  it('should create ScoreTrendComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should setUpChartOptions', () => {
    component.setUpChartOptions();
    expect(component.options.series[0].data).toEqual([]);
  });
  it('should renderChart', () => {
    component.renderChart();
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderChart when TrendChart.MATTER_COST', () => {
    component.selectedChart = TrendChart.MATTER_COST;
    component.renderChart();
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderChart when TrendChart.BLOCK_BILLING', () => {
    component.selectedChart = TrendChart.BLOCK_BILLING;
    component.renderChart();
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderChart when TrendChart.PARTNER_RATE', () => {
    component.selectedChart = TrendChart.PARTNER_RATE;
    component.renderChart();
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderChart when TrendChart.ASSOCIATE_RATE', () => {
    component.selectedChart = TrendChart.ASSOCIATE_RATE;
    component.renderChart();
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should changeViewMode', () => {
    component.changeViewMode(TrendChart.LEVERAGE);
    expect(component.selectedChart).toBe(TrendChart.LEVERAGE);
  });
  it('should setUpChart when TrendChart.MATTER_COST', () => {
    component.selectedChart = TrendChart.MATTER_COST;
    component.setUpChart();
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should setUpChart when TrendChart.BLOCK_BILLING', () => {
    component.selectedChart = TrendChart.BLOCK_BILLING;
    component.setUpChart();
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should getChartColor COLORS.excellent', () => {
    component.rightColsCount = 10;
    const result = component.getChartColor(0.8);
    expect(result).toBe(COLORS.excellent);
  });
  it('should getChartColor COLORS.fair', () => {
    component.rightColsCount = 10;
    const result = component.getChartColor(0.5);
    expect(result).toBe(COLORS.fair);
  });
  it('should getChartColor COLORS.poor', () => {
    component.rightColsCount = 10;
    const result = component.getChartColor(0.2);
    expect(result).toBe(COLORS.poor);
  });
  it('should calculateScoreAvg', () => {
    component.score = {};
    const result = component.calculateScoreAvg();
    expect(result).toBe(undefined);
  });
});
