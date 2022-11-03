import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoBarsComponent } from './two-bars.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../shared/unit-tests/mock-app.imports';
import {BenchmarkOverviewComponent} from '../benchmark-overview/benchmark-overview.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/unit-tests/mock-services';
import * as mockServices from '../../shared/unit-tests/mock-services';
import {FiltersService} from '../../shared/services/filters.service';
import {MOCK_BM_ROW} from '../../shared/unit-tests/mock-data/benchmarking';
import {IBenchmarkOverviewRow} from '../model';

describe('TwoBarsComponent', () => {
  let component: TwoBarsComponent;
  let fixture: ComponentFixture<TwoBarsComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(TwoBarsComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: ActivatedRoute, useClass:mockServices.ActivatedRouteMock},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoBarsComponent);
    component = fixture.componentInstance;
    component.dataRow = MOCK_BM_ROW;
    fixture.detectChanges();
  });

  it('should create TwoBarsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should create calculateChartMetrics', () => {
    component.dataRow.isChild = true;
    component.calculateChartMetrics();
    expect(component.dataRow.isChild).toBeTruthy();
  });
  it('should create calculateChartMetrics for associate', () => {
    component.dataRow.isChild = true;
    component.dataRow.name = 'associate';
    component.calculateChartMetrics();
    expect(component.dataRow.isChild).toBeTruthy();
  });
});
