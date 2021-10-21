import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrGenericMetricComponent } from './qbr-generic-metric.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {QbrExecutiveSummaryRightComponent} from '../qbr-executive-summary/qbr-executive-summary-right/qbr-executive-summary-right.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('QbrGenericMetricComponent', () => {
  let component: QbrGenericMetricComponent;
  let fixture: ComponentFixture<QbrGenericMetricComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrGenericMetricComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbrGenericMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QbrGenericMetricComponent', () => {
    expect(component).toBeTruthy();
  });
});
