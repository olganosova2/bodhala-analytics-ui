import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBenchmarksComponent } from './admin-benchmarks.component';
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
    fixture = TestBed.createComponent(AdminBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AdminBenchmarksComponent', () => {
    expect(component).toBeTruthy();
  });
});
