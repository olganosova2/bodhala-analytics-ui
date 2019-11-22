import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPartnersChartComponent } from './top-partners-chart.component';

describe('TopPartnersChartComponent', () => {
  let component: TopPartnersChartComponent;
  let fixture: ComponentFixture<TopPartnersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPartnersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPartnersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
