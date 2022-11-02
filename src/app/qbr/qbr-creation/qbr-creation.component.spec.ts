import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrCreationComponent } from './qbr-creation.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {QbrService} from '../qbr.service';
import {FiltersService} from '../../shared/services/filters.service';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {MOCK_QBR} from '../../shared/unit-tests/mock-data/qbr';
import { MOCK_QBR_DATA, MOCK_QBR_RECOMMENDATIONS } from '../../shared/unit-tests/mock-data/qbr-executive-summary';
import {FormControl} from '@angular/forms';

describe('QbrCreationComponent', () => {
  let component: QbrCreationComponent;
  let fixture: ComponentFixture<QbrCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QbrCreationComponent ]
    })
    .compileComponents();
  }));



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrCreationComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: QbrService, useClass: mockServices.QbrServiceStub},
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
    fixture = TestBed.createComponent(QbrCreationComponent);
    component = fixture.componentInstance;
    component.editMode = false;
    component.reportId = null;
    fixture.detectChanges();
  });

  it('should create QbrCreationComponent not editMode', () => {
    component.editMode = false;
    component.reportId = null;
    expect(component).toBeTruthy();
  });

  it('should create QbrCreationComponent in editMode', () => {
    component.editMode = true;
    component.reportId = 276;
    component.report = MOCK_QBR;
    expect(component).toBeTruthy();
  });

  it('should toggleExpenses QbrCreationComponent', () => {
    component.filtersService.includeExpenses =  false;
    component.recommendations = MOCK_QBR_RECOMMENDATIONS;
    component.reportData = MOCK_QBR_DATA.result.report_timeframe_metrics;
    component.report = MOCK_QBR;
    component.toggleExpenses();
    const test = component.filtersService.includeExpenses;
    component.toggleExpenses();
    expect(test).toBe(true);
  });

  it('should updateDateRange QbrCreationComponent', () => {
    component.dateForm.addControl('startDate', new FormControl());
    component.dateForm.controls.startDate.setValue('2019-03-01');
    component.updateDateRange();
    expect(component).toBeTruthy();
  });

  xit('should generateQBR QbrCreationComponent', () => {
    component.editMode = false;
    component.reportId = null;
    component.reportType = 'YoY';
    component.generateQBR();
    expect(component).toBeTruthy();
  });
});
