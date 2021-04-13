import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigsComponent } from './client-configs.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {RateIncreaseComponent} from '../rate-increase/rate-increase.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_CLIENT_CONFIGS} from '../../shared/unit-tests/mock-data/client-configs';
import {IEntityConfig} from './client-configs-model';

describe('ClientConfigsComponent', () => {
  let component: ClientConfigsComponent;
  let fixture: ComponentFixture<ClientConfigsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(ClientConfigsComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
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
    fixture = TestBed.createComponent(ClientConfigsComponent);
    component = fixture.componentInstance;
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    fixture.detectChanges();
  });

  it('should create ClientConfigsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should loadConfigs', () => {
    const client = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    component.loadConfigs(client);
    expect(component.selectedClient.org_id).toBe(1);
  });
  it('should getClientConfigs', () => {
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    component.getClientConfigs();
    expect(component.selectedClient.org_id).toBe(1);
  });
  it('should loadGrid', () => {
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    const result = component.loadGrid();
    expect(component.selectedClient.org_id).toBe(1);
  });
  it('should openModal', () => {
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    spyOn(component.dialog, 'open').and.callThrough();
    const newItem = component.createNewConfig();
    try {
      component.openModal(newItem);
    } catch (err) {
    }
    expect(component.dialog.open).toHaveBeenCalled();
  });
  it('should createNewConfig', () => {
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    const result = component.createNewConfig();
    expect(result.id).toBe(null);
  });
  it('should deleteConfig', () => {
    const item  = MOCK_CLIENT_CONFIGS.result[0] as unknown as IEntityConfig;
    component.deleteConfig(item);
    expect(component).toBeTruthy();
  });
  it('should openDeleteDialog', () => {
    component.selectedClient = { org_id: 1, org_name: 'AIG', bh_client_id: 190};
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDeleteDialog({data: 123});
    expect(component.dialog.open).toHaveBeenCalled();
  });
  it('should editCellRenderer', () => {
    const result = component.editCellRenderer({ id: 1});
    expect(result).toBeTruthy();
  });
  it('should deleteCellRenderer', () => {
    const result = component.deleteCellRenderer({ id: 1});
    expect(result).toBeTruthy();
  });
  it('should edit', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    try {
    component.edit({data: 123});
    } catch (err) {
    }
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
