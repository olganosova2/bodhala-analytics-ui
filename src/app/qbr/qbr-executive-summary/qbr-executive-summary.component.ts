import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import * as _moment from 'moment';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {IQbrMetric, IQbrMetricType, IQbrReport, QbrType} from '../qbr-model';
import {executiveSummaryChartOptions} from './model';
import {Subscription} from 'rxjs';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrService} from '../qbr.service';
import {ActivatedRoute} from '@angular/router';
// import {FiltersService as ElemFiltersService} from 'bodhala-ui-elements';

const moment = _moment;


@Component({
  selector: 'bd-qbr-executive-summary',
  templateUrl: './qbr-executive-summary.component.html',
  styleUrls: ['../qbr-css.scss', './qbr-executive-summary.component.scss' ]
})
export class QbrExecutiveSummaryComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestQbr: Subscription;
  qbrType: any = QbrType.YoY;
  cardTitle: string;
  chartHours: any;
  chartBB: any;
  optionsBB: any;
  optionsHours: any;
  totalSpendMetric: IQbrMetric;
  tkHours: Array<IQbrMetric> = [];
  rightSideMetrics: Array<IQbrMetric> = [];
  bbMetric: IQbrMetric;
  qbrId: number;
  practiceAreaSetting: string;
  includeExpenses: boolean = false;
  currentOverviewMetric: any;
  compareOverviewMetric: any;
  queryString: string;
  @Input() qbrData: any;
  @Input() qbr: IQbrReport;
  @Input() zoom: boolean;
  constructor(
              private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public qbrService: QbrService,
              public utilService: UtilService) {
    this.practiceAreaSetting = this.commonServ.getClientPASetting();
    this.cardTitle = this.userService.currentUser.client_info.org.name + ' Exec Summary';
    this.totalSpendMetric = this.qbrService.generateEmptyMetric();
    this.bbMetric = this.qbrService.generateEmptyMetric();
  }

  ngOnInit(): void {
    this.setUpChartOptions();
    if (this.qbr) {
      this.qbrId = this.qbr.id;
      this.qbrType = this.qbr.report_type;
      if (this.qbr.querystring && this.qbr.querystring.expenses) {
        this.includeExpenses = this.qbr.querystring.expenses === 'true' || this.qbr.querystring.expenses === true;
        this.queryString = this.qbr.querystring;
      }
      if (this.qbrData) {
        this.processRecords();
      }
    }
  }
  processRecords(): void {
    this.currentOverviewMetric = this.qbrData.report_timeframe_metrics;
    this.compareOverviewMetric = this.qbrData.comparison_timeframe_metrics;
    if (!this.currentOverviewMetric || !this.compareOverviewMetric) {
      return;
    }
    this.currentOverviewMetric.block_billed_pct = this.currentOverviewMetric.percent_block_billed;
    this.compareOverviewMetric.block_billed_pct = this.compareOverviewMetric.percent_block_billed;
    this.totalSpendMetric = this.qbrService.getOveralSpendMetric(this.currentOverviewMetric, this.compareOverviewMetric, this.includeExpenses);
    this.bbMetric = this.qbrService.getBBMetric(this.currentOverviewMetric, this.compareOverviewMetric);
    this.processTimekeepersHours();
    this.processRightSideMetrics();
  }
  processRightSideMetrics(): void {
    this.rightSideMetrics = [];
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'bodhala_price_index',  'BPI', 'bpi.svg', IQbrMetricType.BPI));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_blended_rate',  'Blended Rate', 'bills.svg', IQbrMetricType.BlendedRate));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_partner_rate',  'Avg. Partner hourly cost',  'partners.svg', IQbrMetricType.PartnerAvgHourlyCost));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_associate_rate',  'Avg. Associate hourly cost', 'avg_ass_matter.svg', IQbrMetricType.AssociateAvgHourlyCost));
  }
  processTimekeepersHours(): void {
    this.tkHours = [];
    this.qbrService.getPercentHours(this.currentOverviewMetric, true);
    this.qbrService.getPercentHours(this.compareOverviewMetric, true);
    this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.partner_percent_hours_worked, this.compareOverviewMetric.partner_percent_hours_worked, this.qbrType, 'Partner'));
    this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.associate_percent_hours_worked, this.compareOverviewMetric.associate_percent_hours_worked, this.qbrType, 'Associate'));
    this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.paralegal_percent_hours_worked, this.compareOverviewMetric.paralegal_percent_hours_worked, this.qbrType, 'Paralegal'));
    if (this.currentOverviewMetric.other_percent_hours_worked || this.compareOverviewMetric.other_percent_hours_worked) {
      this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.other_percent_hours_worked, this.compareOverviewMetric.other_percent_hours_worked, this.qbrType, 'Other'));
    }
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
    this.chartBB.series[0].options.colors = ['#FE3F56', '#cccccc'];
    // this.chartBB.series[0].options.dataLabels.color = '#cccccc';
    this.chartBB.series[0].update(this.chartBB.series[0].options);

    // const remaining = this.chartBB.series[0].points[1];
    // remaining.dataLabels[0].options.style.fontSize = '0px';
    // const point = this.chartBB.series[0].points[1];
    // this.chartBB.series[0].points[1].update(remaining);
  }
  ngOnDestroy() {
    if (this.pendingRequestQbr) {
      this.pendingRequestQbr.unsubscribe();
    }
  }
}
