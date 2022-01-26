import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {barTkPercentOptions, currencyAxisChartOptions, IMatterExecSummary, IMetricDisplayData, matterColumnChartOptions, MetricCardType} from '../model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-matter-total-spend',
  templateUrl: './matter-total-spend.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-total-spend.component.scss']
})
export class MatterTotalSpendComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  options: any;
  chart: any;
  marketMetricData: Array<IMetricDisplayData> = [];
  internalMetricData: Array<IMetricDisplayData> = [];
  @Input() page: string;
  @Input() summaryData: IMatterExecSummary;
  @Input() marketData: IMatterExecSummary;
  @Input() internalData: IMatterExecSummary;
  @Input() marketRecords: Array<IMatterExecSummary> = [];
  @Input() internalRecords: Array<IMatterExecSummary> = [];
  @Input() metricType: MetricCardType = MetricCardType.TotalSpend;
  @ViewChild('chartDiv') chartDiv: ElementRef<HTMLElement>;

  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public router: Router,
              public dialog: MatDialog,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart();
  }

  ngOnInit(): void {
    if (this.metricType === MetricCardType.TotalSpend) {
      this.marketMetricData = this.matterAnalysisService.formatTkTotalSpend(this.summaryData, this.marketData, this.marketRecords);
      this.internalMetricData = this.matterAnalysisService.formatTkTotalSpend(this.summaryData, this.internalData, this.internalRecords);
    } else if (this.metricType === MetricCardType.AverageRates) {
      this.marketMetricData = this.matterAnalysisService.formatAverageRate(this.summaryData, this.marketData, this.marketRecords);
      this.internalMetricData = this.matterAnalysisService.formatAverageRate(this.summaryData, this.internalData, this.internalRecords);
    } else if (this.metricType === MetricCardType.TotalHoursWorked) {
      this.marketMetricData = this.matterAnalysisService.formatTotalHours(this.summaryData, this.marketData, this.marketRecords);
      this.internalMetricData = this.matterAnalysisService.formatTotalHours(this.summaryData, this.internalData, this.internalRecords);
    } else if (this.metricType === MetricCardType.AverageTkOnMatter) {
      this.marketMetricData = this.matterAnalysisService.formatAvgTkNumber(this.summaryData, this.marketData, this.marketRecords);
      this.internalMetricData = this.matterAnalysisService.formatAvgTkNumber(this.summaryData, this.internalData, this.internalRecords);
    } else if (this.metricType === MetricCardType.PercentOfHoursWorked) {
      this.marketMetricData = this.matterAnalysisService.formatPercentOfTkWorked(this.summaryData, this.marketData, this.marketRecords);
      this.internalMetricData = this.matterAnalysisService.formatPercentOfTkWorked(this.summaryData, this.internalData, this.internalRecords);
    }
    this.setUpChartOptions();
  }
  setUpChartOptions(): void {
    if (this.metricType === MetricCardType.PercentOfHoursWorked) {
      this.options = Object.assign({}, barTkPercentOptions);
    } else  if (this.metricType === MetricCardType.TotalSpend || this.metricType === MetricCardType.AverageRates) {
      this.options = Object.assign({}, currencyAxisChartOptions);
    } else {
      this.options = Object.assign({}, matterColumnChartOptions);
    }
  }
  saveInstance(chartInstance): void {
    this.chart = chartInstance;
    if (this.metricType !== MetricCardType.PercentOfHoursWorked) {
      this.chart.xAxis[0].setCategories(this.marketMetricData.map(e => e.chartLabel));
      this.chart.series[0].setData(this.marketMetricData.map(e => e.actual));
      this.chart.series[1].setData(this.internalMetricData.map(e => e.market));
      this.chart.series[2].setData(this.marketMetricData.map(e => e.market));
      if (this.page === 'Overview' && this.metricType === MetricCardType.TotalSpend) {
        this.chart.series[0].options.color = '#00D1FF';
        this.chart.series[0].update(this.chart.series[0].options);
        this.chart.series[1].options.color = '#8A8A8A';
        this.chart.series[1].update(this.chart.series[1].options);
        this.chart.series[2].options.color = '#3EDB73';
        this.chart.series[2].update(this.chart.series[2].options);
      }
    } else {
      this.chart.series[2].setData(this.getPercentOfHoursWorkedChartData(this.marketMetricData, this.internalMetricData, 0));
      this.chart.series[1].setData(this.getPercentOfHoursWorkedChartData(this.marketMetricData, this.internalMetricData,  1));
      this.chart.series[0].setData(this.getPercentOfHoursWorkedChartData(this.marketMetricData, this.internalMetricData,  2));
    }
    setTimeout(() => {
      this.resizeChart();
    });
  }
  resizeChart(): void {
    const width = this.chartDiv.nativeElement.offsetWidth - 40;
    const height = this.metricType === MetricCardType.PercentOfHoursWorked ? 250 : 400;

    if (!this.chart || width <= 0) {
      return;
    }
    this.chart.setSize(width, height, false);
  }
  getPercentOfHoursWorkedChartData(marketData: Array<IMetricDisplayData>, internalData: Array<IMetricDisplayData>, index: number): Array<number> {
    const result = [];
    result.push(marketData[index].actual);
    result.push(internalData[index].market);
    result.push(marketData[index].market);
    return result;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
