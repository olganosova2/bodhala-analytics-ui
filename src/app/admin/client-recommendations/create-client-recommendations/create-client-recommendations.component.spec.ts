import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientRecommendationsComponent } from './create-client-recommendations.component';

describe('CreateClientRecommendationsComponent', () => {
  let component: CreateClientRecommendationsComponent;
  let fixture: ComponentFixture<CreateClientRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClientRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
