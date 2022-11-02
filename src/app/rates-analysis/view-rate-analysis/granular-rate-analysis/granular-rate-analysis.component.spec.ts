import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranularRateAnalysisComponent } from './granular-rate-analysis.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../../shared/services/filters.service';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { MOCK_RATE_ANALYSIS_RESULT, MOCK_HISTORY } from 'src/app/shared/unit-tests/mock-data/rate-benchmarking';

describe('GranularRateAnalysisComponent', () => {
  let component: GranularRateAnalysisComponent;
  let fixture: ComponentFixture<GranularRateAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranularRateAnalysisComponent ]
    })
    .compileComponents();
  }));


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(GranularRateAnalysisComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
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
    fixture = TestBed.createComponent(GranularRateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create w/history', () => {
    history.state.data = MOCK_HISTORY.data;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
