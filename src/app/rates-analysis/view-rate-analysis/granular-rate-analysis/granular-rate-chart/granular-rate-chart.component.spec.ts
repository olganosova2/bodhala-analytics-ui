import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranularRateChartComponent } from './granular-rate-chart.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../../../shared/services/filters.service';
import * as mockServices from '../../../../shared/unit-tests/mock-services';
import { RatesAnalysisService } from '../../../rates-analysis.service';
import { MOCK_RATE_ANALYSIS_RESULT, MOCK_HISTORY, MOCK_BENCHMARK, MOCK_PARTNER_MARKET_INTERNAL_DATA, MOCK_SENIOR_ASSOCIATE_MI_DATA, MOCK_MID_ASSOCIATE_MI_DATA, MOCK_JUNIOR_ASSOCIATE_MI_DATA } from 'src/app/shared/unit-tests/mock-data/rate-benchmarking';

describe('GranularRateChartComponent', () => {
  let component: GranularRateChartComponent;
  let fixture: ComponentFixture<GranularRateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranularRateChartComponent ]
    })
    .compileComponents();
  }));

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(GranularRateChartComponent, {
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
    fixture = TestBed.createComponent(GranularRateChartComponent);
    component = fixture.componentInstance;
    component.benchmark = MOCK_BENCHMARK.benchmark;
    fixture.detectChanges();
  });

  it('should create w/associate', () => {
    component.classification = 'associate';
    component.seniority = 'junior';
    component.marketInternalData = MOCK_JUNIOR_ASSOCIATE_MI_DATA;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create w/partner', () => {
    component.marketInternalData = MOCK_PARTNER_MARKET_INTERNAL_DATA;
    component.classification = 'partner';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
