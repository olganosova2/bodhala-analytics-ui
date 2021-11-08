import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {QbrService} from '../../qbr.service';
import {IChoosenMetrics, IQbrMetric, IQbrReport, QbrType} from '../../qbr-model';

@Component({
  selector: 'bd-qbr-key-trends',
  templateUrl: './qbr-key-trends.component.html',
  styleUrls: ['../../qbr-css.scss', './qbr-key-trends.component.scss']
})
export class QbrKeyTrendsComponent implements OnInit {
  qbrId: number;
  practiceAreaSetting: string;
  includeExpenses: boolean = false;
  currentOverviewMetric: any;
  compareOverviewMetric: any;
  queryString: string;
  choosenMetrics: IChoosenMetrics;
  keyTrendsMetrics: Array<IQbrMetric> = [];
  qbrType: any = QbrType.YoY;
  @Input() qbrData: any;
  @Input() qbr: IQbrReport;
  @Input() zoom: boolean;

  constructor( private route: ActivatedRoute,
               public commonServ: CommonService,
               public appStateService: AppStateService,
               public userService: UserService,
               private httpService: HttpService,
               public filtersService: FiltersService,
               public qbrService: QbrService,
               public utilService: UtilService) { }

  ngOnInit(): void {
    if (this.qbr) {
      this.qbrId = this.qbr.id;
      this.qbrType = this.qbr.report_type;
      this.choosenMetrics = this.qbr.chosen_metrics || this.qbrService.getDefaultChoosenMetrics();
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
    this.currentOverviewMetric = Object.assign({}, this.qbrData.report_timeframe_metrics);
    this.compareOverviewMetric = Object.assign({}, this.qbrData.comparison_timeframe_metrics);
    if (!this.currentOverviewMetric || !this.compareOverviewMetric) {
      return;
    }
    this.currentOverviewMetric.block_billed_pct = this.currentOverviewMetric.percent_block_billed;
    this.compareOverviewMetric.block_billed_pct = this.compareOverviewMetric.percent_block_billed;
    if (this.choosenMetrics.total_spend) {
      const metric = this.qbrService.getOveralSpendMetric(this.currentOverviewMetric, this.compareOverviewMetric, this.includeExpenses);
      metric.amount = Math.abs(metric.amount - metric.amountToCompare);
      metric.format = 'dollar';
      this.keyTrendsMetrics.push(metric);
    }
    if (this.choosenMetrics.partner_hourly_cost) {
      const metric = this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_partner_rate',  'Avg. Partner hourly cost',  'partners.svg');
      metric.format = 'dollar';
      this.keyTrendsMetrics.push(metric);
    }
    if (this.choosenMetrics.associate_hourly_cost) {
      const metric = this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_associate_rate',  'Avg. Associate hourly cost', 'avg_ass_matter.svg');
      metric.format = 'dollar';
      this.keyTrendsMetrics.push(metric);
    }
    this.qbrService.getPercentHours(this.currentOverviewMetric, true);
    this.qbrService.getPercentHours(this.compareOverviewMetric, true);
    if (this.choosenMetrics.partner_hours_percent) {
      const metric = this.qbrService.getTkHoursRecord(this.currentOverviewMetric.partner_percent_hours_worked, this.compareOverviewMetric.partner_percent_hours_worked, this.qbrType, 'Partner');
      metric.format = 'percent';
      this.keyTrendsMetrics.push(metric);
    }
    if (this.choosenMetrics.associate_hours_percent) {
      const metric = this.qbrService.getTkHoursRecord(this.currentOverviewMetric.associate_percent_hours_worked, this.compareOverviewMetric.associate_percent_hours_worked, this.qbrType, 'Associate');
      metric.format = 'percent';
      this.keyTrendsMetrics.push(metric);
    }
    if (this.choosenMetrics.block_billing_percent) {
      const metric = this.qbrService.getBBMetric(this.currentOverviewMetric, this.compareOverviewMetric);
      metric.format = 'percent';
      this.keyTrendsMetrics.push(metric);
    }
    if (this.choosenMetrics.blended_rate) {
      const metric = this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_blended_rate',  'Blended Rate', 'bills.svg');
      metric.format = 'dollar';
      this.keyTrendsMetrics.push(metric);
    }
    if (this.choosenMetrics.bodhala_price_index) {
      const metric = this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'bodhala_price_index',  'BPI', 'bpi.svg');
      metric.format = 'dollar';
      this.keyTrendsMetrics.push(metric);
    }
    // this.bbMetric = this.qbrService.getBBMetric(this.currentOverviewMetric, this.compareOverviewMetric);

  }

}
