import {Injectable} from '@angular/core';
import {IMarketDocumentData, IMatterDocument, IMatterExecSummary, IMatterMarketDocument, IMatterTotalsMetric, IMatterTotalsPanel, IMetricDisplayData, MetricCardType, MetricGrade} from './model';
import {FiltersService} from '../../shared/services/filters.service';
import {UtilService} from 'bodhala-ui-common';

@Injectable({
  providedIn: 'root'
})
export class MatterAnalysisService {


  constructor(public filtersService: FiltersService, public utilService: UtilService) {
  }

  buildTotalPanels(summaryData: IMatterExecSummary, marketData: IMatterExecSummary, internalData: IMatterExecSummary): Array<IMatterTotalsPanel> {
    const result = [];
    if (!summaryData) {
      return result;
    }
    let tMetric = {label: 'Total Spend', amount: summaryData.total_billed, format: '$', icon: 'bills.svg'};
    let metric = {titleMetric: tMetric, subMetrics: []};
    if (internalData) {
      this.addSubMetric(metric, 'total_billed', summaryData, internalData, 'Internal');
    }
    if (marketData) {
      this.addSubMetric(metric, 'total_billed', summaryData, marketData, 'Market');
    }
    result.push(metric);

    tMetric = {label: 'Total Hours Worked', amount: summaryData.total_hours_billed, format: '', icon: 'clock-sm.png'};
    metric = {titleMetric: tMetric, subMetrics: []};
    if (internalData) {
      this.addSubMetric(metric, 'total_hours_billed', summaryData, internalData, 'Internal', '');
    }
    if (marketData) {
      this.addSubMetric(metric, 'total_hours_billed', summaryData, marketData, 'Market', '');
    }
    result.push(metric);

    tMetric = {label: 'Avg Partner Rate', amount: summaryData.avg_partner_rate, format: '$', icon: 'partners.svg'};
    metric = {titleMetric: tMetric, subMetrics: []};
    if (internalData) {
      this.addSubMetric(metric, 'avg_partner_rate', summaryData, internalData, 'Internal');
    }
    if (marketData) {
      this.addSubMetric(metric, 'avg_partner_rate', summaryData, marketData, 'Market');
    }
    result.push(metric);

    tMetric = {label: 'Avg Associate Rate', amount: summaryData.avg_associate_rate, format: '$', icon: 'avg_ass_matter.svg'};
    metric = {titleMetric: tMetric, subMetrics: []};
    if (internalData) {
      this.addSubMetric(metric, 'avg_associate_rate', summaryData, internalData, 'Internal');
    }
    if (marketData) {
      this.addSubMetric(metric, 'avg_associate_rate', summaryData, marketData, 'Market');
    }
    result.push(metric);
    return result;
  }

  calculateSingleMatterData(summaryData: IMatterExecSummary): void {
    const includeExpenses = this.filtersService.includeExpenses;
    summaryData.total_billed = includeExpenses ? summaryData.total_billed + summaryData.total_expenses : summaryData.total_billed;
    summaryData.other_billed = includeExpenses ? summaryData.other_billed + summaryData.total_expenses : summaryData.other_billed;
    const lawyerBilled = (summaryData.partner_billed - summaryData.partner_writeoff) + (summaryData.associate_billed - summaryData.associate_writeoff);
    const lawyerHours = (summaryData.partner_hours - summaryData.partner_writeoff_hours) + (summaryData.associate_hours - summaryData.associate_writeoff_hours);
    summaryData.blended_rate = lawyerBilled / (lawyerHours || 1);
    summaryData.percent_partner_hours = Math.round(summaryData.partner_hours / (summaryData.total_hours_billed || 1) * 100);
    summaryData.percent_associate_hours = Math.round(summaryData.associate_hours / (summaryData.total_hours_billed || 1) * 100);
    // summaryData.percent_other_hours = summaryData.other_hours / (summaryData.total_hours_billed || 1) * 100;
    summaryData.percent_other_hours = 100 - summaryData.percent_partner_hours - summaryData.percent_associate_hours;
  }

