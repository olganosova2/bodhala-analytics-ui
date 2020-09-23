import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import { SpendTrendChartComponent, TrendChart } from './spend-trend-chart.component';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';

describe('SpendTrendChartComponent', () => {
  let component: SpendTrendChartComponent;
  let fixture: ComponentFixture<SpendTrendChartComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(SpendTrendChartComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendTrendChartComponent);
    component = fixture.componentInstance;
    component.firmId = '1';
    component.startdate = '2017-09-25';
    component.enddate = '2019-09-25';
    fixture.detectChanges();
  });

  it('should create SpendTrendChartComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should changeViewMode', () => {
    component.changeViewMode(TrendChart.MATTER_COST);
    expect(component.selectedChart).toBe(TrendChart.MATTER_COST);
  });
  it('should renderQuarterChart when TrendChart.MATTER_COST', () => {
    component.selectedChart = TrendChart.MATTER_COST;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.PARTNER_RATE', () => {
    component.selectedChart = TrendChart.PARTNER_RATE;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.ASSOCIATE_RATE', () => {
    component.selectedChart = TrendChart.ASSOCIATE_RATE;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.PARALEGAL_RATE', () => {
    component.selectedChart = TrendChart.PARALEGAL_RATE;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.PARTNER_HOURS', () => {
    component.selectedChart = TrendChart.PARTNER_HOURS;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.ASSOCIATE_HOURS', () => {
    component.selectedChart = TrendChart.ASSOCIATE_HOURS;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.AVG_MATTER_DURATION', () => {
    component.selectedChart = TrendChart.AVG_MATTER_DURATION;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.BLENDED_RATE', () => {
    component.selectedChart = TrendChart.BLENDED_RATE;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
  it('should renderQuarterChart when TrendChart.BODHALA_PRICE_INDEX', () => {
    component.selectedChart = TrendChart.BODHALA_PRICE_INDEX;
    component.renderChart(true);
    expect(component.options.series[0].data.length).toBe(0);
  });
});
