import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GenericMetricsRightComponent} from './generic-metrics-right.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {QbrType} from '../../qbr-model';

describe('GenericMetricsRightComponent', () => {
  let component: GenericMetricsRightComponent;
  let fixture: ComponentFixture<GenericMetricsRightComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(GenericMetricsRightComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass:mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMetricsRightComponent);
    component = fixture.componentInstance;
    component.qbrType = QbrType.YoY;
    fixture.detectChanges();
  });

  it('should create GenericMetricsRightComponent', () => {
    expect(component).toBeTruthy();
  });
});
