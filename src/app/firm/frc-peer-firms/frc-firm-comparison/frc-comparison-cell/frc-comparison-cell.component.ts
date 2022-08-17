import { Component } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {IMetricDisplayData} from '../../frc-service.service';



@Component({
  selector: 'bd-frc-comparison-cell',
  templateUrl: './frc-comparison-cell.component.html',
  styleUrls: ['./frc-comparison-cell.component.scss']
})
export class FrcComparisonCellComponent implements AgRendererComponent {
  public params: ICellRendererParams;
  metric: IMetricDisplayData;
  isAverageColumn: boolean = false;

  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.params = Object. assign({}, params) as any;
    this.metric = this.params.context.frcMetrics.find(e => e.metricType === params.data.metricType);
    if (this.params.colDef.field === 'firms') {
      this.isAverageColumn = true;
    }
    if (this.metric) {
      this.metric.increase = Math.abs(this.metric.increase);
    }
  }
  refresh(params: any): boolean {
    return false;
  }

}
