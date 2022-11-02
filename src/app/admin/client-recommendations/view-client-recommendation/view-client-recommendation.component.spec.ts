import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientRecommendationComponent } from './view-client-recommendation.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_RECOMMENDATION_REPORT, MOCK_RECOMMENDATION_TYPES, RECOMMENDATIONS} from '../../../shared/unit-tests/mock-data/recommendations';
import {IRecommendation, IRecommendationReport} from '../client-recommendations-model';
import { RecommendationService } from '../recommendation.service';
import {CommonService} from '../../../shared/services/common.service';


describe('ViewClientRecommendationComponent', () => {
  let component: ViewClientRecommendationComponent;
  let fixture: ComponentFixture<ViewClientRecommendationComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ViewClientRecommendationComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: RecommendationService, useClass: mockServices.RecommendationsServicesStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub},
          { provide: CommonService, useClass: mockServices.CommonServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientRecommendationComponent);
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

  it('should edit CreateClientRecommendationsComponent', () => {
    component.edit();
    expect(component).toBeTruthy();
  });
});
