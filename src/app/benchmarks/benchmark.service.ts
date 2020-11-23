import {Injectable} from '@angular/core';
import {IBenchmark, IBenchmarkMetrics, IBenchmarkOverviewRow, IBenchmarkRate, IRowBenchmark, RateStatuses} from './model';
import {of, throwError} from 'rxjs';
import {TOP_MATTERS} from '../shared/unit-tests/mock-data/top-matters';
import {TOP_FIRMS} from '../shared/unit-tests/mock-data/top-firms';
import {IBenchmarkSetupFormatted, IBMPracticeArea, ICollectionRates} from '../benchmarking-setup/benchmarking-setup-model';

export enum BM_COLORS {
  Poor = '#FE3F56',
  Fair = '#FFC327',
  Excellent = '#3EDB73',
  Default = '#E9F1F4'
}
export const TK_LEVELS_MAP = {
  'Associate - 1st Year': 'junior_associate',
  'Associate - 2nd Year': 'junior_associate',
  'Associate - 3rd Year': 'junior_associate',
  'Associate - 4th Year': 'mid_associate',
  'Associate - 5th Year': 'mid_associate',
  'Associate - 6th Year': 'mid_associate',
  'Associate - 7th Year': 'senior_associate',
  'Associate - 8th Year': 'senior_associate',
  'Associate - 9th Year': 'senior_associate',
  'Associate - 10+ Year': 'senior_associate',
  'Partner Tier 1': 'junior_partner',
  'Partner Tier 2': 'junior_partner',
  'Partner Tier 3': 'junior_partner',
  'Partner Tier 4': 'junior_partner',
  'Partner Tier 5': 'junior_partner',
  'Partner Tier 6': 'junior_partner',
  'Partner Tier 7': 'mid_partner',
  'Partner Tier 8': 'mid_partner',
  'Partner Tier 9': 'mid_partner',
  'Partner Tier 10': 'mid_partner',
  'Partner Tier 11': 'mid_partner',
  'Partner Tier 12': 'mid_partner',
  'Partner Tier 13': 'senior_partner',
  'Partner Tier 14': 'senior_partner',
  'Partner Tier 15': 'senior_partner',
  'Partner Tier 16': 'senior_partner',
  'Partner Tier 17': 'senior_partner',
  'Partner Tier 18': 'senior_partner',
  'Partner Tier 19': 'senior_partner',
  'Partner Tier 20': 'senior_partner'
};
export const RATE_TABLE_HEADERS = ['', 'Client Rate', 'Low', 'High', 'Street', 'Practice Area Discount %', 'Y.O.Y. Price Increase %'];
@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {
  highestBarAvg: number;
  showChart: boolean = true;

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
      bmRow.peers.push('And Others');
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
    this.processAssociate(row, rates);
    this.processPartner(row, rates);
    row.avg_practice_area_discount = (rates.junior_associate.practice_area_discount + rates.mid_associate.practice_area_discount + rates.senior_associate.practice_area_discount +
      rates.junior_partner.practice_area_discount + rates.mid_partner.practice_area_discount + rates.senior_partner.practice_area_discount) / (row.nonEmptyPartner + row.nonEmptyAssociate);
    row.avg_yoy_rate_increase = (rates.junior_associate.yoy_rate_increase + rates.mid_associate.yoy_rate_increase + rates.senior_associate.yoy_rate_increase +
      rates.junior_partner.yoy_rate_increase + rates.mid_partner.yoy_rate_increase + rates.senior_partner.yoy_rate_increase) / (row.nonEmptyPartner + row.nonEmptyAssociate);
    const associateColor = this.getAvgBarColor('associate', row);
    const partnerColor = this.getAvgBarColor('partner', row);
    if (partnerColor === BM_COLORS.Default) {
      row.status = this.mapColorToStatus(associateColor);
    } else if (associateColor === BM_COLORS.Default) {
      row.status = this.mapColorToStatus(partnerColor);
    } else if (associateColor === BM_COLORS.Excellent && partnerColor === BM_COLORS.Excellent) {
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

  processAssociate(row: IBenchmarkOverviewRow, rates: IBenchmarkRate): void {
    if (row.nonEmptyAssociate === 0) {
      row.avg_associate_rate = 0;
      row.associate_delta = 0;
      return;
    }
    row.avg_associate_rate = (rates.junior_associate.client_rate + rates.mid_associate.client_rate + rates.senior_associate.client_rate) / row.nonEmptyAssociate;
    const highAssociate = (rates.junior_associate.high + rates.mid_associate.high + rates.senior_associate.high) / row.nonEmptyAssociate;
    const lowAssociate = (rates.junior_associate.low + rates.mid_associate.low + rates.senior_associate.low) / row.nonEmptyAssociate;
    const medianAssociate = (lowAssociate + highAssociate) / 2 || 1;
    row.associate_delta = 100 - (row.avg_associate_rate * 100 / medianAssociate);
  }

  processPartner(row: IBenchmarkOverviewRow, rates: IBenchmarkRate): void {
    if (row.nonEmptyPartner === 0) {
      row.avg_partner_rate = 0;
      row.partner_delta = 0;
      return;
    }
    row.avg_partner_rate = (rates.junior_partner.client_rate + rates.mid_partner.client_rate + rates.senior_partner.client_rate) / row.nonEmptyPartner;
    const highPartner = (rates.junior_partner.high + rates.mid_partner.high + rates.senior_partner.high) / row.nonEmptyPartner;
    const lowPartner = (rates.junior_partner.low + rates.mid_partner.low + rates.senior_partner.low) / row.nonEmptyPartner;
    const medianPartner = (lowPartner + highPartner) / 2 || 1;
    row.partner_delta = 100 - (row.avg_partner_rate * 100 / medianPartner);
  }

  cleanUpData(records: Array<IRowBenchmark>): Array<IRowBenchmark> {
    const result = [];
    for (const rec of records) {
      let emptyCount = 0;
      const rates = rec.rates || {};
      const keys = Object.keys(rates);
      for (const key of keys) {
        if (!rates[key].client_rate) {
          rec.rates[key] = this.getEmptyRate();
          emptyCount++;
        }
      }
      if (emptyCount < 6) {
        result.push(rec);
      }
    }
    return result;
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
    if (!rates.senior_partner || !rates.senior_partner.client_rate) {
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
    return {client_rate: 0, high: 0, low: 0, practice_area_discount: 0, yoy_rate_increase: 0, street: 0};
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
        return '';
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
    if (avgRate === 0) {
      return result;
    }
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
      case 'Good':
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
        years.push({value: bm.year, label: bm.year});
      }
    }
    return years;
  }

  mapColorToStatus(color: string): RateStatuses {
    let result = RateStatuses.Fair;
    switch (color) {
      case BM_COLORS.Excellent:
        result = RateStatuses.Excellent;
        break;
      case BM_COLORS.Poor:
        result = RateStatuses.Poor;
        break;
      default:
        result = RateStatuses.Fair;
        break;
    }
    return result;
  }
  formatBenchmarksForSetup(benchmarks: Array<IRowBenchmark>, year: string): Array<IBenchmarkSetupFormatted> {
    const result = [];
    const selected = benchmarks.filter(e => e.year.toString() === year);
    for (const bm of selected) {
      const found = result.find(f => f.firmId === bm.firm_id);
      if (!found) {
        const newRow = {id: bm.id, firmId: bm.firm_id, firm_name: bm.firm_name, practice_areas: [bm.name]};
        result.push(newRow);
      } else {
        found.practice_areas.push(bm.name);
      }

    }
    return result;
  }

  createBenchmarkMetrics(): IBenchmarkMetrics {
    return {client_rate: null, high: null, low: null, practice_area_discount: null, street: null, yoy_rate_increase: null};
  }
  mapTier(groupId: number): string {
    let result = '';
    switch (groupId) {
      case 1:
        result = '$$$$';
        break;
      case 2:
        result = '$$$';
        break;
      case 3:
        result = '$$';
        break;
      case 4:
        result = '$';
        break;
      default:
        result = '';
        break;
    }
    return result;
  }

  createBenchmarkRates(pa: IBMPracticeArea): IBenchmarkRate {
    const rate = {
      junior_associate: this.createBenchmarkMetrics(),
      mid_associate: this.createBenchmarkMetrics(),
      senior_associate: this.createBenchmarkMetrics(),
      junior_partner: this.createBenchmarkMetrics(),
      mid_partner: this.createBenchmarkMetrics(),
      senior_partner: this.createBenchmarkMetrics()
    };
    for (const k in rate) {
      if (pa.rates[k]) {
        const current = pa.rates[k];
        const count = current.count || 1;
        const streetCount = current.streetSum ? current.streetCount : current.count || 1;
        const streetRate = current.streetSum ? current.streetSum : current.sumBase;
        rate[k].client_rate = Math.round(current.sum / count);
        rate[k].street = Math.round(streetRate / streetCount);
        let temp = rate[k].street / 100 * (100 - pa.high);
        rate[k].high =  Math.round(temp);
        temp = rate[k].street / 100 * (100 - pa.low);
        rate[k].low =  Math.round(temp);
        rate[k].practice_area_discount = current.practice_area_discount;
      }
    }
    return rate;
  }
  processCollectionRates(rates: Array<ICollectionRates>, streetRates: Array<ICollectionRates>): any {
    const formatted = {
      junior_associate: {sumBase: 0, sum: 0, count: 0, streetSum: 0, streetCount: 0, practice_area_discount: 0},
      mid_associate: {sumBase: 0, sum: 0, count: 0, streetSum: 0, streetCount: 0, practice_area_discount: 0},
      senior_associate: {sumBase: 0, sum: 0, count: 0, streetSum: 0, streetCount: 0, practice_area_discount: 0},
      junior_partner: {sumBase: 0, sum: 0, count: 0, streetSum: 0, streetCount: 0, practice_area_discount: 0},
      mid_partner: {sumBase: 0, sum: 0, count: 0, streetSum: 0, streetCount: 0, practice_area_discount: 0},
      senior_partner: {sumBase: 0, sum: 0, count: 0, streetSum: 0, streetCount: 0, practice_area_discount: 0},
    };
    for (const rate of rates) {
      if (!rate.current_standard_rate || !TK_LEVELS_MAP[rate.bh_classification_detail]) {
        continue;
      }
      const calcBaseRate = rate.current_standard_rate || 0;
      const discPercent = rate.practice_area_discount_pct || 0;
      const calcRate = rate.current_standard_rate / 100 * (100 - discPercent);
      formatted[TK_LEVELS_MAP[rate.bh_classification_detail]].sumBase += calcBaseRate;
      formatted[TK_LEVELS_MAP[rate.bh_classification_detail]].sum += calcRate;
      formatted[TK_LEVELS_MAP[rate.bh_classification_detail]].count ++;
      formatted[TK_LEVELS_MAP[rate.bh_classification_detail]].practice_area_discount = rate.practice_area_discount_pct;
    }
    for (const rate of streetRates) {
      if (!rate.current_standard_rate || !TK_LEVELS_MAP[rate.bh_classification_detail]) {
        continue;
      }
      const calcBaseRate = rate.current_standard_rate || 0;
      formatted[TK_LEVELS_MAP[rate.bh_classification_detail]].streetSum += calcBaseRate;
      formatted[TK_LEVELS_MAP[rate.bh_classification_detail]].streetCount ++;
    }
    return formatted;
  }
  formatPeers(streetRates: Array<ICollectionRates>, firmName: string): Array<string> {
    const result = [];
    for (const rate of streetRates) {
      if (result.indexOf(rate.firm_name) < 0 && rate.firm_name !== firmName) {
        result.push(rate.firm_name);
      }
    }
    return result;
  }
}
