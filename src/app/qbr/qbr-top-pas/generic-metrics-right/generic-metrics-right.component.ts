import {Component, Input, OnInit} from '@angular/core';
import {IQbrMetric, IQbrMetricRow, metricsRightChartOptions, QbrType} from '../../qbr-model';

@Component({
  selector: 'bd-generic-metrics-right',
  templateUrl: './generic-metrics-right.component.html',
  styleUrls: ['../../qbr-css.scss', './generic-metrics-right.component.scss']
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
    if (this.rightSideMetrics.length > 1) {
      const result = this.rightSideMetrics[0].metrics.map(e => e.amount);
      const resultToCompare = this.rightSideMetrics[1].metrics.map(e => e.amount);
      const width = this.rightSideMetrics[0].metrics.length * 205;
      this.chart.setSize(width, 380, false);
      this.chart.series[0].options.name = this.rightSideMetrics[0].label;
      this.chart.series[0].update(this.chart.series[0].options);
      this.chart.series[1].options.name = this.rightSideMetrics[1].label;
      this.chart.series[1].update(this.chart.series[1].options);
      this.chart.series[0].setData(result);
      this.chart.series[1].setData(resultToCompare);

    }
  }

}
