import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QbrRecommendationComponent} from './qbr-recommendation.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_QBR_DATA, MOCK_QBR_RECOMMENDATIONS, MOCK_QBRS} from '../../shared/unit-tests/mock-data/qbr-executive-summary';
import {IQbrReport, QbrRecommendationsType} from '../qbr-model';

describe('QbrRecommendationComponent', () => {
  let component: QbrRecommendationComponent;
  let fixture: ComponentFixture<QbrRecommendationComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrRecommendationComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbrRecommendationComponent);
    component = fixture.componentInstance;
    component.qbr = MOCK_QBRS.result[0] as IQbrReport;
    component.qbrData = MOCK_QBR_DATA.result;
    component.recommendations = MOCK_QBR_RECOMMENDATIONS.result;
    fixture.detectChanges();
  });

  it('should create QbrRecommendationComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit for Insights', () => {
    component.qbrRecommendationType = QbrRecommendationsType.Insights;
    component.ngOnInit();
    expect(component.pageNumber).toBe(6);
  });
  it('should ngOnInit for Next Steps', () => {
    component.qbrRecommendationType = QbrRecommendationsType.NextSteps;
    component.ngOnInit();
    expect(component.pageNumber).toBe(12);
  });
});
