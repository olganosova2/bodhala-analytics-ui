import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRateBenchmarkComponent } from './add-rate-benchmark.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import {FiltersService} from '../../../shared/services/filters.service';
import {MOCK_ADMIN_BENCHMARK} from '../../../shared/unit-tests/mock-data/benchmarking';
import {MOCK_FIRM_CLUSTER_RES} from '../../../shared/unit-tests/mock-data/rate-benchmarking';
import {FormGroup, Validators, FormControl} from '@angular/forms';



describe('AddRateBenchmarkComponent', () => {
  let component: AddRateBenchmarkComponent;
  let fixture: ComponentFixture<AddRateBenchmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRateBenchmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AddRateBenchmarkComponent, {
      set: {
        providers: [
          { provide: HttpService, useClass: mockServices.DataStub },
        ]
      }
    })
      .compileComponents();
  }));

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(AddRateBenchmarkComponent, {
      set: {
        providers: [
          { provide: HttpService, useClass: mockServices.DataStub },
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRateBenchmarkComponent);
    component = fixture.componentInstance;
    component.data = [];
    component.data.push(MOCK_ADMIN_BENCHMARK.result[0]);
    component.rateBenchmark = MOCK_ADMIN_BENCHMARK.result[0];
    component.allFirmsCluster = MOCK_FIRM_CLUSTER_RES.cluster_res;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should execute firmSelected', () => {
    component.firmSelected({value: 32});
    expect(component.selectedFirmCluster).toEqual(1);
  });

  xit('should saveBenchmark', () => {
    component.saveBenchmark();
    expect(component).toBeTruthy();
  });
});
