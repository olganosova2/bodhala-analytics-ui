import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {IDropDown} from '../../shared/models/prime-ng';
import {MOCK_BM_FIRMS, MOCK_PRACTICE_AREAS, MOCK_YEARS} from '../../shared/unit-tests/mock-data/benchmarking';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {IBenchmark, IBenchmarkOverviewRow} from '../model';
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
  areasOptions: Array<IDropDown> = MOCK_PRACTICE_AREAS;
  yearOptions: Array<IDropDown> = MOCK_YEARS;
  benchmarks: Array<IBenchmark> = [];
  benchmarksRows: Array<IBenchmarkOverviewRow> = [];
  pendingRequest: Subscription;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public benchmarkServ: BenchmarkService) {
    this.commonServ.pageTitle = 'Benchmarking';
  }

  ngOnInit() {
    this.practiceAreaId = this.areasOptions[0].value;
    this.year = this.yearOptions[0].value;
    this.getBenchmarks();
  }
  getBenchmarks(): void {
    const params = { clientId: this.userService.currentUser.id, year: this.year, practiceArea: this.practiceAreaId};
    // this.pendingRequest = this.httpService.makeGetRequest('getBenchmarks', params).subscribe(
    //   (data: any) => {
    //
    //   },
    //   err => {
    //     this.errorMessage = err;
    //   }
    // );
    this.benchmarks = MOCK_BM_FIRMS;
    this.benchmarksRows =  this.benchmarkServ.buildOverviewRows(this.benchmarks);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
