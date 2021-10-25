import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrService} from '../qbr.service';
import {IQbrMetric, IQbrReport, QbrType, IQbrMetricRow, metricsBBPasChartOptions, tkHoursPasChartOptions} from '../qbr-model';
import {executiveSummaryChartOptions} from '../qbr-executive-summary/model';

@Component({
  selector: 'bd-qbr-top-pas',
  templateUrl: './qbr-top-pas.component.html',
  styleUrls: ['../qbr-css.scss', './qbr-top-pas.component.scss']
})
export class QbrTopPasComponent implements OnInit {
  qbrType: any = QbrType.YoY;
  chartHours: Array<any> = [];
  chartBB: any;
  optionsBB: any;
  optionsHours: Array<any> = [];
  totalSpendMetric: Array<IQbrMetric> = [];
  tkHours: Array<IQbrMetricRow> = [];
  rightSideMetrics: Array<IQbrMetricRow> = [];
  bbMetric: Array<IQbrMetric> = [];
  qbrId: number;
  includeExpenses: boolean = false;
  currentOverviewMetric: Array<any> = [];
  compareOverviewMetric: Array<any> = [];
  queryString: string;
  @Input() qbrData: any;
  @Input() qbr: IQbrReport;
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
        this.includeExpenses = this.qbr.querystring.expenses === 'true';
        this.queryString = this.qbr.querystring;
      }
      if (this.qbrData) {
        this.processRecords();
      }
    }
  }

  processRecords(): void {
    this.currentOverviewMetric = this.qbrData.report_timeframe_top_pas || [];
    this.compareOverviewMetric = this.qbrData.comparison_timeframe_top_pas || [];
    if (this.currentOverviewMetric.length === 0 || this.compareOverviewMetric.length  === 0) {
      return;
    }
    const paLength = this.currentOverviewMetric.length;
    for (let ix = 0; ix < paLength; ix++) {
      const spendMetric = this.qbrService.getOveralSpendMetricPA(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], this.includeExpenses);
      spendMetric.addInfo = this.currentOverviewMetric[ix].practice_area;
      this.totalSpendMetric.push(spendMetric);
      this.bbMetric.push(this.qbrService.getBBMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix]));
      this.qbrService.getPercentHours(this.currentOverviewMetric[ix], false);
      this.qbrService.getPercentHours(this.compareOverviewMetric[ix], false);
      const resultTKs = { label: this.currentOverviewMetric[ix].practice_area, metrics: []};
      resultTKs.metrics.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric[ix].partner_percent_hours_worked, this.compareOverviewMetric[ix].partner_percent_hours_worked, this.qbrType, 'Partner'));
      resultTKs.metrics.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric[ix].associate_percent_hours_worked, this.compareOverviewMetric[ix].associate_percent_hours_worked, this.qbrType, 'Associate'));
      if (this.currentOverviewMetric[ix].other_percent_hours_worked || this.compareOverviewMetric[ix].other_percent_hours_worked) {
        resultTKs.metrics.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric[ix].other_percent_hours_worked, this.compareOverviewMetric[ix].other_percent_hours_worked, this.qbrType, 'Other'));
      }
      this.tkHours.push(resultTKs);
      const result = { label: this.currentOverviewMetric[ix].practice_area, metrics: []};
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'bpi',  'BPI', 'bpi.svg'));
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'blended_rate',  'Blended Rate', 'bills.svg'));
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'avg_partner_rate',  'Avg. Partner hourly cost',  'partners.svg'));
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'avg_associate_rate',  'Avg. Associate hourly cost', 'avg_ass_matter.svg'));
      this.rightSideMetrics.push(result);
      this.setUpChartOptions();
    }

  }
  setUpChartOptions(): void {
    this.optionsBB = Object.assign({}, metricsBBPasChartOptions);
    for (const pa of this.currentOverviewMetric) {
      const tkOptions0 = Object.assign({}, tkHoursPasChartOptions);
      this.optionsHours.push(tkOptions0);
    }
  }
  saveInstanceBB(chartInstance): void {
    this.chartBB = chartInstance;
    const firstPa = this.bbMetric[0].amount;
    const secondPa = this.bbMetric[1].amount;
    this.chartBB.series[0].setData([firstPa]);
    this.chartBB.series[1].setData([secondPa]);
    this.chartBB.series[0].options.name = this.currentOverviewMetric[0].practice_area;
    this.chartBB.series[0].update(this.chartBB.series[0].options);
    this.chartBB.series[1].options.name = this.currentOverviewMetric[1].practice_area;
    this.chartBB.series[1].update(this.chartBB.series[1].options);
  }
  saveInstanceHours(chartInstance: any, index: number): void {
    this.chartHours[index] = chartInstance;
    let result = this.tkHours[index].metrics.map(e => e.amount);
    result = result.filter(e => e > 1); // don't path <1 % to chart
    this.chartHours[index].series[0].setData(result);
  }

}
