import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecommendationsComponent } from './view-recommendations.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import { RecommendationService } from '../../admin/client-recommendations/recommendation.service';
import {MOCK_RECOMMENDATION_REPORT, MOCK_RECOMMENDATION_TYPES, RECOMMENDATIONS} from '../../shared/unit-tests/mock-data/recommendations';



describe('ViewRecommendationsComponent', () => {
  let component: ViewRecommendationsComponent;
  let fixture: ComponentFixture<ViewRecommendationsComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ViewRecommendationsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: RecommendationService, useClass: mockServices.RecommendationsServicesStub},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecommendationsComponent);
    component = fixture.componentInstance;
    component.report = MOCK_RECOMMENDATION_REPORT;
    component.reportId = 60;
    fixture.detectChanges();
  });

  it('should create ViewClientRecommendationComponent', () => {
    component.recommendationTypes = MOCK_RECOMMENDATION_TYPES;
    component.report = MOCK_RECOMMENDATION_REPORT;
    component.report.recommendations = RECOMMENDATIONS;
    component.reportId = 60;
    expect(component).toBeTruthy();
  });

  it('should changeType ViewClientRecommendationComponent', () => {
    component.recommendationTypes = MOCK_RECOMMENDATION_TYPES;
    component.report = MOCK_RECOMMENDATION_REPORT;
    component.report.recommendations = RECOMMENDATIONS;
    component.reportId = 60;
    component.changeTab({index: 0});
    component.changeTab({index: 1});
    component.changeTab({index: 2});
    component.changeTab({index: 3});
    component.changeTab({index: 4});
    expect(component).toBeTruthy();
  });

  it('should create CreateClientRecommendationsComponent', () => {
    component.setStep(2);
    expect(component.step).toBe(2);
  });

  it('should nextStep CreateClientRecommendationsComponent', () => {
    component.step = 2;
    component.nextStep();
    expect(component.step).toBe(3);
  });

  it('should prevStep CreateClientRecommendationsComponent', () => {
    component.step = 2;
    component.prevStep();
    expect(component.step).toBe(1);
  });
});
