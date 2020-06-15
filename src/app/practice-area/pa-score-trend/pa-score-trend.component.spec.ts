import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaScoreTrendComponent } from './pa-score-trend.component';

describe('PaScoreTrendComponent', () => {
  let component: PaScoreTrendComponent;
  let fixture: ComponentFixture<PaScoreTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaScoreTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaScoreTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
