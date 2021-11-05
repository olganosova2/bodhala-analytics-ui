import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextStepInputsComponent } from './next-step-inputs.component';

describe('NextStepInputsComponent', () => {
  let component: NextStepInputsComponent;
  let fixture: ComponentFixture<NextStepInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextStepInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextStepInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
