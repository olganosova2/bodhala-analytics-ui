import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IMetric, IPastSavingsMetric, ISavingsRecord, SavingsCalculatorService} from '../savings-calculator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import {SAVINGS_CALCULATOR_CONFIG} from '../../shared/services/config';

@Component({
  selector: 'bd-past-savings',
  templateUrl: './past-savings.component.html',
  styleUrls: ['./past-savings.component.scss']
})
export class PastSavingsComponent implements OnInit, OnDestroy {
  errorMessage: any;
  pendingRequest: Subscription;
  calcData: any;
  lastYearSpend = 0;
  pageName: string = 'analytics.pastsavings';
  pastSavingsConfig: any;
  totalSavings = 0;
  percentAnnualIncrease = SAVINGS_CALCULATOR_CONFIG.defaultPercentAnnualIncrease;
  calculatedMetrics: Array<IPastSavingsMetric> = [];
  constructor(private route: ActivatedRoute,
              public router: Router,
              public dialog: MatDialog,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public savingsService: SavingsCalculatorService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Past Savings';
  }

  ngOnInit(): void {
    this.initConfig();
  }
  initConfig(): void {
    if (this.userService.config && this.userService.config['analytics.pastsavings']) {
      const configs = this.userService.config['analytics.pastsavings'].configs || [];
      if (configs.length > 0) {
        const json = configs[0].json_config ? configs[0].json_config : {};
        if (json) {
          this.pastSavingsConfig = Object.assign({}, json);
          if (this.pastSavingsConfig.percent_annual_increase) {
            this.percentAnnualIncrease = this.pastSavingsConfig.percent_annual_increase;
          }
          this.getPastSavingsData(null);
        }
      }
    }
  }
  getPastSavingsData(evt: any): void {
    this.calculatedMetrics = [];
    this.totalSavings = 0;
    const params = this.filtersService.getCurrentUserCombinedFilters();
    if (this.pastSavingsConfig.overstaffing_number) {
      params.overstaffingNumber = this.pastSavingsConfig.overstaffing_number;
    }
    if (this.pastSavingsConfig.meetings_start_date) {
      params.meetings_start_date = this.pastSavingsConfig.meetings_start_date;
    }
    if (this.pastSavingsConfig.bb_start_date) {
      params.bb_start_date = this.pastSavingsConfig.bb_start_date;
    }

    this.pendingRequest = this.httpService.makeGetRequest('getPastSavings', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.calcData = data.result;
          this.formatData();
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  formatData(): void {
    this.lastYearSpend = (this.calcData.bb_percent && this.calcData.bb_percent.total_billed) ? this.calcData.bb_percent.total_billed : 0;
    if (this.pastSavingsConfig && this.calcData.upload_start_date) {
      this.calculatedMetrics.push(this.savingsService.calculateSentinel(this.lastYearSpend, this.percentAnnualIncrease, this.calcData.upload_start_date));
    }
    if (this.pastSavingsConfig.bb_start_date && this.calcData.bb_past_savings) {
     this.calculatedMetrics.push(this.savingsService.calculatePastBlockBilling(this.calcData.bb_percent.total_block_billed, this.calcData.bb_past_savings, this.pastSavingsConfig.bb_start_date, this.calcData.bb_percent.bbp));
    }
    if (this.pastSavingsConfig.rate_increase_percent && this.calcData.rate_increase && this.calcData.rate_increase.length > 0) {
      this.calculatedMetrics.push(this.savingsService.calculatePastRateIncrease(this.lastYearSpend, this.calcData.rate_increase, this.pastSavingsConfig.rate_increase_percent, this.percentAnnualIncrease));
    }
    if (this.pastSavingsConfig.overstaffing_percent && this.pastSavingsConfig.meetings_start_date && this.calcData.overstaffing) {
      this.calculatedMetrics.push(this.savingsService.calculatePastOverbilling(this.calcData.overstaffing, this.pastSavingsConfig.overstaffing_percent));
    }
  }
  getTotals(): number {
    let result = 0;
    for (const metric of this.calculatedMetrics) {
      result += metric.savings;
    }
    return result;
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
