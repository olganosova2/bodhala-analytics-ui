import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSavingsComponent } from './past-savings.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {OverstaffingGridComponent} from '../overstaffing-grid/overstaffing-grid.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('PastSavingsComponent', () => {
  let component: PastSavingsComponent;
  let fixture: ComponentFixture<PastSavingsComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(PastSavingsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PastSavingsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should create initConfig', () => {
    component.userService.config = {
      'analytics.pastsavings': {
        configs: [{
          value: null,
          description: 'Past Savings',
          json_config: {
            bb_start_date: '2019-04-01',
            meetings_start_date: '2018-06-26',
            overstaffing_number: 3,
            overstaffing_percent: 0.2,
            rate_increase_percent: 0.01,
            percent_annual_increase: 0.03
          }
        }]
      }
    };
    component.initConfig();
    expect(component).toBeTruthy();
  });
});
