import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecommendationComponent } from './add-edit-recommendation.component';

describe('AddEditRecommendationComponent', () => {
  let component: AddEditRecommendationComponent;
  let fixture: ComponentFixture<AddEditRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
