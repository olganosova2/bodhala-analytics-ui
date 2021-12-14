import { Injectable } from '@angular/core';
import {IMatterExecSummary, IMatterTotalsMetric, IMatterTotalsPanel} from './model';

@Injectable({
  providedIn: 'root'
})
export class MatterAnalysisService {

  constructor() { }
  buildTotalPanels(summaryData: IMatterExecSummary): Array<IMatterTotalsPanel> {
    const result = [];
    let tMetric = { label: 'Total Spend', amount: summaryData.total_billed, format: '$', icon: 'bills.svg' };
    let metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetrics(metric);
    result.push(metric);
    tMetric = { label: 'Total Hours Worked', amount: summaryData.total_hours_billed, format: '', icon: 'clock-sm.png' };
    metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetrics(metric);
    result.push(metric);
    tMetric = { label: 'Avg Partner Rate', amount: summaryData.avg_partner_rate, format: '$', icon: 'partners.svg' };
    metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetrics(metric);
    result.push(metric);
    tMetric = { label: 'Avg Associate Rate', amount: summaryData.avg_associate_rate, format: '$', icon: 'avg_ass_matter.svg' };
    metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetrics(metric);
    result.push(metric);
    return result;
  }
  addSubMetrics(metric: IMatterTotalsPanel): void {
    metric.subMetrics.push(this.createSubMetric('Panel', 0, 0, 0));
    metric.subMetrics.push(this.createSubMetric('Matter', 0, 0, 0));
  }
  createSubMetric(lbl: string, amt: number, incr: number, dir: number): IMatterTotalsMetric {
    return { label: lbl, amount: amt, increase: incr, direction: dir};
  }
}
