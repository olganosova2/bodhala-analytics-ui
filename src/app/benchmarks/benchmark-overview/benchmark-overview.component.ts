import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {IDropDown} from '../../shared/models/prime-ng';
import {MOCK_BM_FIRMS, MOCK_PRACTICE_AREAS, MOCK_YEARS} from '../../shared/unit-tests/mock-data/benchmarking';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {IBenchmark, IBenchmarkOverviewRow, IRowBenchmark} from '../model';
import {Subscription} from 'rxjs';
import {BenchmarkService} from '../benchmark.service';

@Component({
  selector: 'bd-benchmark-overview',
  templateUrl: './benchmark-overview.component.html',
  styleUrls: ['./benchmark-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BenchmarkOverviewComponent implements OnInit, OnDestroy {
  errorMessage: any;
  practiceAreaId: string;
  year: string;
  areasOptions: Array<IDropDown> = [];
  yearOptions: Array<IDropDown> = [];
  allBenchmarks: Array<IRowBenchmark> = [];
  benchmarks: Array<IBenchmark> = [];
  benchmarksRows: Array<IBenchmarkOverviewRow> = [];
  pendingRequest: Subscription;
  noRecords: boolean = false;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public benchmarkServ: BenchmarkService) {
    this.commonServ.pageTitle = 'Benchmarking';
  }

  ngOnInit() {
    this.getBenchmarks();
  }
  getBenchmarks(): void {
    const params = this.benchmarkServ.showWorkInfo ? { work_info: this.benchmarkServ.showWorkInfo} : null;
    this.pendingRequest = this.httpService.makeGetRequest('getBenchmarks', params).subscribe(
      (data: any) => {
        this.allBenchmarks = this.benchmarkServ.cleanUpData(data.result) || [];
        this.noRecords = this.allBenchmarks.length === 0;
        this.processBenchmarks();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  // getRateIncrease(): void {
  //   const params = {client_id: this.userService.currentUser.client_info_id, num_years: 3};
  //   this.pendingRequest = this.httpService.makeGetRequest('getRateIncreaseByFirm', params).subscribe(
  //     (data: any) => {
  //      const x = data.result;
  //     },
  //     err => {
  //       this.errorMessage = err;
  //     }
  //   );
  // }
  getPAs(): void {
    this.areasOptions = [];
    let pas = this.allBenchmarks.filter(e => e.year === this.year);
    pas = pas.sort(this.utilService.dynamicSort('name'));
    for (const pa of pas) {
      const dupe = this.areasOptions.find(r => r.value === pa.name);
      if (!dupe) {
        this.areasOptions.push({ value: pa.name, label: pa.name});
      }
    }
    if (this.areasOptions.length === 0) {
      return;
    }
    this.practiceAreaId = this.areasOptions[0].value;
    this.buildBenchmarks();
  }
  getYears(): void {
    const years = this.benchmarkServ.getYears(this.allBenchmarks);
    this.yearOptions = Object.assign([], years);
    if (this.yearOptions.length === 0) {
      return;
    }
    this.year = this.yearOptions[0].value;
  }
  processBenchmarks(): void {
      this.getYears();
      this.getPAs();
  }
  buildBenchmarks(): void {
    this.benchmarks = [];
    this.benchmarksRows = [];
    const filtered = this.allBenchmarks.filter(e => e.year === this.year && e.name === this.practiceAreaId);
    for (const bm of filtered) {
      const row = { id: bm.firm_id, name: bm.firm_name, tier: bm.tier, peers: bm.peers, rates: bm.rates, year: bm.year, pa_data: bm.pa_data };
      this.benchmarks.push(row);
    }
    // this.benchmarks = MOCK_BM_FIRMS;
    this.benchmarksRows =  this.benchmarkServ.buildOverviewRows(this.benchmarks);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
