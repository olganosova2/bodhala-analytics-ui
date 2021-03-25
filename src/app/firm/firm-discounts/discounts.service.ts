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
export interface IPracticeAreaInvoice {
  client_matter_type: string;
  num_invoices: number;
  total: number;
}
export enum DiscountPaTypes {
  Client = 'client',
  Bodhala = 'bodhala'
}
export interface IDiscount {
  client_matter_type: string;
  client_matter_id: string;
  invoice_number: string;
  discount_type_id: number;
  discount_type: string;
  total: number;
  discount_pct: number;
  expected_pct: number;
  actual_discount: number;
  expected_discount: number;
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
    // pointFormat: '<span style=color:{series.color};padding:0>{series.name}: </span>' +
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

  calculateTableData(discounts: Array<IDiscount>, allPAs: Array<IPracticeAreaInvoice>): Array<IDiscountsTable> {
    const result = [];
    const groupedByPa = [];
    const distinctPaNames = [];
    for (const discount of discounts) {
      if (distinctPaNames.indexOf(discount.client_matter_type) < 0) {
        distinctPaNames.push(discount.client_matter_type);
      }
    }
    for (const pa of distinctPaNames) {
      const filteredDiscounts = discounts.filter(e => e.client_matter_type === pa) || [];
      result.push(this.buildTableRow(filteredDiscounts));
    }
    // pa.totalDiscount = pa.total * pa.discount_pct / 100;
    // pa.discountMissed = (pa.total * pa.expected_pct / 100) - (pa.total * pa.discount_pct / 100);
    return result;
  }
  buildTableRow(discounts: Array<IDiscount>): IDiscountsTable {
    const result = { pa: '', discount_pct: 0, expected_pct: 0, total: 0, totalDiscount: 0, discountMissed: 0};
    const count = discounts.length;
    if (count === 0) {
      return result;
    }
    let expectedPct = 0;
    let actualPct = 0;
    let total = 0;
    let discountMissed = 0;
    let totalDiscount = 0;
    for (const discount of discounts) {
      expectedPct += discount.expected_pct;
      actualPct += discount.discount_pct;
      total += discount.total
    }
    return result;
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
