import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {BenchmarkService} from '../benchmark.service';
import {IDropDown} from '../../shared/models/prime-ng';
import {BM_MOCK_FIRMS, MOCK_BM_FIRMS, MOCK_PRACTICE_AREAS, MOCK_YEARS} from '../../shared/unit-tests/mock-data/benchmarking';
import {IBenchmark, IBenchmarkOverviewRow, IRowBenchmark} from '../model';
import {Subscription} from 'rxjs';
import {IFirm} from '../../firm/firm.model';

@Component({
  selector: 'bd-benchmark-firm-detail',
  templateUrl: './benchmark-firm-detail.component.html',
  styleUrls: ['./benchmark-firm-detail.component.scss', '../benchmark-overview/benchmark-overview.component.scss']
})
export class BenchmarkFirmDetailComponent implements OnInit, OnDestroy {
  errorMessage: any;
  firmId: string;
  year: number;
  firmsOptions: Array<IDropDown> = [];
  yearOptions: Array<IDropDown> = [];
  allBenchmarks: Array<IRowBenchmark> = [];
  benchmarks: Array<IBenchmark> = [];
  benchmarksRows: Array<IBenchmarkOverviewRow> = [];
  pendingRequest: Subscription;
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
    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.getBenchmarks();
    });
    this.route.queryParams
      .subscribe(params => {
        this.year = Number(params.year);
      });
  }
  getBenchmarks(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getBenchmarks').subscribe(
      (data: any) => {
        this.allBenchmarks = data.result;
        this.benchmarkServ.cleanUpData(this.allBenchmarks);
        this.processBenchmarks();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  getFirms(isLoad: boolean): void {
    // this.router.navigateByUrl('/', {skipLocationChange: true})
    //   .then(() => this.router.navigate(['/analytics-ui/benchmarking/firm/', this.firmId]));
    this.firmsOptions = [];
    let firms = this.allBenchmarks.filter(e => e.year.toString() === this.year.toString());
    firms = firms.sort(this.utilService.dynamicSort('firm_name'));
    for (const firm of firms) {
      const dupe = this.firmsOptions.find(r => r.value === firm.firm_id.toString());
      if (!dupe) {
        this.firmsOptions.push({ value: firm.firm_id.toString(), label: firm.firm_name});
      }
    }
    if (this.firmsOptions.length === 0) {
      this.clearData();
      return;
    }
    if (!isLoad) {
      this.firmId = this.firmsOptions[0].value;
      this.commonServ.pageSubtitle = this.firmsOptions[0].label;
    }
    this.buildBenchmarks();
  }
  getYears(): void {
    const years = this.benchmarkServ.getYears(this.allBenchmarks);
    this.yearOptions = Object.assign([], years);
    if (this.yearOptions.length === 0) {
      return;
    }
  }
  processBenchmarks(): void {
    this.getYears();
    this.getFirms(true);
  }
  updateSubtitle(): void {
    const found = this.allBenchmarks.find(e => e.firm_id.toString() === this.firmId);
    if (found) {
      this.commonServ.pageSubtitle = found.firm_name;
    }
  }
  clearData(): void {
    this.benchmarks = [];
    this.benchmarksRows = [];
    this.commonServ.pageSubtitle = '';
  }
  buildBenchmarks(): void {
    this.clearData();
    const filtered = this.allBenchmarks.filter(e => e.year.toString() === this.year.toString() && e.firm_id.toString() === this.firmId.toString());
    for (const bm of filtered) {
      const row = { id: bm.benchmark_id, name: bm.name, tier: bm.tier, peers: bm.peers, rates: bm.rates, year: bm.year };
      this.benchmarks.push(row);
    }
    // this.benchmarks = MOCK_BM_FIRMS;
    this.benchmarksRows =  this.benchmarkServ.buildOverviewRows(this.benchmarks);
    this.updateSubtitle();
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
