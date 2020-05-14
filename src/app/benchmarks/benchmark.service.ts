import {Injectable} from '@angular/core';
import {IBenchmark, IBenchmarkMetrics, IBenchmarkOverviewRow, IBenchmarkRate, IRowBenchmark, RateStatuses} from './model';
import {of, throwError} from 'rxjs';
import {TOP_MATTERS} from '../shared/unit-tests/mock-data/top-matters';
import {TOP_FIRMS} from '../shared/unit-tests/mock-data/top-firms';
export enum BM_COLORS  {
  Poor = '#FE3F56;',
  Fair = '#FFDF35;',
  Excellent = '#3EDB73;',
  Default = '#E5EAEC;'
}
@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {
  highestBarAvg: number;
  showChart: boolean = false;
  constructor() {
  }

  buildOverviewRows(benchmarks: Array<IBenchmark>): Array<IBenchmarkOverviewRow> {
    const result = [];
    this.highestBarAvg = 0;
    for (const bm of benchmarks) {
      const bmRow = {} as IBenchmarkOverviewRow;
      bmRow.id = bm.id;
      bmRow.year = bm.year;
      bmRow.name = bm.name;
      bmRow.tier = bm.tier;
      bmRow.peers = Object.assign([], bm.peers) || [];
      bmRow.rates = Object.assign({}, bm.rates);
      bmRow.highestChildrenRate = 0;
      bmRow.childrenRates = this.formatChildRates(bmRow, bm.rates);
      result.push(bmRow);
      this.calculateAverages(bmRow, bm.rates);
    }
    return result;
  }
  formatChildRates(parent: IBenchmarkOverviewRow, rates: IBenchmarkRate): Array<IBenchmarkOverviewRow> {
    let result = [];
    const associateArray = [];
    const partnerArray = [];
    const keys = Object.keys(rates);
    let highest = 0;
    for (const key of keys) {
      const rate = rates[key];
      if (!rate.client_rate) {
        continue;
      }
      highest = rate.client_rate > rate.street ? rate.client_rate : rate.street;
      if (rate.high > highest) {
        highest = rate.high;
      }
      if (highest > parent.highestChildrenRate) {
        parent.highestChildrenRate = highest;
      }
      const row = {} as IBenchmarkOverviewRow;
      row.name = this.getRateName(key);
      row.tier = parent.tier;
      row.isChild = true;
      row.street = rate.street;
      row.low = rate.low;
      row.high = rate.high;
      row.avg_practice_area_discount = rate.practice_area_discount;
      row.avg_yoy_rate_increase = rate.yoy_rate_increase;
      if (key.indexOf('associate') >= 0) {
        row.avg_partner_rate = 0;
        row.avg_associate_rate = rate.client_rate;
        const medianAssociate = (rate.high + rate.low) / 2 || 1;
        row.associate_delta = 100 - (row.avg_associate_rate * 100 / medianAssociate);
        row.status = this.getRateStatusRate(rate);
        associateArray.push(row);
      }
      if (key.indexOf('partner') >= 0) {
        row.avg_associate_rate = 0;
        row.avg_partner_rate = rate.client_rate;
        const medianPartner = (rate.high + rate.low) / 2 || 1;
        row.partner_delta = 100 - (row.avg_partner_rate * 100 / medianPartner);
        row.status = this.getRateStatusRate(rate);
        partnerArray.push(row);
      }
    }
    result = [...associateArray, ...partnerArray];
    return result;
  }
  calculateAverages(row: IBenchmarkOverviewRow, rates: IBenchmarkRate): void {
    if (!rates) {
      return;
    }
    this.handleMissingRates(row, rates);
    row.avg_associate_rate = (rates.junior_associate.client_rate + rates.mid_associate.client_rate + rates.senior_associate.client_rate) / row.nonEmptyAssociate;
    row.avg_partner_rate = (rates.junior_partner.client_rate + rates.mid_partner.client_rate + rates.senior_partner.client_rate) / row.nonEmptyPartner;
    const highAssociate = (rates.junior_associate.high + rates.mid_associate.high + rates.senior_associate.high) / row.nonEmptyAssociate;
    const lowAssociate = (rates.junior_associate.low + rates.mid_associate.low + rates.senior_associate.low) / row.nonEmptyAssociate;
    const medianAssociate = (lowAssociate + highAssociate ) / 2 || 1;
    row.associate_delta = 100 - (row.avg_associate_rate * 100 / medianAssociate);
    const highPartner = (rates.junior_partner.high + rates.mid_partner.high + rates.senior_partner.high) / row.nonEmptyPartner;
    const lowPartner = (rates.junior_partner.low + rates.mid_partner.low + rates.senior_partner.low) / row.nonEmptyPartner;
    const medianPartner = (lowPartner + highPartner) / 2 || 1;
    row.partner_delta = 100 - (row.avg_partner_rate * 100  / medianPartner);
    row.avg_practice_area_discount = (rates.junior_associate.practice_area_discount + rates.mid_associate.practice_area_discount + rates.senior_associate.practice_area_discount +
      rates.junior_partner.practice_area_discount + rates.mid_partner.practice_area_discount + rates.senior_partner.practice_area_discount) / (row.nonEmptyPartner + row.nonEmptyAssociate);
    row.avg_yoy_rate_increase = (rates.junior_associate.yoy_rate_increase + rates.mid_associate.yoy_rate_increase + rates.senior_associate.yoy_rate_increase +
      rates.junior_partner.yoy_rate_increase + rates.mid_partner.yoy_rate_increase + rates.senior_partner.yoy_rate_increase) / (row.nonEmptyPartner + row.nonEmptyAssociate);
    const associateColor = this.getAvgBarColor('associate', row);
    const partnerColor = this.getAvgBarColor('partner', row);
    if (associateColor === BM_COLORS.Excellent && partnerColor === BM_COLORS.Excellent) {
      row.status = RateStatuses.Excellent;
    } else if (associateColor === BM_COLORS.Poor && partnerColor === BM_COLORS.Poor) {
      row.status = RateStatuses.Poor;
    } else {
      row.status = RateStatuses.Fair;
    }
    const highestRow = row.avg_associate_rate > row.avg_partner_rate ? row.avg_associate_rate : row.avg_partner_rate;
    if (highestRow > this.highestBarAvg) {
      this.highestBarAvg = highestRow;
    }
  }
  cleanUpData(records: Array<IRowBenchmark>): void {
    for (const rec of records) {
      const rates = rec.rates || {};
      const keys = Object.keys(rates);
      for (const key of keys) {
        if (!rates[key].client_rate) {
          rec.rates[key] = this.getEmptyRate();
        }
      }
    }
  }
  handleMissingRates(row: IBenchmarkOverviewRow, rates: IBenchmarkRate): void {
    let missingAssociateRates = 0;
    let missingPartnerRates = 0;
    if (!rates.junior_associate || !rates.junior_associate.client_rate) {
      this.cleanUpRate('junior_associate', rates);
      missingAssociateRates++;
    }
    if (!rates.mid_associate || !rates.mid_associate.client_rate) {
      this.cleanUpRate('mid_associate', rates);
      missingAssociateRates++;
    }
    if (!rates.senior_associate || !rates.senior_associate.client_rate) {
      this.cleanUpRate('senior_associate', rates);
      missingAssociateRates++;
    }
    if (!rates.junior_partner || !rates.junior_partner.client_rate) {
      this.cleanUpRate('junior_partner', rates);
      missingPartnerRates++;
    }
    if (!rates.mid_partner || !rates.mid_partner.client_rate) {
      this.cleanUpRate('mid_partner', rates);
      missingPartnerRates++;
    }
    if (!rates.senior_partner  || !rates.senior_partner.client_rate) {
      this.cleanUpRate('senior_partner', rates);
      missingPartnerRates++;
    }
    row.nonEmptyAssociate = 3 - missingAssociateRates;
    row.nonEmptyPartner = 3 - missingPartnerRates;
  }
  cleanUpRate(propName: string, rates: IBenchmarkRate): void {
    rates[propName] = {} as IBenchmarkMetrics;
    rates[propName].client_rate = 0;
    rates[propName].high = 0;
    rates[propName].low = 0;
    rates[propName].practice_area_discount = 0;
    rates[propName].yoy_rate_increase = 0;
    rates[propName].street = 0;
  }
  getEmptyRate(): IBenchmarkMetrics {
    return { client_rate: 0, high: 0, low: 0,  practice_area_discount: 0, yoy_rate_increase: 0, street: 0 };
  }
  getRateName(key: string): string {
    let result = '';
    switch (key) {
      case 'junior_associate':
        result = 'Jr. Associate';
        break;
      case 'junior_partner':
        result = 'Jr. Partner';
        break;
      case 'mid_associate':
        result = 'Mid-level Associate';
        break;
      case 'mid_partner':
        result = 'Mid-level Partner';
        break;
      case 'senior_associate':
        result = 'Sr. Associate';
        break;
      case 'senior_partner':
        result = 'Sr. Partner';
        break;
      default:
        return  '';
    }
    return result;
  }
  getRateStatusRate(rate: IBenchmarkMetrics): string {
    let result = '-';
    const median = (rate.low + rate.high) / 2;
    if (rate.client_rate > rate.high) {
      result = RateStatuses.Poor;
    } else if (rate.client_rate && rate.client_rate < median) {
      result = RateStatuses.Excellent;
    } else {
      result = RateStatuses.Fair;
    }
    return result;
  }
  getAvgBarColor(bar: string, row: IBenchmarkOverviewRow): string {
    let result = BM_COLORS.Default;
    const rates = row.rates;
    const avgRate = bar === 'associate' ? row.avg_associate_rate : row.avg_partner_rate;
    let highRate = (rates.junior_associate.high + rates.mid_associate.high + rates.senior_associate.high) / row.nonEmptyAssociate;
    let lowRate = (rates.junior_associate.low + rates.mid_associate.low + rates.senior_associate.low) / row.nonEmptyAssociate;
    if (bar === 'partner') {
      highRate = (rates.junior_partner.high + rates.mid_partner.high + rates.senior_partner.high) / row.nonEmptyPartner;
      lowRate = (rates.junior_partner.low + rates.mid_partner.low + rates.senior_partner.low) / row.nonEmptyPartner;
    }
    const medianRate = (lowRate + highRate) / 2 || 1;
    if (avgRate && avgRate < medianRate) {
      result = BM_COLORS.Excellent;
    } else if (avgRate > highRate) {
      result = BM_COLORS.Poor;
    } else {
      result = BM_COLORS.Fair;
    }
    return result;
  }
  getStatusColor(row: IBenchmarkOverviewRow): string {
    let result = '#cccccc;';
    switch (row.status) {
      case 'Poor':
        result = BM_COLORS.Poor;
        break;
      case 'Excellent':
        result = BM_COLORS.Excellent;
        break;
      case 'Fair':
        result = BM_COLORS.Fair;
        break;
      default:
        result = BM_COLORS.Default;
        break;
    }
    return result;
  }
  getYears(benchmarks: Array<IRowBenchmark>): Array<any> {
    const records = Object.assign([], benchmarks);
    const years = [];
    for (const bm of records) {
      const dupe = years.find(r => r.value === bm.year);
      if (!dupe) {
        years.push({ value: bm.year, label: bm.year});
      }
    }
    return years;
  }
}