  calculateMarketData(marketRecords: Array<IMatterExecSummary>): IMatterExecSummary {
    const marketData = this.createEmptySingleMatterData();
    const matterCount = marketRecords.length;
    if (!matterCount) {
      return marketData;
    }
    for (const rec of marketRecords) {
      this.calculateSingleMatterData(rec);
    }
    marketData.matter_name = 'Market';
    const reducerTotalBilled = (previousValue, currentValue) => previousValue.total_billed + currentValue.total_billed;
    marketData.total_billed = marketRecords.reduce((a, b) => ({total_billed: a.total_billed + b.total_billed})).total_billed / matterCount;
    marketData.partner_billed = marketRecords.reduce((a, b) => ({partner_billed: a.partner_billed + b.partner_billed})).partner_billed / matterCount;
    marketData.associate_billed = marketRecords.reduce((a, b) => ({associate_billed: a.associate_billed + b.associate_billed})).associate_billed / matterCount;
    marketData.other_billed = marketRecords.reduce((a, b) => ({other_billed: a.other_billed + b.other_billed})).other_billed / matterCount;
    marketData.avg_associate_rate = marketRecords.reduce((a, b) => ({avg_associate_rate: a.avg_associate_rate + b.avg_associate_rate})).avg_associate_rate / matterCount;
    marketData.avg_partner_rate = marketRecords.reduce((a, b) => ({avg_partner_rate: a.avg_partner_rate + b.avg_partner_rate})).avg_partner_rate / matterCount;
    marketData.avg_other_rate = marketRecords.reduce((a, b) => ({avg_other_rate: a.avg_other_rate + b.avg_other_rate})).avg_other_rate / matterCount;
    marketData.blended_rate = marketRecords.reduce((a, b) => ({blended_rate: a.blended_rate + b.blended_rate})).blended_rate / matterCount;
    marketData.total_hours_billed = marketRecords.reduce((a, b) => ({total_hours_billed: a.total_hours_billed + b.total_hours_billed})).total_hours_billed / matterCount;
    marketData.partner_hours = marketRecords.reduce((a, b) => ({partner_hours: a.partner_hours + b.partner_hours})).partner_hours / matterCount;
    marketData.associate_hours = marketRecords.reduce((a, b) => ({associate_hours: a.associate_hours + b.associate_hours})).associate_hours / matterCount;
    marketData.other_hours = marketRecords.reduce((a, b) => ({other_hours: a.other_hours + b.other_hours})).other_hours / matterCount;
    marketData.timekeepers = marketRecords.reduce((a, b) => ({timekeepers: a.timekeepers + b.timekeepers})).timekeepers / matterCount;
    marketData.partners = marketRecords.reduce((a, b) => ({partners: a.partners + b.partners})).partners / matterCount;
    marketData.associates = marketRecords.reduce((a, b) => ({associates: a.associates + b.associates})).associates / matterCount;
    marketData.others = marketRecords.reduce((a, b) => ({others: a.others + b.others})).others / matterCount;
    marketData.percent_partner_hours = Math.round(marketRecords.reduce((a, b) => ({percent_partner_hours: a.percent_partner_hours + b.percent_partner_hours})).percent_partner_hours / matterCount);
    marketData.percent_associate_hours = Math.round(marketRecords.reduce((a, b) => ({percent_associate_hours: a.percent_associate_hours + b.percent_associate_hours})).percent_associate_hours / matterCount);
    // marketData.percent_other_hours = marketRecords.reduce((a, b) => ({percent_other_hours: a.percent_other_hours + b.percent_other_hours})).percent_other_hours / matterCount;
    marketData.percent_other_hours = 100 - marketData.percent_partner_hours - marketData.percent_associate_hours;
    return marketData;
  }

  createEmptySingleMatterData(): IMatterExecSummary {
    return {
      matter_name: '',
      total_billed: 0,
      total_hours_billed: 0,
      partner_billed: 0,
      associate_billed: 0,
      other_billed: 0,
      partner_hours: 0,
      associate_hours: 0,
      other_hours: 0,
      avg_partner_rate: 0,
      avg_associate_rate: 0,
      avg_other_rate: 0,
      timekeepers: 0,
      partners: 0,
      associates: 0,
      others: 0,
      blended_rate: 0,
      percent_partner_hours: 0,
      percent_associate_hours: 0,
      percent_other_hours: 0
    };
  }

  addSubMetric(metric: IMatterTotalsPanel, prop: string, summaryData: IMatterExecSummary, marketData: IMatterExecSummary, label: string, format: string = '$'): void {
    const actualAmount = summaryData[prop] || 0;
    const compareAmount = marketData[prop] || 0;
    const increase = compareAmount ? ((actualAmount / compareAmount) - 1) * 100 : 0;
    const dir = compareAmount > actualAmount ? -1 : 1;
    metric.subMetrics.push(this.createSubMetric(label, compareAmount, increase, dir, format));
  }

