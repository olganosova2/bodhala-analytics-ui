import {Injectable} from '@angular/core';
import {SAVINGS_CALCULATOR_CONFIG} from '../shared/services/config';
import {UtilService} from 'bodhala-ui-common';
export enum SavingMetrics {
  TkLevel = 'TkLevel',
  BlockBilling = 'BlockBilling',
  RateIncrease = 'RateIncrease',
  Overstaffing = 'Overstaffing'
}
export enum tkClassifications {
  associate = 'associate',
  partner = 'partner',
  other = 'other',
  paralegal = 'paralegal'
}
export interface ISlider {
  value: number;
}
export interface IClassification {
  title: string;
  avgRateIncrease: number;
  totalHours: number;
  lastYearRate: number;
}
export interface IBlockBillingData {
  end_date: string;
  bbp: number;
  total_billed: number;
  total_block_billed: number;
}
export interface IOverstaffingRow {
  timekeepers: number;
  firm_id: number;
  firm_name: string;
  line_item_date: string;
  total_billed: number;
  client_matter_id: string;
  matter_name: string;
  total_hours: number;
}
export interface IRateIncreaseRow {
  bh_classification: string;
  total_billed: number;
  total_afa: number;
  total_spend: number;
  total_hours: number;
  effective_rate: number;
}
export interface IOverstaffingData {
  end_date: string;
  overstaffing: Array<IOverstaffingRow>;
}
export interface IRateIncreaseData {
  end_date: string;
  rate_increase: Array<IRateIncreaseRow>;
}
export interface IMetric {
  origPercent: number;
  percent: number;
  total: number;
  title: string;
  savingsType: SavingMetrics;
  maxRange: number;
  savings: number;
  viewLabel?: string;
  percentLabel?: string;
  details?: Array<any>;
  minRange?: number;
  classifications?: Array<IClassification>;
  tooltip: string;
}

export const pieDonutOptions = {
  chart: {
    type: 'pie',
    width: 200,
    height: 200,
    spacingTop: 0,
    spacingRight: 0,
    spacingBottom: 0,
    spacingLeft: 0,
    plotBorderWidth: 0,
    margin: [0, 0 , 0, 0]
  },
  title: {
    text: ''
  },
  yAxis: {
    visible: false
  },
  xAxis: {
    visible: false
  },
  plotOptions: {
    pie: {
      shadow: false,
      colors: ['#FF632C', '#E9F1F4'],
    }
  },
  tooltip: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Browsers',
    data: [6, 4],
    size: '100%',
    innerSize: '90%',
    showInLegend: false,
    dataLabels: {
      enabled: false
    }
  }]
};


@Injectable({
  providedIn: 'root'
})
export class SavingsCalculatorService {

