import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranularRateAnalysisComponent } from './granular-rate-analysis.component';

describe('GranularRateAnalysisComponent', () => {
  let component: GranularRateAnalysisComponent;
  let fixture: ComponentFixture<GranularRateAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranularRateAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GranularRateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