  createSubMetric(lbl: string, amt: number, incr: number, dir: number, frmt: string): IMatterTotalsMetric {
    return {label: lbl, amount: amt, increase: incr, direction: dir, format: frmt};
  }

  formatTkTotalSpend(summaryData: IMatterExecSummary, marketData: IMatterExecSummary, marketRecords: Array<IMatterExecSummary>): Array<IMetricDisplayData> {
    const result = [];
    result.push({chartLabel: 'All TKs', tableLabel: 'All', actual: summaryData.total_billed, market: marketData.total_billed, fieldName: 'total_billed'});
    result.push({chartLabel: 'Partner', tableLabel: 'Partner', actual: summaryData.partner_billed, market: marketData.partner_billed, fieldName: 'partner_billed'});
    result.push({chartLabel: 'Associate', tableLabel: 'Associate', actual: summaryData.associate_billed, market: marketData.associate_billed, fieldName: 'associate_billed'});
    result.push({chartLabel: 'Paralegal/Other', tableLabel: 'Other', actual: summaryData.other_billed, market: marketData.other_billed, fieldName: 'other_billed'});
    this.calculateGrades(result, summaryData, marketRecords);
    this.calculateDeltas(result);
    return result;
  }

  formatAverageRate(summaryData: IMatterExecSummary, marketData: IMatterExecSummary, marketRecords: Array<IMatterExecSummary>): Array<IMetricDisplayData> {
    const result = [];
    result.push({chartLabel: 'Blended Rate', tableLabel: 'Blended Rate', actual: summaryData.blended_rate, market: marketData.blended_rate, fieldName: 'blended_rate'});
    result.push({chartLabel: 'Partner', tableLabel: 'Partner', actual: summaryData.avg_partner_rate, market: marketData.avg_partner_rate, fieldName: 'avg_partner_rate'});
    result.push({chartLabel: 'Associate', tableLabel: 'Associate', actual: summaryData.avg_associate_rate, market: marketData.avg_associate_rate, fieldName: 'avg_associate_rate'});
    result.push({chartLabel: 'Paralegal/Other', tableLabel: 'Other', actual: summaryData.avg_other_rate, market: marketData.avg_other_rate, fieldName: 'avg_other_rate'});
    this.calculateGrades(result, summaryData, marketRecords);
    this.calculateDeltas(result);
    return result;
  }

  formatTotalHours(summaryData: IMatterExecSummary, marketData: IMatterExecSummary, marketRecords: Array<IMatterExecSummary>): Array<IMetricDisplayData> {
    const result = [];
    result.push({chartLabel: 'Total', tableLabel: 'Total', actual: summaryData.total_hours_billed, market: marketData.total_hours_billed, fieldName: 'total_hours_billed'});
    result.push({chartLabel: 'Partner', tableLabel: 'Partner', actual: summaryData.partner_hours, market: marketData.partner_hours, fieldName: 'partner_hours'});
    result.push({chartLabel: 'Associate', tableLabel: 'Associate', actual: summaryData.associate_hours, market: marketData.associate_hours, fieldName: 'associate_hours'});
    result.push({chartLabel: 'Other', tableLabel: 'Other', actual: summaryData.other_hours, market: marketData.other_hours, fieldName: 'other_hours'});
    this.calculateGrades(result, summaryData, marketRecords);
    this.calculateDeltas(result);
    return result;
  }

  formatAvgTkNumber(summaryData: IMatterExecSummary, marketData: IMatterExecSummary, marketRecords: Array<IMatterExecSummary>): Array<IMetricDisplayData> {
    const result = [];
    result.push({chartLabel: 'All Levels', tableLabel: 'All Levels', actual: summaryData.timekeepers, market: marketData.timekeepers, fieldName: 'timekeepers'});
    result.push({chartLabel: 'Partner', tableLabel: 'Partner', actual: summaryData.partners, market: marketData.partners, fieldName: 'partners'});
    result.push({chartLabel: 'Associate', tableLabel: 'Associate', actual: summaryData.associates, market: marketData.associates, fieldName: 'associates'});
    result.push({chartLabel: 'Other', tableLabel: 'Other', actual: summaryData.others, market: marketData.others, fieldName: 'others'});
    this.calculateDeltas(result);
    return result;
  }

