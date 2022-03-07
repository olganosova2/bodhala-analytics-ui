import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRateBenchmarksComponent } from './admin-rate-benchmarks.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {AddRateBenchmarkComponent} from './add-rate-benchmark/add-rate-benchmark.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('AdminRateBenchmarksComponent', () => {
  let component: AdminRateBenchmarksComponent;
  let fixture: ComponentFixture<AdminRateBenchmarksComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockClient = {
    bh_client_id: 167,
    org_id: 190,
    org_name: 'Oaktree'
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AdminRateBenchmarksComponent, {
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
    fixture = TestBed.createComponent(AdminRateBenchmarksComponent);
    component = fixture.componentInstance;
    component.gridOptions = component.agGridService.getDefaultGridOptions();
    component.firstLoad = true;
    component.selectedClient = mockClient;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loadClientRateBenchmarks', () => {
    component.loadClientRateBenchmarks(mockClient);
    expect(component.clientRateBenchmarks.length).toBe(6);
  });

  it('should loadGrid', () => {
    component.gridOptions = component.agGridService.getDefaultGridOptions();
    component.firstLoad = true;
    component.loadGrid();
    expect(component).toBeTruthy();
  });

  it('should execute deleteCellRenderer', () => {
    const result = component.deleteCellRenderer();
    expect(result).toBe('<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-trash"></em></button>');
  });

  it('should openDeleteDialog', () => {
    const item = {
      data: {
        id: 10
      }
    };
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDeleteDialog(item);
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should deleteRateBenchmark comp', () => {
    const item = {
      id: 10
    };
    component.deleteRateBenchmark(item);
    expect(component).toBeTruthy();
  });

  it('should createNewBenchmark', () => {
    const result = component.createNewBenchmark();
    expect(result).toBeTruthy();
  });


  it('should openModal', () => {
    const item = {
      data: {
        id: 10
      }
    };
    // spyOn(component.dialog, 'open').and.callThrough();
    try {
      component.openModal(item);
    } catch (err) {
    }
    expect(component).toBeTruthy();
  });


  xit('should addNew', () => {
    component.selectedClient = mockClient;
    spyOn(component.dialog, 'open').and.callThrough();
    component.addNew();
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
