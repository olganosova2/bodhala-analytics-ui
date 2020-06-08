import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {IFirm, trendChart} from '../firm.model';
import {forkJoin, Observable, Subscription} from 'rxjs';
import * as _moment from 'moment';
import {ScoreBadgeComponent} from './score-badge/score-badge.component';
import {MOCK_TRENDS_FIRM} from '../../shared/unit-tests/mock-data/score-trend';

const moment = _moment;

export enum TrendChart {
  LEVERAGE = 'LEVERAGE',
  MATTER_COST = 'MATTER_COST',
  BLOCK_BILLING = 'BLOCK_BILLING',
  PARTNER_RATE = 'PARTNER_RATE',
  ASSOCIATE_RATE = 'ASSOCIATE_RATE',
}

export const COLORS = {
  default: '#7CB5EC',
  poor: '#FC615A',
  excellent: '#87E184',
  fair: '#FFDF35'
};

@Component({
  selector: 'bd-score-trend',
  templateUrl: './score-trend.component.html',
  styleUrls: ['./score-trend.component.scss']
})
export class ScoreTrendComponent implements OnInit, OnDestroy {
  errorMessage: any;
  score: any = {};
  trends: any = {};
  includeExpenses: boolean = false;
  chart: any = {};
  options: any;
  helpText: string = 'The health indicators below indicate how this firm is performing relative to the average of the firms in its peer group across several key metrics. A “poor” health indicator in red means the firm is in the bottom 30% for the metric. A “good” health indicator in green means it is in the top 30%, and a “fair” health indicator of yellow means it is in the middle 40% of the distribution.';
  selectedChart: TrendChart = TrendChart.LEVERAGE;
  chartTypes: any = TrendChart;
  isLoaded: boolean = false;
  rightColsCount: number = 12;
  scoreAvg: number = 0;
  @Input() firmId: number;
  @Input() firm: IFirm;
  pendingRequest: Subscription;
  pendingRequestTrends: Subscription;
  @ViewChild('trendsDiv', {static: false}) trendsDiv: ElementRef<HTMLElement>;
  @ViewChildren(ScoreBadgeComponent) scoreBadges !: QueryList<ScoreBadgeComponent>;


  constructor(private httpService: HttpService,
              public utilServ: UtilService,
              public filtersService: FiltersService,
              public userService: UserService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart();
  }

  ngOnInit() {
    this.setUpChartOptions();
    this.load().subscribe(data => {
      if (data[0].result) {
        const reportCard = data[0].result;
        if (reportCard && reportCard.group_id) {
          this.rightColsCount = 9;
          this.score = Object.assign({}, reportCard);
          this.calculateScoreAvg();
          if (this.scoreBadges && this.scoreBadges.length > 0) {
            this.scoreBadges.forEach(e => {
              setTimeout(() => {
                e.formatCard();
              });
            });
          }
        }
      }
      this.trends = data[1].result;
      // this.trends = MOCK_TRENDS_FIRM.result;
      if (this.trends) {
        this.trends.firm_trends = this.trends.firm_trends.sort(this.utilServ.dynamicSort('year'));
        if (this.trends.peer_trends && this.trends.peer_trends.length > 0) {
          this.trends.client_trends = Object.assign([], this.trends.peer_trends);
        } else {
          this.trends.client_trends = [];
        }
        this.trends.client_trends = this.trends.client_trends.sort(this.utilServ.dynamicSort('year'));
        this.renderChart();
      }
      this.isLoaded = true;
    }, err => {
      this.errorMessage = err;
    });
  }

  setUpChartOptions(): void {
    this.options = Object.assign({}, trendChart);
    this.options.series[0].data = [];
    this.options.series[1].data = [];
  }

  load(): Observable<any> {
    const params = {clientId: this.userService.currentUser.client_info.id, id: this.firmId};
    const response1 = this.httpService.makeGetRequest('getFirmScore', params);
    const response2 = this.httpService.makeGetRequest('getFirmTrends', params);
    return forkJoin([response1, response2]);
  }

  renderChart(): void {
    if (!this.trends.firm_trends) {
      return;
    }
    let result = [];
    for (const rec of this.trends.firm_trends) {
      result.push(this.buildChartItem(rec));
    }
    if (!this.chart.series || this.chart.series.length !== 2) {
      return;
    }
    this.chart.series[0].setData(result);
    if (this.firm) {
      this.chart.series[0].options.name = this.firm.name;
      this.chart.series[0].update(this.chart.series[0].options);
    }
    this.setUpChart();
    result = [];
    if (!this.trends.client_trends) {
      this.chart.series[1].setData(result);
      return;
    }
    for (const rec of this.trends.client_trends) {
      result.push(this.buildChartItem(rec));
    }
    // this.chart.series[1].name = this.userService.currentUser.client_info.org.name + ' Averages';
    if (this.trends.client_trends.length === 0) {
      this.chart.series[0].options.showInLegend = false;
      this.chart.series[1].options.showInLegend = false;
      this.chart.series[0].update(this.chart.series[0].options);
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

  resizeChart(): void {
    const width = this.trendsDiv.nativeElement.offsetWidth - 40;
    const height = 400; // this.trendsDiv.nativeElement.offsetHeight;
    if (!this.chart || width <= 0) {
      return;
    }
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
        color = this.getChartColor(this.score.peer_hourly_leverage_percentile);
        break;
      case TrendChart.MATTER_COST:
        result = 'dollars';
        color = this.getChartColor(this.score.peer_matter_cost_percentile);
        break;
      case TrendChart.BLOCK_BILLING:
        result = 'percent';
        color = this.getChartColor(this.score.peer_block_billing_percentile);
        break;
      case TrendChart.PARTNER_RATE:
        result = 'dollars';
        color = this.getChartColor(this.score.peer_partner_rate_percentile);
        break;
      case TrendChart.ASSOCIATE_RATE:
        result = 'dollars';
        color = this.getChartColor(this.score.peer_associate_rate_percentile);
        break;
      default:
        break;
    }
    this.chart.yAxis[0].setTitle({text: result});
    this.chart.series[0].options.color = color;
    this.chart.series[0].update(this.chart.series[0].options);
  }
  getChartColor(val: number): string {
    let result = COLORS.default;
    if (this.rightColsCount === 12 || val === null || val === undefined) {
      return result;
    }
    if (val >= .7) {
      result = COLORS.excellent;
    }
    if (val >= .3 && val < .7) {
      result = COLORS.fair;
    }
    if (val < .3 && val >= 0) {
      result = COLORS.poor;
    }
    return result;
  }
  calculateScoreAvg(): void {
    this.scoreAvg = (this.score.peer_hourly_leverage_percentile + this.score.peer_block_billing_percentile + this.score.peer_matter_cost_percentile +
      this.score.peer_partner_rate_percentile + this.score.peer_associate_rate_percentile) / 5;
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
