import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecommendationsComponent } from './client-recommendations.component';

describe('ClientRecommendationsComponent', () => {
  let component: ClientRecommendationsComponent;
  let fixture: ComponentFixture<ClientRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
