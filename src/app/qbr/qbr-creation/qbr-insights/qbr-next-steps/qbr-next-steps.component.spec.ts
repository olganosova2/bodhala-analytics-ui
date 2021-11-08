import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrNextStepsComponent } from './qbr-next-steps.component';

describe('QbrNextStepsComponent', () => {
  let component: QbrNextStepsComponent;
  let fixture: ComponentFixture<QbrNextStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QbrNextStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbrNextStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