  constructor(private utilService: UtilService) {
  }
  calculatePercent(total: number, grandTotal: number): number {
    grandTotal = grandTotal ? grandTotal : 1;
    return total * 100 / grandTotal;
  }
  createMetricsRecord(record: IBlockBillingData | IOverstaffingData, type: SavingMetrics): IMetric {
    const result = {} as IMetric;
    result.savingsType = type;
    result.savings = 0;
    if (type === SavingMetrics.BlockBilling) {
      const bbRecord = record as IBlockBillingData;
      const bbP = bbRecord.bbp > 10 ?  bbRecord.bbp - 10 : bbRecord.bbp;
      result.percent = Math.round(bbP);
      result.origPercent = Math.round(bbRecord.bbp);
      result.total = bbRecord.total_block_billed;
      result.title = 'Block Billing';
      result.percentLabel = 'Last Year';
      result.maxRange = 100;
      result.tooltip = 'Bodhala defines block billing as a single billing entry greater than 4 hours. Bodhala\'s acceptable threshold is under 20%.';
    }
    if (type === SavingMetrics.Overstaffing) {
      const osRecord = record as IOverstaffingData;
      let osTotal = 0;
      for (const rec of osRecord.overstaffing) {
        osTotal += rec.total_billed;
      }
      result.total = osTotal;
      result.percent = 20;
      result.origPercent = 20;
      result.title = 'Overbilling on Internal Meetings';
      result.viewLabel = 'meeting';
      result.details = osRecord.overstaffing || [];
      if (result.details.length > 0) {
        result.details.sort(this.utilService.dynamicSort('-timekeepers'));
      }
      result.maxRange = 50;
      result.tooltip = 'Bodhala\'s general guideline is to restrict more than 2 timekeepers charging for the same internal meeting.';
    }
    return result;
  }
  createRateIncreaseRecord(records: Array<IRateIncreaseData>): IMetric {
    const result = {} as IMetric;
    result.savings = 0;
    result.savingsType = SavingMetrics.RateIncrease;
    result.minRange = -5;
    result.maxRange = 20;
    result.percent = 3;
    result.total = 0; // TODO
    result.title = 'Rate Increase Prevention';
    result.percentLabel = 'Average for 3 years';
    result.tooltip = 'The typical cost of inflation is around 2-3%. Any increases above this threshold are considered excessive.';
    const tkClassificationsProcessed = [];
    for (const key of Object.keys(tkClassifications)) {
      if (key === 'partner' || key === 'associate') {
        tkClassificationsProcessed.push(this.createClassification(key, records));
      }
    }
    result.classifications = tkClassificationsProcessed;
    result.origPercent = this.calculateOrigIncreaseRatePercent(tkClassificationsProcessed);
    return result;
  }
  createClassification(name: string, records: Array<IRateIncreaseData>): any {
    const classification = {} as IClassification;
    classification.title = name;
    const year1 = records[0].rate_increase || [];
    const year2 =  records[1].rate_increase || [];
    const year3 =  records[2].rate_increase || [];
    const year1Rec = year1.find(e => e.bh_classification === name) || {} as IRateIncreaseRow;
    const year2Rec = year2.find(e => e.bh_classification === name) || {} as IRateIncreaseRow;
    const year3Rec = year3.find(e => e.bh_classification === name) || {} as IRateIncreaseRow;
    const divider1 = year2Rec.effective_rate ? year2Rec.effective_rate : 1;
    const year1Increase = ((year1Rec.effective_rate || 0) - (year2Rec.effective_rate || 0)) / divider1;
    const divider2 = year3Rec.effective_rate ? year3Rec.effective_rate : 1;
    const year2Increase = ((year2Rec.effective_rate || 0) - (year3Rec.effective_rate || 0)) / divider2;
    classification.avgRateIncrease = (year1Increase + year2Increase) / 2;
    // handling missing data
    if (!year2Rec.effective_rate && !year3Rec.effective_rate) { // no data for 2 years
      classification.avgRateIncrease = 0;
    }
    else if (!year3Rec.effective_rate) { // no data for 3-rd year
      classification.avgRateIncrease = year1Increase;
    }
    else if (!year2Rec.effective_rate) { // no data for 2-nd year
      const div1 = year3Rec.effective_rate ? year3Rec.effective_rate : 1;
      const year1Incr = ((year1Rec.effective_rate || 0) - (year3Rec.effective_rate || 0)) / div1;
      classification.avgRateIncrease = year1Incr;
    }
    classification.totalHours = year1Rec.total_hours ||  0;
    classification.lastYearRate = year1Rec.effective_rate || 0;
    return classification;
  }
  calculateOrigIncreaseRatePercent(classifications: Array<IClassification>): number {
    let result = 0;
    let cnt = 0;
    let avg = 0;
    for (const rec of classifications) {
      if (rec.totalHours && rec.totalHours > 0) {
        cnt++;
        avg += rec.avgRateIncrease;
      }
    }
    result = cnt > 0 ? avg * 100 / cnt : 0;
    return result;
  }
  calculateBlockBillingValue(val: number, percent: number, total: number): number {
    percent = percent || 1;
    return 0.2 * ( ( (percent - val ) / percent ) * total);
  }
  calculateOverstaffingValue(val: number, total: number): number {
    return val * ( SAVINGS_CALCULATOR_CONFIG.idealNumberOfPplInMeetings * total) / 100;
  }
  calculateIncreaseRateValue(val: number, metric: IMetric): number {
    let result = 0;
    if (!metric.classifications || metric.classifications.length === 0) {
      return result;
    }
    for (const rec of metric.classifications) {
      result += (rec.avgRateIncrease - val / 100) * rec.totalHours * rec.lastYearRate;
    }
    return result;
  }
  // calculateDiameter(val: number, percent: number, total: number): number {
  //   const maxTotal = 0.2 * total || 1;
  //   percent = percent || 1;
  //   const currentTotal = 0.2 * ( ( (percent - val ) / percent ) * total);
  //   const result = (currentTotal * 200 / maxTotal);
  //   return result;
  // }
  // getChartSeries(val: number, percent: number, total: number): Array<number> {
  //   const grandTotal = this.calculateBlockBillingValue(100, percent, total);
  //   const filled = this.calculateBlockBillingValue(val, percent, total);
  //   const remaining = grandTotal - filled;
  //   return [filled, remaining];
  // }
}
