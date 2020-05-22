import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkOverviewComponent } from './benchmark-overview.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BenchmarksEntryComponent} from '../benchmarks-entry/benchmarks-entry.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';

describe('BenchmarkOverviewComponent', () => {
  let component: BenchmarkOverviewComponent;
  let fixture: ComponentFixture<BenchmarkOverviewComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    url: 'benchmarking/firm'
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BenchmarkOverviewComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BenchmarkOverviewComponent', () => {
    expect(component).toBeTruthy();
  });
});
