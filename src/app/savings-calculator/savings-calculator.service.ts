import {Injectable} from '@angular/core';
import {SAVINGS_CALCULATOR_CONFIG} from '../shared/services/config';
export enum SavingMetrics {
  TkLevel = 'TkLevel',
  BlockBilling = 'BlockBilling',
  RateIncrease = 'RateIncrease',
  Overstaffing = 'Overstaffing'
}
export interface ISlider {
  value: number;
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
export interface IOverstaffingData {
  end_date: string;
  overstaffing: Array<IOverstaffingRow>;
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
  details?: Array<any>;
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

  constructor() {
  }
  calculatePercent(total: number, grandTotal: number): number {
    grandTotal = grandTotal ? grandTotal : 1;
    return total * 100 / grandTotal;
  }
  createMetricsRecord(record: IBlockBillingData | IOverstaffingData, type: SavingMetrics): IMetric {
    const result = {} as IMetric;
    result.savingsType = type;
    if (type === SavingMetrics.BlockBilling) {
      const bbRecord = record as IBlockBillingData;
      const bbP = bbRecord.bbp > 10 ?  bbRecord.bbp - 10 : bbRecord.bbp;
      result.percent = Math.round(bbP);
      result.origPercent = Math.round(bbRecord.bbp);
      result.total = bbRecord.total_block_billed;
      result.title = 'Block Billing';
      result.maxRange = 100;
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
      result.title = 'Overstaffing';
      result.viewLabel = 'meeting';
      result.details = osRecord.overstaffing || [];
      result.maxRange = 50;
    }
    return result;
  }
  calculateBlockBillingValue(val: number, percent: number, total: number): number {
    percent = percent || 1;
    return 0.2 * ( ( (percent - val ) / percent ) * total);
  }
  calculateOverstaffingValue(val: number, total: number): number {
    return val * ( SAVINGS_CALCULATOR_CONFIG.idealNumberOfPplInMeetings * total);
  }
  calculateDiameter(val: number, percent: number, total: number): number {
    const maxTotal = 0.2 * total || 1;
    percent = percent || 1;
    const currentTotal = 0.2 * ( ( (percent - val ) / percent ) * total);
    const result = (currentTotal * 200 / maxTotal);
    return result;
  }
  getChartSeries(val: number, percent: number, total: number): Array<number> {
    const grandTotal = this.calculateBlockBillingValue(100, percent, total);
    const filled = this.calculateBlockBillingValue(val, percent, total);
    const remaining = grandTotal - filled;
    return [filled, remaining];
  }
}
