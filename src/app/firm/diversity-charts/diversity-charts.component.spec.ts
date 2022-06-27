import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiversityChartsComponent } from './diversity-charts.component';

describe('DiversityChartsComponent', () => {
  let component: DiversityChartsComponent;
  let fixture: ComponentFixture<DiversityChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiversityChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiversityChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
