import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecommendationComponent } from './add-edit-recommendation.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';
import {MOCK_RECOMMENDATION_RATE_DATA, MOCK_RECOMMENDATION_REPORT, MOCK_RECOMMENDATION_TYPES, MOCK_FIRM_OPTIONS, MOCK_PA_GROUPS} from '../../../../shared/unit-tests/mock-data/recommendations';
import {RecommendationService} from '../../recommendation.service';


describe('AddEditRecommendationComponent', () => {
  let component: AddEditRecommendationComponent;
  let fixture: ComponentFixture<AddEditRecommendationComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AddEditRecommendationComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
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
    fixture = TestBed.createComponent(AddEditRecommendationComponent);
    component = fixture.componentInstance;
    component.newReport = MOCK_RECOMMENDATION_REPORT;
    component.recommendationTypes = MOCK_RECOMMENDATION_TYPES;
    component.firmOptions = MOCK_FIRM_OPTIONS;
    component.index = 0;
    fixture.detectChanges();
  });

  it('should create AddEditRecommendationComponent', () => {
    component.newReport = MOCK_RECOMMENDATION_REPORT;
    expect(component).toBeTruthy();

    component.index = 1;
    component.paGroupOptions = MOCK_PA_GROUPS;
    component.clientPracticeAreaSetting = 'Both';
    component.ngOnInit();
    expect(component).toBeTruthy();

    component.index = 2;
    component.ngOnInit();
    expect(component).toBeTruthy();

    component.index = 3;
    component.clientPracticeAreaSetting = 'Smart Practice Areas';
    component.ngOnInit();
    expect(component).toBeTruthy();

    component.index = 4;
    component.ngOnInit();
    expect(component).toBeTruthy();

  });

  it('should goToTop AddEditRecommendationComponent', () => {
    component.goToTop();
    expect(component).toBeTruthy();
  });

  it('should calcRateIncreasePreventionSavings AddEditRecommendationComponent', () => {
    component.index = 1;
    component.mostRecentYear = 2019;
    component.firmRateIncreaseData = MOCK_RECOMMENDATION_RATE_DATA.result;
    component.ngOnInit();
    component.calcRateIncreasePreventionSavings();
    expect(component).toBeTruthy();
  });

  it('should deleteRecommendation AddEditRecommendationComponent', () => {
    component.newRecommendation.id = 40;
    component.deleteRecommendation();
    expect(component).toBeTruthy();

    component.newRecommendation.id = null;
    component.deleteRecommendation();
    expect(component).toBeTruthy();
  });

  it('should deleteRecommendation AddEditRecommendationComponent', () => {
    component.newRecommendation.id = 40;
    component.deleteSavedRecommendation();
    expect(component).toBeTruthy();
  });
});
