import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBenchmarkComponent } from './add-edit-benchmark.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AdminBenchmarksComponent} from '../admin-benchmarks.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_ADMIN_BENCHMARK} from '../../../shared/unit-tests/mock-data/benchmarking';

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
  it('should save', () => {
    component.benchmark = MOCK_ADMIN_BENCHMARK.result;
    component.save();
    expect (mockRouter.navigate).toHaveBeenCalledWith([ 'analytics-ui/admin/benchmarks' ]);
  });
  it('should getFirms', () => {
    component.getFirms();
    expect(component.firms).toEqual([]);
  });
  // xit('should selectClient', () => {
  //   component.benchmark = MOCK_ADMIN_BENCHMARK.result;
  //   const client =  { bh_client_id: 1, org_id: 1, org_name: 'A'};
  //   component.selectClient(client);
  //   expect(component.benchmark.client_id).toBe(1);
  // });
});
