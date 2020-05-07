import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {BenchmarkService} from '../benchmark.service';
import {IDropDown} from '../../shared/models/prime-ng';
import {BM_MOCK_FIRMS, MOCK_BM_FIRMS, MOCK_PRACTICE_AREAS, MOCK_YEARS} from '../../shared/unit-tests/mock-data/benchmarking';
import {IBenchmark, IBenchmarkOverviewRow} from '../model';
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
  firm: IFirm;
  year: string;
  firmsOptions: Array<IDropDown> = BM_MOCK_FIRMS;
  yearOptions: Array<IDropDown> = MOCK_YEARS;
  benchmarks: Array<IBenchmark> = [];
  benchmarksRows: Array<IBenchmarkOverviewRow> = [];
  pendingRequest: Subscription;
  pendingRequestFirm: Subscription;
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
    this.year = this.yearOptions[0].value;
    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.loadFirm();
      this.getBenchmarks();
    });
  }
  loadFirm(): void {
    const params = {id: this.firmId};
    this.pendingRequestFirm = this.httpService.makeGetRequest('getFirm', params).subscribe(
      (data: any) => {
        const firms = data.result;
        if (firms && firms.length > 0) {
          this.firm = firms[0];
          this.commonServ.pageSubtitle = this.firm.name;
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  getBenchmarks(): void {
    const params = { clientId: this.userService.currentUser.id, year: this.year, firmId: this.firmId};
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
  changeFirm(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/analytics-ui/benchmarking/firm/', this.firmId]));
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestFirm) {
      this.pendingRequestFirm.unsubscribe();
    }
  }

}
