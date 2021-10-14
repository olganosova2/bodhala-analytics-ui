import { Component, OnInit, Input } from '@angular/core';
import {IQbrMetric, metricsRightChartOptions} from '../../qbr-model';

@Component({
  selector: 'bd-qbr-executive-summary-right',
  templateUrl: './qbr-executive-summary-right.component.html',
  styleUrls: ['./qbr-executive-summary-right.component.scss', '../../qbr-css.scss']
})
export class QbrExecutiveSummaryRightComponent implements OnInit {
  options: any;
  chart: any;
  @Input() qbrType: any;
  @Input() metrics: Array<IQbrMetric> = [];

  constructor() { }

  ngOnInit(): void {
    this.setUpChartOptions();
  }

  setUpChartOptions(): void {
    this.options = Object.assign({}, metricsRightChartOptions);
    this.options.series[0].data = [];
  }
  saveInstance(chartInstance): void {
    this.chart = chartInstance;
    const result = this.metrics.map(e => e.amount);
    this.chart.series[0].setData(result);
  }

}
