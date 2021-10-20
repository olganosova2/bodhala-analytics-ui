import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {IQbrMetric, IQbrReport, QbrType} from '../qbr-model';
import {executiveSummaryChartOptions} from './model';
import {Subscription} from 'rxjs';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrService} from '../qbr.service';
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
  qbr: IQbrReport;
  qbrData: any;
  practiceAreaSetting: string;
  includeExpenses: boolean = false;
  currentOverviewMetric: any;
  compareOverviewMetric: any;
  queryString: string;
  constructor(public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public qbrService: QbrService,
              public utilService: UtilService) {
    this.commonServ.pageTitle = 'QBR';
    this.commonServ.pageSubtitle = 'Executive Summary';
    this.practiceAreaSetting = this.commonServ.getClientPASetting();
    this.cardTitle = this.userService.currentUser.client_info.org.name + ' Exec Summary';
    this.totalSpendMetric = this.qbrService.generateEmptyMetric();
    this.bbMetric = this.qbrService.generateEmptyMetric();
  }

  ngOnInit(): void {
    this.setUpChartOptions();
    this.getQbrs();
  }
  getQbrs(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getClientQBRs').subscribe(
      (data: any) => {
        const records = ( data.result || [] ).sort(this.utilService.dynamicSort('id'));
        if (records.length > 0) {
          this.qbr = records[0]; // TODO
          this.qbrType = this.qbr.report_type;
          if (this.qbr.querystring && this.qbr.querystring.expenses) {
            this.includeExpenses = this.qbr.querystring.expenses === 'true';
            this.queryString = this.qbr.querystring;
          }
          this.getQbrData();
        }
      }
    );
  }
  getQbrData(): void {
    const filterParams = {
      name: 'filters',
      filters: this.qbr.filters
    };
    const dates = this.qbrService.formatPayloadDates(this.qbr.start_date, this.qbr.report_type);
    const payload = {
      // id: this.qbr.id,
      startDate: dates.startDate,
      endDate: dates.endDate,
      // reportType: this.qbrType,
      // filters: this.qbr.filters,
      client: this.userService.currentUser.client_info.id,
      comparisonStartDate: dates.comparisonStartDate,
      comparisonEndDate: dates.comparisonEndDate,
      // paSetting: this.practiceAreaSetting,
      //  queryString: this.queryString // this.qbr.querystring
    };
    const params = { ... this.qbr.querystring, ... payload };
    this.pendingRequest = this.httpService.makeGetRequest('getQBRExecutiveSummary', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.qbrData = data.result;
          this.processRecords();
        }
      }
    );
  }
  processRecords(): void {
    this.currentOverviewMetric = this.qbrData.report_timeframe_metrics;
    this.compareOverviewMetric = this.qbrData.comparison_timeframe_metrics;
    if (!this.currentOverviewMetric || !this.compareOverviewMetric) {
      return;
    }
    this.totalSpendMetric = this.qbrService.getOveralSpendMetric(this.currentOverviewMetric, this.compareOverviewMetric, this.includeExpenses, this.qbrType);
    this.bbMetric = this.qbrService.getBBMetric(this.currentOverviewMetric, this.compareOverviewMetric, this.qbrType);
    this.processTimekeepersHours();
    this.processRightSideMetrics();
  }
  processRightSideMetrics(): void {
    this.rightSideMetrics = [];
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'bodhala_price_index',  'BPI', this.qbrType, 'bpi.svg'));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_blended_rate',  'Blended Rate', this.qbrType, 'bills.svg'));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_partner_rate',  'Avg. Partner hourly cost', this.qbrType, 'partners.svg'));
    this.rightSideMetrics.push(this.qbrService.getGenericMetric(this.currentOverviewMetric, this.compareOverviewMetric, 'avg_associate_rate',  'Avg. Associate hourly cost', this.qbrType, 'avg_ass_matter.svg'));
  }
  processTimekeepersHours(): void {
    this.tkHours = [];
    this.qbrService.getPercentHours(this.currentOverviewMetric);
    this.qbrService.getPercentHours(this.compareOverviewMetric);
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
