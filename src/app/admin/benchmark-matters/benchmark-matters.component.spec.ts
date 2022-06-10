import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkMattersComponent } from './benchmark-matters.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {ClientConfigsComponent} from '../client-configs/client-configs.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {IBmSetupType} from './model';

describe('BenchmarkMattersComponent', () => {
  let component: BenchmarkMattersComponent;
  let fixture: ComponentFixture<BenchmarkMattersComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BenchmarkMattersComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub},
          { provide: CommonService, useClass: mockServices.CommonServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkMattersComponent);
    component = fixture.componentInstance;
    component.selectedClient = {
      bh_client_id: 110,
      org_name: 'Blackrock',
      org_id: 152,
      missingSmartPA: false
    };
    fixture.detectChanges();
  });

  it('should create BenchmarkMattersComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should getClientBmData', () => {
    const client = {
      bh_client_id: 110,
      org_name: 'Blackrock',
      org_id: 152,
      missingSmartPA: false
    };
    component.getClientBmData(client);
    expect(component.clientWasSelected).toBe(true);
  });
  it('should getSmartPAs', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.smartPAs = [];
    component.getSmartPAs();
    expect(component.smartPAs.length).toBeTruthy();
  });
  // xit('should processBmConfig', () => {
  //   component.clientBmConfig = component.createNewBmConfig();
  //   component.clientBmConfig.json_config.smartPAs = ['M&A'];
  //   component.processBmConfig(component.clientBmConfig);
  //   expect(component.smartPAs.length).toBeTruthy();
  // });
  it('should getOptionText', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    const result = component.getOptionText({ name: 'Lux'});
    expect(result).toBe('Lux');
  });
  it('should loadMatters', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.loadMatters('Lux');
    expect(component.filteredNames.length).toBe(2);
  });
  it('should loadMatters when null', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.loadMatters(null);
    expect(component.filteredNames.length).toBe(0);
  });
  it('should selectMatter', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    const matter = { option: { value: {id: '1', name: 'Lux'}}} as MatAutocompleteSelectedEvent;
    component.selectMatter(matter);
    expect(component.selectedMatter.id).toBe('1');
  });
  it('should saveClientConfig when 1', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.saveClientConfig(1);
    expect(component.displayMatters.length).toBe(0);
  });
  it('should saveClientConfig when 2', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.saveClientConfig(2);
    expect(component.displayPAs.length).toBe(0);
  });
  it('should saveClientConfig when 3', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.saveClientConfig(3);
    expect(component.displayMatters.length).toBe(0);
  });
  it('should deletePA', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.clientBmConfig.json_config.smartPAs = ['M&A'];
    component.deletePA('M&A');
    component.clientBmConfig = component.createNewBmConfig();
    expect(component.clientBmConfig.json_config.smartPAs.length).toBe(0);
  });
  it('should deleteConfig', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.deleteConfig(3);
    expect(component.bmSetupType).toBe(IBmSetupType.SelectedMatters);
  });
  it('should selectAll', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.selectAll();
    expect(component.clientBmConfig.json_config).toBeUndefined();
  });
  xit('should addSmartPA', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.addSmartPA();
    expect(component.clientBmConfig.json_config).toBeUndefined();
  });
  it('should addMatter', () => {
    component.clientBmConfig = Object.assign({}, component.createNewBmConfig());
    component.selectedMatter = { id: '1', name: 'Lux'};
    component.addMatter();
    expect(component.selectedMatter).toBe(null);
  });
});
