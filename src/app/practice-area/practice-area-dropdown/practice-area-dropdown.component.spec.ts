import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAreaDropdownComponent } from './practice-area-dropdown.component';

describe('PracticeAreaDropdownComponent', () => {
  let component: PracticeAreaDropdownComponent;
  let fixture: ComponentFixture<PracticeAreaDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeAreaDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeAreaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
