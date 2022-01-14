import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesAnalysisComponent } from './rates-analysis.component';

describe('RatesAnalysisComponent', () => {
  let component: RatesAnalysisComponent;
  let fixture: ComponentFixture<RatesAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
