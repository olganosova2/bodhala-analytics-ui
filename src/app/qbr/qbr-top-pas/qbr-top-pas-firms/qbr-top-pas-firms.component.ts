import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {QbrService} from '../../qbr.service';
import {IQbrMetric, IQbrMetricRow, IQbrMetricType, IQbrReport, QbrType, tkHoursPasChartOptions} from '../../qbr-model';

@Component({
  selector: 'bd-qbr-top-pas-firms',
  templateUrl: './qbr-top-pas-firms.component.html',
  styleUrls: ['../../qbr-css.scss', '../qbr-top-pas.component.scss']
})
export class QbrTopPasFirmsComponent implements OnInit {
  qbrType: any = QbrType.YoY;
  chartHours: Array<any> = [];
  optionsHours: Array<any> = [];
  totalSpendMetric: Array<IQbrMetric> = [];
  tkHours: Array<IQbrMetricRow> = [];
  rightSideMetrics: Array<IQbrMetricRow> = [];
  qbrId: number;
  includeExpenses: boolean = false;
  currentOverviewMetric: Array<any> = [];
  compareOverviewMetric: Array<any> = [];
  queryString: string;
  practiceArea: string;
  @Input() pageNum: number = 8;
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
        this.processRecords();
      }
    }
  }

  processRecords(): void {
   const currentOverviewMetric = this.qbrData.report_timeframe_top_pas[this.indexPa];
   if (!currentOverviewMetric) {
     return;
   }
   this.practiceArea = currentOverviewMetric.practice_area;
   let compareOverviewMetric = this.qbrData.compare_timeframe_top_pa_firms[0];
   if (this.indexPa === 1) {
     this.pageNum = this.pageNum + 2;
     compareOverviewMetric = this.qbrData.compare_timeframe_second_pa_firms[0];
   }
   this.currentOverviewMetric.push(this.qbrService.mapProperties(currentOverviewMetric, 'firm_'));
   this.compareOverviewMetric.push(this.qbrService.mapProperties(compareOverviewMetric, 'firm_'));
   if (currentOverviewMetric.second_firm_total && currentOverviewMetric.second_firm_total > 0) {
     this.currentOverviewMetric.push(this.qbrService.mapProperties(currentOverviewMetric, 'second_firm_'));
     this.compareOverviewMetric.push(this.qbrService.mapProperties(compareOverviewMetric, 'second_firm_'));
   }
   const paLength = this.currentOverviewMetric.length;
   for (let ix = 0; ix < paLength; ix++) {
      if (!this.compareOverviewMetric[ix]) {
        continue;
      }
      const spendMetric = this.qbrService.getOveralSpendMetricPA(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], this.includeExpenses);
      spendMetric.addInfo = this.currentOverviewMetric[ix].firm_name;
      this.totalSpendMetric.push(spendMetric);
      this.qbrService.getPercentHours(this.currentOverviewMetric[ix], false);
      this.qbrService.getPercentHours(this.compareOverviewMetric[ix], false);
      const resultTKs = { label: this.currentOverviewMetric[ix].firm_name, metrics: []};
      resultTKs.metrics.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric[ix].partner_percent_hours_worked, this.compareOverviewMetric[ix].partner_percent_hours_worked, this.qbrType, 'Partner'));
      resultTKs.metrics.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric[ix].associate_percent_hours_worked, this.compareOverviewMetric[ix].associate_percent_hours_worked, this.qbrType, 'Associate'));
     // resultTKs.metrics.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric[ix].paralegal_percent_hours_worked, this.compareOverviewMetric[ix].paralegal_percent_hours_worked, this.qbrType, 'Paralegal'));
      if (this.currentOverviewMetric[ix].other_percent_hours_worked || this.compareOverviewMetric[ix].other_percent_hours_worked) {
        resultTKs.metrics.push(this.qbrService.getTkHoursRecord(this.currentOverviewMetric[ix].other_percent_hours_worked, this.compareOverviewMetric[ix].other_percent_hours_worked, this.qbrType, 'Other'));
      }
      this.tkHours.push(resultTKs);
      const result = { label: this.currentOverviewMetric[ix].firm_name, metrics: []};
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'bpi',  'BPI', 'bpi.svg', IQbrMetricType.BPI));
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'blended_rate',  'Blended Rate', 'bills.svg', IQbrMetricType.BlendedRate));
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'avg_partner_rate',  'Avg. Partner hourly cost',  'partners.svg', IQbrMetricType.PartnerAvgHourlyCost));
      result.metrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric[ix], this.compareOverviewMetric[ix], 'avg_associate_rate',  'Avg. Associate hourly cost', 'avg_ass_matter.svg', IQbrMetricType.AssociateAvgHourlyCost));
      this.rightSideMetrics.push(result);
    }
   this.setUpChartOptions();
  }
  setUpChartOptions(): void {
    for (const pa of this.currentOverviewMetric) {
      const tkOptions0 = Object.assign({}, tkHoursPasChartOptions);
      this.optionsHours.push(tkOptions0);
    }
  }
  saveInstanceHours(chartInstance: any, index: number): void {
    this.chartHours[index] = chartInstance;
    const result = this.tkHours[index].metrics.map(e => e.amount);
    this.chartHours[index].series[0].setData(result);
  }

}
