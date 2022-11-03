import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrTimekeepersComponent } from './qbr-timekeepers.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {GenericMetricsRightComponent} from '../generic-metrics-right/generic-metrics-right.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('QbrTimekeepersComponent', () => {
  let component: QbrTimekeepersComponent;
  let fixture: ComponentFixture<QbrTimekeepersComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrTimekeepersComponent, {
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
    fixture = TestBed.createComponent(QbrTimekeepersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QbrTimekeepersComponent', () => {
    expect(component).toBeTruthy();
  });
});
