import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRateAnalysisComponent } from './view-rate-analysis.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import { RatesAnalysisService } from '../rates-analysis.service';
import { MOCK_RATE_ANALYSIS_RESULT } from 'src/app/shared/unit-tests/mock-data/rate-benchmarking';
import { rateBenchmarkingChartOptions } from '../rates-analysis.model';



describe('ViewRateAnalysisComponent', () => {
  let component: ViewRateAnalysisComponent;
  let fixture: ComponentFixture<ViewRateAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRateAnalysisComponent ]
    })
    .compileComponents();
  }));

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockBM = {
    id: 8,
    bh_client_id: 167,
    bh_lawfirm_id: 25,
    smart_practice_area: 'M&A',
    year: 2019,
    peers: [
        'Skadden, Arps, Slate, Meagher & Flom',
        'Gibson, Dunn & Crutcher',
        'Sullivan & Cromwell',
        'Ropes & Gray',
        'Proskauer Rose'
    ],
    created_by: '579',
    created_on: '2022-02-04T14:35:39.119916',
    deleted_by: null,
    deleted_on: null,
    modified_by: null,
    modified_on: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ViewRateAnalysisComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: RatesAnalysisService, useClass: mockServices.RatesAnalysisServiceStub},
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
    fixture = TestBed.createComponent(ViewRateAnalysisComponent);
    component = fixture.componentInstance;
    component.benchmark = mockBM;
    component.firmId = mockBM.bh_lawfirm_id;
    component.practiceArea = mockBM.smart_practice_area;
    component.year = mockBM.year;
    component.peerFirms = mockBM.peers;
    fixture.detectChanges();
  });

  it('should create ViewRateAnalysisComponent', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  xit('should saveInstanceTotal', () => {
    component.overallSpendData = MOCK_RATE_ANALYSIS_RESULT.result.overall_spend;
    component.firmTotalSpend = 1000000;
    const chartInstance = rateBenchmarkingChartOptions;
    component.saveInstanceTotal(chartInstance);
    expect(component).toBeTruthy();
  });

  xit('should saveInstancePATotal', () => {
    component.overallSpendPAData = MOCK_RATE_ANALYSIS_RESULT.result.overall_pa_spend;
    component.firmTotalSpend = 1000000;
    const chartInstance = rateBenchmarkingChartOptions;
    component.saveInstancePATotal(chartInstance);
    expect(component).toBeTruthy();
  });
});
