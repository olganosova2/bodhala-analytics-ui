import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { IRateBenchmark } from '../../rates-analysis.model';

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
  // vars to store seniority bucket market average and interal data
  firmAssociateSeniorityData: any;
  firmPartnerSeniorityData: any;
  juniorAssociateMIData: any = null;
  midAssociateMIData: any = null;
  seniorAssociateMIData: any = null;
  partnerMIData: any;
  juniorAssocFirmHours: number;
  midAssocFirmHours: number;
  seniorAssocFirmHours: number;
  juniorAssocFirmRate: number;
  midAssocFirmRate: number;
  seniorAssocFirmRate: number;



  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public ratesService: RatesAnalysisService) {
    this.commonServ.pageTitle = 'View Rate Analysis';
    setTimeout(() => {
      this.commonServ.pageSubtitle = this.firmName;
    });
  }

  async ngOnInit(): Promise<void> {
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

      const granularResult = await this.ratesService.getGranularityPageData(this.benchmark, this.numPartnerTiers);
      this.setData(granularResult);
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
        const granularResult = await this.ratesService.getGranularityPageData(this.benchmark, this.numPartnerTiers);
        this.setData(granularResult);
      });
    }
  }

  setData(granularResult: any): void {
    if (granularResult.associate_market_internal) {
      const junior = granularResult.associate_market_internal.filter(a => a.seniority === 'Junior');
      if (junior.length > 0) {
        this.juniorAssociateMIData = junior[0];
      }
      const mid = granularResult.associate_market_internal.filter(a => a.seniority === 'Mid-Level');
      if (mid.length > 0) {
        this.midAssociateMIData = mid[0];
      }
      const senior = granularResult.associate_market_internal.filter(a => a.seniority === 'Senior');
      if (senior.length > 0) {
        this.seniorAssociateMIData = senior[0];
      }
    }
    if (granularResult.firm_associate) {
      if (granularResult.firm_associate.length > 0) {
        this.firmAssociateSeniorityData = granularResult.firm_associate[0];
        this.juniorAssocFirmHours = this.firmAssociateSeniorityData.total_junior_assoc_hours;
        this.juniorAssocFirmRate = this.firmAssociateSeniorityData.junior_rate;
        this.midAssocFirmHours = this.firmAssociateSeniorityData.total_mid_assoc_hours;
        this.midAssocFirmRate = this.firmAssociateSeniorityData.mid_rate;
        this.seniorAssocFirmHours = this.firmAssociateSeniorityData.total_senior_assoc_hours;
        this.seniorAssocFirmRate = this.firmAssociateSeniorityData.senior_rate;
      }
    }
    if (granularResult.partner_market_internal) {
      this.partnerMIData = granularResult.partner_market_internal;
    }
    if (granularResult.firm_partner) {
      if (granularResult.firm_partner.length > 0) {
        this.firmPartnerSeniorityData = granularResult.firm_partner[0];
      }
    }
    this.loaded = true;
  }

  counter(i: number) {
    return new Array(i);
  }

  goToOverviewPage(): void {
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/', this.benchmark.id]);
  }

  goToNamedTKPage(): void {
    const detailData = {
      bm: this.benchmark,
      partnerMarketInternal: this.partnerMIData,
      associateJuniorMarketInternal: this.juniorAssociateMIData,
      associateMidMarketInternal: this.midAssociateMIData,
      associateSeniorMarketInternal: this.seniorAssociateMIData,
      firmAssociateData: this.firmAssociateSeniorityData,
      firmPartnerData: this.firmPartnerSeniorityData,
      firmYear: this.firmYearData,
      cluster: this.cluster,
      numTiers: this.numPartnerTiers,
      peerFirms: this.peerFirms
    };
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/named/', this.benchmark.id],
    {state:
      {
        data: detailData
      }
    });

  }

  export(): void {
    this.commonServ.pdfLoading = true;
    let exportName = '';
    if (this.userService.currentUser.client_info.org.name !== null) {
      exportName = this.userService.currentUser.client_info.org.name + ' Rate BM (TK Seniority) - ' + this.firmName + ' - ' + this.benchmark.smart_practice_area;
    } else {
      exportName = 'Rate Benchmark';
    }
    setTimeout(() => {
      this.commonServ.generatePdfRateBM(exportName, 'exportDiv');
    }, 200);
  }

  goBack(): void {
    this.router.navigate(['/analytics-ui/rate-benchmarking/']);
  }

}
