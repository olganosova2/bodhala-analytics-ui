import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrInsightsComponent } from './qbr-insights.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {QbrService} from '../../qbr.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '../../../shared/services/common.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import * as mockQBRData from '../../../shared/unit-tests/mock-data/qbr';
import { MOCK_QBR_DATA, MOCK_QBR_RECOMMENDATIONS } from '../../../shared/unit-tests/mock-data/qbr-executive-summary';
import {FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {IReport, QbrType, DEFAULT_CHOSEN_METRICS, recommendationPlaceholderMapping, formatter, moneyFormatter} from '../../qbr-model';
import * as moment from 'moment';
import {QbrCreationComponent} from '../qbr-creation.component';
import {SelectItem} from 'primeng/api';
import { RecommendationService } from 'src/app/admin/client-recommendations/recommendation.service';
import { SimpleChange } from '@angular/core';


describe('QbrInsightsComponent', () => {
  let component: QbrInsightsComponent;
  let fixture: ComponentFixture<QbrInsightsComponent>;


  const mockInsightsForm = new FormGroup({
    '0metrics': new FormControl('metric', [Validators.required]),
    '0opportunity': new FormControl('opportunity available', [Validators.required]),
    '0title': new FormControl('Discounts', [Validators.required]),
    '0include': new FormControl(true, [Validators.required]),
    '0matters': new FormControl('matters very important', [Validators.required]),
    '0firm': new FormControl(null, [Validators.required]),
    '0practice_area': new FormControl(null, [Validators.required]),

    '1metrics': new FormControl('metric', [Validators.required]),
    '1opportunity': new FormControl('opportunity available', [Validators.required]),
    '1title': new FormControl('Discounts', [Validators.required]),
    '1include': new FormControl(false, [Validators.required]),
    '1matters': new FormControl('matters very important', [Validators.required]),
    '1firm': new FormControl(null, [Validators.required]),
    '1practice_area': new FormControl(null, [Validators.required]),

    '2metrics': new FormControl('metric', [Validators.required]),
    '2opportunity': new FormControl('opportunity available', [Validators.required]),
    '2title': new FormControl('Discounts', [Validators.required]),
    '2include': new FormControl(false, [Validators.required]),
    '2matters': new FormControl('matters very important', [Validators.required]),
    '2firm': new FormControl(null, [Validators.required]),
    '2practice_area': new FormControl(null, [Validators.required]),

    '3metrics': new FormControl('metric', [Validators.required]),
    '3opportunity': new FormControl('opportunity available', [Validators.required]),
    '3title': new FormControl('Discounts', [Validators.required]),
    '3include': new FormControl(false, [Validators.required]),
    '3matters': new FormControl('matters very important', [Validators.required]),
    '3firm': new FormControl(null, [Validators.required]),
    '3practice_area': new FormControl(null, [Validators.required]),

    '4metrics': new FormControl('metric', [Validators.required]),
    '4opportunity': new FormControl('opportunity available', [Validators.required]),
    '4title': new FormControl('Discounts', [Validators.required]),
    '4include': new FormControl(false, [Validators.required]),
    '4matters': new FormControl('matters very important', [Validators.required]),
    '4firm': new FormControl(null, [Validators.required]),
    '4practice_area': new FormControl(null, [Validators.required]),

    '5metrics': new FormControl('metric', [Validators.required]),
    '5opportunity': new FormControl('opportunity available', [Validators.required]),
    '5title': new FormControl('Discounts', [Validators.required]),
    '5include': new FormControl(false, [Validators.required]),
    '5matters': new FormControl('matters very important', [Validators.required]),
    '5firm': new FormControl(null, [Validators.required]),
    '5practice_area': new FormControl(null, [Validators.required]),

    '6metrics': new FormControl('metric', [Validators.required]),
    '6opportunity': new FormControl('opportunity available', [Validators.required]),
    '6title': new FormControl('Discounts', [Validators.required]),
    '6include': new FormControl(false, [Validators.required]),
    '6matters': new FormControl('matters very important', [Validators.required]),
    '6firm': new FormControl(null, [Validators.required]),
    '6practice_area': new FormControl(null, [Validators.required]),

    '7metrics': new FormControl('metric', [Validators.required]),
    '7opportunity': new FormControl('opportunity available', [Validators.required]),
    '7title': new FormControl('Discounts', [Validators.required]),
    '7include': new FormControl(false, [Validators.required]),
    '7matters': new FormControl('matters very important', [Validators.required]),
    '7firm': new FormControl(null, [Validators.required]),
    '7practice_area': new FormControl(null, [Validators.required]),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrInsightsComponent, {
      set: {
        providers: [
          AppStateService,
          QbrCreationComponent,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: QbrService, useClass: mockServices.QbrServiceStub},
          {provide: RecommendationService, useClass: mockServices.RecommendationsServicesStub},
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
    fixture = TestBed.createComponent(QbrInsightsComponent);
    component = fixture.componentInstance;
    component.parent.editMode = true;
    component.editMode = true;
    component.recommendations = mockQBRData.MOCK_QBR_RECOMMENDATIONS_WITHOUT_ID;
    component.practiceAreaSetting = 'Smart Practice Areas';
    component.parent.report = mockQBRData.MOCK_QBR;
    component.topPAs = mockQBRData.MOCK_PAS;
    component.topPAFirms = mockQBRData.MOCK_TOP_FIRMS;
    component.secondPAFirms = mockQBRData.MOCK_SECOND_FIRMS;
    component.insightsForm = mockInsightsForm;

    component.parent.reportData = mockQBRData.MOCK_TOP_PA;
    component.parent.topPA = mockQBRData.MOCK_TOP_PA;
    component.parent.topPATopFirm = mockQBRData.MOCK_TOP_PA;
    component.parent.topPASecondFirm = mockQBRData.MOCK_TOP_PA;
    component.parent.topPAMatter = mockQBRData.MOCK_TOP_PA;
    component.parent.secondPA = mockQBRData.MOCK_TOP_PA;
    component.parent.secondPATopFirm = mockQBRData.MOCK_TOP_PA;
    component.parent.secondPASecondFirm = mockQBRData.MOCK_TOP_PA;
    component.parent.secondPAMatter = mockQBRData.MOCK_TOP_PA;
    component.parent.practiceAreaSetting = 'Smart Practice Areas';
    component.parent.reportData = MOCK_QBR_DATA.result.report_timeframe_metrics;
    component.parent.comparisonData = MOCK_QBR_DATA.result.comparison_timeframe_metrics;
    component.parent.topPA = MOCK_QBR_DATA.result.report_timeframe_metrics;
    component.parent.reportData = MOCK_QBR_DATA.result.report_timeframe_metrics;

    fixture.detectChanges();
  });

  it('should create QbrInsightsComponent', () => {
    // component.editMode = true;
    expect(component).toBeTruthy();
  });

  it('should create QbrInsightsComponent editMode', () => {
    component.editMode = true;
    component.parent.editMode = true;
    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    expect(component).toBeTruthy();
  });

  it('should updateFormStatus QbrInsightsComponent', () => {
    component.updateFormStatus('VALID');
    expect(component.nextStepsValid).toBe(true);
    component.updateFormStatus('INVALID');
    expect(component.nextStepsValid).toBe(false);
  });

  it('should addRecommendation QbrInsightsComponent', () => {
    component.recommendations = [];
    component.addRecommendation('Increase Discounts');
    fixture.detectChanges();

    component.addRecommendation('Prevent Rate Increases');
    fixture.detectChanges();

    component.addRecommendation('Partner / Associate Work Allocation');
    fixture.detectChanges();

    component.addRecommendation('Decrease Block Billing');
    fixture.detectChanges();

    component.addRecommendation('Shift Work to Other Firms');
    fixture.detectChanges();

    component.addRecommendation('Custom Recommendation');
    fixture.detectChanges();

    expect(component.recommendations.length).toEqual(6);
  });

  it('should execute checkboxClicked QbrInsightsComponent', () => {
    const evt = {
      checked: true
    };
    const rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0];
    component.checkboxClicked(evt, rec);
    fixture.detectChanges();
    rec.id = null;
    rec.opportunity = null;
    rec.notable_metrics = null;
    rec.why_it_matters = null;
    component.checkboxClicked(evt, rec);
    expect(component).toBeTruthy();
  });

  it('should execute updateFirmDropdown QbrInsightsComponent', () => {
    const evt = {
      value: 'IP'
    };
    let rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0];
    component.updateFirmDropdown(evt, rec);
    fixture.detectChanges();

    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1];
    // rec.type = 'Prevent Rate Increases';
    component.updateFirmDropdown(evt, rec);
    fixture.detectChanges();

    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2];
    // rec.type = 'Partner / Associate Work Allocation';
    component.updateFirmDropdown(evt, rec);
    fixture.detectChanges();

    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6];
    // rec.type = 'Decrease Block Billing';
    component.updateFirmDropdown(evt, rec);
    fixture.detectChanges();

    evt.value = 'Litigation';
    // rec.type = 'Shift Work to Other Firms';
    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[7];
    component.updateFirmDropdown(evt, rec);
    fixture.detectChanges();

    expect(rec.practice_area).toEqual('Litigation');
  });

  it('should execute updateFirmSelection QbrInsightsComponent', () => {
    const evt = {
      value: 17
    };

    // rec.type = 'Shift Work to Other Firms';
    let rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0];
    component.updateFirmSelection(evt, rec);
    fixture.detectChanges();

    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1];
    // rec.type = 'Partner / Associate Work Allocation';
    component.updateFirmSelection(evt, rec);
    fixture.detectChanges();

    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2];
    // rec.type = 'Decrease Block Billing';
    component.updateFirmSelection(evt, rec);
    fixture.detectChanges();

    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6];
    component.updateFirmSelection(evt, rec);
    fixture.detectChanges();

    evt.value = 28974;
    // rec.type = 'Shift Work to Other Firms';
    rec = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[7];
    component.updateFirmSelection(evt, rec);
    fixture.detectChanges();

    expect(rec.firm_id).toEqual(28974);
  });

  it('should execute onChanges for expenses', () => {
    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      reportData: new SimpleChange(MOCK_QBR_DATA.result.report_timeframe_metrics, MOCK_QBR_DATA.result.report_timeframe_metrics, false)
    });
    fixture.detectChanges();
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 25;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      reportData: new SimpleChange(MOCK_QBR_DATA.result.report_timeframe_metrics, MOCK_QBR_DATA.result.report_timeframe_metrics, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 28983;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      reportData: new SimpleChange(MOCK_QBR_DATA.result.report_timeframe_metrics, MOCK_QBR_DATA.result.report_timeframe_metrics, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = null;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      reportData: new SimpleChange(MOCK_QBR_DATA.result.report_timeframe_metrics, MOCK_QBR_DATA.result.report_timeframe_metrics, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 25;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      reportData: new SimpleChange(MOCK_QBR_DATA.result.report_timeframe_metrics, MOCK_QBR_DATA.result.report_timeframe_metrics, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = null;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 123;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 456;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();
    // component.ngOnChanges({
    //   lcYears: new SimpleChange(null, [2020], false)
    // });
    // fixture.detectChanges();
    // expect(component).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should execute onChanges for reportData', () => {
    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].metrics_edited = true;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].metrics_edited = true;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].metrics_edited = true;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].metrics_edited = true;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = null;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].metrics_edited = true;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].metrics_edited = true;

    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.ngOnChanges({
      expenses: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();
    // component.ngOnChanges({
    //   lcYears: new SimpleChange(null, [2020], false)
    // });
    // fixture.detectChanges();
    // expect(component).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should execute onChanges for recommendations', () => {
    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].metrics_edited = true;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].metrics_edited = true;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6].firm_id = 28983;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = true;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = null;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 25;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 123;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'IP';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 28983;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'Litigation';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 456;
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();


    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = true;
    component.parent.report.querystring.expenses = true;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = false;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].practice_area = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].firm_id = 'None';
    mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0].metrics_edited = false;
    component.parent.report.querystring.expenses = true;

    component.ngOnChanges({
      recommendations: new SimpleChange(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS, false)
    });
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should generateNextSteps QbrInsightsComponent', () => {
    component.recommendations = mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS;
    component.nextSteps = [];
    component.editMode = true;
    component.parent.editMode = true;
    component.recommendations[0].practice_area = 'IP';
    component.nextSteps.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3]);
    component.nextSteps.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4]);
    component.nextSteps.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5]);
    component.generateNextSteps(false);
    fixture.detectChanges();

    component.nextSteps = [];
    component.nextSteps.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[3]);
    component.nextSteps.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[4]);
    component.nextSteps.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[5]);
    component.generateNextSteps(true);
    // fixture.detectChanges();

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1]);
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2]);
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2]);
    component.recommendations[0].practice_area = 'IP';
    component.recommendations[0].firm_id = null;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[0]);
    component.recommendations[1].practice_area = 'Litigation';
    component.recommendations[1].firm_id = null;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = 'IP';
    component.recommendations[0].firm_id = null;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = 'Litigation';
    component.recommendations[0].firm_id = null;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = 'None';
    component.recommendations[0].firm_id = null;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = null;
    component.recommendations[0].firm_id = 25;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = null;
    component.recommendations[0].firm_id = 123443;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = 'IP';
    component.recommendations[0].firm_id = 25;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2]);
    component.recommendations[1].practice_area = 'IP';
    component.recommendations[1].firm_id = 25;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1]);
    component.recommendations[2].practice_area = 'IP';
    component.recommendations[2].firm_id = 25;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = 'IP';
    component.recommendations[0].firm_id = 28983;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2]);
    component.recommendations[1].practice_area = 'IP';
    component.recommendations[1].firm_id = 28983;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1]);
    component.recommendations[2].practice_area = 'IP';
    component.recommendations[2].firm_id = 28983;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = 'Litigation';
    component.recommendations[0].firm_id = 123;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2]);
    component.recommendations[1].practice_area = 'Litigation';
    component.recommendations[1].firm_id = 123;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1]);
    component.recommendations[2].practice_area = 'Litigation';
    component.recommendations[2].firm_id = 123;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = 'Litigation';
    component.recommendations[0].firm_id = 456;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2]);
    component.recommendations[1].practice_area = 'Litigation';
    component.recommendations[1].firm_id = 456;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1]);
    component.recommendations[2].practice_area = 'Litigation';
    component.recommendations[2].firm_id = 456;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[6]);
    component.recommendations[0].practice_area = null;
    component.recommendations[0].firm_id = 28983;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[2]);
    component.recommendations[1].practice_area = null;
    component.recommendations[1].firm_id = 28983;
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[1]);
    component.recommendations[2].practice_area = null;
    component.recommendations[2].firm_id = 28983;
    component.nextSteps = [];
    component.generateNextSteps(false);

    component.recommendations = [];
    component.recommendations.push(mockQBRData.MOCK_SAVED_QBR_RECOMMENDATIONS[7]);
    component.nextSteps = [];
    component.generateNextSteps(false);




    expect(component).toBeTruthy();

  });
});
