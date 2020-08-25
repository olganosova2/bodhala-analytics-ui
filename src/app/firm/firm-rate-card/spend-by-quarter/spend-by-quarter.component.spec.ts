import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendByQuarterComponent } from './spend-by-quarter.component';

describe('SpendByQuarterComponent', () => {
  let component: SpendByQuarterComponent;
  let fixture: ComponentFixture<SpendByQuarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendByQuarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendByQuarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
