import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDropdownComponent } from './firm-dropdown.component';

describe('FirmDropdownComponent', () => {
  let component: FirmDropdownComponent;
  let fixture: ComponentFixture<FirmDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
