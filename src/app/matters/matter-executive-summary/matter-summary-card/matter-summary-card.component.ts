import {Component, Input, OnInit} from '@angular/core';
import {IMatterExecSummary, IMetricDisplayData, MetricCardType} from '../model';
import {MatterAnalysisService} from '../matter-analysis.service';

@Component({
  selector: 'bd-matter-summary-card',
  templateUrl: './matter-summary-card.component.html',
  styleUrls: ['../matter-total-spend/matter-total-spend.component.scss', './matter-summary-card.component.scss']
})
export class MatterSummaryCardComponent implements OnInit {
  totalSpendMetric: Array<IMetricDisplayData> = [];
  avgRatesMetric: Array<IMetricDisplayData> = [];
  staffingAllocationMetric: Array<IMetricDisplayData> = [];
  @Input() page: string;
  @Input() summaryData: IMatterExecSummary;
  @Input() marketData: IMatterExecSummary;
  @Input() marketRecords: Array<IMatterExecSummary> = [];
  constructor(public matterAnalysisService: MatterAnalysisService) { }

  ngOnInit(): void {
      this.totalSpendMetric = this.matterAnalysisService.formatTkTotalSpend(this.summaryData, this.marketData, this.marketRecords);
      this.avgRatesMetric = this.matterAnalysisService.formatAverageRate(this.summaryData, this.marketData, this.marketRecords);
      this.staffingAllocationMetric = this.matterAnalysisService.formatTotalHours(this.summaryData, this.marketData, this.marketRecords);
      this.staffingAllocationMetric[1].increase = Math.abs(this.staffingAllocationMetric[1].increase);
      this.staffingAllocationMetric[2].increase = Math.abs(this.staffingAllocationMetric[2].increase);
  }

}
