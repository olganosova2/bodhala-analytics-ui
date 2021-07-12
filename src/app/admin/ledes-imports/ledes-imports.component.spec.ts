import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedesImportsComponent } from './ledes-imports.component';

describe('LedesImportsComponent', () => {
  let component: LedesImportsComponent;
  let fixture: ComponentFixture<LedesImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedesImportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedesImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
