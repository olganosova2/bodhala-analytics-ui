import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterBenchmarkingLandingComponent } from './matter-benchmarking-landing.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {MatterDocumentsComponent} from '../matter-documents/matter-documents.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../../shared/unit-tests/mock-services';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {BMSetupType} from '../model';
import {MatPaginator} from '@angular/material/paginator';

describe('MatterBenchmarkingLandingComponent', () => {
  let component: MatterBenchmarkingLandingComponent;
  let fixture: ComponentFixture<MatterBenchmarkingLandingComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(MatterBenchmarkingLandingComponent, {
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
    fixture = TestBed.createComponent(MatterBenchmarkingLandingComponent);
    component = fixture.componentInstance;
    component.smartPA = { label: 'Real Estate', value: 'Real Estate'};
    fixture.detectChanges();
  });

  it('should create MatterBenchmarkingLandingComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should checkConfig when all matters', () => {
    component.userService.config = {'analytics.practice.bodhala.areas': {configs: [{description: 'config for analytics practice areas', value: 'Client Practice Areas', json_config: 'Client Practice Areas'}]},
      'benchmarks.matter.config': {configs: [{description: 'config for BM', value: null, json_config: { matters: []}}]}};
    component.checkConfig();
    expect(component.userBMSetup).toBe(BMSetupType.AllMatters);
  });

  it('should checkConfig when 1 matter', () => {
    component.userService.config = {'analytics.practice.bodhala.areas': {configs: [{description: 'config for analytics practice areas', value: 'Client Practice Areas', json_config: 'Client Practice Areas'}]},
      'benchmarks.matter.config': {configs: [{description: 'config for BM', value: null, json_config: { matters: [ '007']}}]}};
    component.checkConfig();
    expect(component.userBMSetup).toBe(BMSetupType.SelectedMatters);
  });
  it('should checkConfig when Smart PA', () => {
    component.userService.config = {'analytics.practice.bodhala.areas': {configs: [{description: 'config for analytics practice areas', value: 'Client Practice Areas', json_config: 'Client Practice Areas'}]},
      'benchmarks.matter.config': {configs: [{description: 'config for BM', value: null, json_config: { smartPAs: [ 'M&A']}}]}};
    component.checkConfig();
    expect(component.userBMSetup).toBe(BMSetupType.SmartPAs);
  });
  it('should sort when SelectedMatters', () => {
    component.userBMSetup = BMSetupType.SelectedMatters;
    component.formatTableColumns();
    component.sort({label: 'Matter ID', field: 'client_matter_id'});
    expect(component.columns.length).toBe(6);
  });
  it('should sort when SmartPAs', () => {
    component.userBMSetup = BMSetupType.SmartPAs;
    component.sort({label: 'Firm', field: 'bh_lawfirm_id'});
    expect(component).toBeTruthy();
  });
  it('should changeSmartPA', () => {
    component.userBMSetup = BMSetupType.SmartPAs;
    component.changeSmartPA({value: 'Real Estate'});
    expect(component.pageNumber).toBe(1);
  });
  it('should makeSearch', () => {
    component.userBMSetup = BMSetupType.SmartPAs;
    component.searchWord = 'Clarkson';
    component.makeSearch();
    expect(component.pageNumber).toBe(1);
  });
  it('should getBMEligibleMattersByPA', () => {
    component.userBMSetup = BMSetupType.SmartPAs;
    component.searchWord = 'Clarkson';
    component.getBMEligibleMattersByPA();
    expect(component.pageNumber).toBe(1);
  });
  it('should goToFirstPage', () => {
    component.goToFirstPage();
    component.paginator = { pageIndex: 2} as MatPaginator;
    component.goToFirstPage();
    expect(component.pageNumber).toBe(1);
  });
  it('should getNextPrevPage', () => {
    component.getNextPrevPage({ pageIndex: 1, pageSize: 10, length: 5});
    expect(component.pageNumber).toBe(2);
  });
});
