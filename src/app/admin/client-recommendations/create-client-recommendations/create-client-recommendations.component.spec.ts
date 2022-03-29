import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientRecommendationsComponent } from './create-client-recommendations.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_CLIENT_CONFIGS} from '../../../shared/unit-tests/mock-data/client-configs';
import {IRecommendation, IRecommendationReport} from '../client-recommendations-model';
import {RecommendationService} from '../recommendation.service';
import {MOCK_RECOMMENDATION_REPORT} from '../../../shared/unit-tests/mock-data/recommendations';


describe('CreateClientRecommendationsComponent', () => {
  let component: CreateClientRecommendationsComponent;
  let fixture: ComponentFixture<CreateClientRecommendationsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(CreateClientRecommendationsComponent, {
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
    fixture = TestBed.createComponent(CreateClientRecommendationsComponent);
    component = fixture.componentInstance;
    component.newReport = MOCK_RECOMMENDATION_REPORT;
    component.reportId = 60;
    fixture.detectChanges();
  });

  it('should create CreateClientRecommendationsComponent', () => {
    component.setStep(2);
    expect(component.step).toBe(2);
  });

  it('should create CreateClientRecommendationsComponent w/ editMode', () => {
    component.newReport = MOCK_RECOMMENDATION_REPORT;
    component.editMode = true;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create CreateClientRecommendationsComponent w/ Smart PAs', () => {
    component.newReport = MOCK_RECOMMENDATION_REPORT;
    component.editMode = true;
    component.clientPracticeAreaSetting = 'Smart Practice Areas';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create CreateClientRecommendationsComponent w/ Both', () => {
    component.clientPracticeAreaSetting = 'Both';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should addRec CreateClientRecommendationsComponent', () => {
    component.addRec();
    expect(component.newReport.recommendations.length).toBe(4);
  });

  it('should updateSave CreateClientRecommendationsComponent', () => {
    component.updateSave('INVALID');
    expect(component.validSave).toBeFalsy();
  });
  it('should updateSave CreateClientRecommendationsComponent', () => {
    component.newReport.recommendations = [];
    component.updateSave('INVALID');
    expect(component.validSave).toBeFalsy();
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

  it('should openModal CreateClientRecommendationsComponent', () => {
    component.selectedClientId = 190;
    spyOn(component.dialog, 'open').and.callThrough();
    try {
      component.openModal();
    } catch (err) {
    }
    expect(component.dialog.open).toHaveBeenCalled();
  });

});
