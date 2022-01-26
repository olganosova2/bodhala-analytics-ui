import {Component, Input, OnInit} from '@angular/core';
import {IMatterExecSummary, IMetricDisplayData, MetricCardType} from '../../model';

@Component({
  selector: 'bd-matter-metric-table',
  templateUrl: './matter-metric-table.component.html',
  styleUrls: ['../../matter-executive-summary.component.scss', '../matter-total-spend.component.scss', './matter-metric-table.component.scss']
})
export class MatterMetricTableComponent implements OnInit {
  @Input() lable: string;
  @Input() page: string;
  @Input() metricType: MetricCardType = MetricCardType.TotalSpend;
  @Input() metricData: Array<IMetricDisplayData> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
