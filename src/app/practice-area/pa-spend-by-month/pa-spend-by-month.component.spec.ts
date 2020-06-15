import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaSpendByMonthComponent } from './pa-spend-by-month.component';

describe('PaSpendByMonthComponent', () => {
  let component: PaSpendByMonthComponent;
  let fixture: ComponentFixture<PaSpendByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaSpendByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaSpendByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
