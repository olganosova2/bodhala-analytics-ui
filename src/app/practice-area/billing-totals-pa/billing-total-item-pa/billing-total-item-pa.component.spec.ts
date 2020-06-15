import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTotalItemPaComponent } from './billing-total-item-pa.component';

describe('BillingTotalItemPaComponent', () => {
  let component: BillingTotalItemPaComponent;
  let fixture: ComponentFixture<BillingTotalItemPaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingTotalItemPaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingTotalItemPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
