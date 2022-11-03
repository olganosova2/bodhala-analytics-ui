import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrComponent } from './qbr.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../shared/unit-tests/mock-services';
import {FiltersService} from '../shared/services/filters.service';
import {MOCK_CLIENT_CONFIGS} from '../shared/unit-tests/mock-data/client-configs';
import {IRecommendation, IRecommendationReport} from '../admin/client-recommendations/client-recommendations-model';
import {QbrService} from './qbr.service';
import {IReport} from './qbr-model';
import * as config from '../shared/services/config';

describe('QbrComponent', () => {
  let component: QbrComponent;
  let fixture: ComponentFixture<QbrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(QbrComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          {provide: QbrService, useClass: mockServices.QbrServiceStub},
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
    fixture = TestBed.createComponent(QbrComponent);
    component = fixture.componentInstance;
    component.gridOptions = component.agGridService.getDefaultGridOptions();
    component.firstLoad = true;
    fixture.detectChanges();
  });

  it('should create QbrComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should viewCellRenderer QbrComponent', () => {
    const result = component.viewCellRenderer();
    expect(result).toBeTruthy();
  });
  it('should editCellRenderer QbrComponent', () => {
    let params = {
      data: {
        status: 'COMPLETE'
      }
    };
    let result = component.editCellRenderer(params);
    expect(result).toBeTruthy();
    params = {
      data: {
        status: 'IN PROGRESS'
      }
    };
    result = component.editCellRenderer(params);
    expect(result).toBeTruthy();
  });
  it('should deleteCellRenderer QbrComponent', () => {
    const result = component.deleteCellRenderer({});
    expect(result).toBeTruthy();
  });

  xit('should saveGridConfig QbrComponent', () => {
    component.gridOptions = component.agGridService.getDefaultGridOptions();
    component.saveGridConfig({});
    expect(component).toBeTruthy();
  });

  it('should execute view QbrComponent', () => {
    const row = {
      data: {
        id: 1
      }
    };
    component.view(row);
    expect(component).toBeTruthy();
  });

  it('should execute edit QbrComponent', () => {
    const row = {
      data: {
        status: 'IN PROGRESS'
      }
    };
    component.edit(row);
    expect(component).toBeTruthy();
  });

  it('should execute addNew QbrComponent', () => {
    component.addNew();
    expect(component).toBeTruthy();
  });

  it('should deleteQBR QbrComponent', () => {
    const row = {
      data: {
        id: 1
      }
    };
    component.deleteQBR(row);
    expect(component).toBeTruthy();
  });

  it('should openDeleteDialog QbrComponent', () => {
    const row = {
      data: {
        id: 1
      }
    };
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDeleteDialog(row);
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
