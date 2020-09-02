import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {CommonService} from '../shared/services/common.service';
import {Subscription} from 'rxjs';
import {IMetric, SavingMetrics, SavingsCalculatorService} from './savings-calculator.service';
import {SavingsWidgetComponent} from './savings-widget/savings-widget.component';
import {ProgressSemiCircleComponent} from './progress-semi-circle/progress-semi-circle.component';
import {SAVINGS_CALCULATOR_CONFIG} from '../shared/services/config';

@Component({
  selector: 'bd-savings-calculator',
  templateUrl: './savings-calculator.component.html',
  styleUrls: ['./savings-calculator.component.scss']
})
export class SavingsCalculatorComponent implements OnInit, OnDestroy {
  errorMessage: any;
  pendingRequest: Subscription;
  calcData: any;
  grandTotal: number = 0;
  grandPercent: number = 0;
  totalSpend: number = 0;
  currentYear: number = 0;
  metrics: Array<IMetric> = [];
  pageName: string = 'app.client-dashboard.savings-calculator';
  @ViewChild(SavingsWidgetComponent) bbWidget: SavingsWidgetComponent;
  @ViewChild(ProgressSemiCircleComponent) bdProgress: ProgressSemiCircleComponent;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public savingsService: SavingsCalculatorService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Savings Calculator';
  }

  ngOnInit() {
    this.getSavingsCalculator(null);
  }

  getSavingsCalculator(evt: any): void {
    this.grandTotal = 0;
    this.metrics = [];
    const params = this.filtersService.getCurrentUserCombinedFilters();
    params.numberOfYears = SAVINGS_CALCULATOR_CONFIG.numberOfYears;
    this.pendingRequest = this.httpService.makeGetRequest('getSavingsCalculator', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.calcData = data.result;
          this.formatData();
          // this.calculateGrandTotal();
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  formatData(): void {
    if (this.calcData.bb_percent && this.calcData.bb_percent.length > 0) {
      this.totalSpend = this.calcData.bb_percent[this.currentYear].total_billed;
      const metricBB = this.savingsService.createMetricsRecord(this.calcData.bb_percent[this.currentYear], SavingMetrics.BlockBilling);
      this.metrics.push(metricBB);
    }
    if (this.calcData.rate_increase && this.calcData.rate_increase.length > 0) {
      const metricRateIncrease = this.savingsService.createRateIncreaseRecord(this.calcData.rate_increase);
      this.metrics.push(metricRateIncrease);
    }
    if (this.calcData.overstaffing && this.calcData.overstaffing.length > 0) {
      const metricOverstaffing = this.savingsService.createMetricsRecord(this.calcData.overstaffing[this.currentYear], SavingMetrics.Overstaffing);
      this.metrics.push(metricOverstaffing);
    }
  }

  updateTotals(evt: IMetric): void {
    this.calculateGrandTotal();
  }

  calculateGrandTotal(): void {
    this.grandTotal = 0;
    this.grandPercent = 0;
    for (const metric of this.metrics) {
      this.grandTotal += metric.savings;
      const percent = this.savingsService.calculatePercent(metric.savings, this.totalSpend);
      this.grandPercent += Math.round(percent);
    }
    setTimeout(() => {
      this.bdProgress.updateValues(this.grandTotal, this.grandPercent);
    });
  }

  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