  formatPercentOfTkWorked(summaryData: IMatterExecSummary, marketData: IMatterExecSummary, marketRecords: Array<IMatterExecSummary>): Array<IMetricDisplayData> {
    const result = [];
    result.push({chartLabel: 'Partner', tableLabel: 'Partner', actual: summaryData.percent_partner_hours, market: marketData.percent_partner_hours, fieldName: 'percent_partner_hours'});
    result.push({chartLabel: 'Associate', tableLabel: 'Associate', actual: summaryData.percent_associate_hours, market: marketData.percent_associate_hours, fieldName: 'percent_associate_hours'});
    result.push({chartLabel: 'Paralegal/Other', tableLabel: 'Paralegal/Other', actual: summaryData.percent_other_hours, market: marketData.percent_other_hours, fieldName: 'percent_other_hours'});
    this.calculateGrades(result, summaryData, marketRecords);
    this.calculateDeltas(result);
    return result;
  }

  calculateGrades(tks: Array<IMetricDisplayData>, summaryData: IMatterExecSummary, marketRecords: Array<IMatterExecSummary>): void {
    for (const tk of tks) {
      this.getGrade(tk, summaryData, marketRecords);
    }
  }

  getGrade(tk: IMetricDisplayData, summaryData: IMatterExecSummary, marketRecords: Array<IMatterExecSummary>): void {
    const prop = tk.fieldName;
    if (marketRecords.length === 0) {
      return;
    }
    const actual = summaryData[prop];
    const compareRecords = Object.assign([], marketRecords.sort(this.utilService.dynamicSort(prop)));
    const minRec = compareRecords[0];
    const maxRec = compareRecords[compareRecords.length - 1];
    const bmDiff = maxRec[prop] - minRec[prop];
    tk.low = minRec[prop];
    tk.high = maxRec[prop];
    const actualDiff = actual - minRec[prop];
    const actualPercent = actualDiff / bmDiff;
    if (prop.indexOf('percent_') !== 0) {
      if (actualPercent <= 0.3) {
        tk.grade = MetricGrade.GOOD;
      } else if (actualPercent > 0.3 && actualPercent < 0.7) {
        tk.grade = MetricGrade.FAIR;
      } else {
        tk.grade = MetricGrade.POOR;
      }
    } else {
      if (actualPercent >= 0.3 && actualPercent <= 0.7) {
        tk.grade = MetricGrade.GOOD;
      } else if ((actualPercent < 0.3 && actualPercent >= 0.1) || (actualPercent > 0.7 && actualPercent >= 0.9)) {
        tk.grade = MetricGrade.FAIR;
      } else {
        tk.grade = MetricGrade.POOR;
      }
    }

  }

  calculateDeltas(tks: Array<IMetricDisplayData>): void {
    for (const tk of tks) {
      if (tk.fieldName.indexOf('percent_') !== 0) {
        tk.delta = Math.abs(Math.round(tk.actual) - Math.round(tk.market));
        tk.direction = tk.market > tk.actual ? -1 : tk.market < tk.actual ? 1 : 0;
        tk.increase = tk.market ? ((tk.actual / tk.market) - 1) * 100 : 0;
      } else {
        tk.delta = Math.round(tk.actual) - Math.round(tk.market);
        tk.direction = tk.market > tk.actual ? -1 : tk.market < tk.actual ? 1 : 0;
        tk.increase = tk.delta;
      }
    }
  }

  formatCardTitle(type: MetricCardType, isDocuments: boolean = false): string {
    let result = 'Total Spend';
    switch (type) {
      case MetricCardType.AverageRates:
        result = isDocuments ? 'Rate Benchmarks' : 'Average Rates';
        break;
      case MetricCardType.AverageTkOnMatter:
        result = 'Average # of TK\'s on Matter';
        break;
      case MetricCardType.TotalHoursWorked:
        result = 'Total Hours Worked';
        break;
      case MetricCardType.PercentOfHoursWorked:
        result = '% Of Hours Worked';
        break;
      default:
        result = 'Total Spend';
        break;
    }
    return result;
  }

  getCardIcon(type: MetricCardType): string {
    let result = 'chart-pie.png';
    switch (type) {
      case MetricCardType.AverageRates:
        result = 'bills.svg';
        break;
      case MetricCardType.AverageTkOnMatter:
        result = 'avg_ass_matter.svg';
        break;
      case MetricCardType.TotalHoursWorked:
        result = 'clock-sm.png';
        break;
      case MetricCardType.PercentOfHoursWorked:
        result = 'clock-sm.png';
        break;
      default:
        result = 'chart-pie.png';
        break;
    }
    return result;
  }

  // Documents
  getDocumentLandingRatings(documents: Array<IMatterDocument>, marketData: Array<IMarketDocumentData>): void {
    for (const doc of documents) {
      const found = marketData.find(e => e.index === doc.index);
      if (!found) {
        continue;
      }
      this.processLandingDocument(doc, found.market_data);
    }
  }

