import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, UserService} from 'bodhala-ui-common';
import {IQbrMetric} from '../qbr-model';
import {executiveSummaryChartOptions} from './model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'bd-qbr-executive-summary',
  templateUrl: './qbr-executive-summary.component.html',
  styleUrls: ['./qbr-executive-summary.component.scss', '../qbr-css.scss']
})
export class QbrExecutiveSummaryComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestQbr: Subscription;
  qbrType: any = 'YoY';
  cardTitle: string;
  percentOfTotalSpend: number = 87;
  percentOfTotalSpendDir: number = 1;
  chartHours: any;
  chartBB: any;
  optionsBB: any;
  optionsHours: any;
  totalSpendMetric: IQbrMetric;
  tkHours: Array<IQbrMetric> = [];
  rightSideMetrics: Array<IQbrMetric> = [];
  bbMetric: IQbrMetric;
  constructor(public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService) {
    this.commonServ.pageTitle = 'QBR';
    this.commonServ.pageSubtitle = 'Executive Summary';
    this.cardTitle = this.userService.currentUser.client_info.org.name + ' Exec Summary';
  }

  ngOnInit(): void {
    this.setUpChartOptions();
    this.processRecords();
  }
  processRecords(): void {
    this.totalSpendMetric = {label: 'Total Spend', directionQoQ: 1, percentQoQ: 19, directionYoY: 1, percentYoY: 2, amount: 7879678};
    this.bbMetric = {label: 'Block Billed', directionQoQ: -1, percentQoQ: 12, directionYoY: 1, percentYoY: 6, amount: 32};
    this.processTimekeepersHours();
    this.processRightSideMetrics();
  }
  processRightSideMetrics(): void {
    this.rightSideMetrics = [];
    this.rightSideMetrics.push({ label: 'BPI', directionQoQ: -1, percentQoQ: 19, directionYoY: 1, percentYoY: 2, amount: 3356, amountToCompare: 3010,  icon: 'bpi.svg'});
    this.rightSideMetrics.push({ label: 'Blended Rate', directionQoQ: -1, percentQoQ: 23, directionYoY: 1, percentYoY: 2, amount: 747, amountToCompare: 790, icon: 'bills.svg'});
    this.rightSideMetrics.push({ label: 'Avg. Partner hourly cost', directionQoQ: -1, percentQoQ: 19, directionYoY: 1, percentYoY: 2, amount: 1506, amountToCompare: 1400, icon: 'partners.svg'});
    this.rightSideMetrics.push({ label: 'Avg. Associate hourly cost', directionQoQ: -1, percentQoQ: 19, directionYoY: 1, percentYoY: 2, amount: 642, amountToCompare: 560, icon: 'avg_ass_matter.svg'});
  }
  processTimekeepersHours(): void {
    this.tkHours = [];
    this.tkHours.push({ label: 'Partner', directionQoQ: -1, percentQoQ: 14, directionYoY: 1, percentYoY: 15, amount: 33});
    this.tkHours.push({ label: 'Associate', directionQoQ: 1, percentQoQ: 16, directionYoY: -1, percentYoY: 17, amount: 20});
    this.tkHours.push({ label: 'Other', directionQoQ: 1, percentQoQ: 20, directionYoY: -1, percentYoY: 21, amount: 47});
  }
  setUpChartOptions(): void {
    this.optionsHours = Object.assign({}, executiveSummaryChartOptions);
    this.optionsHours.series[0].data = [];
    this.optionsBB = Object.assign({}, executiveSummaryChartOptions);
    this.optionsBB.series[0].data = [];
  }
  saveInstanceHours(chartInstance): void {
    this.chartHours = chartInstance;
    const result = this.tkHours.map(e => e.amount);
    this.chartHours.series[0].setData(result);
  }
  saveInstanceBB(chartInstance): void {
    this.chartBB = chartInstance;
    const result = [this.bbMetric.amount, 100 - this.bbMetric.amount];
    this.chartBB.series[0].setData(result);
    this.chartBB.series[0].options.colors = ['#3EDB73', 'red'];
    this.chartBB.series[0].update(this.chartBB.series[0].options);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestQbr) {
      this.pendingRequestQbr.unsubscribe();
    }
  }
}
