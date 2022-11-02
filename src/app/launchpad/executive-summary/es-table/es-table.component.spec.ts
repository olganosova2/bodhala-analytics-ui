import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsTableComponent } from './es-table.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {ExecutiveSummaryComponent} from '../executive-summary.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';

describe('EsTableComponent', () => {
  let component: EsTableComponent;
  let fixture: ComponentFixture<EsTableComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(EsTableComponent, {
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
    fixture = TestBed.createComponent(EsTableComponent);
    component = fixture.componentInstance;
    component.maxDate = '2019-06-24';
    fixture.detectChanges();
  });

  it('should create EsTableComponent', () => {
    expect(component).toBeTruthy();
  });
});
