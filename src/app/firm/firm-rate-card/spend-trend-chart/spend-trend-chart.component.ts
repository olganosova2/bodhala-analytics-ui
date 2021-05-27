import {Component, ElementRef, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import * as _moment from 'moment';
import {IFirm, spendByQuarterOptions} from '../../firm.model';
import {IPracticeArea} from '../../../practice-area/practice-area.model';
import {Subscription} from 'rxjs';
import {HttpService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {CommonService} from '../../../shared/services/common.service';
import * as Highcharts from 'highcharts';
import { BreadcrumbModule } from 'primeng/breadcrumb';

const moment = _moment;

export enum TrendChart {
  TOTAL_SPEND = 'TOTAL_SPEND',
  MATTER_COST = 'MATTER_COST',
  PARTNER_HOURS = 'PARTNER_HOURS',
  ASSOCIATE_HOURS = 'ASSOCIATE_HOURS',
  PARALEGAL_HOURS = 'PARALEGAL_HOURS',
  AVG_MATTER_DURATION = 'AVG_MATTER_DURATION',
  BLENDED_RATE = 'BLENDED_RATE',
  BODHALA_PRICE_INDEX = 'BODHALA_PRICE_INDEX',
  PARTNER_RATE = 'PARTNER_RATE',
  ASSOCIATE_RATE = 'ASSOCIATE_RATE',
  PARALEGAL_RATE = 'PARALEGAL_RATE'
}

@Component({
  selector: 'bd-spend-trend-chart',
  templateUrl: './spend-trend-chart.component.html',
  styleUrls: ['./spend-trend-chart.component.scss']
})
export class SpendTrendChartComponent implements OnInit {

  errorMessage: any;
  summary: any;
  isLoaded: boolean = false;
  spend: Array<any> = [];
  includeExpenses: boolean = false;
  selectedChart: TrendChart = TrendChart.TOTAL_SPEND;
  chart: any = {};
  options: any;
  chartTypes: any = TrendChart;
  firstLoad: boolean = true;
  datesOverlap = false;
  @Input() firmId: string;
  @Input() startdate: string;
  @Input() enddate: string;
  @Input() compStartDate: string;
  @Input() compEndDate: string;
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
    if (this.firmId) {
      params = {firmId: this.firmId};
    }
    this.pendingRequest = this.httpService.makeGetRequest('spendByQuarter', params).subscribe(
      (data: any) => {
        this.spend = data.result || [];
        if (this.spend !== undefined) {
          this.spend = this.spend.sort(this.utilServ.dynamicSort('year_quarter'));
        }
        this.processData();
        this.renderChart(false);
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  processData(): void {
    for (const rec of this.spend) {
      if (rec.total_hours > 0 && rec.total_hours !== null && rec.total_hours !== undefined) {
        rec.partner_hours_percent = (rec.partner_hours / rec.total_hours) * 100;
        rec.associate_hours_percent = (rec.associate_hours / rec.total_hours) * 100;
        rec.paralegal_hours_percent = (rec.paralegal_hours / rec.total_hours) * 100;
        rec.blended_rate = this.calcBlendedRate(rec);
        rec.bodhala_price_index = this.calcBPI(rec);
      }
      rec.avg_duration_days = Math.round(rec.avg_duration_days);
    }
  }

  calcBlendedRate(rec: any): number {
    const result = 0;
    if (!rec.partner_hours) {
      return result;
    }
    return (rec.total_partner_billed + rec.total_associate_billed - rec.total_partner_writeoff - rec.total_associate_writeoff) / (rec.partner_hours + rec.associate_hours - rec.partner_writeoff_hours - rec.associate_writeoff_hours);
  }

  calcBPI(rec: any): number {
    const result = 0;
    if (!rec.partner_hours || !rec.associate_hours) {
      return result;
    }
    const leverage = (rec.associate_hours / rec.partner_hours);
    const avgPartnerRate = (rec.total_partner_billed / rec.partner_hours);
    const avgAssociateRate = (rec.total_associate_billed / rec.associate_hours);
    const bpi = avgPartnerRate + (avgAssociateRate * leverage);
    return bpi;
  }

  renderChart(switchingView: boolean): void {
    const result = [];
    for (const rec of this.spend) {
      result.push(this.buildChartItem(rec));
    }
    if (this.chart.series !== undefined) {
      this.chart.series[0].setData(result);
      let startDate;
      let endDate;
      const params = this.filtersService.getCurrentUserCombinedFilters();
      if (this.firstLoad) {
        startDate = moment(this.compStartDate).valueOf();
        endDate = moment(this.compEndDate).valueOf();
        const tempStartDate = new Date(this.startdate);
        const formattedStartDate = tempStartDate.toISOString().slice(0, 10);
        const tempEndDate = new Date(this.enddate);
        const formattedEndDate = tempEndDate.toISOString().slice(0, 10);
        const compStartDate = moment(formattedStartDate).valueOf();
        const compEndDate = moment(formattedEndDate).valueOf();

        if (startDate >= compStartDate && startDate <= compEndDate && !(startDate === compStartDate && endDate === compEndDate)) {
          startDate = compEndDate;
          this.chart.xAxis[0].addPlotBand({
            color: '#FCFFC5',
            from: startDate,
            to: endDate,
            id: 'plotband-2',
            label: {
              text: 'Comparison Timeframe (Partially overlaps RC Timeframe)',
              y: 30,
              align: 'left',
              style: {
                  fontWeight: 'bold',
                  width: '30px',
                  fontSize: '11px'
              }
            }
          });
        } else if (endDate >= compStartDate && endDate <= compEndDate && !(startDate === compStartDate && endDate === compEndDate)) {
          endDate = compStartDate;
          this.chart.xAxis[0].addPlotBand({
            color: '#FCFFC5',
            from: startDate,
            to: endDate,
            id: 'plotband-2',
            label: {
              text: 'Comparison Timeframe (Partially overlaps RC Timeframe)',
              y: 30,
              align: 'right',
              style: {
                  fontWeight: 'bold',
                  width: '30px',
                  fontSize: '11px'
              }
            }
          });
        } else if (startDate === compStartDate && endDate === compEndDate) {
          this.datesOverlap = true;
        } else {
          this.chart.xAxis[0].addPlotBand({
            color: '#FCFFC5',
            from: startDate,
            to: endDate,
            id: 'plotband-2',
            label: {
              text: 'Comparison Timeframe',
              y: 30,
              align: 'center',
              style: {
                  fontWeight: 'bold',
                  width: '30px',
                  fontSize: '11px'
              }
            }
          });
        }
        this.firstLoad = false;
        this.chart.xAxis[0].update({
          max: endDate
        });
      } else {
        this.chart.xAxis[0].removePlotBand('plotband-2');

        startDate = params.startdate;
        endDate = params.enddate;
        startDate = moment(startDate).valueOf();
        endDate = moment(endDate).valueOf();

        const tempStartDate = new Date(this.startdate);
        const formattedStartDate = tempStartDate.toISOString().slice(0, 10);
        const tempEndDate = new Date(this.enddate);
        const formattedEndDate = tempEndDate.toISOString().slice(0, 10);

        const compStartDate = moment(formattedStartDate).valueOf();
        const compEndDate = moment(formattedEndDate).valueOf();
        if (startDate >= compStartDate && startDate <= compEndDate && !(startDate === compStartDate && endDate === compEndDate)) {
          startDate = compEndDate;
          this.chart.xAxis[0].addPlotBand({
            color: '#FCFFC5',
            from: startDate,
            to: endDate,
            id: 'plotband-2',
            label: {
              text: 'Comparison Timeframe (Partially overlaps RC Timeframe)',
              y: 30,
              align: 'right',
              style: {
                  fontWeight: 'bold',
                  width: '30px',
                  fontSize: '11px'
              }
            }
          });
          this.datesOverlap = false;
        } else if (endDate >= compStartDate && endDate <= compEndDate && !(startDate === compStartDate && endDate === compEndDate)) {
          endDate = compStartDate;
          this.chart.xAxis[0].addPlotBand({
            color: '#FCFFC5',
            from: startDate,
            to: endDate,
            id: 'plotband-2',
            label: {
              text: 'Comparison Timeframe (Partially overlaps RC Timeframe)',
              y: 30,
              align: 'left',
              style: {
                  fontWeight: 'bold',
                  width: '30px',
                  fontSize: '11px'
              }
            }
          });
          this.datesOverlap = false;
        } else if (startDate === compStartDate && endDate === compEndDate) {
          this.datesOverlap = true;
        } else {
          this.chart.xAxis[0].addPlotBand({
            color: '#FCFFC5',
            from: startDate,
            to: endDate,
            id: 'plotband-2',
            label: {
              text: 'Comparison Timeframe',
              y: 30,
              align: 'right',
              style: {
                  fontWeight: 'bold',
                  width: '30px',
                  fontSize: '11px'
              }
            }
          });
          this.datesOverlap = false;
        }
      }
      if (this.startdate && this.enddate) {
        const tempStartDate = new Date(this.startdate);
        const formattedStartDate = tempStartDate.toISOString().slice(0, 10);
        const tempEndDate = new Date(this.enddate);
        const formattedEndDate = tempEndDate.toISOString().slice(0, 10);
        let labelText = '';
        if (this.datesOverlap === true) {
          labelText = 'Report Card Timeframe (matches Comparison Timeframe)';
        } else {
          labelText = 'Report Card Timeframe';
        }
        this.chart.xAxis[0].removePlotBand('plotband-1');
        startDate = moment(formattedStartDate).valueOf();
        endDate = moment(formattedEndDate).valueOf();

        this.chart.xAxis[0].addPlotLine({
          color: 'orange',
          from: startDate,
          to: endDate,
          id: 'plotband-1',
          label: {
            text: labelText,
            y: 30,
            style: {
                fontWeight: 'bold',
                width: '30px',
                fontSize: '11px'
            }
          }
        });
      }
      this.setUpChart();
      setTimeout(() => {
        this.resizeChart();
      });
    }
  }

  buildChartItem(rec: any): Array<any> {
    let result = [];
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
    const yearStr = yearQuarter[0] + quarterStartDate;
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
      case TrendChart.BODHALA_PRICE_INDEX:
        result = [year, rec.bodhala_price_index];
        break;
      case TrendChart.PARTNER_RATE:
        result = [year, rec.partner_rate];
        break;
      case TrendChart.ASSOCIATE_RATE:
        result = [year, rec.associate_rate];
        break;
      case TrendChart.PARALEGAL_RATE:
        result = [year, rec.paralegal_rate];
        break;
      default:
        break;
    }
    return result;
  }

  setUpChart(): void {
    let result = '';
    switch (this.selectedChart) {
      case TrendChart.TOTAL_SPEND:
        result = 'Dollars';
        break;
      case TrendChart.MATTER_COST:
        result = 'Dollars';
        break;
      case TrendChart.PARTNER_HOURS:
        result = 'Percent';
        break;
      case TrendChart.ASSOCIATE_HOURS:
        result = 'Percent';
        break;
      case TrendChart.AVG_MATTER_DURATION:
        result = 'Avg. Days';
        break;
      case TrendChart.BLENDED_RATE:
        result = 'Dollars';
        break;
      case TrendChart.BODHALA_PRICE_INDEX:
        result = 'Dollars';
        break;
      case TrendChart.PARTNER_RATE:
        result = 'Dollars';
        break;
      case TrendChart.ASSOCIATE_RATE:
        result = 'Dollars';
        break;
      case TrendChart.PARALEGAL_RATE:
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
    this.renderChart(true);
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }
}
