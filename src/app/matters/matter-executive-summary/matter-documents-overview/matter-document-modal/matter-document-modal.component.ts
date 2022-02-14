import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {barTkPercentOptions, currencyAxisChartOptions, documentsRatesOptions, IMatterDocument, IMatterExecSummary, IMatterTotalsPanel, IMetricDisplayData, matterColumnChartOptions, MetricCardType, RECORDS_NUMBER_THRESHOLD} from '../../model';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../../shared/services/filters.service';
import {MatterAnalysisService} from '../../matter-analysis.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-matter-document-modal',
  templateUrl: './matter-document-modal.component.html',
  styleUrls: ['./matter-document-modal.component.scss']
})
export class MatterDocumentModalComponent implements OnInit {
  pendingRequest: Subscription;
  document: IMatterDocument;
  matterId: string;
  firmId: number;
  summaryData: IMatterExecSummary;
  marketData: IMatterExecSummary;
  internalData: IMatterExecSummary;
  marketRecords: Array<IMatterExecSummary> = [];
  internalRecords: Array<IMatterExecSummary> = [];
  totalPanels: Array<IMatterTotalsPanel> = [];
  options: any;
  optionsHr: any;
  chart: any;
  chartHr: any;
  threshold: number = RECORDS_NUMBER_THRESHOLD;
  marketMetricData: Array<IMetricDisplayData> = [];
  internalMetricData: Array<IMetricDisplayData> = [];
  marketMetricDataHr: Array<IMetricDisplayData> = [];
  internalMetricDataHr: Array<IMetricDisplayData> = [];
  @ViewChild('chartDiv') chartDiv: ElementRef<HTMLElement>;
  @ViewChild('chartDivHr') chartDivHr: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart(this.chart, this.chartDiv, 0);
    this.resizeChart(this.chartHr, this.chartDivHr, 1);
  }

  constructor(
    public dialogRef: MatDialogRef<MatterDocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMatterDocument,
    private route: ActivatedRoute,
    public commonServ: CommonService,
    public appStateService: AppStateService,
    public userService: UserService,
    private httpService: HttpService,
    public filtersService: FiltersService,
    public router: Router,
    public dialog: MatDialog,
    public utilService: UtilService,
    public matterAnalysisService: MatterAnalysisService
  ) {
    this.document = Object.assign({}, data);
  }

  ngOnInit(): void {
    this.matterId = this.document.client_matter_id;
    this.getDocumentBenchmarks();
  }

  getDocumentBenchmarks(): void {
    const arrMatters = [];
    arrMatters.push(this.matterId);
    const params = {
      client_id: this.userService.currentUser.client_info_id,
      matterId: this.matterId,
      matters: JSON.stringify(arrMatters),
      entity: this.document.canonical,
      category: this.document.category,
      entity_type: this.document.entity_type
    };
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.ade_data) {
          const adeData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          this.summaryData = this.matterAnalysisService.convertMarketDocToMatter(adeData);
          this.matterAnalysisService.calculateSingleMatterData(this.summaryData);
          const marketRecords = data.result.market_data || [];
          for (const rec of marketRecords) {
            this.marketRecords.push(this.matterAnalysisService.convertMarketDocToMatter(rec));
          }
          this.marketData = this.matterAnalysisService.calculateMarketData(this.marketRecords);
          const internalRecords = data.result.internal_data || [];
          for (const rec of internalRecords) {
            this.internalRecords.push(this.matterAnalysisService.convertMarketDocToMatter(rec));
          }
          this.internalData = this.matterAnalysisService.calculateMarketData(this.internalRecords);
          const panels = this.matterAnalysisService.buildTotalPanels(this.summaryData, this.marketData, this.internalData);
          if (panels.length >= 2) {
            this.totalPanels = panels.slice(0, 2);
          }
          this.matterAnalysisService.calculateBarSize(this.totalPanels);
          this.loadChartsConfig();
        }
      }
    );

  }
  loadChartsConfig(): void {
    this.marketMetricData = this.matterAnalysisService.formatAverageRate(this.summaryData, this.marketData, this.marketRecords);
    if (this.internalRecords.length > 0) {
      this.internalMetricData = this.matterAnalysisService.formatAverageRate(this.summaryData, this.internalData, this.internalRecords);
    } else {
      this.internalMetricData = [];
    }
    this.marketMetricDataHr = this.matterAnalysisService.formatPercentOfTkWorked(this.summaryData, this.marketData, this.marketRecords);
    this.internalMetricDataHr = this.matterAnalysisService.formatPercentOfTkWorked(this.summaryData, this.internalData, this.internalRecords);
    this.setUpChartOptions();
  }
  setUpChartOptions(): void {
    const defaultRateOptions = Object.assign({}, documentsRatesOptions);
    defaultRateOptions.series = [];
    const defaultTkChartOptions = Object.assign({}, barTkPercentOptions);
    defaultTkChartOptions.xAxis.categories = ['This Matter'];

    defaultRateOptions.series.push({name: 'Actual', color: '#000000', data: this.marketMetricData.map(e => e.actual)});
    if (this.internalRecords.length > 0 && this.document.hasEnoughData) {
      defaultRateOptions.series.push({name: 'Internal', color: '#FFC327', data: this.internalMetricData.map(e => e.market)});
      defaultTkChartOptions.xAxis.categories.push('Internal');
    }
    if (this.marketRecords.length > 0 && this.document.hasEnoughData) {
      defaultRateOptions.series.push({ name: 'Market', color: '#00D1FF', data: this.marketMetricData.map(e => e.market)});
      defaultTkChartOptions.xAxis.categories.push('Market');
    }
    defaultRateOptions.xAxis.categories = this.marketMetricData.map(e => e.chartLabel);
    if (this.internalRecords.length === 0) {
      // defaultRateOptions.plotOptions.series.groupPadding = defaultRateOptions.plotOptions.series.groupPadding * 2;
    }
    this.options = defaultRateOptions;

    defaultTkChartOptions.series[2].data = this.getPercentOfHoursWorkedChartData(this.marketMetricDataHr, this.internalMetricDataHr, 0);
    defaultTkChartOptions.series[1].data = this.getPercentOfHoursWorkedChartData(this.marketMetricDataHr, this.internalMetricDataHr, 1);
    defaultTkChartOptions.series[0].data = this.getPercentOfHoursWorkedChartData(this.marketMetricDataHr, this.internalMetricDataHr, 2);
    this.optionsHr = defaultTkChartOptions;
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
    setTimeout(() => {
      this.resizeChart(this.chart, this.chartDiv, 0);
    });
  }

  saveInstanceHours(chartInstance): void {
    this.chartHr = chartInstance;
    setTimeout(() => {
      this.resizeChart(this.chartHr, this.chartDivHr, 1);
    });
  }

  getPercentOfHoursWorkedChartData(marketData: Array<IMetricDisplayData>, internalData: Array<IMetricDisplayData>, index: number): Array<number> {
    const result = [];
    result.push(marketData[index].actual);
    if (this.internalRecords.length > 0 && this.document.hasEnoughData) {
      result.push(internalData[index].market);
    }
    if (this.marketRecords.length > 0 && this.document.hasEnoughData) {
      result.push(marketData[index].market);
    }
    return result;
  }

  resizeChart(chart: any, div: any, index: number): void {
    const width = div.nativeElement.offsetWidth - 10;
    const height = index ? 250 : 400;

    if (!chart || width <= 0) {
      return;
    }
    chart.setSize(width, height, false);
  }

}
