import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrDashboardComponent } from './qbr-dashboard.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {QbrDeckComponent} from '../qbr-deck/qbr-deck.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('QbrDashboardComponent', () => {
  let component: QbrDashboardComponent;
  let fixture: ComponentFixture<QbrDashboardComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrDashboardComponent, {
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
    fixture = TestBed.createComponent(QbrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QbrDashboardComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should buildGrid', () => {
    component.gridOptions = {};
    // component.gridOptions.api = {} as unknown;
    expect(component).toBeTruthy();
  });
});
