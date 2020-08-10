import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS } from '../../shared/unit-tests/mock-app.imports';
import {CardComponent, CardMode} from './card.component';
import { ChartModule } from 'angular2-highcharts';
import {mattersChartOptions} from '../../shared/models/top-matters';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...IMPORTS, ChartModule],
      declarations: [...DECLARATIONS, CardComponent],
      providers: PROVIDERS,
      schemas: SCHEMAS
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.columns = [];
    component.request = Promise.resolve({result: []});
    fixture.detectChanges();
  });

  it('should create CardComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should create call onClick', () => {
    spyOn(component.clicked, 'emit');
    component.onClick(null);
    expect(component.clicked).toBeTruthy();
  });
  it('should create call toggle', () => {
    component.toggle(true);
    expect(component).toBeTruthy();
  });
  it('should create saveInstance', () => {
    component.saveInstance({});
    expect(component.chart).toBeTruthy();
  });
  it('should create toggle', () => {
    component.cardName = 'topBlockBillers';
    component.chart = Object.assign({}, mattersChartOptions);
    component.chart.xAxis = [];
    const xAxis = { setCategories: () => {} };
    component.chart.xAxis.push(xAxis);
    component.chart.series[0].setData = (data) => {};
    component.options = {};
    component.data = [];
    component.toggle({});
    expect(component.chart).toBeTruthy();
  });
  it('should reloadChart', () => {
    component.cardName = 'topBlockBillers';
    component.chart = Object.assign({}, mattersChartOptions);
    component.chart.xAxis = [];
    const xAxis = { setCategories: () => {} };
    component.chart.xAxis.push(xAxis);
    component.chart.series[0].setData = (data) => {};
    component.data = [];
    component.reloadChart();
    expect(component.chart.series[0]).toBeTruthy();
  });
});
