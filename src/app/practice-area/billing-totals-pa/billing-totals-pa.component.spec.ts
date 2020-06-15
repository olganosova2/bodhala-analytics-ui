import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTotalsPaComponent } from './billing-totals-pa.component';

describe('BillingTotalsPaComponent', () => {
  let component: BillingTotalsPaComponent;
  let fixture: ComponentFixture<BillingTotalsPaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingTotalsPaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingTotalsPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
