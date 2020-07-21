import {Injectable} from '@angular/core';

export enum SavingMetrics {
  TkLevel = 'TkLevel',
  BlockBilling = 'BlockBilling',
  RateIncrease = 'RateIncrease',
  Overstaffing = 'Overstaffing'
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
  calculateBlockBillingValue(val: number, percent: number, total: number): number {
    percent = percent || 1;
    return 0.2 * ( ( (percent - val ) / percent ) * total);
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
