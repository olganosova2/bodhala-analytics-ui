import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyMetricItemComponent } from './key-metric-item.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {FrcKeyMetricsComponent} from '../frc-key-metrics/frc-key-metrics.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
// tslint:disable-next-line:import-spacing
import * as mockServices from  '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('KeyMetricItemComponent', () => {
  let component: KeyMetricItemComponent;
  let fixture: ComponentFixture<KeyMetricItemComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(KeyMetricItemComponent, {
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
    fixture = TestBed.createComponent(KeyMetricItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create KeyMetricItemComponent', () => {
    expect(component).toBeTruthy();
  });
});
