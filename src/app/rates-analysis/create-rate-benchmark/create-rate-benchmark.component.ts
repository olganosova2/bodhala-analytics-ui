import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {RatesAnalysisService} from '../rates-analysis.service';
import * as _moment from 'moment';
import {Subscription} from 'rxjs';
import * as config from '../../shared/services/config';
import {IGenericBMChart, IOneTkSummaryCard, IRateBenchmark, moneyFormatter, OneTkChartType, peerFirmMapping} from '../rates-analysis.model';
import {MOCK_ONE_TK} from '../../shared/unit-tests/mock-data/one-tk';
import {set} from 'ag-grid-community/dist/lib/utils/object';

const moment = _moment;

@Component({
  selector: 'bd-create-rate-benchmark',
  templateUrl: './create-rate-benchmark.component.html',
  styleUrls: ['./create-rate-benchmark.component.scss']
})
export class CreateRateBenchmarkComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  firmId: number;
  year: number;
  smartPAs: Array<string> = [];
  cluster: number = 1;
  noClusterForFirm: boolean = false;
  rateBenchmark: IRateBenchmark;
  allBenchmarks: Array<IRateBenchmark> = [];
  inProgress: boolean = false;
  tkRequestInProgress: boolean = false;
  showMoreOpened: boolean = false;
  bdProfileId: string;
  vendorFirmName: string;
  proposedRate: number;
  tkClassification: string;
  seniority: string;
  summaryMetrics: Array<IOneTkSummaryCard> = [];
  charts: Array<IGenericBMChart> = [];
  highestRate: number;
  tkTotalHours: number = 0;
  standardDeviation: number = 0;
  feeImpact: string;
  graduationYear: number;
  inputParametersError: any = '';
  error: any;
  errorBM: any;
  standAlonePage: boolean;
  collapsed: boolean = false;
  @ViewChild('iframeDiv') iframeDiv: ElementRef<HTMLElement>;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public ratesService: RatesAnalysisService) {}

  ngOnInit(): void {
    this.standAlonePage = (window === window.parent) ? true : false;
    if (!this.standAlonePage) {
      window.top.postMessage(74, '*');
    }
    this.year = this.getYear();
    this.parseQueryString();
  }
  parseQueryString(): void {
    this.validateQueryString();
    if (!this.standAlonePage && this.inputParametersError) {
      return;
    }
    this.proposedRate = Number(this.route.snapshot.queryParamMap.get('proposed_rate'));
    this.vendorFirmName = decodeURIComponent(this.route.snapshot.queryParamMap.get('vendor_name'));
    this.tkClassification = this.route.snapshot.queryParamMap.get('tk_staff_classification');
    this.tkClassification = this.tkClassification === 'PT' ? 'partner' : 'associate';
    this.bdProfileId = this.route.snapshot.queryParamMap.get('tk_id');
    this.graduationYear = Number(this.route.snapshot.queryParamMap.get('graduation_date'));

    if (this.standAlonePage && !this.proposedRate) {
      this.proposedRate = 750;
      this.vendorFirmName = 'Skadden, Arps, Slate, Meagher';
      this.graduationYear = 2012;
      this.tkClassification = 'partner'; // 'associate';
      this.bdProfileId = 'K0RYQ3h3dWpOK0FqbmtVa2ZiNUJZQT09'; // '6c3e288c-6953-11e7-8341-061c87c9764f'; // partner  K0RYQ3h3dWpOK0FqbmtVa2ZiNUJZQT09
      // this.bdProfileId = 'ZVJnTGQrajFML1BkNlI5Nk1ITVp0Zz09'; // '6efc29f2-6953-11e7-8341-061c87c9764f'; // associate ZVJnTGQrajFML1BkNlI5Nk1ITVp0Zz09
    }
    this.seniority =  this.ratesService.calculateGranularClassificatiion(this.year, this.graduationYear, this.tkClassification);

    this.matchFirm();
  }
  validateQueryString(): void {
    if (!this.route.snapshot.queryParamMap.get('proposed_rate')) {
      this.inputParametersError += 'Proposed rate is missing<br/>';
    }
    if (!this.route.snapshot.queryParamMap.get('vendor_name')) {
      this.inputParametersError += 'Vendor name is missing<br/>';
    }
    if (!this.route.snapshot.queryParamMap.get('tk_staff_classification')) {
      this.inputParametersError += 'TK classification is missing<br/>';
    }
    if (!this.route.snapshot.queryParamMap.get('tk_id')) {
      this.inputParametersError += 'TK ID is missing<br/>';
    }
    if (!this.route.snapshot.queryParamMap.get('graduation_date')) {
      this.inputParametersError += 'Graduation Date is missing<br/>';
    }
    if (!this.inputParametersError) {
      const classification = this.route.snapshot.queryParamMap.get('tk_staff_classification');
      if (classification !== 'PT' && classification !== 'AS') {
        this.inputParametersError += 'TK classification is not Partner or Associate: ' + classification + '<br/>';
      }
    }
  }
  matchFirm(): void {
    const payload = {
      search: this.vendorFirmName
    };
    this.pendingRequest = this.httpService.makePostRequest('matchFirm', payload).subscribe(
      (data: any) => {
        if (data && data.result) {
          const found = this.ratesService.processMatchFirmResponse(data.result);
          if (found && found.id) {
            this.firmId = found.id;
            this.getOneTkBenchmark();
            this.getFirmPAs();
          } else {
            this.error = 'No matching firm for ' + this.vendorFirmName;
          }
        }
      }
    );
  }
  getOneTkBenchmark(): void {
    this.error = null;
    this.tkRequestInProgress = true;
    const params = { clientId: this.userService.currentUser.client_info_id, firmId: this.firmId, year: this.year,  tkClassification: this.tkClassification} as any;
    if (this.bdProfileId) {
      params.clientTimekeeperId = this.bdProfileId;
    }
    this.pendingRequest = this.httpService.makeGetRequest<any>('getOneTkBenchmark', params).subscribe(
      (data: any) => {
        this.tkRequestInProgress = false;
        if (data.error) {
          this.error = data.error;
          return;
        }
        // data = MOCK_ONE_TK;
        if (data.result) {
          this.tkClassification = data.result.tk_classification;
          if (data.result.seniority) {
            this.seniority = data.result.seniority.seniority;
          }
          if (data.result.tk_summary && data.result.tk_summary.length > 0) {
            this.tkTotalHours = data.result.tk_summary[0].total_hours;
          }
          this.calculateStandardDeviation(data.result);
          const charts = this.ratesService.buildOneTkChartData(this.tkClassification, this.seniority, this.proposedRate, data.result);
          this.highestRate = this.ratesService.calculateHighestChartNumber(charts);
          this.charts = charts;
          this.calculatePotentialSaving();
          this.buildSummaryMetrics(data.result);
          this.sendMessageToParent();
        }
      }
    );
  }
  calculateStandardDeviation(data: any): void {
    if (data.granular_firm) {
      const found = data.granular_firm.find(e => e.seniority === this.seniority);
      if (found) {
        this.standardDeviation = this.proposedRate - found.firm_avg_rate;
      }
    }
  }
  getFirmPAs(): void {
    this.errorBM = null;
    const params = { clientId: this.userService.currentUser.client_info_id, firmId: this.firmId, year: this.year};
    this.pendingRequest = this.httpService.makeGetRequest<string>('getSmartPAsByFirmIdAndYear', params).subscribe(
      (data: any) => {
        if (data.result) {
          if (this.smartPAs.length === 0) {
            this.smartPAs = (data.result.smart_pas || []).map(e => e.pa);
            this.errorBM = this.smartPAs && this.smartPAs.length === 0 ? 'No Smart PAs set up for year ' + this.year.toString() : null;
          }
          this.smartPAs = this.smartPAs.sort();
          if (data.result.cluster && data.result.cluster.length > 0) {
            this.cluster = data.result.cluster[0].cluster;
          } else {
            this.errorBM = 'The firm doesn\'t have Firm Cluster';
          }
          if (data.result.benchmarks) {
            this.allBenchmarks = data.result.benchmarks;
            for (const bm of this.allBenchmarks) {
              bm.smart_practice_area = bm.smart_practice_area.sort();
            }
          }
          if (this.errorBM) {
            return;
          }
          this.processBenchmark();
        } else if (data.error) {
          this.errorBM = data.error;
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
          this.errorBM = data.error;
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
    // this.router.navigate(['/analytics-ui/rate-benchmarking/view/', this.rateBenchmark.id]);
    window.open(
      '/analytics-ui/rate-benchmarking/view/' + this.rateBenchmark.id,
      '_blank' // <- This is what makes it open in a new window.
    );
    this.showMoreOpened = false;
  }
  calculatePotentialSaving(): void {
    const found = this.charts.find(e => e.chartType.toString() === 'Market');
    const tkSpend = this.proposedRate * this.tkTotalHours;
    if (found) {
      const low = found.low;
      const high = found.high;
      if (low === 0 || high === 0) {
        this.feeImpact = moneyFormatter.format(0);
        return;
      }
      if (this.proposedRate < low) {
        this.feeImpact = moneyFormatter.format(tkSpend - low * this.tkTotalHours) + ' - ' + moneyFormatter.format(tkSpend - high * this.tkTotalHours);
      }else if (this.proposedRate > high) {
        this.feeImpact = moneyFormatter.format(tkSpend - high * this.tkTotalHours) + ' - ' + moneyFormatter.format(tkSpend - low * this.tkTotalHours);
      }else if (this.proposedRate >= low && this.proposedRate <= high) {
        this.feeImpact = moneyFormatter.format(tkSpend - low * this.tkTotalHours);
      }
    }
  }
  buildSummaryMetrics(summaryData: any): void {
    this.summaryMetrics.push({label: 'Hours billed in the prior 12 month', amount: this.tkTotalHours, format: 'number'});
    this.summaryMetrics.push({label: 'Standard Deviation from Vendor Staff Class', amount: moneyFormatter.format(this.standardDeviation), format: 'string'});
    this.summaryMetrics.push({label: 'Potential Fee Impact from Proposed Rate', amount: this.feeImpact, format: 'string'});
  }
  getYear(): number {
    const year = moment().month() < 6 ? moment().add(-1, 'y').year() : moment().year();
    return config.IS_LOCAL ? 2017 : year;
  }
  collapseContent(): void {
    this.collapsed = !this.collapsed;
    if (this.standAlonePage) {
      return;
    }
    this.sendMessageToParent();
  }
  sendMessageToParent(): void {
    setTimeout(() => {
      if (this.iframeDiv) {
        const divHeight = this.iframeDiv.nativeElement.offsetHeight || 74;
        window.top.postMessage(divHeight, '*');
      }
    });
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
