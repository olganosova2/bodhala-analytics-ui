import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrExecutiveSummaryRightComponent } from './qbr-executive-summary-right.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {QbrExecutiveSummaryComponent} from '../qbr-executive-summary.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock } from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('QbrExecutiveSummaryRightComponent', () => {
  let component: QbrExecutiveSummaryRightComponent;
  let fixture: ComponentFixture<QbrExecutiveSummaryRightComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrExecutiveSummaryRightComponent, {
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
    fixture = TestBed.createComponent(QbrExecutiveSummaryRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QbrExecutiveSummaryRightComponent', () => {
    expect(component).toBeTruthy();
  });
});
