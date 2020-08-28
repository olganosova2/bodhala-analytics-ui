import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedReportsModalComponent } from './saved-reports-modal.component';

describe('SavedReportsModalComponent', () => {
  let component: SavedReportsModalComponent;
  let fixture: ComponentFixture<SavedReportsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedReportsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedReportsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
