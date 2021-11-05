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
    const compareOverviewMetric = this.qbrData.comparison_timeframe_top_pas || [];
    if (compareOverviewMetric.length === 0 && this.currentOverviewMetric.length === 1) { // single PA
      const formatted = Object.assign({}, this.qbrData.comparison_timeframe_metrics);
      compareOverviewMetric.push(this.mapSingleComparePA(formatted));
    }
    if (this.currentOverviewMetric.length === 0 || compareOverviewMetric.length === 0) {
      return;
    }
    if (this.currentOverviewMetric.length > 1) {
      for (const pa of this.currentOverviewMetric) {
        const found = compareOverviewMetric.find(e => e.practice_area === pa.practice_area);
        if (found) {
          this.compareOverviewMetric.push(found);
        }
      }
    } else {
      this.compareOverviewMetric = Object.assign([], compareOverviewMetric);
    }
    const paLength = this.currentOverviewMetric.length;
    for (let ix = 0; ix < paLength; ix++) {
      if (!this.compareOverviewMetric[ix]) {
        continue;
      }
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
    }
    this.setUpChartOptions();

  }
  setUpChartOptions(): void {
    const chartOptions = Object.assign({}, metricsBBPasChartOptions);
    if (this.currentOverviewMetric.length === 1) {
      chartOptions.series.pop();
    }
    this.optionsBB = Object.assign({}, metricsBBPasChartOptions);
    for (const pa of this.currentOverviewMetric) {
      const tkOptions0 = Object.assign({}, tkHoursPasChartOptions);
      this.optionsHours.push(tkOptions0);
    }
  }
  saveInstanceBB(chartInstance): void {
    this.chartBB = chartInstance;
    const firstPa = this.bbMetric[0].amount;
    this.chartBB.series[0].setData([firstPa]);
    this.chartBB.series[0].options.name = this.currentOverviewMetric[0].practice_area;
    this.chartBB.series[0].update(this.chartBB.series[0].options);
    if (this.currentOverviewMetric.length > 1) {
      const secondPa = this.bbMetric[1].amount;
      this.chartBB.series[1].setData([secondPa]);
      this.chartBB.series[1].options.name = this.currentOverviewMetric[1].practice_area;
      this.chartBB.series[1].update(this.chartBB.series[1].options);
    }
  }
  mapSingleComparePA(compareMetric: any): any {
    compareMetric.total_billed = this.includeExpenses ? compareMetric.total_spend_including_expenses : compareMetric.total_spend;
    compareMetric.total_expenses = 0;
    compareMetric.block_billed_pct = compareMetric.percent_block_billed;
    compareMetric.blended_rate = compareMetric.bodhala_price_index;
    compareMetric.bpi = compareMetric.avg_blended_rate;
    return compareMetric;
  }
  saveInstanceHours(chartInstance: any, index: number): void {
    this.chartHours[index] = chartInstance;
    const result = this.tkHours[index].metrics.map(e => e.amount);
    this.chartHours[index].series[0].setData(result);
  }

}
