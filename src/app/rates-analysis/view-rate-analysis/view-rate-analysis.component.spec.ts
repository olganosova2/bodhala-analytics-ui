import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRateAnalysisComponent } from './view-rate-analysis.component';

describe('ViewRateAnalysisComponent', () => {
  let component: ViewRateAnalysisComponent;
  let fixture: ComponentFixture<ViewRateAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRateAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
