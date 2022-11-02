import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedesImportsComponent } from './ledes-imports.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {ILedesImport} from './ledes-imports-model';
import {ImportDetailComponent} from './import-detail/import-detail.component';
import {MOCK_IMPORT} from '../../shared/unit-tests/mock-data/ledes-imports';


describe('LedesImportsComponent', () => {
  let component: LedesImportsComponent;
  let fixture: ComponentFixture<LedesImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(LedesImportsComponent, {
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
    fixture = TestBed.createComponent(LedesImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LedesImportsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should loadGrid LedesImportsComponent', () => {
    component.firstLoad = true;
    component.loadGrid();
    expect(component.firstLoad).toBeFalsy();
  });

  it('booleanCellRenderer LedesImportsComponent', () => {
    const params = {value: true};
    const result = component.booleanCellRenderer(params);
    expect(result).toEqual('Yes');
  });

  it('should openModal LedesImportsComponent', () => {
    spyOn(component.matDialog, 'open').and.callThrough();
    try {
      component.openModal(MOCK_IMPORT);
    } catch (err) {
    }
    expect(component.matDialog.open).toHaveBeenCalled();
  });

  it('should openDetailModal LedesImportsComponent', () => {
    spyOn(component.matDialog, 'open').and.callThrough();
    try {
      component.openDetailModal(MOCK_IMPORT);
    } catch (err) {
    }
    expect(component.matDialog.open).toHaveBeenCalled();
  });
});
