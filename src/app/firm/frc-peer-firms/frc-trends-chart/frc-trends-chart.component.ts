import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, TrendChart, TrendsChartMode} from '../frc-service.service';
import {MatDialog} from '@angular/material/dialog';
import {FiltersService} from '../../../shared/services/filters.service';
import {spendByQuarterOptions, spendByYearOptions} from '../../firm.model';
import * as _moment from 'moment';

const moment = _moment;


@Component({
  selector: 'bd-frc-trends-chart',
  templateUrl: './frc-trends-chart.component.html',
  styleUrls: ['./frc-trends-chart.component.scss']
})
export class FrcTrendsChartComponent implements OnInit {
  options: any;
  chart: any;
  chartHeader: string = 'Total Spend';
  isCollapsed: boolean = false;
  increase: number = 0;
  direction: number = 0;
  modeDefined: boolean = true;
  @Input() firmName: string;
  @Input() quarterData: Array<any> = [];
  @Input() yearData: Array<any> = [];
  @Input() trendsChartMode: TrendsChartMode = TrendsChartMode.YoY;
  @Input() selectedChart: TrendChart;
  @ViewChild('spendByQuarterDiv') spendByQuarterDiv: ElementRef<HTMLElement>;

  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              public commonServ: CommonService,
              public frcService: FrcServiceService,
              public userService: UserService,
              public dialog: MatDialog,
              public matDialog: MatDialog,
              public appStateService: AppStateService,
              public filtersService: FiltersService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart();
  }

  ngOnInit(): void {
    const tempOptions = this.trendsChartMode === TrendsChartMode.QoQ ? spendByQuarterOptions : spendByYearOptions;
    this.options = Object.assign({}, tempOptions);
    this.options.series[0].data = [];
  }
  resizeChart(): void {
    const width = this.spendByQuarterDiv.nativeElement.offsetWidth - 50;
    try {
      this.chart.setSize(width, 450, false);
    } catch (err) {
      return;
    }
  }
  renderChart(chartData: Array<any>): void {
    const result = [];
    for (const rec of chartData) {
      result.push(this.buildChartItem(rec, this.trendsChartMode));
    }
    if (this.chart.series) {
      this.chart.series[0].setData(result);
      this.setUpChart(result);
      setTimeout(() => {
        this.resizeChart();
      });
    }
  }
  buildChartItem(rec: any, mode: TrendsChartMode): Array<any> {
    let result = [];
    let yearStr = '';
    if (mode === TrendsChartMode.QoQ) {
      let yearQuarter = rec.year_quarter.toString();
      yearQuarter = yearQuarter.split('.');
      let quarterStartDate = '';
      if (yearQuarter[1] && yearQuarter[1] === '1') {
        quarterStartDate = '-01-01';
      } else if (yearQuarter[1] && yearQuarter[1] === '2') {
        quarterStartDate = '-04-01';
      } else if (yearQuarter[1] && yearQuarter[1] === '3') {
        quarterStartDate = '-07-01';
      } else if (yearQuarter[1] && yearQuarter[1] === '4') {
        quarterStartDate = '-10-01';
      }
      yearStr = yearQuarter[0] + quarterStartDate;
    }
    if (mode === TrendsChartMode.YoY) {
      yearStr = rec.year + '-01-01';
    }
    const year = moment(yearStr).valueOf();
    switch (this.selectedChart) {
      case TrendChart.TOTAL_SPEND:
        result = [year, rec.total_billed];
        break;
      case TrendChart.MATTER_COST:
        result = [year, rec.avg_matter_cost];
        break;
      case TrendChart.PARTNER_HOURS:
        result = [year, rec.partner_hours_percent];
        break;
      case TrendChart.ASSOCIATE_HOURS:
        result = [year, rec.associate_hours_percent];
        break;
      case TrendChart.PARALEGAL_HOURS:
        result = [year, rec.paralegal_hours_percent];
        break;
      case TrendChart.AVG_MATTER_DURATION:
        result = [year, rec.avg_duration_days];
        break;
      case TrendChart.BLENDED_RATE:
        result = [year, rec.blended_rate];
        break;
      case TrendChart.PARTNER_RATE:
        result = [year, rec.partner_rate];
        break;
      case TrendChart.ASSOCIATE_RATE:
        result = [year, rec.associate_rate];
        break;
      case TrendChart.BLOCK_BILLING:
        result = [year, rec.block_billed_percent];
        break;
      default:
        break;
    }
    return result;
  }
  setUpChart(records: Array<any>): void {
    let result = '';
    switch (this.selectedChart) {
      case TrendChart.TOTAL_SPEND:
        this.chartHeader = 'Total Spend';
        result = 'Dollars';
        break;
      case TrendChart.MATTER_COST:
        this.chartHeader = 'Matter Cost';
        result = 'Dollars';
        break;
      case TrendChart.PARTNER_HOURS:
        this.chartHeader = 'Partner Hours';
        result = 'Percent';
        break;
      case TrendChart.ASSOCIATE_HOURS:
        this.chartHeader = 'Associate Hours';
        result = 'Percent';
        break;
      case TrendChart.AVG_MATTER_DURATION:
        this.chartHeader = 'Avg. Matter Duration';
        result = 'Avg. Days';
        break;
      case TrendChart.BLENDED_RATE:
        this.chartHeader = 'Blended Rate';
        result = 'Dollars';
        break;
      case TrendChart.PARTNER_RATE:
        this.chartHeader = 'Partner Rate';
        result = 'Dollars';
        break;
      case TrendChart.ASSOCIATE_RATE:
        this.chartHeader = 'Associate Rate';
        result = 'Dollars';
        break;
      case TrendChart.PARALEGAL_HOURS:
        this.chartHeader = 'Paralegal Hours';
        result = 'Percent';
        break;
      case TrendChart.BLOCK_BILLING:
        this.chartHeader = 'Block Billing';
        result = 'Percent';
        break;
      default:
        break;
    }
    this.calculateIncrease(records, result);
    this.chart.yAxis[0].setTitle({text: result});
    if (result === 'Percent') {
      this.chart.yAxis[0].setExtremes(0, 100);
    }
    this.chart.series[0].options.name = this.firmName;
    this.chart.series[0].update(this.chart.series[0].options);
  }
  saveInstance(chartInstance): void {
    this.chart = chartInstance;
    const chartData = this.trendsChartMode === TrendsChartMode.QoQ ? this.quarterData : this.yearData;
    setTimeout(() => {
      this.renderChart(chartData);
    });
  }
  switchMode(): void {
    this.modeDefined = false;
    const tempOptions = this.trendsChartMode === TrendsChartMode.QoQ ? spendByQuarterOptions : spendByYearOptions;
    this.options = Object.assign({}, tempOptions);
    this.options.series[0].data = [];
    const chartData = this.trendsChartMode === TrendsChartMode.QoQ ? this.quarterData : this.yearData;
    setTimeout(() => {
      this.modeDefined = true;
      this.renderChart(chartData);
    });
  }
  calculateIncrease(chartData: Array<any>, chartType: string): void {
    this.increase = 0;
    this.direction = 0;
    if (chartData.length < 2) {
      return;
    }
    const last = chartData[chartData.length - 1][1];
    const previous = chartData[chartData.length - 2][1];
    if (chartType === 'Percent') {
      this.increase = Math.round(last - previous);
    } else {
      this.increase = Math.round(((last - previous) / (previous || 1)) * 100);
    }
    if (this.increase > 0) {
      this.direction = 1;
    }
    if (this.increase < 0) {
      this.direction = -1;
    }
    this.increase = Math.abs(this.increase);
  }

}
