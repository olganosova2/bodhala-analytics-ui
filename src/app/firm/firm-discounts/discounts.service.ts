import { Injectable } from '@angular/core';
import {IFirm} from '../firm.model';

export const mockFirmDiscounts = [
  { pa: 'Corporate/Fund', discount_pct: 23.6, expected_pct: 22.5, total: 89148055, totalDiscount: 21024189, discountMissed: 0},
  { pa: 'M&A', discount_pct: 4.3, expected_pct: 0, total: 2944415, totalDiscount: 127121, discountMissed: 0 },
  { pa: 'Real Estate', discount_pct: 23.9, expected_pct: 22.5, total: 11870625, totalDiscount: 2838826, discountMissed: 0 },
];

export interface IDiscountsTable {
  pa: string;
  discount_pct: number;
  expected_pct: number;
  total: number;
  totalDiscount?: number;
  discountMissed?: number;
}

export const discountsChart = {
  chart: {
    type: 'column',
    width: 700,
    height: 400,
    marginLeft: null,
    marginRight: 10,
    marginTop: 5,
    spacingTop: 5,
    zoomType: false,
  },
  exporting: {   enabled: false  },
  credits: { enabled: false },
  title: { text: null },
  xAxis: {
    categories: [],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Discount Percentage %'
    }
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom'
  },
  tooltip: {
    headerFormat: null,
    // pointFormat: '<span style="color:{series.color};padding:0">{series.name}: </span>' +
    //   '<span><b>{point.y:.1f} %</b></span>',
    footerFormat: null,
    pointFormat: '{series.name}: {point.y:.1f} %',
    useHTML: false
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      }
    }
  },
  series: []
};

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor() { }

  calculateTableData(pas: Array<IDiscountsTable>): void {
    for (const pa of pas) {
      pa.totalDiscount = pa.total * pa.discount_pct / 100;
      pa.discountMissed = (pa.total * pa.expected_pct / 100) - (pa.total * pa.discount_pct / 100);
    }
  }
  buildChartCategories(pas: Array<IDiscountsTable>): Array<string> {
    const result = [];
    for (const pa of pas) {
      result.push(pa.pa);
    }
    return result;
  }
  buildDiscountsChartData(options: any, pas: Array<IDiscountsTable>, firm: IFirm): void {
    options.xAxis.categories = this.buildChartCategories(pas);
    options.series = [];
    options.title.text = firm.name;
    options.series.push(this.buildColumnData(pas, 'expected_pct'));
    options.series.push(this.buildColumnData(pas, 'discount_pct'));
  }
  buildColumnData(pas: Array<IDiscountsTable>, discountType: string): any {
    const points = [];
    for (const pa of pas) {
      points.push(pa[discountType]);
    }
    const serieName = discountType === 'discount_pct' ? 'Actual*' : 'Expected';
    return { name: serieName, data: points};
  }

}
