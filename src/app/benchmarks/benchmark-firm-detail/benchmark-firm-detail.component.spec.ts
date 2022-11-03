import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkFirmDetailComponent } from './benchmark-firm-detail.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BenchmarkOverviewComponent} from '../benchmark-overview/benchmark-overview.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_BENCHMARKS} from '../../shared/unit-tests/mock-data/benchmarking';

describe('BenchmarkFirmDetailComponent', () => {
  let component: BenchmarkFirmDetailComponent;
  let fixture: ComponentFixture<BenchmarkFirmDetailComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BenchmarkFirmDetailComponent, {
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
    fixture = TestBed.createComponent(BenchmarkFirmDetailComponent);
    component = fixture.componentInstance;
    component.year = 2020;
    component.firmId = '123';
    component.allBenchmarks = MOCK_BENCHMARKS.result;
    fixture.detectChanges();
  });

  it('should create BenchmarkFirmDetailComponent', () => {
    expect(component).toBeTruthy();
  });
});
