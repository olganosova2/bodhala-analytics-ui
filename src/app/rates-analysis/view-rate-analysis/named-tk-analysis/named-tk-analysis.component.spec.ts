import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedTkAnalysisComponent } from './named-tk-analysis.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { MOCK_RATE_ANALYSIS_RESULT, MOCK_NAMED_TK_HISTORY, MOCK_PARTNER_MARKET_DATA, MOCK_PARTNER_INTERNAL_DATA,
         MOCK_SENIOR_ASSOCIATE_MARKET_DATA, MOCK_MID_ASSOCIATE_MARKET_DATA, MOCK_JUNIOR_ASSOCIATE_MARKET_DATA,
         MOCK_SENIOR_ASSOCIATE_INTERNAL_DATA, MOCK_MID_ASSOCIATE_INTERNAL_DATA, MOCK_JUNIOR_ASSOCIATE_INTERNAL_DATA, MOCK_INTERNAL_FIRMS, MOCK_MARKET_FIRMS, MOCK_BENCHMARK} from 'src/app/shared/unit-tests/mock-data/rate-benchmarking';
import { AgGridService } from 'bodhala-ui-elements';

describe('NamedTkAnalysisComponent', () => {
  let component: NamedTkAnalysisComponent;
  let fixture: ComponentFixture<NamedTkAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamedTkAnalysisComponent ]
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
    }).overrideComponent(NamedTkAnalysisComponent, {
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
    fixture = TestBed.createComponent(NamedTkAnalysisComponent);
    component = fixture.componentInstance;
    component.benchmark = MOCK_BENCHMARK.benchmark;
    component.internalFirms = MOCK_INTERNAL_FIRMS;
    component.marketAvgFirms = MOCK_MARKET_FIRMS;
    component.seniorAssociateMarketData = MOCK_SENIOR_ASSOCIATE_MARKET_DATA;
    component.midAssociateMarketData = MOCK_MID_ASSOCIATE_MARKET_DATA;
    component.juniorAssociateMarketData = MOCK_JUNIOR_ASSOCIATE_MARKET_DATA;
    component.seniorPartnerMarketData = MOCK_PARTNER_MARKET_DATA[1];
    component.midPartnerMarketData = MOCK_PARTNER_MARKET_DATA[0];
    component.juniorPartnerMarketData = MOCK_PARTNER_MARKET_DATA[2];

    component.seniorAssociateInternalData = MOCK_SENIOR_ASSOCIATE_INTERNAL_DATA;
    component.midAssociateInternalData = MOCK_MID_ASSOCIATE_INTERNAL_DATA;
    component.juniorAssociateInternalData = MOCK_JUNIOR_ASSOCIATE_INTERNAL_DATA;
    component.seniorPartnerInternalData = MOCK_PARTNER_INTERNAL_DATA[1];
    component.midPartnerInternalData = MOCK_PARTNER_INTERNAL_DATA[0];
    component.juniorPartnerInternalData = MOCK_PARTNER_INTERNAL_DATA[2];
    fixture.detectChanges();
  });

  it('should create', () => {
    history.state.data = null;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create w/history', () => {
    history.state.data = MOCK_NAMED_TK_HISTORY.data;
    component.seniorPartnerMarketData = MOCK_PARTNER_MARKET_DATA[1];
    component.midPartnerMarketData = MOCK_PARTNER_MARKET_DATA[0];
    component.juniorPartnerMarketData = MOCK_PARTNER_MARKET_DATA[2];
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should execute marketAvgDiffRenderer', () => {
    const params = {
      value: 800,
      node: {
        data: {
          within_market_range: false,
          market_lower_diff: -0.05,
          market_upper_diff: -0.10
        }
      }
    };
    let result = component.marketAvgDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.node.data.market_lower_diff = 0.01;
    params.node.data.market_upper_diff = 0.10;
    result = component.marketAvgDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.node.data.market_upper_diff = 0.25;
    result = component.marketAvgDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.node.data.within_market_range = true;
    result = component.marketAvgDiffRenderer(params);
    expect(result).toBeTruthy();

    params.value = null;
    params.node.data.within_market_range = false;
    result = component.marketAvgDiffRenderer(params);
    expect(result).toBeTruthy();
  });

  it('should execute internalRateDiffRenderer', () => {
    const params = {
      value: -.1
    };
    let result = component.rateDiffRenderer(params);
    fixture.detectChanges();

    params.value = 0.01;
    result = component.rateDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.value = 0.25;
    result = component.rateDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.value = null;
    result = component.rateDiffRenderer(params);
    expect(result).toBeTruthy();
  });
});
