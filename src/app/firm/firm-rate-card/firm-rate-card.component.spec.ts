import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmRateCardComponent } from './firm-rate-card.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {ScoreTrendComponent} from '../score-trend/score-trend.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_FIRM} from '../../shared/unit-tests/mock-data/firm';
import {IFirm} from '../firm.model';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {MOCK_ANNOTATIONS} from '../../shared/unit-tests/mock-data/annotations';
import {IUiAnnotation} from '../../shared/components/annotations/model';
import {FILTERS_LS} from '../../shared/unit-tests/mock-data/filters';
import { SpendTrendChartComponent } from './spend-trend-chart/spend-trend-chart.component';

describe('FirmRateCardComponent', () => {
  let component: FirmRateCardComponent;
  let fixture: ComponentFixture<FirmRateCardComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FirmRateCardComponent, {
      set: {
        providers: [
          AppStateService,
          SpendTrendChartComponent,
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmRateCardComponent);
    component = fixture.componentInstance;
    component.firm = MOCK_FIRM as IFirm;
    component.firmId = '87';
    fixture.detectChanges();
  });

  it('should create FirmRateCardComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should initFirm', () => {
    component.otherFirms = true;
   // component.firmId = '87';
    component.initFirm();
    expect(component.rank).toBe(-1);
  });
  it('should navigate', () => {
    component.editReportCard();
    expect(component).toBeTruthy();
  });
  it('should goToTop', () => {
    component.goToTop();
    expect(component).toBeTruthy();
  });
  it('should loadNotes', () => {
    const notes = MOCK_ANNOTATIONS.result as Array<IUiAnnotation>;
    component.loadNotes(notes);
    expect(component.notes.length).toBe(1);
  });
  it('should formatLogoUrl', () => {
    const url = '/img/clients/img123';
    const result = component.formatLogoUrl(url);
    expect(result).toBeTruthy();
  });

  it('should compareDates', () => {
    const dates = {startdate: '2017-09-25', enddate: '2019-09-25'};
    component.comparisonStartDate = '2017-09-25';
    component.comparisonEndDate = '2019-09-25';
    const serializedState = JSON.stringify(FILTERS_LS);
    localStorage.setItem('ELEMENTS_dataFilters_397', serializedState);
    component.userService.currentUser.id = 397;
    component.getCompareDates(dates);
    expect(component).toBeTruthy();
  });

  it('should changeTabs', () => {
    const serializedState = JSON.stringify(FILTERS_LS);
    localStorage.setItem('ELEMENTS_dataFilters_397', serializedState);
    component.userService.currentUser.id = 397;
    component.selectedTabIndex = 1;
    const evt = {index: 1, tab: {}};
    component.changeTab(evt);
    expect(component).toBeTruthy();
  });

  it('should changeTabs to Report Card', () => {
    component.reportCardStartDate = '2017-09-25';
    component.reportCardEndDate = '2019-09-25';
    const serializedState = JSON.stringify(FILTERS_LS);
    localStorage.setItem('ELEMENTS_dataFilters_397', serializedState);
    component.userService.currentUser.id = 397;
    component.selectedTabIndex = 0;
    const evt = {index: 0, tab: {}};
    component.changeTab(evt);
    expect(component).toBeTruthy();
  });

  // it('should refreshData', () => {
  //   component.refreshData(null);
  //   expect(component).toBeTruthy();
  // });

});
