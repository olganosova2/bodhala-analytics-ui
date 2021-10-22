import {Component, Input, OnInit} from '@angular/core';
import {IQbrMetric, IQbrMetricRow, metricsRightChartOptions, QbrType} from '../../qbr-model';

@Component({
  selector: 'bd-generic-metrics-right',
  templateUrl: './generic-metrics-right.component.html',
  styleUrls: ['./generic-metrics-right.component.scss']
})
export class GenericMetricsRightComponent implements OnInit {
  options: any;
  chart: any;
  @Input() qbrType: QbrType;
  @Input() rightSideMetrics: Array<IQbrMetricRow> = [];

  constructor() { }

  ngOnInit(): void {
    this.setUpChartOptions();
  }
  setUpChartOptions(): void {
    this.options = Object.assign({}, metricsRightChartOptions);
  }
  saveInstance(chartInstance): void {
    this.chart = chartInstance;
    const result = this.metrics.map(e => e.amount);
    const resultToCompare = this.metrics.map(e => e.amountToCompare);
    const width = this.metrics.length * 205;
    this.chart.setSize(width, 460, false);
    this.chart.series[0].setData(result);
    this.chart.series[1].setData(resultToCompare);
  }

}
