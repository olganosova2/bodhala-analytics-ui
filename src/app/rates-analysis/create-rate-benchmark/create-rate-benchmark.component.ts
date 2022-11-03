import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {RatesAnalysisService} from '../rates-analysis.service';
import * as _moment from 'moment';
import {Subscription} from 'rxjs';
import * as config from '../../shared/services/config';
import {IRateBenchmark, peerFirmMapping} from '../rates-analysis.model';

const moment = _moment;

@Component({
  selector: 'bd-create-rate-benchmark',
  templateUrl: './create-rate-benchmark.component.html',
  styleUrls: ['./create-rate-benchmark.component.scss']
})
export class CreateRateBenchmarkComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  firmId: number;
  year: number = config.IS_LOCAL ? 2017 : moment().year();
  smartPAs: Array<string> = [];
  cluster: number = 1;
  noClusterForFirm: boolean = false;
  rateBenchmark: IRateBenchmark;
  allBenchmarks: Array<IRateBenchmark> = [];
  inProgress: boolean = false;
  showMoreOpened: boolean = false;
  error: any;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public ratesService: RatesAnalysisService) {}

  ngOnInit(): void {
    this.firmId = Number(this.route.snapshot.queryParamMap.get('firmId'));
    const smartPAs = this.route.snapshot.queryParamMap.get('smartPAs');
    if (smartPAs) {
      this.smartPAs = JSON.parse(smartPAs);
    } else {
    }
    if (this.firmId) {
      this.getFirmPAs();
    }
  }
  getFirmPAs(): void {
    this.error = null;
    const params = { clientId: this.userService.currentUser.client_info_id, firmId: this.firmId, year: this.year};
    this.pendingRequest = this.httpService.makeGetRequest<string>('getSmartPAsByFirmIdAndYear', params).subscribe(
      (data: any) => {
        if (data.result) {
          if (this.smartPAs.length === 0) {
            this.smartPAs = (data.result.smart_pas || []).map(e => e.pa);
            this.error = this.smartPAs && this.smartPAs.length === 0 ? 'No Smart PAs set up for year ' + this.year.toString() : null;
          }
          this.smartPAs = this.smartPAs.sort();
          if (data.result.cluster && data.result.cluster.length > 0) {
            this.cluster = data.result.cluster[0].cluster;
          } else {
            this.error = 'The firm doesn\'t have Firm Cluster';
          }
          if (data.result.benchmarks) {
            this.allBenchmarks = data.result.benchmarks;
            for (const bm of this.allBenchmarks) {
              bm.smart_practice_area = bm.smart_practice_area.sort();
            }
          }
          if (this.error) {
            return;
          }
          this.processBenchmark();
        } else if (data.error) {
          this.error = data.error;
        }
      }
    );
  }
  processBenchmark(): void {
    this.rateBenchmark = this.allBenchmarks.find(b => b.bh_lawfirm_id === this.firmId && JSON.stringify(b.smart_practice_area) === JSON.stringify(this.smartPAs) && JSON.stringify(b.year) === JSON.stringify([this.year]));
    if (this.rateBenchmark) {
      this.navigateToBenchmarkView();
      return;
    }
    this.inProgress = true;
    const benchmark = this.ratesService.createNewBenchmark();
    benchmark.bh_lawfirm_id = Number(this.firmId);
    benchmark.smart_practice_area = this.smartPAs;
    benchmark.year = [this.year];
    benchmark.peers = peerFirmMapping[this.cluster - 1];
    const params = Object.assign({}, benchmark);
    this.pendingRequest = this.httpService.makePostRequest('saveRateBenchmarkByClient', params).subscribe(
      (data: any) => {
        this.inProgress = false;
        if (data.result) {
          this.rateBenchmark = Object.assign(data.result);
          this.navigateToBenchmarkView();
        } else if (data.error) {
          this.error = data.error;
        }
      }
    );
  }
  showMore(): void {
    this.showMoreOpened = true;
    this.navigateToBenchmarkView();
  }
  navigateToBenchmarkView(): void {
    if (!this.showMoreOpened || !this.rateBenchmark) {
      return;
    }
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/', this.rateBenchmark.id]);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
