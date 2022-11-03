import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcTrendsChartComponent } from './frc-trends-chart.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {FrcTrendsComponent} from '../frc-trends/frc-trends.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_SPEND_BY_QUARTER_DATA} from '../../../shared/unit-tests/mock-data/firm';
import {MOCK_SPEND_BY_YEAR} from '../../../shared/unit-tests/mock-data/frc';
import {TrendChart, TrendsChartMode} from '../frc-service.service';

describe('FrcTrendsChartComponent', () => {
  let component: FrcTrendsChartComponent;
  let fixture: ComponentFixture<FrcTrendsChartComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcTrendsChartComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrcTrendsChartComponent);
    component = fixture.componentInstance;
    component.quarterData = MOCK_SPEND_BY_QUARTER_DATA.result;
    component.yearData = MOCK_SPEND_BY_YEAR.result;
    fixture.detectChanges();
  });

  it('should create FrcTrendsChartComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should create FrcTrendsChartComponent when QoQ', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('should setUpChart for TOTAL_SPEND', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.TOTAL_SPEND;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Total Spend');
  });
  it('should setUpChart for MATTER_COST', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.MATTER_COST;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[1],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Matter Cost');
  });
  it('should setUpChart for PARTNER_HOURS', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.PARTNER_HOURS;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[2],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Partner Hours');
  });
  it('should setUpChart for ASSOCIATE_HOURS', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.ASSOCIATE_HOURS;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[3],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Associate Hours');
  });
  it('should setUpChart for AVG_MATTER_DURATION', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.AVG_MATTER_DURATION;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Avg. Matter Duration');
  });
  it('should setUpChart for BLENDED_RATE', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.BLENDED_RATE;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Blended Rate');
  });
  it('should setUpChart for PARTNER_RATE', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.PARTNER_RATE;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Partner Rate');
  });
  it('should setUpChart for ASSOCIATE_RATE', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.ASSOCIATE_RATE;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Associate Rate');
  });
  it('should setUpChart for PARALEGAL_HOURS', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.PARALEGAL_HOURS;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Paralegal Hours');
  });
  it('should setUpChart for BLOCK_BILLING', () => {
    component.trendsChartMode = TrendsChartMode.QoQ;
    component.selectedChart = TrendChart.BLOCK_BILLING;
    component.setUpChart(MOCK_SPEND_BY_QUARTER_DATA.result);
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Block Billing');
  });
  it('should buildChartItem', () => {
    component.selectedChart = TrendChart.TOTAL_SPEND;
    component.buildChartItem(MOCK_SPEND_BY_QUARTER_DATA.result[0],  TrendsChartMode.QoQ);
    expect(component.chartHeader).toBe('Total Spend');
  });
});
