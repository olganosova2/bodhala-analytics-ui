import { Component, OnInit, Input } from '@angular/core';
import {IQbrMetric, metricsRightChartESOptions, metricsRightChartOptions, QbrType} from '../../qbr-model';

@Component({
  selector: 'bd-qbr-executive-summary-right',
  templateUrl: './qbr-executive-summary-right.component.html',
  styleUrls: ['./qbr-executive-summary-right.component.scss', '../../qbr-css.scss']
})
export class QbrExecutiveSummaryRightComponent implements OnInit {
  options: any;
  chart: any;
  @Input() noComparisonData: boolean = false;
  @Input() qbrType: QbrType;
  @Input() metrics: Array<IQbrMetric> = [];

  constructor() { }

  ngOnInit(): void {
    this.setUpChartOptions();
  }

  setUpChartOptions(): void {
    this.options = Object.assign({}, metricsRightChartESOptions);
  }
  saveInstance(chartInstance): void {
    this.chart = chartInstance;
    const result = this.metrics.map(e => e.amount);
    const resultToCompare = this.metrics.map(e => e.amountToCompare);
    const width = this.metrics.length * 273;
    this.chart.setSize(width, 460, false);
    this.chart.series[1].setData(result);
    if (!this.noComparisonData) {
      this.chart.series[0].setData(resultToCompare);
    }
  }

}
