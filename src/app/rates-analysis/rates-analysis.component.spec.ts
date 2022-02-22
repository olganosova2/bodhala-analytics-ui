import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesAnalysisComponent } from './rates-analysis.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../shared/unit-tests/mock-services';
import {FiltersService} from '../shared/services/filters.service';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RatesAnalysisService } from './rates-analysis.service';
import {MOCK_RATE_BENCHMARKS} from '../shared/unit-tests/mock-data/rate-benchmarking';
import {IRateBenchmark, moneyFormatter, percentFormatter, COST_IMPACT_GRADES} from '../rates-analysis/rates-analysis.model';


describe('RatesAnalysisComponent', () => {
  let component: RatesAnalysisComponent;
  let fixture: ComponentFixture<RatesAnalysisComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(RatesAnalysisComponent, {
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
    fixture = TestBed.createComponent(RatesAnalysisComponent);
    component = fixture.componentInstance;
    component.firstLoad = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should processData in range', () => {
    component.clientRateBenchmarks = []
    component.clientRateBenchmarks.push(MOCK_RATE_BENCHMARKS.result[5]);
    component.processData();
    expect(component).toBeTruthy();
  });

  it('should processData below range', () => {
    component.clientRateBenchmarks = []
    component.clientRateBenchmarks.push(MOCK_RATE_BENCHMARKS.result[4]);
    component.processData();
    expect(component).toBeTruthy();
  });

  it('should execute associateRateDiffRenderer', () => {
    let params = {
      data: {
        assoc_within_range: false,
        assoc_lower_diff_pct: -0.05,
        assoc_upper_diff_pct: -0.10,
        market_data: {
          associate_lo: 400,
          associate_hi: 600,
        }
      }
    };
    let result = component.associateRateDiffRenderer(params);
    fixture.detectChanges();

    params.data.assoc_lower_diff_pct = 0.01;
    params.data.assoc_upper_diff_pct = 0.10;
    result = component.associateRateDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.data.assoc_upper_diff_pct = 0.25;
    result = component.associateRateDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.data.assoc_within_range = true;
    result = component.associateRateDiffRenderer(params);
    expect(result).toBeTruthy();
  });

  it('should execute partnerRateDiffRenderer', () => {
    let params = {
      data: {
        partner_within_range: false,
        partner_lower_diff_pct: -0.05,
        partner_upper_diff_pct: -0.10,
        market_data: {
          partner_lo: 800,
          partner_hi: 1000
        }
      }
    };
    let result = component.partnerRateDiffRenderer(params);
    fixture.detectChanges();

    params.data.partner_lower_diff_pct = 0.01;
    params.data.partner_upper_diff_pct = 0.10;
    result = component.partnerRateDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.data.partner_upper_diff_pct = 0.25;
    result = component.partnerRateDiffRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.data.partner_within_range = true;
    result = component.partnerRateDiffRenderer(params);
    expect(result).toBeTruthy();
  });

  it('should execute historicalCostRenderer', () => {
    let params = {
      data: {
        blended_within_range: false,
        blended_rate_lower_diff: -50000,
        blended_rate_upper_diff: -10000,
        cost_impact: 'HIGH'
      }
    };
    let result = component.historicalCostRenderer(params);
    fixture.detectChanges();

    params.data.blended_rate_lower_diff = 25000;
    params.data.blended_rate_upper_diff = 50000;
    result = component.historicalCostRenderer(params);
    expect(result).toBeTruthy();
    fixture.detectChanges();

    params.data.blended_within_range = true;
    result = component.historicalCostRenderer(params);
    expect(result).toBeTruthy();
  });

  it('should execute costImpactCellRenderer', () => {
    const params = {
      data: {
        cost_impact: 'HIGH'
      }
    };
    const result = component.costImpactCellRenderer(params);
    expect(result).toBeTruthy();
  });

  it('should execute costImpactCellRenderer', () => {
    const result = component.viewCellRenderer();
    expect(result).toBeTruthy();
  });

  it('should execute view', () => {
    component.view({data: {id: null}});
    expect(component).toBeTruthy();
  });
});
