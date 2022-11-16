import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkGenericChartComponent } from './benchmark-generic-chart.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Router} from '@angular/router';
import * as mockServices from '../../unit-tests/mock-services';
import {FiltersService} from '../../services/filters.service';

describe('BenchmarkGenericChartComponent', () => {
  let component: BenchmarkGenericChartComponent;
  let fixture: ComponentFixture<BenchmarkGenericChartComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(BenchmarkGenericChartComponent, {
      set: {
        providers: [
          AppStateService,
          { provide: Router, useClass: mockServices.MockRouter},
          { provide: FiltersService, useClass: mockServices.FiltersStub },
          { provide: HttpService, useClass: mockServices.DataStub },
          { provide: UserService, useClass: mockServices.UserStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkGenericChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BenchmarkGenericChartComponent', () => {
    expect(component).toBeTruthy();
  });
});
