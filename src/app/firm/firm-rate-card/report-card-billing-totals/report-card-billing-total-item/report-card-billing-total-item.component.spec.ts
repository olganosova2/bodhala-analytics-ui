import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCardBillingTotalItemComponent } from './report-card-billing-total-item.component';

describe('ReportCardBillingTotalItemComponent', () => {
  let component: ReportCardBillingTotalItemComponent;
  let fixture: ComponentFixture<ReportCardBillingTotalItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCardBillingTotalItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCardBillingTotalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
