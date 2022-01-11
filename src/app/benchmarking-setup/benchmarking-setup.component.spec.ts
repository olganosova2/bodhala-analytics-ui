import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BenchmarkingSetupComponent} from './benchmarking-setup.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../shared/unit-tests/mock-app.imports';
import {BenchmarkOverviewComponent} from '../benchmarks/benchmark-overview/benchmark-overview.component';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import * as mockServices from '../shared/unit-tests/mock-services';
import {ActivatedRouteMock} from '../shared/unit-tests/mock-services';
import {FiltersService} from '../shared/services/filters.service';
import {MOCK_BENCHMARKS, MOCK_PA_AND_ID, BM_CHECK_RATES} from '../shared/unit-tests/mock-data/benchmarking';
import {IBMPracticeArea} from './benchmarking-setup-model';
import {IBenchmarkMetrics} from '../benchmarks/model';
import {MOCK_ANNOTATIONS} from '../shared/unit-tests/mock-data/annotations';
import {IUiAnnotation} from '../shared/components/annotations/model';

describe('BenchmarkingSetupComponent', () => {
  let component: BenchmarkingSetupComponent;
  let fixture: ComponentFixture<BenchmarkingSetupComponent>;

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
    }).overrideComponent(BenchmarkingSetupComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: Router, useValue: mockRouter},
          {provide: ActivatedRoute, useClass: ActivatedRouteMock},
          {provide: FiltersService, useClass: mockServices.FiltersStub},
          {provide: HttpService, useClass: mockServices.DataStub},
          {provide: UserService, useClass: mockServices.UserStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkingSetupComponent);
    component = fixture.componentInstance;
    component.selectedYear = '2021';
    fixture.detectChanges();
  });

  it('should create BenchmarkingSetupComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit', () => {
    component.ngOnInit();
    component.selectedYear = '2021';
    expect(component.selectedYear).toBe('2021');
  });
  it('should loadDataForYear', () => {
    component.loadDataForYear();
    expect(component.firms.length).toBe(5);
  });
  it('should changeYear', () => {
    component.changeYear('2019');
    expect(component.firms.length).toBe(5);
  });
  it('should selectFirm', () => {
    component.createNewBenchmark();
    component.benchmark.firm_id = 62;
    component.allBenchmarks = MOCK_BENCHMARKS.result;
    component.practiceAreasList = MOCK_PA_AND_ID.result;
    component.selectFirm('2019');
    expect(component.availablePAs.length).toBe(12);
  });
  it('should selectPracticeArea when PA exists', () => {
    component.createNewBenchmark();
    component.benchmark.firm_id = 62;
    const pa = {name: 'M&A', hasRates: true};
    component.benchmark.practice_areas.push(pa);
    const evt = {itemValue: 'M&A'};
    component.selectPracticeArea(evt);
    expect(component.benchmark.practice_areas.length).toBe(0);
  });
  it('should selectPracticeArea when new PA', () => {
    component.createNewBenchmark();
    component.benchmark.firm_id = 62;
    const pa = {name: 'M&A', hasRates: true};
    component.benchmark.practice_areas.push(pa);
    const evt = {itemValue: 'Litigation'};
    component.selectPracticeArea(evt);
    expect(component.benchmark.practice_areas.length).toBe(2);
  });
  it('should handleMissingRates', () => {
    component.createNewBenchmark();
    const pa = {name: 'Capital Markets', hasRates: true, currentStatus: {lawyerStatus: null}} as IBMPracticeArea;
    const collections = BM_CHECK_RATES.result.collections;
    component.handleMissingRates(pa, collections);
    expect(pa.currentStatus.lawyerStatus).toBe(null);
  });
  it('should addNew', () => {
    component.addNew();
    expect(component.showWizard).toBe(true);
  });
  it('should delete benchmark', () => {
    const bm = {id: 1, firmId: 1, practice_areas: []};
    component.delete(bm);
    expect(component.noResults).toBe(true);
  });
  it('should save new benchmark', () => {
    const metric = {
      client_rate: null, high: null, low: null, practice_area_discount: null, street: null, yoy_rate_increase: null
    };
    const rate = {
      junior_associate: metric,
      mid_associate: metric,
      senior_associate: metric,
      junior_partner: metric,
      mid_partner: metric,
      senior_partner: metric
    };
    component.createNewBenchmark();
    const pa = {name: 'Capital Markets', hasRates: true, currentStatus: {lawyerStatus: null}} as IBMPracticeArea;
    pa.rates = rate;
    component.benchmark.practice_areas = [pa];
    component.save();
    expect(component.benchmark.practice_areas.length).toBe(0);
  });
  it('should save existing benchmark', () => {
    const metric = {
      client_rate: null, high: null, low: null, practice_area_discount: null, street: null, yoy_rate_increase: null
    };
    const rate = {
      junior_associate: metric,
      mid_associate: metric,
      senior_associate: metric,
      junior_partner: metric,
      mid_partner: metric,
      senior_partner: metric
    };
    component.createNewBenchmark();
    const pa = {name: 'Capital Markets', hasRates: true, currentStatus: {lawyerStatus: null}} as IBMPracticeArea;
    pa.rates = rate;
    component.benchmark.practice_areas = [pa];
    component.benchmark.benchmark_id = 1;
    component.save();
    expect(component.benchmark.benchmark_id).toBe(null);
  });
  it('should openDialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    const bm = {id: 1, firmId: 1, practice_areas: []};
    component.openDialog(bm);
    expect(component.dialog.open).toHaveBeenCalled();
  });
  it('should checkIfHasRates', () => {
    component.createNewBenchmark();
    const pa = {name: 'Capital Markets', hasRates: true, currentStatus: {lawyerStatus: null}} as IBMPracticeArea;
    component.benchmark.practice_areas = [pa];
    const result = component.checkIfHasRates();
    expect(result).toBe(false);
  });
});
