import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {IFirm, trendChart} from '../firm.model';
import {Subscription} from 'rxjs';
import * as _moment from 'moment';

const moment = _moment;

export enum TrendChart  {
  LEVERAGE = 'LEVERAGE',
  MATTER_COST = 'MATTER_COST',
  BLOCK_BILLING = 'BLOCK_BILLING',
  PARTNER_RATE = 'PARTNER_RATE',
  ASSOCIATE_RATE = 'ASSOCIATE_RATE',
}
export const COLORS = {
  poor: '#FC615A',
  excellent: '#87E184',
  fair: '#FC615A'
}

@Component({
  selector: 'bd-score-trend',
  templateUrl: './score-trend.component.html',
  styleUrls: ['./score-trend.component.scss']
})
export class ScoreTrendComponent implements OnInit, OnDestroy {
  errorMessage: any;
  score: Array<any> = [];
  trends: any;
  includeExpenses: boolean =  false;
  chart: any = {};
  options: any;
  helpText: string = 'Text goes here';
  selectedChart: TrendChart = TrendChart.LEVERAGE;
  chartTypes: any = TrendChart;
  isLoaded: boolean = false;
  @Input() firmId: number;
  @Input() firm: IFirm;
  pendingRequest: Subscription;
  pendingRequestTrends: Subscription;
  @ViewChild('trendsDiv', {static: false}) trendsDiv: ElementRef<HTMLElement>;


  constructor(private httpService: HttpService,
              public filtersService: FiltersService,
              public userService: UserService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart();
  }
  ngOnInit() {
    this.setUpChartOptions();
    this.getFirmScore();
    this.getFirmTrends();
  }
  setUpChartOptions(): void {
    this.options = Object.assign({},  trendChart);
    this.options.series[0].data = [];
    this.options.series[1].data = [];
  }
  getFirmScore(): void {
    const params = { clientId: this.userService.currentUser.client_info.id, id: this.firmId };
    this.pendingRequest = this.httpService.makeGetRequest('getFirmScore', params).subscribe(
      (data: any) => {
        this.score = data.result;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  getFirmTrends(): void {
    this.isLoaded = false;
    const params = { clientId: this.userService.currentUser.client_info.id, id: this.firmId };
    this.pendingRequestTrends = this.httpService.makeGetRequest('getFirmTrends', params).subscribe(
      (data: any) => {
        this.trends = data.result;
        if (this.trends.peer_trends && this.trends.peer_trends.length > 0) {
          this.trends.firm_trends = Object.assign([], this.trends.peer_trends);
        } else {
          this.trends.client_trends = [];
        }
        this.renderChart();
        this.isLoaded = true;
      },
      err => {
        this.isLoaded = true;
        this.errorMessage = err;
      }
    );
  }

  renderChart(): void {
    if (!this.trends.firm_trends) {
      return;
    }
    let result = [];
    for (const rec of this.trends.firm_trends) {
      result.push(this.buildChartItem(rec));
    }
    this.chart.series[0].setData(result);
    if (this.firm) {
      this.chart.series[0].name = this.firm.name;
    }
    this.setUpChart();
    result = [];
    if (!this.trends.client_trends ) {
      // this.chart.series.splice(1, 1);
      this.chart.series[1].setData(result);
      return;
    }
    for (const rec of this.trends.client_trends) {
      result.push(this.buildChartItem(rec));
    }
    this.chart.series[1].name = this.userService.currentUser.client_info.org.name + ' Averages';
    if (this.trends.client_trends.length === 0) {
      this.chart.series[1].options.showInLegend = false;
      this.chart.series[1].update(this.chart.series[1].options);
    }
    this.chart.series[1].setData(result);
    setTimeout(() => {
      this.resizeChart();
    });
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }

  buildChartItem(rec: any): Array<any> {
    let result = [];
    const yearStr = rec.year.toString() + '-01-01';
    const year = moment(yearStr).valueOf();
    switch (this.selectedChart) {
      case TrendChart.LEVERAGE:
        result = [year, rec.avg_hourly_leverage];
        break;
      case TrendChart.MATTER_COST:
        result = [year, rec.avg_matter_cost];
        break;
      case TrendChart.BLOCK_BILLING:
        result = [year, rec.avg_block_billed_pct];
        break;
      case TrendChart.PARTNER_RATE:
        result = [year, rec.avg_partner_rate];
        break;
      case TrendChart.ASSOCIATE_RATE:
        result = [year, rec.avg_associate_rate];
        break;
      default:
        break;
    }
    return result;
  }
  resizeChart(): void {
    const width = this.trendsDiv.nativeElement.offsetWidth - 10;
    const height = 460; // this.trendsDiv.nativeElement.offsetHeight;
    this.chart.setSize(width, height, false);
  }
  changeViewMode(type: TrendChart): void {
      this.selectedChart = type;
      this.renderChart();
  }
  setUpChart(): void {
    let result = '';
    let color = COLORS.excellent;
    switch (this.selectedChart) {
      case TrendChart.LEVERAGE:
        result = 'Avg';
        break;
      case TrendChart.BLOCK_BILLING:
        result = 'percent';
        break;
      default:
        result = 'dollars';
        break;
    }
    this.chart.yAxis[0].setTitle({ text: result });
    // this.chart.series[0].options.color = '#008800';
    // this.chart.series[0].update(this.chart.series[0].options);
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestTrends) {
      this.pendingRequestTrends.unsubscribe();
    }
  }

}
