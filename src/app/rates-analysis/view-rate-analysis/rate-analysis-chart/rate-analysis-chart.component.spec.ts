import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAnalysisChartComponent } from './rate-analysis-chart.component';

describe('RateAnalysisChartComponent', () => {
  let component: RateAnalysisChartComponent;
  let fixture: ComponentFixture<RateAnalysisChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAnalysisChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAnalysisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
