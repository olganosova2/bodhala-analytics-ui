import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConfigComponent } from './add-edit-config.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {ClientConfigsComponent} from '../client-configs.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_CLIENT_CONFIGS} from '../../../shared/unit-tests/mock-data/client-configs';
import {IEntityConfig} from '../client-configs-model';

describe('AddEditConfigComponent', () => {
  let component: AddEditConfigComponent;
  let fixture: ComponentFixture<AddEditConfigComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AddEditConfigComponent, {
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
    fixture = TestBed.createComponent(AddEditConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.allConfigs = MOCK_CLIENT_CONFIGS.result as unknown as Array<IEntityConfig>;
  });

  it('should create AddEditConfigComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should validateForm without json config parsed', () => {
    component.config.name = 'analytics.pastsavings';
    component.config.json_config_parsed = null;
    component.config.json_config = {name: 'John'};
    const result = component.validateForm();
    expect(result).toBe(true);
  });
  it('should validateForm with json config parsed', () => {
    component.config.name = 'analytics.pastsavings';
    component.config.json_config_parsed = 'John';
    component.config.json_config = {name: 'John'};
    const result = component.validateForm();
    expect(result).toBe(false);
  });
  it('should getDistinctNames', () => {
    component.getDistinctNames();
    expect(component).toBeTruthy();
  });
  it('should saveConfig', () => {
    component.config.name = 'analytics.pastsavings2';
    component.saveConfig();
    expect(component).toBeTruthy();
  });
});
