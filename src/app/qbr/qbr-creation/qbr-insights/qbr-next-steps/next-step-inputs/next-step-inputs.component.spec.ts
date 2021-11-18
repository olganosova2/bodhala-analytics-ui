import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextStepInputsComponent } from './next-step-inputs.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../../shared/services/filters.service';
import {QbrService} from '../../../../qbr.service';
import * as mockQBRData from '../../../../../shared/unit-tests/mock-data/qbr';
import { RecommendationService } from 'src/app/admin/client-recommendations/recommendation.service';


describe('NextStepInputsComponent', () => {
  let component: NextStepInputsComponent;
  let fixture: ComponentFixture<NextStepInputsComponent>;

  const custom = {
    id: 359,
    qbr_id: 276,
    recommendation_type_id: 6,
    practice_area: null,
    firm_id: null,
    title: 'Custom Recommendation',
    subtitle: null,
    opportunity: 'Custom                                           ',
    why_it_matters: 'Custom                                           ',
    recommendation: 'Custom                                              ',
    section: 'Next Steps',
    included: true,
    created_on: '2021-11-18T16:21:57.460431',
    deleted_on: null,
    created_by: '447',
    type: 'Custom Recommendation',
    firm_name: null,
    corresponding_insight_id: null,
    recommended_discount_pct_lower_range: null,
    recommended_discount_pct_upper_range: null,
    current_discount_pct: null,
    spend_increase_pct: null,
    rate_increase_pct: null,
    desired_rate_increase_pct: null,
    previous_firm_ids: null,
    recommended_firm_ids: null,
    desired_partner_pct_of_hours_worked: null,
    desired_associate_pct_of_hours_worked: null,
    desired_paralegal_pct_of_hours_worked: null,
    desired_block_billing_pct: null,
    potential_savings: 0,
    action: 'Custom                                              ',
    sort_order: 6,
    previouslySaved: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(NextStepInputsComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: RecommendationService, useClass: mockServices.RecommendationsServicesStub},
          {provide: QbrService, useClass: mockServices.QbrServiceStub},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextStepInputsComponent);
    component = fixture.componentInstance;
    component.data = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0];
    fixture.detectChanges();
  });

  it('should create NextStepInputsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should updateSavings NextStepInputsComponent', () => {

    component.data = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0];
    component.updateSavings();
    fixture.detectChanges();

    component.data = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1];
    component.updateSavings();
    fixture.detectChanges();

    component.data = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2];
    component.updateSavings();
    fixture.detectChanges();

    component.data = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6];
    component.updateSavings();
    fixture.detectChanges();

    component.data = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[7];
    component.updateSavings();
    fixture.detectChanges();

    component.data = custom;
    component.updateSavings();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
