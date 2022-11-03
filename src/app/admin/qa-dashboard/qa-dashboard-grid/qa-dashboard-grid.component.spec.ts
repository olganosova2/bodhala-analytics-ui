import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaDashboardGridComponent } from './qa-dashboard-grid.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {QaDashboardComponent} from '../qa-dashboard.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('QaDashboardGridComponent', () => {
  let component: QaDashboardGridComponent;
  let fixture: ComponentFixture<QaDashboardGridComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QaDashboardGridComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
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
    fixture = TestBed.createComponent(QaDashboardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QaDashboardGridComponent', () => {
    expect(component).toBeTruthy();
  });
});
