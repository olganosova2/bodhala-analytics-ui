import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import {IPayloadDates, IQbrMetric, IQbrReport, IPayloadQuarterDates, QbrType} from './qbr-model';
import {CommonService} from '../shared/services/common.service';


const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class QbrService {
  firstReport: boolean;
  yoyStartDate: any;

  constructor(public commonService: CommonService) { }

  formatPayloadDates(dtStart: string, qbrType: QbrType): IPayloadDates {
    const result = {
      startDate: '',
      endDate: '',
      comparisonStartDate: '',
      comparisonEndDate: ''
    };
    result.startDate = moment(dtStart).format();
    if (qbrType === QbrType.YoY) {
      result.endDate = moment(dtStart).add(1, 'years').add(-1, 'days').format();
      result.comparisonStartDate = moment(dtStart).add(-1, 'years').format();
      result.comparisonEndDate = moment(dtStart).add(-1, 'days').format();
    }
    if (qbrType === QbrType.QoQAnnual) {
      result.endDate = moment(dtStart).add(3, 'months').add(-1, 'days').format();
      result.comparisonStartDate = moment(dtStart).add(-1, 'years').format();
      result.comparisonEndDate = moment(dtStart).add(-1, 'years').add(3, 'months').add(-1, 'days').format();
    }
    if (qbrType === QbrType.QoQAdjacent) {
      result.endDate = moment(dtStart).add(3, 'months').add(-1, 'days').format();
      result.comparisonStartDate = moment(dtStart).add(-3, 'months').format();
      result.comparisonEndDate = moment(dtStart).add(-1, 'days').format();
    }

    return result;
  }
  generateEmptyMetric(): IQbrMetric {
    return {label: '', direction: 0, percent: 0,  amount: 0};
  }
  formatYoYorQoQMetrics(result: IQbrMetric, increase: number): void {
      result.percent = increase;
      result.direction = increase >= 0 ? 1 : -1;
  }
  getOveralSpendMetric(currentMetric: any, compareMetric: any, includeExpenses: boolean): IQbrMetric {
    const result = Object.assign({}, this.generateEmptyMetric());
    result.label = 'Total Spend';
    if (!currentMetric) {
      return result;
    }
    const currentTotal = includeExpenses ? currentMetric.total_spend_including_expenses : currentMetric.total_spend;
    const compareTotal = includeExpenses ? compareMetric.total_spend_including_expenses : compareMetric.total_spend;
    result.amount = currentTotal.total;
    if (compareTotal.total) {
      const increase = ((currentTotal.total / compareTotal.total) - 1) * 100;
      this.formatYoYorQoQMetrics(result, increase);
    }
    return result;
  }
  getOveralSpendMetricPA(currentMetric: any, compareMetric: any, includeExpenses: boolean): IQbrMetric {
    const result = Object.assign({}, this.generateEmptyMetric());
    result.label = 'Total Spend';
    if (!currentMetric) {
      return result;
    }
    const currentTotal = includeExpenses ? currentMetric.total_billed + currentMetric.total_expenses : currentMetric.total_billed;
    const compareTotal = includeExpenses ? compareMetric.total_billed + compareMetric.total_expenses  : compareMetric.total_billed;
    result.amount = currentTotal;
    if (compareTotal) {
      const increase = ((currentTotal / compareTotal) - 1) * 100;
      this.formatYoYorQoQMetrics(result, increase);
    }
    return result;
  }
  getBBMetric(currentMetric: any, compareMetric: any): IQbrMetric {
    const result = Object.assign({}, this.generateEmptyMetric());
    result.label = 'Block Billed';
    if (!currentMetric) {
      return result;
    }
    result.amount  = Math.round(currentMetric.block_billed_pct || 0);
    if (compareMetric && compareMetric.block_billed_pct) {
      const increase = ((currentMetric.block_billed_pct / compareMetric.block_billed_pct) - 1) * 100;
      this.formatYoYorQoQMetrics(result, increase);
    }
    return result;
  }
  getGenericMetric(currentMetric: any, compareMetric: any, propName: string, label: string, icon: string): IQbrMetric {
    const result = Object.assign({}, this.generateEmptyMetric());
    result.label = this.commonService.capitalize(label);
    result.icon = icon;
    if (!currentMetric) {
      return result;
    }
    result.amount  = Math.round(currentMetric[propName] || 0);
    result.amountToCompare = Math.round(compareMetric[propName] || 0);
    if (compareMetric && compareMetric[propName]) {
      const increase = ((currentMetric[propName] / compareMetric[propName]) - 1) * 100;
      this.formatYoYorQoQMetrics(result, increase);
    }
    return result;
  }
  getPercentHours(metric: any, includeParalegals: boolean): void {
    if (includeParalegals) {
      metric.total_other_hours =  metric.total_hours - (metric.total_partner_hours + metric.total_associate_hours + metric.total_paralegal_hours);
    } else {
      metric.total_other_hours =  metric.total_hours - (metric.total_partner_hours + metric.total_associate_hours);
    }
    metric.associate_percent_hours_worked = metric.total_hours ? (metric.total_associate_hours / metric.total_hours) * 100 : 0;
    metric.partner_percent_hours_worked = metric.total_hours ? (metric.total_partner_hours / metric.total_hours) * 100 : 0;
    metric.paralegal_percent_hours_worked = metric.total_hours ? (metric.total_paralegal_hours / metric.total_hours) * 100 : 0;
    metric.other_percent_hours_worked = metric.total_hours ? (metric.total_other_hours / metric.total_hours) * 100 : 0;
  }
  getTkHoursRecord(hoursCurrent: any, hoursCompare: any, qbrType: QbrType, classification: string): IQbrMetric {
    const result = Object.assign({}, this.generateEmptyMetric());
    result.label = this.commonService.capitalize(classification);
    if (!hoursCurrent || !hoursCompare) {
      return result;
    }
    result.amount  = Math.round(hoursCurrent || 0);
    if (hoursCurrent && hoursCompare) {
      const increase = ((hoursCurrent / hoursCompare) - 1) * 100;
      this.formatYoYorQoQMetrics(result, increase);
    }
    return result;
  }

  constructSelectableQuarterDates(startDate): any {
    const result = {
      monthNumbers: null,
      formattedQuarterDates: null
    };
    const monthNumbers = [];
    const formatted = [];

    const firstQuarter = moment(startDate).format('MM');
    const secondQuarter = moment(startDate).add(3, 'months').format('MM');
    const thirdQuarter = moment(startDate).add(6, 'months').format('MM');
    const fourthQuarter = moment(startDate).add(9, 'months').format('MM');

    const firstQuarterFormatted = moment(startDate).format('MM-DD');
    const secondQuarterFormatted = moment(startDate).add(3, 'months').format('MM-DD');
    const thirdQuarterFormatted = moment(startDate).add(6, 'months').format('MM-DD');
    const fourthQuarterFormatted = moment(startDate).add(9, 'months').format('MM-DD');

    formatted.push(firstQuarterFormatted);
    formatted.push(secondQuarterFormatted);
    formatted.push(thirdQuarterFormatted);
    formatted.push(fourthQuarterFormatted);

    monthNumbers.push(Number(firstQuarter));
    monthNumbers.push(Number(secondQuarter));
    monthNumbers.push(Number(thirdQuarter));
    monthNumbers.push(Number(fourthQuarter));

    result.monthNumbers = monthNumbers;
    result.formattedQuarterDates = formatted;

    return result;
  }
  formatShortTKLabel(tk: string): string {
    let result = '';
    if (tk === 'Partner') {
      result = 'PA';
    }
    if (tk === 'Associate') {
      result = 'AS';
    }
    if (tk === 'Paralegal') {
      result = 'PL';
    }
    if (tk === 'Other') {
      result =  tk;
    }
    return result;
  }
}
