import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { AddEditBenchmarkComponent } from './add-edit-benchmark.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AdminBenchmarksComponent} from '../admin-benchmarks.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_ADMIN_BENCHMARK} from '../../../shared/unit-tests/mock-data/benchmarking';
import {IAdminBenchmark} from '../admin-benchmarks-model';

describe('AddEditBenchmarkComponent', () => {
  let component: AddEditBenchmarkComponent;
  let fixture: ComponentFixture<AddEditBenchmarkComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AddEditBenchmarkComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: mockServices.ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBenchmarkComponent);
    component = fixture.componentInstance;
    // component.benchmark = MOCK_ADMIN_BENCHMARK.result;
    fixture.detectChanges();
  });

  it('should create AddEditBenchmarkComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should loadBenchmark', () => {
    component.benchmarkId = '1';
    component.loadBenchmark();
    expect(component.benchmark).toBeTruthy();
  });
  it('should createNew', () => {
    component.createNew();
    expect(component.benchmark).toBeTruthy();
  });
  it('should reset', () => {
    component.reset();
    expect(component.selectedClient).toBe(null);
  });
  it('should selectClient', () => {
    component.benchmark = {} as IAdminBenchmark;
    const client =  { bh_client_id: 1, org_id: 1, org_name: 'A'};
    component.selectClient(client);
    expect(component.benchmark.client_id).toBe(1);
  });
  it('should save', () => {
    component.benchmark = MOCK_ADMIN_BENCHMARK.result;
    component.save();
    expect (mockRouter.navigate).toHaveBeenCalledWith([ 'analytics-ui/admin/benchmarks' ]);
  });
  it('should cancel', () => {
    component.benchmark = MOCK_ADMIN_BENCHMARK.result;
    component.cancel();
    expect (mockRouter.navigate).toHaveBeenCalledWith([ 'analytics-ui/admin/benchmarks' ]);
  });
  it('should displayProperty', () => {
    const result = component.displayProperty({id: 1, name: 'AAA'});
    expect(result).toBe('AAA');
  });
  it('should selectFirm', () => {
    component.benchmark = MOCK_ADMIN_BENCHMARK.result;
    component.selectFirm({id: 1, name: 'A'});
    expect(component.benchmark.firm_id).toBe(1);
  });
  it('should filterFirms', () => {
    component.filteredFirms = [];
    const firm = {id: 1, name: 'A'};
    component.filteredFirms.push(firm);
    component.filterFirms('A');
    expect(component.filteredFirms.length).toBe(0);
  });
  it('should ngOnInit', () => {
    component.benchmarkId = null;
    component.ngOnInit();
    expect(component.editMode).toBe('edit');
  });
});
