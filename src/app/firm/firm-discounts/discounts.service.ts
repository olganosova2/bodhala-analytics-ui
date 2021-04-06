import { Injectable } from '@angular/core';
import {IFirm} from '../firm.model';

export const mockFirmDiscounts = [
  { pa: 'Carlyle Corporate/Fund', discount_pct: 8.6, expected_pct: 7.5, total: 89148055, totalDiscount: 21024189, discountMissed: 0},
  { pa: 'Carlyle M&A', discount_pct: 11.8, expected_pct: 7.5, total: 2944415, totalDiscount: 127121, discountMissed: 0 },
  { pa: 'Carlyle Real Estate', discount_pct: 8.9, expected_pct: 7.5, total: 11870625, totalDiscount: 2838826, discountMissed: 0 },
];
export const mockFirmDiscountsTable = [
  { pa: 'Carlyle Corporate/Fund', discount_pct: 8.6, expected_pct: 7.5, total: 69089743, totalDiscount: 5941717.89, discountMissed: 0},
  { pa: 'Carlyle M&A', discount_pct: 11.8, expected_pct: 7.5, total: 2944415, totalDiscount: 347441.03, discountMissed: 0 },
  { pa: 'Carlyle Real Estate', discount_pct: 8.9, expected_pct: 7.5, total: 9199734, totalDiscount: 818766.35, discountMissed: 0 },
  { pa: 'Total', discount_pct: null, expected_pct: null, total: 81233893, totalDiscount: 6887104.11, discountMissed: null },
];

export interface IDiscountsTable {
  pa: string;
  discount_pct: number;
  expected_pct: number;
  total: number;
  totalDiscount?: number;
  discountMissed?: number;
  numInvoices?: number;
  numDiscountedInvoices?: number;
}
export interface IPracticeAreaInvoice {
  client_matter_type?: string;
  num_invoices?: number;
  total?: number;
  struct_percent?: number;
}
export enum DiscountPaTypes {
  Client = 'client',
  Bodhala = 'bodhala'
}
export enum DiscountTypes {
  PracticeArea = 'Practice Area'
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
   calculateSubTotalWithInvoices(pas: Array<IPracticeAreaInvoice>): any {
     return pas.reduce( ( sum , cur ) => sum + cur.total , 0);
   }
  calculateSubTotalInvoices(pas: Array<IPracticeAreaInvoice>): any {
    return pas.reduce( ( sum , cur ) => sum + cur.num_invoices , 0);
  }
  calculateTableData(discounts: Array<IDiscount>, allPAs: Array<IPracticeAreaInvoice>): Array<IDiscountsTable> {
    const result = [];
    for (const pa of allPAs) {
      const filteredDiscounts = discounts.filter(e => e.client_matter_type === pa.client_matter_type && e.discount_type === DiscountTypes.PracticeArea) || [];
      result.push(this.buildTableRow(filteredDiscounts, pa));
    }
    return result;
  }
  calculateTableTotals(records: Array<IDiscountsTable>): any {
    const result = {  total: 0, totalDiscount: 0, discountMissed: 0};
    for (const rec of records) {
      result.total += rec.total;
      result.totalDiscount += rec.totalDiscount;
      result.discountMissed += rec.discountMissed;
    }
    return result;
  }
  buildTableRow(discounts: Array<IDiscount>, paAll: IPracticeAreaInvoice): IDiscountsTable {
    const result = { pa: '', discount_pct: 0, expected_pct: 0, total: 0, totalDiscount: 0, discountMissed: 0, numInvoices: 0, numDiscountedInvoices: 0};
    const count = discounts.length;
    const expectedPct = 0;
    const actualPct = 0;
    let total = 0;
    let actualDiscount = 0;
    let expectedDiscount = 0;
    const uniqueInvoices = [];
    for (const discount of discounts) {
      // expectedPct += discount.expected_pct;
      // actualPct += discount.discount_pct;
      total += discount.total;
      actualDiscount += discount.actual_discount;
      expectedDiscount += discount.expected_discount;
      if (uniqueInvoices.indexOf(discount.invoice_number) < 0) {
        uniqueInvoices.push(discount.invoice_number);
      }
    }
    result.pa = paAll.client_matter_type;
    result.discount_pct = actualDiscount / paAll.total * 100;
    result.expected_pct = paAll.struct_percent;
    result.total = paAll.total;
    result.totalDiscount = actualDiscount;
    result.discountMissed = paAll.total * result.expected_pct / 100 - actualDiscount;
    result.numInvoices = paAll.num_invoices;
    result.numDiscountedInvoices = uniqueInvoices.length;
    if (result.discountMissed < 0) {
      result.discountMissed = 0;
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
    options.series = [];
    options.title.text = firm.name;
    const nonEmptyPAs = pas.filter(e => e.expected_pct > 0 || e.discount_pct > 0) || [];
    options.xAxis.categories = this.buildChartCategories(nonEmptyPAs);
    options.series.push(this.buildColumnData(nonEmptyPAs, 'expected_pct'));
    options.series.push(this.buildColumnData(nonEmptyPAs, 'discount_pct'));
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
