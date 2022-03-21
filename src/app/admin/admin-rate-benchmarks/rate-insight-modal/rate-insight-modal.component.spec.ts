import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateInsightModalComponent } from './rate-insight-modal.component';

describe('RateInsightModalComponent', () => {
  let component: RateInsightModalComponent;
  let fixture: ComponentFixture<RateInsightModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateInsightModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateInsightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
