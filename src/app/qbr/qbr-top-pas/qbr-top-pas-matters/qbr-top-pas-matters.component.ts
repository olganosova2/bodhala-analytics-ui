import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {QbrService} from '../../qbr.service';
import {IQbrMetric, IQbrMetricRow, IQbrReport, QbrType, matterChartOptions, IQbrMetricType} from '../../qbr-model';

@Component({
  selector: 'bd-qbr-top-pas-matters',
  templateUrl: './qbr-top-pas-matters.component.html',
  styleUrls: ['../../qbr-css.scss', './qbr-top-pas-matters.component.scss']
})
export class QbrTopPasMattersComponent implements OnInit {
  qbrType: any = QbrType.YoY;
  cardTitle: string;
  chartHours: any;
  chartBB: any;
  chartVolume: any;
  optionsBB: any;
  optionsHours: any;
  optionsVolume; any;
  totalSpendMetric: IQbrMetric;
  tkHours: Array<IQbrMetric> = [];
  rightSideMetrics: Array<IQbrMetric> = [];
  bbMetric: IQbrMetric;
  volumeMetric: IQbrMetric;
  qbrId: number;
  includeExpenses: boolean = false;
  currentOverviewMetric: any;
  compareOverviewMetric: any;
  queryString: string;
  practiceArea: string;
  @Input() pageNum: number = 10;
  @Input() totalSpend: number = 0;
  @Input() indexPa: number = 0;
  @Input() qbrData: any;
  @Input() qbr: IQbrReport;
  @Input() zoom: boolean;

  constructor(private route: ActivatedRoute,
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
      if (this.qbr.querystring && this.qbr.querystring.expenses) {
        this.includeExpenses = this.qbr.querystring.expenses === 'true' || this.qbr.querystring.expenses === true;
        this.queryString = this.qbr.querystring;
      }
      if (this.qbrData) {
        this.setUpChartOptions();
        this.processRecords();
      }
      if (this.indexPa === 1) {
        this.pageNum = this.pageNum + 2;
      }
    }
  }
  processRecords(): void {
    const currentOverviewMetric = this.qbrData.report_timeframe_top_pas[this.indexPa];
    let compareOverviewMetric = this.qbrData.compare_timeframe_top_pa_matter[0];
    if (this.indexPa === 1) {
      compareOverviewMetric = this.qbrData.compare_timeframe_second_pa_matter[0];
    }
    if (!currentOverviewMetric || !compareOverviewMetric) {
      return;
    }
    const comparePARecord = this.qbrData.comparison_timeframe_top_pas && this.qbrData.comparison_timeframe_top_pas.length > 0 ? this.qbrData.comparison_timeframe_top_pas[this.indexPa] : compareOverviewMetric;
    this.practiceArea = currentOverviewMetric.practice_area;
    this.currentOverviewMetric = this.qbrService.mapProperties(currentOverviewMetric, 'matter_', true);
    this.compareOverviewMetric = this.qbrService.mapProperties(compareOverviewMetric, 'matter_', true);
    this.totalSpendMetric = this.qbrService.getOveralSpendMetricPA(this.currentOverviewMetric, this.compareOverviewMetric, this.includeExpenses);
    this.totalSpendMetric.addInfo = currentOverviewMetric.firm_name;
    this.totalSpendMetric.matterName = this.currentOverviewMetric.matter_name;
    this.bbMetric = this.qbrService.getBBMetric(this.currentOverviewMetric, this.compareOverviewMetric);
    this.volumeMetric = this.qbrService.getVolumeMetric(this.currentOverviewMetric, this.compareOverviewMetric, comparePARecord, this.includeExpenses);
    this.processTimekeepersHours();
    this.processRightSideMetrics();
  }
  processRightSideMetrics(): void {
    this.rightSideMetrics = [];
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'bpi',  'BPI', 'bpi.svg', IQbrMetricType.BPI));
    // this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'blended_rate',  'Blended Rate', 'bills.svg'));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_partner_rate',  'Avg. Partner hourly cost',  'partners.svg', IQbrMetricType.PartnerAvgHourlyCost));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_associate_rate',  'Avg. Associate hourly cost', 'avg_ass_matter.svg', IQbrMetricType.AssociateAvgHourlyCost));
  }
  processTimekeepersHours(): void {
    this.tkHours = [];
    this.qbrService.getPercentHours(this.currentOverviewMetric, false);
    this.qbrService.getPercentHours(this.compareOverviewMetric, false);
    this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.partner_percent_hours_worked, this.compareOverviewMetric.partner_percent_hours_worked, this.qbrType, 'Partner'));
    this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.associate_percent_hours_worked, this.compareOverviewMetric.associate_percent_hours_worked, this.qbrType, 'Associate'));
    // this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.paralegal_percent_hours_worked, this.compareOverviewMetric.paralegal_percent_hours_worked, this.qbrType, 'Paralegal'));
    if (this.currentOverviewMetric.other_percent_hours_worked || this.compareOverviewMetric.other_percent_hours_worked) {
      this.tkHours.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric.other_percent_hours_worked, this.compareOverviewMetric.other_percent_hours_worked, this.qbrType, 'Other'));
    }
  }
  setUpChartOptions(): void {
    this.optionsHours = Object.assign({}, matterChartOptions);
    this.optionsHours.series[0].data = [];
    this.optionsBB = Object.assign({}, matterChartOptions);
    this.optionsBB.series[0].data = [];
    this.optionsVolume = Object.assign({}, matterChartOptions);
    this.optionsVolume.series[0].data = [];
  }
  saveInstanceHours(chartInstance): void {
    this.chartHours = chartInstance;
    const result = this.tkHours.map(e => e.amount);
    this.chartHours.series[0].options.colors = ['#00D1FF', '#FF632C', '#cccccc'];
    this.chartHours.series[0].setData(result);
  }
  saveInstanceBB(chartInstance): void {
    this.chartBB = chartInstance;
    const result = [this.bbMetric.amount, 100 - this.bbMetric.amount];
    this.chartBB.series[0].setData(result);
    this.chartBB.series[0].options.colors = ['red', '#3EDB73'];
    this.chartBB.series[0].update(this.chartBB.series[0].options);
  }
  saveInstanceVolume(chartInstance): void {
    this.chartVolume = chartInstance;
    const result = [this.volumeMetric.amount, 100 - this.volumeMetric.amount];
    this.chartVolume.series[0].setData(result);
    this.chartVolume.series[0].options.colors = ['red', '#3EDB73'];
    this.chartVolume.series[0].update(this.chartVolume.series[0].options);
  }

}
