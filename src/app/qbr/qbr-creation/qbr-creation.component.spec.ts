import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrCreationComponent } from './qbr-creation.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {QbrService} from '../qbr.service';
import {FiltersService} from '../../shared/services/filters.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '../../shared/services/common.service';
import {SERVICE_PROVIDERS} from '../../shared/unit-tests/mock-app.imports';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {BenchmarkService} from '../../benchmarks/benchmark.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MOCK_QUARTER_DATES, MOCK_GENERIC_QBR_RECOMMENDATIONS, MOCK_SAVED_QBR_RECOMMENDATIONS, MOCK_QBR} from '../../shared/unit-tests/mock-data/qbr';
import { MOCK_QBR_DATA, MOCK_QBR_RECOMMENDATIONS } from '../../shared/unit-tests/mock-data/qbr-executive-summary';
import {FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {IReport, QbrType, DEFAULT_CHOSEN_METRICS} from '../qbr-model';
import {SelectItem} from 'primeng/api';
import * as moment from 'moment';

describe('QbrCreationComponent', () => {
  let component: QbrCreationComponent;
  let fixture: ComponentFixture<QbrCreationComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

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
          {provide: Router, useValue: mockRouter},
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
    fixture.detectChanges();
  });

  xit('should create QbrCreationComponent not editMode', () => {
    component.editMode = false;
    component.reportId = null;
    expect(component).toBeTruthy();
  });

  xit('should create QbrCreationComponent in editMode', () => {
    component.editMode = true;
    component.reportId = 276;
    component.report = MOCK_QBR;
    expect(component).toBeTruthy();
  });

  xit('should toggleExpenses QbrCreationComponent', () => {
    component.filtersService.includeExpenses =  false;
    component.recommendations = MOCK_QBR_RECOMMENDATIONS;
    component.reportData = MOCK_QBR_DATA.result.report_timeframe_metrics;
    component.report = MOCK_QBR;
    component.toggleExpenses();
    const test = component.filtersService.includeExpenses;
    component.toggleExpenses();
    expect(test).toBe(true);
  });

  xit('should updateDateRange QbrCreationComponent', () => {
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
