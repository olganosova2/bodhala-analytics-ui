import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTrendComponent } from './score-trend.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {DiversityComponent} from '../diversity/diversity.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';
import {QueryList} from '@angular/core';
import {ScoreBadgeComponent} from './score-badge/score-badge.component';
import {trendChart} from '../firm.model';


const chart = Object.assign({}, trendChart);
describe('ScoreTrendComponent', () => {
  let component: ScoreTrendComponent;
  let fixture: ComponentFixture<ScoreTrendComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ScoreTrendComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTrendComponent);
    component = fixture.componentInstance;
    component.firm =  MOCK_FIRM;
    component.firmId = 1;
    component.trends = {};
    component.trends.peer_trends = [];
    component.trends.client_trends = [];
    component.trends.firm_trends = [];
    // component.chart = chart;
    // tslint:disable-next-line:only-arrow-functions
    // component.chart.setData = function(data) {};
    component.scoreBadges = [] as unknown as QueryList<ScoreBadgeComponent>;
    fixture.detectChanges();
  });

  it('should create ScoreTrendComponent', () => {
    expect(component).toBeTruthy();
  });
  // it('should setUpChart', () => {
  //   expect(component).toBeTruthy();
  // });
});
