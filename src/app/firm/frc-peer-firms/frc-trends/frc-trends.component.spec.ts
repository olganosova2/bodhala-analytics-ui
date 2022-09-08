import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcTrendsComponent } from './frc-trends.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {KeyMetricItemComponent} from '../key-metric-item/key-metric-item.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_FRC_TRENDS_DATA, MOCK_SPEND_BY_YEAR} from '../../../shared/unit-tests/mock-data/frc';
import * as _moment from 'moment';
import {TrendsChartMode} from '../frc-service.service';
import {CommonService} from '../../../shared/services/common.service';
import {DatesPickerComponent} from 'bodhala-ui-elements';

const moment = _moment;

describe('FrcTrendsComponent', () => {
  let component: FrcTrendsComponent;
  let fixture: ComponentFixture<FrcTrendsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    getCurrentNavigation: jasmine.createSpy('getCurrentNavigation')
  };
  const filtersSet = {clientId: 190, startdate: '2019-01-01', enddate: '2019-01-01', compareStartDate: '2019-01-01', compareEndDate: '2019-01-01', firms: JSON.stringify([4, 8, 724, 9353])};
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcTrendsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub },
           { provide: CommonService, useClass: mockServices.CommonServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrcTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FrcTrendsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should refreshData', () => {
    component.filterSet =  filtersSet;
    component.refreshData({});
    // component.filterSet =  filtersSet;
    expect(component.filterSet.startdate).toBe('2019-01-01');
  });
  it('should viewSavedReports', () => {
    component.filterSet =  filtersSet;
    component.viewSavedReports();
    expect(component.filterSet.startdate).toBe('2019-01-01');
  });
  it('should saveFrc', () => {
    component.firmId = 87;
    component.filterSet =  filtersSet;
    component.saveFrc();
    expect(component.filterSet.startdate).toBe('2019-01-01');
  });
  it('should processData', () => {
    const records = MOCK_SPEND_BY_YEAR.result;
    component.processData(records);
    expect(records.length).toBe(6);
  });
  xit('should setUpCompareDates', () => {
    component.dpDates = {} as DatesPickerComponent;
    component.dpDates.selectedStartDate =  new Date('2017-07-30');
    component.dpDates.selectedEndDate =  new Date('2019-07-30');
    component.setUpCompareDates();
    expect(component.filterSet.compareStartDate).toBeTruthy();
  });
  it('should switchChartMode', () => {
    component.trendsChartMode = TrendsChartMode.YoY;
    component.switchChartMode();
    expect(component.trendsChartMode).toBe(TrendsChartMode.QoQ);
  });
});
