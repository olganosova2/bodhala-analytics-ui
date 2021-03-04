import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminBenchmarksComponent} from './admin-benchmarks.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BenchmarkFirmDetailComponent} from '../../benchmarks/benchmark-firm-detail/benchmark-firm-detail.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('AdminBenchmarksComponent', () => {
  let component: AdminBenchmarksComponent;
  let fixture: ComponentFixture<AdminBenchmarksComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AdminBenchmarksComponent, {
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
    fixture = TestBed.createComponent(AdminBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AdminBenchmarksComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should getBenchmarks', () => {
    component.getBenchmarks();
    expect(component).toBeTruthy();
  });
  xit('should saveGridConfig', () => {
    component.gridOptions = component.agGridService.getDefaultGridOptions();
    component.saveGridConfig({});
    expect(component.agGridService).toBeTruthy();
  });
  it('should clientCellRenderer', () => {
    const param = {
      node: {
        data: {
          client: 'Client 1',
          client_id: '1'
        }
      }
    };
    const test = component.clientCellRenderer(param);
    expect(test).toBeTruthy();
  });
  it('should firmCellRenderer', () => {
    const param = {
      node: {
        data: {
          firm: 'Client 1',
          firm_id: '1'
        }
      }
    };
    const test = component.firmCellRenderer(param);
    expect(test).toBeTruthy();
  });

  it('should addNew', () => {
    component.addNew();
    expect (mockRouter.navigate).toHaveBeenCalledWith([ 'analytics-ui/admin/benchmark-add' ]);
  });
});
