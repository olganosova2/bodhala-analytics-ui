import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrNextStepsComponent } from './qbr-next-steps.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../../shared/services/filters.service';
import {QbrService} from '../../../qbr.service';
import {IReport} from '../../../qbr-model';
import * as config from '../../../../shared/services/config';
import { QbrInsightsComponent } from '../qbr-insights.component';
import { QbrCreationComponent } from '../../qbr-creation.component';
import {MOCK_QUARTER_DATES, MOCK_GENERIC_QBR_RECOMMENDATIONS, MOCK_SAVED_QBR_RECOMMENDATIONS, MOCK_QBR} from '../../../../shared/unit-tests/mock-data/qbr';
import { MOCK_QBR_DATA } from '../../../../shared/unit-tests/mock-data/qbr-executive-summary';
import { SimpleChange } from '@angular/core';

describe('QbrNextStepsComponent', () => {
  let component: QbrNextStepsComponent;
  let fixture: ComponentFixture<QbrNextStepsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

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
    }).overrideComponent(QbrNextStepsComponent, {
      set: {
        providers: [
          AppStateService,
          QbrCreationComponent,
          QbrInsightsComponent,
          {provide: Router, useValue: mockRouter},
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
    fixture = TestBed.createComponent(QbrNextStepsComponent);
    component = fixture.componentInstance;
    component.savedInsights = [];
    component.savedInsights.push(MOCK_SAVED_QBR_RECOMMENDATIONS[3]);
    component.savedInsights.push(MOCK_SAVED_QBR_RECOMMENDATIONS[4]);
    component.savedInsights.push(custom);
    fixture.detectChanges();
  });

  it('should create QbrNextStepsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOnChanges QbrNextStepsComponent', () => {
    const currentSaved = [];
    const tempRec = MOCK_SAVED_QBR_RECOMMENDATIONS[3];
    tempRec.sort_order = 17;
    currentSaved.push(tempRec);
    currentSaved.push(MOCK_SAVED_QBR_RECOMMENDATIONS[4]);
    currentSaved.push(custom);
    component.ngOnChanges({
      savedInsights: new SimpleChange(currentSaved, currentSaved, false)
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should viewReport QbrNextStepsComponent', () => {
    component.viewReport();
    expect(component).toBeTruthy();
  });

  it('should saveNextStep QbrNextStepsComponent', () => {
    component.saveNextStep(custom);
    expect(custom.id).toBe(359);
  });

  it('should openModal', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    try {
      component.openModal(custom);
    } catch (err) {
    }
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
