import {Component, ElementRef, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import * as _moment from 'moment';
import {IFirm, spendByQuarterOptions} from '../../firm.model';
import {IPracticeArea} from '../../../practice-area/practice-area.model';
import {Subscription} from 'rxjs';
import {HttpService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {CommonService} from '../../../shared/services/common.service';
import * as Highcharts from 'highcharts';

const moment = _moment;

export enum TrendChart {
  LEVERAGE = 'LEVERAGE',
  MATTER_COST = 'MATTER_COST',
  BLOCK_BILLING = 'BLOCK_BILLING',
  PARTNER_RATE = 'PARTNER_RATE',
  ASSOCIATE_RATE = 'ASSOCIATE_RATE',
}

@Component({
  selector: 'bd-spend-by-quarter',
  templateUrl: './spend-by-quarter.component.html',
  styleUrls: ['./spend-by-quarter.component.scss']
})
export class SpendByQuarterComponent implements OnInit, OnDestroy {
  errorMessage: any;
  summary: any;
  isLoaded: boolean = false;
  spend: Array<any> = [];
  includeExpenses: boolean = false;
  selectedChart: TrendChart = TrendChart.LEVERAGE;
  chart: any = {};
  options: any;
  chartTypes: any = TrendChart;
  @Input() firmId: string;
  @Input() practiceArea: string;
  pendingRequest: Subscription;
  @ViewChild('spendByQuarterDiv') spendByQuarterDiv: ElementRef<HTMLElement>;

  constructor(public commonServ: CommonService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public utilServ: UtilService) { }

  ngOnInit(): void {
    this.options = Object.assign({}, spendByQuarterOptions);
    this.options.series[0].data = [];
    this.getSpendByQuarter();
  }

  getSpendByQuarter(): void {
    let params = {};
    if (this.firmId && this.practiceArea) {
      params = {firmId: this.firmId, practiceArea: this.practiceArea.toString()};
    } else if (this.firmId && !this.practiceArea) {
      params = {firmId: this.firmId};
    }  else if (!this.firmId && this.practiceArea) {
      params = {practiceArea: this.practiceArea.toString()};
    }
    this.pendingRequest = this.httpService.makeGetRequest('spendByQuarter', params).subscribe(
      (data: any) => {
        this.spend = data.result;
        this.renderChart();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  renderChart(): void {
    let result = [];
    for (const rec of this.spend) {
      result.push(this.buildChartItem(rec));
    }

    this.chart.series[0].setData(result);
    const params = this.filtersService.getCurrentUserCombinedFilters();
    let startDate = params.startdate;
    let endDate = params.enddate;
    const random = Math.random();
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    this.chart.xAxis[0].addPlotBand({
      label: {
        text: 'Filtered Timeframe'
      },
      from: startDate,
      to: endDate,
      color: 'orange',
      id: random.toString() + '-plot-band'
    });
    console.log("xAxis: ", this.chart.xAxis[0]);
    
    this.setUpChart();
    setTimeout(() => {
      this.resizeChart();
    });
  }

  buildChartItem(rec: any): Array<any> {
    let result = [];
    let yearQuarter = rec.year_quarter.toString();
    yearQuarter = yearQuarter.split('.')
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
    const yearStr = yearQuarter[0] + quarterStartDate;
    const year = moment(yearStr).valueOf();
    switch (this.selectedChart) {
      case TrendChart.LEVERAGE:
        result = [year, rec.leverage_by_hours];
        break;
      case TrendChart.MATTER_COST:
        result = [year, rec.avg_matter_cost];
        break;
      case TrendChart.BLOCK_BILLING:
        result = [year, rec.block_billed_pct];
        break;
      case TrendChart.PARTNER_RATE:
        result = [year, rec.partner_rate];
        break;
      case TrendChart.ASSOCIATE_RATE:
        result = [year, rec.associate_rate];
        break;
      default:
        break;
    }
    return result;
  }

  setUpChart(): void {
    let result = '';
    switch (this.selectedChart) {
      case TrendChart.LEVERAGE:
        result = 'Avg';
        break;
      case TrendChart.MATTER_COST:
        result = 'Dollars';
        break;
      case TrendChart.BLOCK_BILLING:
        result = 'Percent';
        break;
      case TrendChart.PARTNER_RATE:
        result = 'Dollars';
        break;
      case TrendChart.ASSOCIATE_RATE:
        result = 'Dollars';
        break;
      default:
        break;
    }
    this.chart.yAxis[0].setTitle({text: result});
    this.chart.series[0].update(this.chart.series[0].options);
  }

  resizeChart(): void {
    const width = this.spendByQuarterDiv.nativeElement.offsetWidth - 50;
    try {
      this.chart.setSize(width, 450, false);
    } catch (err) {
      return;
    }
  }

  changeViewMode(type: TrendChart): void {
    this.selectedChart = type;
    this.renderChart();
  }


  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
