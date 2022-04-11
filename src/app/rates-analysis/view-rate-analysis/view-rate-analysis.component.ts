import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RatesAnalysisService } from '../rates-analysis.service';
import { IRateBenchmark, moneyFormatter, percentFormatter, COST_IMPACT_GRADES, rateBenchmarkingChartOptions } from '../rates-analysis.model';


@Component({
  selector: 'bd-view-rate-analysis',
  templateUrl: './view-rate-analysis.component.html',
  styleUrls: ['./view-rate-analysis.component.scss']
})
export class ViewRateAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  benchmarkId: number;
  benchmark: IRateBenchmark;
  peerFirms: Array<string>;
  loaded: boolean = false;
  diffsCalculated: boolean = false;
  practiceArea: string;
  firmName: string;
  firmId: number;
  year: number;
  firmYearData: any;
  internalYearData: any;
  marketAverageData: any;
  firmRateIncreasePct: number;
  cohortRateIncreasePct: number;
  firmClassificationRateIncreaseData: Array<any>;
  cohortClassificationRateIncreaseData: Array<any>;
  firmTotalSpend: number;
  firmTotalSpendFormatted: string;
  firmCostImpact: number;
  cohortCostImpact: number;
  firmCostImpactFormatted: string;
  cohortCostImpactFormatted: string;
  helpText: string = 'An estimated increase in spend should your rates increase at this rate.';
  totalSpendText: string = 'This Total Spend figure only includes Partner and Associate line items.';
  marketBlendedRateLowerRangeDiff: string;
  marketBlendedRateUpperRangeDiff: string;
  internalBlendedRateDiff: string;

  marketBPILowerRangeDiff: string;
  marketBPIUpperRangeDiff: string;
  internalBPIDiff: string;
  costImpactGrade: string;
  costImpactLower: number;
  costImpactUpper: number;
  costImpactLowerFormatted: string;
  costImpactUpperFormatted: string;
  blendedWithinRange: boolean;
  // needed? Or conditionals in template?
  costImpactColor: string;
  firmRateIncreaseColor: string = '';
  cohortRateIncreaseColor: string = '';
  optionsTotal: any;
  optionsTotalPA: any;
  chartTotal: any;
  chartTotalPA: any;
  overallSpendData: any;
  overallSpendPAData: any;
  pctOfTotalSpend: string;
  pctOfPASpend: string;
  insightText: string;
  insightExpanded: boolean = false;
  cluster: number;
  numPartnerTiers: number;


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
    this.setUpChartOptions();
    this.route.paramMap
      .subscribe(async params => {
        // this.report = this.qbrService.savedQBR;
        this.benchmarkId = Number(params.get('id'));
        const result = await this.ratesService.getBenchmark(this.benchmarkId);
        this.firmName = result.firm_name;
        this.benchmark = result.benchmark;
        this.firmId = this.benchmark.bh_lawfirm_id;
        this.practiceArea = this.benchmark.smart_practice_area;
        this.year = this.benchmark.year;
        this.peerFirms = result.peer_firms;
        const ix = result.peer_firms.findIndex(p => p === this.firmName);
        this.peerFirms = [];
        if (ix >= 0) {
          result.peer_firms.splice(ix, 1);
        }
        if (result.peer_firms) {
          let counter = 0;
          for (const firm of result.peer_firms) {
            if ((firm.length + counter) < 115) {
              this.peerFirms.push(firm);
            }
            counter += firm.length;
          }
        }
        // UNCOMMENT BEFORE PUSHING
        // const insightResult = await this.ratesService.getBenchmarkInsight(this.benchmark);
        // if (insightResult.result) {
        //   if (insightResult.result.is_enabled) {
        //     this.insightText = insightResult.result.description;

        //   }
        // }
        // this.getData();
        const rateAnalysisData = await this.ratesService.getRateAnalysisData(this.benchmark);
        this.processData(rateAnalysisData);
      });
  }

  setUpChartOptions(): void {
    this.optionsTotal = Object.assign({}, rateBenchmarkingChartOptions);
    this.optionsTotal.series[0].data = [];
    this.optionsTotalPA = Object.assign({}, rateBenchmarkingChartOptions);
    this.optionsTotalPA.series[0].data = [];
  }

  processData(data): void {
    if (data.result) {
      if (data.result.market_average) {
        if (data.result.market_average.length > 0) {
          this.marketAverageData = data.result.market_average[0];
        }
      }
      if (data.result.firm_data) {
        if (data.result.firm_data.length > 0) {
          this.firmYearData = data.result.firm_data[0];
          this.firmYearData = this.firmYearData[0];
        }
      }
      if (data.result.internal_data) {
        if (data.result.internal_data.length > 0) {
          this.internalYearData = data.result.internal_data[0];
        }
      }
      if (data.result.num_tiers) {
        this.numPartnerTiers = data.result.num_tiers;
      }
      if (data.result.cluster) {
        this.cluster = data.result.cluster;
      }
      if (data.result.overall_spend) {
        this.overallSpendData = data.result.overall_spend;
      }
      if (data.result.overall_pa_spend) {
        this.overallSpendPAData = data.result.overall_pa_spend;
      }
      this.loaded = true;
      if (data.result.max_year && data.result.firm_rate_result_classification && data.result.cohort_rate_result_classification) {
        const validRange = data.result.valid_range;
        let firmClassificationRateIncreasePct = {
          classificationData: null,
          rateIncreasePct: null,
          total: null,
        };
        if (validRange) {
          firmClassificationRateIncreasePct = this.ratesService.calculateRateIncreasePctClassification(data.result.firm_rate_result_classification, data.result.max_year, true, validRange, this.year);
        } else {
          firmClassificationRateIncreasePct = this.ratesService.calculateRateIncreasePctClassification(data.result.firm_rate_result_classification, (data.result.max_year + 1), true, validRange, this.year);
        }
        const maxYear = data.result.max_year;
        const cohortClassificationRateIncreasePct = this.ratesService.calculateRateIncreasePctClassification(data.result.cohort_rate_result_classification, data.result.max_year, false, true, this.year);
        this.firmClassificationRateIncreaseData = firmClassificationRateIncreasePct.classificationData;
        this.cohortClassificationRateIncreaseData = cohortClassificationRateIncreasePct.classificationData;
        this.firmRateIncreasePct = firmClassificationRateIncreasePct.rateIncreasePct;
        this.cohortRateIncreasePct = cohortClassificationRateIncreasePct.rateIncreasePct;
        this.firmRateIncreasePct *= 100;
        this.cohortRateIncreasePct *= 100;
        if (this.firmYearData) {
          // if difference is more than equal to 2 we can't calculate total firm spend using the effective rate query
          this.firmTotalSpend = this.firmYearData.total_atty_billed;
        } else {
          this.firmTotalSpend = firmClassificationRateIncreasePct.total;
        }
        this.firmTotalSpendFormatted = moneyFormatter.format(this.firmTotalSpend);

        this.firmRateIncreaseColor = this.getColor(this.firmRateIncreasePct);
        this.cohortRateIncreaseColor = this.getColor(this.cohortRateIncreasePct);

        const projectedCostImpact = this.ratesService.calculateProjectedCostImpact(this.firmClassificationRateIncreaseData, this.cohortClassificationRateIncreaseData);
        if (this.firmTotalSpend) {
          const totalFirmSpend = this.firmTotalSpend * (1 + (this.firmRateIncreasePct / 100));
          this.firmCostImpact = totalFirmSpend - this.firmTotalSpend;
          this.firmCostImpactFormatted = moneyFormatter.format(this.firmCostImpact);

          const projectedCohortSpend = this.firmTotalSpend * (1 + (this.cohortRateIncreasePct / 100));
          this.cohortCostImpact = projectedCohortSpend - this.firmTotalSpend;
          this.cohortCostImpactFormatted = moneyFormatter.format(this.cohortCostImpact);
        }
        const historicalCostImpact = this.ratesService.calculateHistoricalCostImpact(this.firmYearData, this.marketAverageData);
        this.costImpactGrade = historicalCostImpact.cost_impact;
        this.costImpactColor = COST_IMPACT_GRADES[this.costImpactGrade].color;
        this.costImpactLower = historicalCostImpact.blended_rate_lower_diff;
        this.costImpactUpper = historicalCostImpact.blended_rate_upper_diff;
        if (this.costImpactUpper < 0 && this.costImpactLower < 0) {
          this.costImpactColor = '#3EDB73';
        } else {
          this.costImpactColor = COST_IMPACT_GRADES[this.costImpactGrade].color;
        }
        if (this.costImpactLower >= 10000) {
          this.costImpactLower = Math.ceil(this.costImpactLower / 10000) * 10000;
        } else {
          this.costImpactLower = Math.ceil(this.costImpactLower / 1000) * 1000;
        }
        if (this.costImpactUpper >= 10000) {
          this.costImpactUpper = Math.ceil(this.costImpactUpper / 10000) * 10000;
        } else {
          this.costImpactUpper = Math.ceil(this.costImpactUpper / 1000) * 1000;
        }
        if (this.costImpactLower > 0) {
          this.costImpactLowerFormatted = moneyFormatter.format(this.costImpactLower);
        } else {
          this.costImpactLowerFormatted = moneyFormatter.format((this.costImpactLower * -1));
        }
        if (this.costImpactUpper > 0) {
          this.costImpactUpperFormatted = moneyFormatter.format(this.costImpactUpper);
        } else {
          this.costImpactUpperFormatted = moneyFormatter.format((this.costImpactUpper * -1));
        }
        this.blendedWithinRange = historicalCostImpact.blended_within_range;
      }
    }
  }

  goToDetail(): void {
    const detailData = {
      firmYear: this.firmYearData,
      bm: this.benchmark,
      totalSpend: this.overallSpendData,
      market: this.marketAverageData,
      internal: this.internalYearData,
      cluster: this.cluster,
      numTiers: this.numPartnerTiers,
      peerFirms: this.peerFirms
    };
    this.router.navigate(['/analytics-ui/rate-benchmarking/view/detail/', this.benchmark.id],
    {state:
      {
        data: detailData
      }
    });
  }

  setStyle(): any {
    const styles = {
      'background-image': '-webkit-linear-gradient(bottom, #FFFFFF 67%,' +  this.costImpactColor + ' 33%)',
    };
    return styles;
  }

  setIncreaseStyle(): any {
    const styles = {
      background: 'linear-gradient(to right, #FFFFFF 72%,' + this.firmRateIncreaseColor  + ' 28%)'
    };
    return styles;
  }

  setMarketIncreaseStyle(): any {
    const styles = {
      background: 'linear-gradient(to right, #FFFFFF 72%,' + this.cohortRateIncreaseColor  + ' 28%)'
    };
    return styles;
  }

  saveInstanceTotal(chartInstance): void {
    this.chartTotal = chartInstance;
    let result = [0, 0];
    if (this.overallSpendData) {
      if (this.overallSpendData.total_spend) {
        if (this.overallSpendData.total_spend.total > 0) {
          let pctOfSpend = this.firmTotalSpend / this.overallSpendData.total_spend.total;
          setTimeout(() => {
            this.pctOfTotalSpend = percentFormatter.format(pctOfSpend);
            pctOfSpend *= 100;
            result = [pctOfSpend, 100 - pctOfSpend];
            this.chartTotal.series[0].setData(result);
            this.chartTotal.series[0].options.colors = ['#00D1FF', '#cccccc'];
            this.chartTotal.series[0].update(this.chartTotal.series[0].options);
          });
        }
      }
    }
  }

  saveInstancePATotal(chartInstance): void {
    this.chartTotalPA = chartInstance;
    let result = [0, 0];
    if (this.overallSpendPAData) {
      if (this.overallSpendPAData.total_spend) {
        if (this.overallSpendPAData.total_spend.total > 0) {
          let pctOfSpend = this.firmTotalSpend / this.overallSpendPAData.total_spend.total;
          setTimeout(() => {
            this.pctOfPASpend = percentFormatter.format(pctOfSpend);
            pctOfSpend *= 100;
            result = [pctOfSpend, 100 - pctOfSpend];
            this.chartTotalPA.series[0].setData(result);
            this.chartTotalPA.series[0].options.colors = ['#00D1FF', '#cccccc'];
            this.chartTotalPA.series[0].update(this.chartTotalPA.series[0].options);
          });
        }
      }
    }
  }

  toggleInsight(toExpand: boolean): void {
    this.insightExpanded = toExpand;
  }

  getColor(increasePct: number): string {
    increasePct = Math.round(increasePct);
    let result = '';
    if (increasePct >= 10) {
      result = '#FE3F56';
    } else if (increasePct < 10 && increasePct >= 7) {
      result = '#FF8B4A';
    } else if (increasePct < 7 && increasePct > 3) {
      result = '#FFC327';
    } else {
      result = '#3EDB73';
    }
    return result;
  }

  export(): void {
    this.commonServ.pdfLoading = true;
    let exportName = '';
    if (this.userService.currentUser.client_info.org.name !== null) {
      exportName = this.userService.currentUser.client_info.org.name + ' Rate Benchmark - ' + this.firmName + ' - ' + this.benchmark.smart_practice_area;
    } else {
      exportName = 'Rate Benchmark';
    }
    setTimeout(() => {
      this.commonServ.generatePdfOuter(exportName, 'exportDiv', null);
    }, 200);
  }

  goBack(): void {
    this.router.navigate(['/analytics-ui/rate-benchmarking']);
  }
}
