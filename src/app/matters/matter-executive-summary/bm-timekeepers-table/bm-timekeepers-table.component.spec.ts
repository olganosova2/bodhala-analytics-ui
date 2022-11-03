import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmTimekeepersTableComponent } from './bm-timekeepers-table.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterDocumentsComponent} from '../matter-documents/matter-documents.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_NAMED_TKS} from '../../../shared/unit-tests/mock-data/matter-overview';
import {BMSetupType} from '../model';

describe('BmTimekeepersTableComponent', () => {
  let component: BmTimekeepersTableComponent;
  let fixture: ComponentFixture<BmTimekeepersTableComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BmTimekeepersTableComponent, {
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
    fixture = TestBed.createComponent(BmTimekeepersTableComponent);
    component = fixture.componentInstance;
    component.timekeepers = MOCK_NAMED_TKS.result;
    component.totalHours = 100;
    fixture.detectChanges();
  });

  it('should create BmTimekeepersTableComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should sort', () => {
    component.sort({label: 'Last Name', field: 'last_name'});
    expect(component.columns.length).toBe(7);
  });
});
