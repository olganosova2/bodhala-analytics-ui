import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrCreationComponent } from './qbr-creation.component';

describe('QbrCreationComponent', () => {
  let component: QbrCreationComponent;
  let fixture: ComponentFixture<QbrCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QbrCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbrCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
