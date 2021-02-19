import {Injectable} from '@angular/core';
import {SAVINGS_CALCULATOR_ARTICLES, SAVINGS_CALCULATOR_CONFIG} from '../shared/services/config';
import {UtilService} from 'bodhala-ui-common';
import {IDropDown} from '../shared/models/prime-ng';
import * as _moment from 'moment';

const moment = _moment;

export enum SavingMetrics {
  TkLevel = 'TkLevel',
  BlockBilling = 'BlockBilling',
  RateIncrease = 'RateIncrease',
  Overstaffing = 'Overstaffing',
  DelayedBilling = 'DelayedBilling'
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
  lastYearRateIncrease?: number;
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
  bh_lawfirm_id?: number;
  firm_name?: string;
  year?: number;
}
export interface IOverstaffingData {
  end_date: string;
  overstaffing: Array<IOverstaffingRow>;
}
export interface IRateIncreaseData {
  end_date: string;
  rate_increase: Array<IRateIncreaseRow>;
}
export interface IDelayedBillingRow {
  total_billed: number;
  total_afa: number;
  total_spend: number;
  bh_lawfirm_id?: number;
  firm_name?: string;
}
export interface IDelayedBillingData {
  end_date: string;
  delayed_billing: Array<IDelayedBillingRow>;
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
  articleId?: string;
  overstaffingNumber?: string;
}
export interface ISavingsRecord {
  id: number;
  firm_name: string;
  bb: number;
  bbRaw?: number;
  rate_increase?: number;
  rate_increaseRaw?: number;
  overstaffing?: number;
  delayed_billing?: number;
  total?: number;
}

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
  createMetricsRecord(record: IBlockBillingData | IOverstaffingData | any, type: SavingMetrics): IMetric {
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
      result.tooltip = 'Bodhala defines \'block billing\' as a single billing entry greater than 4 hours. This suggests imprecise billing habits by the timekeeper. Reducing the percentage of work that is block billed leads to savings.';
      result.articleId = SAVINGS_CALCULATOR_ARTICLES.BlockBilling;
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
      result.tooltip = 'Bodhala recommends that no more than four (4) timekeepers be allowed to invoice for the same internal law firm meeting. Reducing the staffing at these internal law firms meetings can be a substantial source of savings.';
      result.articleId = SAVINGS_CALCULATOR_ARTICLES.Overstaffing;
      result.overstaffingNumber = SAVINGS_CALCULATOR_CONFIG.overstaffingNumber;
    }
    if (type === SavingMetrics.DelayedBilling) {
      let bbRecord = {} as IDelayedBillingRow;
      if (record.delayed_billing.length > 0) {
        bbRecord = record.delayed_billing[0] as IDelayedBillingRow;
      }
      result.percent = 50;
      result.origPercent = 50;
      result.total = bbRecord.total_spend || 0;
      result.title = 'Delayed Billing';
      result.percentLabel = 'Last Year';
      result.maxRange = 100;
      result.tooltip = null;
      result.articleId = null;
    }
    return result;
  }
  updateOverstaffingMetric(metric: IMetric, record: IOverstaffingData): void {
    const osRecord = record as IOverstaffingData;
    let osTotal = 0;
    for (const rec of osRecord.overstaffing) {
      osTotal += rec.total_billed;
    }
    metric.total = osTotal;
    metric.details = osRecord.overstaffing || [];
    if (metric.details.length > 0) {
      metric.details.sort(this.utilService.dynamicSort('-timekeepers'));
    }
    metric.savings = this.calculateOverstaffingValue(metric.percent, metric.total);
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
    result.tooltip = 'Law firms typically increase their rates on an annual basis - often at a rate above the rate of inflation. If these rate increases are limited to or capped at a nominal amount, the savings can really add up.';
    result.articleId = SAVINGS_CALCULATOR_ARTICLES.RateIncrease;
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
  createClassificationDynamic(name: string, records: Array<IRateIncreaseData>): any {
    const classification = {} as IClassification;
    classification.title = name;
    let lastYear = (records[0].rate_increase || []).find(e => e.bh_classification === name) || {} as IRateIncreaseRow;
    classification.totalHours = lastYear.total_hours ||  0;
    classification.lastYearRate = lastYear.effective_rate || 0;
    let increases = 0;
    let count = 0;
    let prevYearsEffectiveRate = 0;
    for (let ix = 1; ix < records.length; ix++) {
      const year1Rec = lastYear;
      const year2Rec = records[ix].rate_increase.find(e => e.bh_classification === name) || {} as IRateIncreaseRow;
      const divider = year2Rec.effective_rate ? year2Rec.effective_rate : 1;
      const yearIncrease = ((year1Rec.effective_rate || 0) - (year2Rec.effective_rate || 0)) / divider;
      if (ix === 1) {
        prevYearsEffectiveRate = year2Rec.effective_rate;
      }
      if (year1Rec.effective_rate && year2Rec.effective_rate) {
        increases += yearIncrease;
        count ++;
        lastYear = year2Rec;
      }
    }
    const prevDivider = prevYearsEffectiveRate ?  prevYearsEffectiveRate : 1;
    classification.lastYearRateIncrease = (classification.lastYearRate - prevYearsEffectiveRate ) / prevDivider;
    classification.avgRateIncrease = count ? (increases / count) : 0;
    return classification;
  }
  calculateOrigIncreaseRatePercent(classifications: Array<IClassification>, isAvg = true): number {
    let result = 0;
    let cnt = 0;
    let avg = 0;
    for (const rec of classifications) {
      if (rec.totalHours && rec.totalHours > 0) {
        cnt++;
        if (isAvg) {
          avg += rec.avgRateIncrease;
        } else {
          avg += rec.lastYearRateIncrease;
        }
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
  calculateDelayedBillingValue(val: number, total: number): number {
    return val * total / 100;
  }
  buildOverstaffingDropDown(): Array<IDropDown> {
    const result = [];
    for (let ix = 3; ix <= 40; ix++) {
      result.push({value: ix.toString(), label: ix.toString()});
    }
    return result;
  }
  calculateBBrecordForTable(bbp: number, totalBB: number, bbMetric: IMetric): number {
    let result = 0;
    if (!bbp || !bbMetric) {
      return result;
    }
    result = this.calculateBlockBillingValue(bbMetric.percent, Math.round(bbp), totalBB);
    return result;
  }
  calculateOverstaffingrecordForTable(records: Array<IOverstaffingRow>, osMetric: IMetric): number {
    let result = 0;
    if (!records || records.length === 0 || !osMetric) {
      return result;
    }
    let totalOS = 0;
    for (const rec of records) {
      totalOS += rec.total_billed;
    }
    result = this.calculateOverstaffingValue(osMetric.percent, Math.round(totalOS));
    return result;
  }
  calculateRateIncreaseForTable(records: Array<IRateIncreaseRow>, lastYear: number, rateIncreaseMetric: IMetric): number {
    let result = 0;
    const distinctYears = [];
    const yearRecords = [];
    for (let ix = 0; ix <  SAVINGS_CALCULATOR_CONFIG.yearsRange; ix++) {
      distinctYears.push(lastYear - ix);
    }
    for (const year of distinctYears) {
      const yearRecs = records.filter(e => e.year === year) || [];
      const classifications = [];
      const partnerRecords = yearRecs.filter(e => e.bh_classification === 'partner') || [];
      if (partnerRecords.length > 0) {
        classifications.push(partnerRecords[0]);
      }
      const associateRecords = yearRecs.filter(e => e.bh_classification === 'associate') || [];
      if (associateRecords.length > 0) {
        classifications.push(associateRecords[0]);
      }
      if (classifications.length > 0) {
        yearRecords.push({ rate_increase: classifications});
      } else {
        yearRecords.push({ rate_increase: []});
      }
    }
    const tkClassificationsProcessed = [];
    for (const key of Object.keys(tkClassifications)) {
      if (key === 'partner' || key === 'associate') {
        tkClassificationsProcessed.push(this.createClassification(key, yearRecords));
      }
    }
    const processed = tkClassificationsProcessed;
    const clonedMetric = Object.assign({}, rateIncreaseMetric);
    clonedMetric.classifications = Object.assign([], processed);
    result = this.calculateIncreaseRateValue(clonedMetric.percent, clonedMetric);
    return result;
  }
  calculateDelayedBillingForTable(records: Array<IDelayedBillingRow>, dbMetric: IMetric): number {
    let result = 0;
    if (records.length === 0 || !dbMetric) {
      return result;
    }
    const db = records[0];
    result = this.calculateDelayedBillingValue(dbMetric.percent, db.total_spend);
    return result;
  }
  formatDataForTable(data: any, metrics: Array<IMetric>): Array<any> {
    const result = [];
    if (!data.bb_percent || data.bb_percent.length === 0){
      return result;
    }
    const allFirms =  data.bb_percent[0].bb_percent;
    if (!allFirms || allFirms.length === 0){
      return result;
    }
    const bbMetric = metrics.find(e => e.savingsType === SavingMetrics.BlockBilling);
    const osMetric = metrics.find(e => e.savingsType === SavingMetrics.Overstaffing);
    const rateIncreaseMetric = metrics.find(e => e.savingsType === SavingMetrics.RateIncrease);
    const delayedBillingMetric = metrics.find(e => e.savingsType === SavingMetrics.DelayedBilling);
    const topFirms = allFirms || [];
    const overstaffingData = data.overstaffing[0].overstaffing || [];
    const rateIncreaseData = data.rate_increase[0].rate_increase || [];
    const delayedBillingData = data.delayed_billing[0].delayed_billing || [];
    const lastYear = moment(data.rate_increase[0].end_date).year();
    for (const firm of topFirms) {
      const recordForTable  = {} as ISavingsRecord;
      recordForTable.firm_name = firm.firm_name;
      recordForTable.id = firm.bh_lawfirm_id;
      recordForTable.total = 0;
      recordForTable.bbRaw = firm.total_block_billed;
      recordForTable.bb = this.calculateBBrecordForTable(firm.bbp, firm.total_block_billed, bbMetric) || 0;
      recordForTable.total += recordForTable.bb;
      const firmOverstaffing = overstaffingData.filter(e => e.firm_id === firm.bh_lawfirm_id) || [];
      recordForTable.overstaffing = this.calculateOverstaffingrecordForTable(firmOverstaffing, osMetric);
      recordForTable.total += recordForTable.overstaffing;
      const firmRateIncrease = rateIncreaseData.filter(e => e.bh_lawfirm_id === firm.bh_lawfirm_id) || [];
      recordForTable.rate_increase = this.calculateRateIncreaseForTable(firmRateIncrease, lastYear,  rateIncreaseMetric);
      recordForTable.total += recordForTable.rate_increase;
      const firmDelayedBilling = delayedBillingData.filter(e => e.bh_lawfirm_id === firm.bh_lawfirm_id) || [];
      recordForTable.delayed_billing = this.calculateDelayedBillingForTable(firmDelayedBilling, delayedBillingMetric);
      recordForTable.total += recordForTable.delayed_billing;
      result.push(recordForTable);
    }
    return result;
  }
}
