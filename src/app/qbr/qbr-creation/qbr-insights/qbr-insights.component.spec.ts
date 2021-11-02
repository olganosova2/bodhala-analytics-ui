import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrInsightsComponent } from './qbr-insights.component';

describe('QbrInsightsComponent', () => {
  let component: QbrInsightsComponent;
  let fixture: ComponentFixture<QbrInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QbrInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbrInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
