import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendTrendChartComponent } from './spend-trend-chart.component';

describe('SpendTrendChartComponent', () => {
  let component: SpendTrendChartComponent;
  let fixture: ComponentFixture<SpendTrendChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendTrendChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
