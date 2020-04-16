import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTotalItemComponent } from './billing-total-item.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {PillComponent} from '../../../launchpad/card/cells/pill/pill.component';
import {BILLING_TOTAL_ITEM} from '../../../shared/unit-tests/mock-data/firm';

describe('BillingTotalItemComponent', () => {
  let component: BillingTotalItemComponent;
  let fixture: ComponentFixture<BillingTotalItemComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: [...DECLARATIONS, BillingTotalItemComponent],
      providers: PROVIDERS,
      schemas: SCHEMAS
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingTotalItemComponent);
    component = fixture.componentInstance;
    component.item = BILLING_TOTAL_ITEM;
    fixture.detectChanges();
  });

  it('should create BillingTotalItemComponent', () => {
    expect(component).toBeTruthy();
  });
});
