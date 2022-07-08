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
  juniorAssociateMarketData: any = null;
  midAssociateMarketData: any = null;
  seniorAssociateMarketData: any = null;
  juniorAssociateInternalData: any = null;
  midAssociateInternalData: any = null;
  seniorAssociateInternalData: any = null;
  partnerMarketData: any;
  partnerInternalData: any;
  juniorAssocFirmHours: number;
  midAssocFirmHours: number;
  seniorAssocFirmHours: number;
  juniorAssocFirmRate: number;
  midAssocFirmRate: number;
  seniorAssocFirmRate: number;
  marketAvgFirms: Array<any>;
  internalFirms: Array<any>;


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
      if (history.state.data.marketFirms) {
        this.marketAvgFirms = history.state.data.marketFirms;
      }
      if (history.state.data.panel) {
        this.internalFirms = history.state.data.panel;
      }
      if (history.state.data.totalSpend) {
        this.overallSpendData = history.state.data.totalSpend;
      }
      if (history.state.data.numTiers) {
        this.numPartnerTiers = history.state.data.numTiers;
      }
      this.firmId = this.benchmark.bh_lawfirm_id;
      this.practiceArea = this.benchmark.smart_practice_area;
      this.year = this.benchmark.year;

      const granularResult = await this.ratesService.getGranularityPageData(this.benchmark, this.numPartnerTiers);
      this.setData(granularResult);
    } else {
      this.route.paramMap.subscribe(async params => {
        this.benchmarkId = Number(params.get('id'));
        const result = await this.ratesService.getBenchmark(this.benchmarkId);
        this.firmName = result.firm_name;
        this.benchmark = result.benchmark;
        if (this.benchmark.market_avg_firms) {
          this.marketAvgFirms = this.benchmark.market_avg_firms;
        } else {
          this.marketAvgFirms = result.market_firms;
        }
        if (this.benchmark.internal_firms) {
          this.internalFirms = this.benchmark.internal_firms;
        } else {
          this.internalFirms = result.internal_firms;
        }
        this.firmId = this.benchmark.bh_lawfirm_id;
        this.practiceArea = this.benchmark.smart_practice_area;
        this.year = this.benchmark.year;
        const rateAnalysisData = await this.ratesService.getRateAnalysisData(this.benchmark);
        if (rateAnalysisData.result.firm_data) {
          if (rateAnalysisData.result.firm_data.length > 0) {
            this.firmYearData = rateAnalysisData.result.firm_data[0];
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
    if (granularResult.market_internal) {
      this.juniorAssociateMarketData = {
        market_associate_rate_hi: granularResult.market_internal.junior_associate_market_hi,
        market_associate_rate_lo: granularResult.market_internal.junior_associate_market_lo,
        market_num_firms: granularResult.market_internal.junior_associate_market_num_firms
      };
      this.midAssociateMarketData = {
        market_associate_rate_hi: granularResult.market_internal.mid_associate_market_hi,
        market_associate_rate_lo: granularResult.market_internal.mid_associate_market_lo,
        market_num_firms: granularResult.market_internal.mid_associate_market_num_firms
      };
      this.seniorAssociateMarketData = {
        market_associate_rate_hi: granularResult.market_internal.senior_associate_market_hi,
        market_associate_rate_lo: granularResult.market_internal.senior_associate_market_lo,
        market_num_firms: granularResult.market_internal.senior_associate_market_num_firms
      };
      this.juniorAssociateInternalData = {
        internal_num_firms: granularResult.market_internal.junior_associate_internal_num_firms,
        internal_avg_associate_rate: granularResult.market_internal.junior_associate_internal
      };
      this.midAssociateInternalData = {
        internal_num_firms: granularResult.market_internal.mid_associate_internal_num_firms,
        internal_avg_associate_rate: granularResult.market_internal.mid_associate_internal
      };
      this.seniorAssociateInternalData = {
        internal_num_firms: granularResult.market_internal.senior_associate_internal_num_firms,
        internal_avg_associate_rate: granularResult.market_internal.senior_associate_internal
      };

      this.partnerInternalData = [];
      this.partnerMarketData = [];

      const juniorPartnerMarket = {
        market_partner_rate_hi: granularResult.market_internal.junior_partner_market_hi,
        market_partner_rate_lo: granularResult.market_internal.junior_partner_market_lo,
        market_num_firms: granularResult.market_internal.junior_partner_market_num_firms,
        seniority: 'Junior'
      };
      const midPartnerMarket = {
        market_partner_rate_hi: granularResult.market_internal.mid_partner_market_hi,
        market_partner_rate_lo: granularResult.market_internal.mid_partner_market_lo,
        market_num_firms: granularResult.market_internal.mid_partner_market_num_firms,
        seniority: 'Mid-Level'
      };
      const seniorPartnerMarket = {
        market_partner_rate_hi: granularResult.market_internal.senior_partner_market_hi,
        market_partner_rate_lo: granularResult.market_internal.senior_partner_market_lo,
        market_num_firms: granularResult.market_internal.senior_partner_market_num_firms,
        seniority: 'Senior'
      };
      const juniorPartnerInternal = {
        internal_avg_partner_rate: granularResult.market_internal.junior_partner_internal,
        internal_num_firms: granularResult.market_internal.junior_partner_internal_num_firms,
        seniority: 'Junior'
      };
      const midPartnerInternal = {
        internal_avg_partner_rate: granularResult.market_internal.mid_partner_internal,
        internal_num_firms: granularResult.market_internal.mid_partner_internal_num_firms,
        seniority: 'Mid-Level'
      };
      const seniorPartnerInternal = {
        internal_avg_partner_rate: granularResult.market_internal.senior_partner_internal,
        internal_num_firms: granularResult.market_internal.senior_partner_internal_num_firms,
        seniority: 'Senior'
      };
      this.partnerMarketData.push(juniorPartnerMarket);
      this.partnerMarketData.push(midPartnerMarket);
      this.partnerMarketData.push(seniorPartnerMarket);
      this.partnerInternalData.push(juniorPartnerInternal);
      this.partnerInternalData.push(midPartnerInternal);
      this.partnerInternalData.push(seniorPartnerInternal);
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
    if (this.loaded) {
      this.router.navigate(['/analytics-ui/rate-benchmarking/view/', this.benchmark.id]);
    }
  }

  goToNamedTKPage(): void {
    if (this.loaded) {
      const detailData = {
        bm: this.benchmark,
        partnerMarket: this.partnerMarketData,
        partnerInternal: this.partnerInternalData,
        associateJuniorMarket: this.juniorAssociateMarketData,
        associateMidMarket: this.midAssociateMarketData,
        associateSeniorMarket: this.seniorAssociateMarketData,
        associateJuniorInternal: this.juniorAssociateInternalData,
        associateMidInternal: this.midAssociateInternalData,
        associateSeniorInternal: this.seniorAssociateInternalData,
        firmAssociateData: this.firmAssociateSeniorityData,
        firmPartnerData: this.firmPartnerSeniorityData,
        firmYear: this.firmYearData,
        cluster: this.cluster,
        numTiers: this.numPartnerTiers,
        panel: this.internalFirms,
        marketFirms: this.marketAvgFirms
      };
      this.router.navigate(['/analytics-ui/rate-benchmarking/view/named/', this.benchmark.id],
      {state:
        {
          data: detailData
        }
      });
    }
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
