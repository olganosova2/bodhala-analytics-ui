import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCardBillingTotalsComponent } from './report-card-billing-totals.component';

describe('ReportCardBillingTotalsComponent', () => {
  let component: ReportCardBillingTotalsComponent;
  let fixture: ComponentFixture<ReportCardBillingTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCardBillingTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCardBillingTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
