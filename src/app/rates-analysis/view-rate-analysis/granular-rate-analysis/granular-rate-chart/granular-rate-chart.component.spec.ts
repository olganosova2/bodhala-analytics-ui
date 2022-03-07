import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranularRateChartComponent } from './granular-rate-chart.component';

describe('GranularRateChartComponent', () => {
  let component: GranularRateChartComponent;
  let fixture: ComponentFixture<GranularRateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranularRateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GranularRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
