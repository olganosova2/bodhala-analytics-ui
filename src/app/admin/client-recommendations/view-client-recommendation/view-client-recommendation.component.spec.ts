import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientRecommendationComponent } from './view-client-recommendation.component';

describe('ViewClientRecommendationComponent', () => {
  let component: ViewClientRecommendationComponent;
  let fixture: ComponentFixture<ViewClientRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClientRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
