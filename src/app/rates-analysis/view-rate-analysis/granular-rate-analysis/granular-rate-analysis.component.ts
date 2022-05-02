import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { IRateBenchmark, moneyFormatter, percentFormatter, formatter, COST_IMPACT_GRADES, rateBenchmarkingChartOptions } from '../../rates-analysis.model';

@Component({
  selector: 'bd-granular-rate-analysis',
  templateUrl: './granular-rate-analysis.component.html',
  styleUrls: ['./granular-rate-analysis.component.scss']
})
export class GranularRateAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  benchmarkId: number;
  benchmark: IRateBenchmark;
  practiceArea: string;
  firmName: string;
  firmId: number;
  year: number;
  peerFirms: Array<string>;
  firmYearData: any;
  marketAverageData: any;
  internalData: any;
  overallSpendData: any;
  loaded: boolean = false;
  cluster: number;
  numPartnerTiers: number;
  totalHours: string;


  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public ratesService: RatesAnalysisService) {
    this.commonServ.pageTitle = 'View Rate Analysis';
    setTimeout(() => {
      this.commonServ.pageSubtitle = this.firmName;
    });
  }

  ngOnInit(): void {
    if (history.state.data) {
      if (history.state.data.bm) {
        this.benchmark = history.state.data.bm;
      }
      if (history.state.data.cluster) {
        this.cluster = history.state.data.cluster;
      }
      if (history.state.data.firmYear) {
        this.firmYearData = history.state.data.firmYear;
        this.firmName = this.firmYearData.name;
        this.totalHours = this.firmYearData.total_atty_hours;
      }
      if (history.state.data.internal) {
        this.internalData = history.state.data.internal;
      }
      if (history.state.data.market) {
        this.marketAverageData = history.state.data.market;
      }
      if (history.state.data.totalSpend) {
        this.overallSpendData = history.state.data.totalSpend;
      }
      if (history.state.data.numTiers) {
        this.numPartnerTiers = history.state.data.numTiers;
      }
      if (history.state.data.peerFirms) {
        this.peerFirms = history.state.data.peerFirms;
      }
      this.firmId = this.benchmark.bh_lawfirm_id;
      this.practiceArea = this.benchmark.smart_practice_area;
      this.year = this.benchmark.year;
      const ix = this.peerFirms.findIndex(p => p === this.firmName);
      if (ix >= 0) {
        this.peerFirms.splice(ix, 1);
      }
      this.loaded = true;
    } else {
      this.route.paramMap.subscribe(async params => {
        this.benchmarkId = Number(params.get('id'));
        const result = await this.ratesService.getBenchmark(this.benchmarkId);
        this.firmName = result.firm_name;
        this.benchmark = result.benchmark;
        this.firmId = this.benchmark.bh_lawfirm_id;
        this.practiceArea = this.benchmark.smart_practice_area;
        this.year = this.benchmark.year;
        const ix = result.peer_firms.findIndex(p => p === this.firmName);
        this.peerFirms = [];
        if (ix >= 0) {
          result.peer_firms.splice(ix, 1);
        }
        if (result.peer_firms) {
          let counter = 0;
          for (const firm of result.peer_firms) {
            if ((firm.length + counter) < 110) {
              this.peerFirms.push(firm);
            }
            counter += firm.length;
          }
        }
        const rateAnalysisData = await this.ratesService.getRateAnalysisData(this.benchmark);

        if (rateAnalysisData.result.firm_data) {
          if (rateAnalysisData.result.firm_data.length > 0) {
            this.firmYearData = rateAnalysisData.result.firm_data[0];
            this.firmYearData = this.firmYearData[0];
            this.firmName = this.firmYearData.name;
            this.totalHours = this.firmYearData.total_atty_hours;
          }
        }
        if (rateAnalysisData.result.overall_spend) {
          this.overallSpendData = rateAnalysisData.result.overall_spend;
        }
        if (rateAnalysisData.result.cluster) {
          this.cluster = rateAnalysisData.result.cluster;
        }
        if (rateAnalysisData.result.num_tiers) {
          this.numPartnerTiers = rateAnalysisData.result.num_tiers;
        }
        this.loaded = true;
      });
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  goBack(): void {
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/' + this.benchmark.id]);
  }

}
