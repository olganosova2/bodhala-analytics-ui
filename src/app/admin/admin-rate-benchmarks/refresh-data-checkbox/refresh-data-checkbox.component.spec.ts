import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshDataCheckboxComponent } from './refresh-data-checkbox.component';

describe('RefreshDataCheckboxComponent', () => {
  let component: RefreshDataCheckboxComponent;
  let fixture: ComponentFixture<RefreshDataCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshDataCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshDataCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
