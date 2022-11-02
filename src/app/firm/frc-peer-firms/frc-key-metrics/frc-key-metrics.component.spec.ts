import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcKeyMetricsComponent } from './frc-key-metrics.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {FrcPeerFirmsComponent} from '../frc-peer-firms.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('FrcKeyMetricsComponent', () => {
  let component: FrcKeyMetricsComponent;
  let fixture: ComponentFixture<FrcKeyMetricsComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(FrcKeyMetricsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
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
    fixture = TestBed.createComponent(FrcKeyMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FrcKeyMetricsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should openDetails', () => {
    component.openDetails();
    expect(component.dialog).toBeTruthy();
  });
});