  processLandingDocument(doc: IMatterDocument, marketRawRecords: Array<IMatterMarketDocument>): void {
    const summaryData = this.convertClassicDocToMatter(doc);
    this.calculateSingleMatterData(summaryData);
    const marketRecords = [];
    doc.hasEnoughData = marketRawRecords && marketRawRecords.length >= 3;
    if (!doc.hasEnoughData) {
      return;
    }
    for (const rec of marketRawRecords) {
      marketRecords.push(this.convertMarketDocToMatter(rec));
    }
    const marketData = this.calculateMarketData(marketRecords);
    const totalSpendMetric = this.formatTkTotalSpend(summaryData, marketData, marketRecords);
    if (totalSpendMetric && totalSpendMetric.length > 0) {
      doc.cost_rating = totalSpendMetric[0];
    }
    const avgRatesMetric = this.formatAverageRate(summaryData, marketData, marketRecords);
    if (avgRatesMetric && avgRatesMetric.length > 0) {
      doc.rates_rating = avgRatesMetric[0];
    }
    const staffingAllocationMetric = this.formatTotalHours(summaryData, marketData, marketRecords);
    if (staffingAllocationMetric && staffingAllocationMetric.length > 0) {
      doc.staffing_rating = staffingAllocationMetric[0];
    }
  }

  convertClassicDocToMatter(doc: IMatterDocument): IMatterExecSummary {
    const summaryData = this.createEmptySingleMatterData();
    summaryData.matter_name = doc.canonical;
    summaryData.client_matter_id = doc.client_matter_id;
    summaryData.total_billed = doc.total_cost;
    summaryData.total_hours_billed = doc.total_hours;
    summaryData.partner_billed = doc.partner_billed;
    summaryData.associate_billed = doc.associate_billed;
    summaryData.partner_hours = doc.partner_hours;
    summaryData.associate_hours = doc.associate_hours;
    summaryData.partner_writeoff_hours = 0;
    summaryData.associate_writeoff_hours = 0;
    summaryData.partner_writeoff = 0;
    summaryData.associate_writeoff = 0;
    return summaryData;
  }

  convertMarketDocToMatter(doc: IMatterMarketDocument): IMatterExecSummary {
    const summaryData = this.createEmptySingleMatterData();
    summaryData.matter_name = doc.entity;
    summaryData.client_matter_id = doc.client_matter_id;
    summaryData.total_billed = doc.total_billed;
    summaryData.total_hours_billed = doc.total_hours_billed;
    summaryData.partner_billed = doc.partner_billed;
    summaryData.associate_billed = doc.associate_billed;
    summaryData.other_billed = doc.other_billed;
    summaryData.partner_hours = doc.partner_hours;
    summaryData.associate_hours = doc.associate_hours;
    summaryData.other_hours = doc.other_hours;
    summaryData.avg_associate_rate = doc.avg_associate_rate;
    summaryData.avg_partner_rate = doc.avg_partner_rate;
    summaryData.avg_other_rate = doc.avg_other_rate;
    summaryData.partner_writeoff_hours = 0;
    summaryData.associate_writeoff_hours = 0;
    summaryData.partner_writeoff = 0;
    summaryData.associate_writeoff = 0;
    summaryData.percent_partner_hours = 0;
    summaryData.percent_associate_hours = 0;
    summaryData.percent_other_hours = 0;

    return summaryData;
  }

  calculateBarSize(panels: Array<IMatterTotalsPanel>): void {
    for (const panel of panels) {
      if (panel.subMetrics && panel.subMetrics.length === 2) {
        if (panel.subMetrics[0].amount >= panel.subMetrics[1].amount) {
          panel.subMetrics[0].size = 100;
        } else {
          panel.subMetrics[0].size = panel.subMetrics[0].amount / (panel.subMetrics[1].amount || panel.subMetrics[0].amount) * 100;
        }
        if (panel.subMetrics[1].amount >= panel.subMetrics[0].amount) {
          panel.subMetrics[1].size = 100;
        } else {
          panel.subMetrics[1].size = panel.subMetrics[1].amount / (panel.subMetrics[0].amount || panel.subMetrics[1].amount) * 100;
        }
      }
    }
  }
  buildMattersForFilter(matters: Array<string>): any {
    const result = [];
    for (const matter of matters) {
      result.push({ id: matter, name: matter, sortField: matter});
    }
    return result;
  }
}
