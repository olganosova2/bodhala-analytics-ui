import { Injectable } from '@angular/core';
import {IMatterExecSummary, IMatterTotalsMetric, IMatterTotalsPanel, ITkTotalSpend} from './model';

@Injectable({
  providedIn: 'root'
})
export class MatterAnalysisService {

  constructor() { }
  buildTotalPanels(summaryData: IMatterExecSummary, marketData: IMatterExecSummary): Array<IMatterTotalsPanel> {
    const result = [];
    if (!summaryData) {
      return result;
    }
    let tMetric = { label: 'Total Spend', amount: summaryData.total_billed, format: '$', icon: 'bills.svg' };
    let metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetric(metric, 'total_billed', summaryData, marketData);
    result.push(metric);
    tMetric = { label: 'Total Hours Worked', amount: summaryData.total_hours_billed, format: '', icon: 'clock-sm.png' };
    metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetric(metric, 'total_hours_billed', summaryData, marketData);
    result.push(metric);
    tMetric = { label: 'Avg Partner Rate', amount: summaryData.avg_partner_rate, format: '$', icon: 'partners.svg' };
    metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetric(metric, 'avg_partner_rate', summaryData, marketData);
    result.push(metric);
    tMetric = { label: 'Avg Associate Rate', amount: summaryData.avg_associate_rate, format: '$', icon: 'avg_ass_matter.svg' };
    metric = { titleMetric: tMetric,  subMetrics: []};
    this.addSubMetric(metric, 'avg_associate_rate', summaryData, marketData);
    result.push(metric);
    return result;
  }
  calculateMarketData(marketData: IMatterExecSummary, matterCount: number): void {
    if (!matterCount) {
      marketData.total_billed = 0;
      marketData.total_hours_billed = 0;
      marketData.avg_partner_rate = 0;
      marketData.avg_associate_rate = 0;
      marketData.partner_billed = 0;
      marketData.associate_billed = 0;
      marketData.other_billed = 0;
      return;
    }
    marketData.matter_name = 'Market';
    marketData.total_billed = marketData.total_billed / matterCount;
    marketData.total_hours_billed = marketData.total_hours_billed / matterCount;
    marketData.partner_billed = marketData.partner_billed / matterCount;
    marketData.associate_billed = marketData.associate_billed / matterCount;
    marketData.other_billed = marketData.other_billed / matterCount;

  }
  addSubMetric(metric: IMatterTotalsPanel, prop: string, summaryData: IMatterExecSummary, marketData: IMatterExecSummary): void {
    const actualAmount = summaryData[prop] || 0;
    const compareAmount = marketData[prop] || 0;
    const increase = compareAmount ? ((actualAmount / compareAmount) - 1) * 100 : 0;
    const dir = compareAmount > actualAmount ? -1 : 1;
    metric.subMetrics.push(this.createSubMetric('Market', compareAmount, increase, dir));
  }
  createSubMetric(lbl: string, amt: number, incr: number, dir: number): IMatterTotalsMetric {
    return { label: lbl, amount: amt, increase: incr, direction: dir};
  }
  formatTkTotalSpend(summaryData: IMatterExecSummary, marketData: IMatterExecSummary): Array<ITkTotalSpend> {
    const result = [];
    result.push({ chartLabel: 'All TKs', tableLabel: 'Total', actual: summaryData.total_billed, market: marketData.total_billed, internal: 0});
    result.push({ chartLabel: 'Partner', tableLabel: 'Partner', actual: summaryData.partner_billed, market: marketData.partner_billed, internal: 0});
    result.push({ chartLabel: 'Associate', tableLabel: 'Associate', actual: summaryData.associate_billed, market: marketData.associate_billed, internal: 0});
    result.push({ chartLabel: 'Paralegal/Other', tableLabel: 'Other', actual: summaryData.other_billed, market: marketData.other_billed, internal: 0});
    this.calculateTkDeltas(result);
    return result;
  }
  calculateTkDeltas(tks: Array<ITkTotalSpend>): void {
    for (const tk of tks) {
        tk.delta = Math.abs(tk.actual - tk.market);
        tk.direction = tk.market > tk.actual ? -1 : 1;
        tk.increase = tk.market ? ((tk.actual / tk.market) - 1) * 100 : 0;
    }
  }
}
