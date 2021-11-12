import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import {IPayloadDates, IQbrMetric, IQbrReport, IPayloadQuarterDates, QbrType, recommendationPlaceholderMapping, moneyFormatter} from './qbr-model';
import {CommonService} from '../shared/services/common.service';
import { Subscription } from 'rxjs';
import {HttpService, UtilService} from 'bodhala-ui-common';
import { DatePipe } from '@angular/common';
import { RecommendationService } from 'src/app/admin/client-recommendations/recommendation.service';



const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class QbrService {
  pendingRequest: Subscription;
  firstReport: boolean;
  yoyStartDate: any;

  constructor(public commonService: CommonService,
              public utilService: UtilService,
              private httpService: HttpService,
              private recommendationService: RecommendationService) { }

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
  getVolumeMetric(currentMetric: any, compareMetric: any, comparePAMetric: any,  includeExpenses: boolean): IQbrMetric {
    const result = Object.assign({}, this.generateEmptyMetric());
    result.label = 'PA Volume';
    if (!currentMetric) {
      return result;
    }
    const currentMatterTotal = includeExpenses ? currentMetric.total_billed + currentMetric.total_expenses : currentMetric.total_billed;
    const compareMatterTotal = includeExpenses ? compareMetric.total_billed + compareMetric.total_expenses  : compareMetric.total_billed;
    const currentPATotal = includeExpenses ? currentMetric.pa_total_billed + currentMetric.pa_expenses : currentMetric.pa_total_billed;
    const comparePATotal = includeExpenses ? comparePAMetric.total_billed + comparePAMetric.total_expenses  : comparePAMetric.total_billed;
    const currentTotal = ((currentMatterTotal / currentPATotal)) * 100;
    const compareTotal = ((compareMatterTotal / comparePATotal)) * 100;
    result.amount = currentTotal;
    if (compareTotal) {
      const increase = ((currentTotal / compareTotal) - 1) * 100;
      // const increase = ((compareTotal / currentTotal)) * 100;
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
    if (!hoursCurrent) {
      return result;
    }
    result.amount  = Math.round(hoursCurrent || 0);
    if (hoursCurrent && hoursCompare) {
      const increase = ((hoursCurrent / hoursCompare) - 1) * 100;
      this.formatYoYorQoQMetrics(result, increase);
    }
    return result;
  }
  mapProperties(source: any, propPrefix, isMatter = false): any {
    const metric = {} as any;
    if (!isMatter) {
      metric.firm_name =  source[propPrefix + 'name'];
      metric.firm_id =  source[propPrefix + 'id'];
    } else {
      metric.matter_name =  source[propPrefix + 'name'];
      metric.matter_id =  source[propPrefix + 'id'];
    }
    metric.total_billed = source[propPrefix + 'total'];
    metric.total_block_billed = source[propPrefix + 'total_block_billed'];
    metric.total_expenses = source[propPrefix + 'expenses'];
    metric.total_hours = source[propPrefix + 'hours'];
    metric.total_partner_hours = source[propPrefix + 'partner_hours'];
    metric.total_partner_billed = source[propPrefix + 'partner_billed'];
    metric.total_associate_hours = source[propPrefix + 'associate_hours'];
    metric.total_associate_billed = source[propPrefix + 'associate_billed'];
    metric.total_paralegal_hours = source[propPrefix + 'paralegal_hours'];
    metric.blended_rate = source[propPrefix + 'blended_rate'];
    metric.block_billed_pct = source[propPrefix + 'block_billed_pct'];
    metric.avg_partner_rate = source[propPrefix + 'avg_partner_rate'];
    metric.avg_associate_rate = source[propPrefix + 'avg_associate_rate'];
    metric.bpi = source[propPrefix + 'bpi'];
    metric.pa_total_billed = source.total_billed;
    metric.pa_expenses = source.total_expenses;
    return metric;
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
  formatQbrType(type: string): string {
    let result = '';
    switch (type) {
      case QbrType.YoY:
        result = 'Annual QBR';
        break;
      case QbrType.QoQAdjacent:
        result = 'Quarterly Adjacent QBR';
        break;
      case QbrType.QoQAnnual:
        result = 'Quarterly Annual QBR';
        break;
      default:
        result = 'Annual QBR';
        break;
    }
    return result;
  }

  getQBRRecommendations(reportID: number): Promise<any> {
    const payload = {
      qbrID: reportID
    };
    return new Promise((resolve, reject) => {
      return this.pendingRequest = this.httpService.makeGetRequest('getQBRRecommendations', payload).subscribe(
        (data: any) => {
          console.log("rec data: ", data);
          let recResult;
          if (data.result) {
            recResult = data.result;
            if (data.generic === true) {
              recResult = this.processGenericRecommendations(recResult);
            } else {
              recResult = this.processSavedRecommendations(recResult);
            }
          } else {
            recResult = [];
          }

          resolve({recommendations: recResult});
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  processGenericRecommendations(recommendations: Array<any>): Array<any> {
    for (const rec of recommendations) {
      rec.included = false;
      rec.practice_area = null;
      rec.firm_id = null;
      rec.type = rec.title;
      rec.sort_order = rec.id;
      rec.recommendation_type_id = rec.id;
      rec.id = null;
      rec.opp_edited = false;
      rec.metrics_edited = false;
    }
    return recommendations;
  }

  processSavedRecommendations(recommendations: Array<any>): Array<any> {
    let i = 0;
    for (const rec of recommendations) {
      if (rec.section === 'Insights') {
        rec.notable_metrics = rec.recommendation;
      } else if (rec.section === 'Next Steps') {
        rec.action = rec.recommendation;
      }
      rec.sort_order = i;
      i++;
      console.log("rec: ", rec);
    }
    return recommendations;
  }

  saveRecommendation(rec): Promise<any> {
    const payload = {
      insight: rec
    };
    console.log("payload: ", payload);
    return new Promise((resolve, reject) => {
      return this.pendingRequest = this.httpService.makePostRequest('saveQBRRecommendation', payload).subscribe(
        (data: any) => {
          let recResult;
          if (data.result) {
            recResult = data.result;
          }

          resolve(recResult);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  saveNextStep(nextStep): Promise<any> {
    const payload = {
      rec: nextStep
    };
    console.log("payload: ", payload);
    return new Promise((resolve, reject) => {
      return this.pendingRequest = this.httpService.makePostRequest('saveQBRNextStep', payload).subscribe(
        (data: any) => {
          let recResult;
          if (data.result) {
            recResult = data.result;
          }

          resolve(recResult);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getClientQBRs(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.pendingRequest = this.httpService.makeGetRequest('getClientQBRs').subscribe(
        (data: any) => {
          const pipe = new DatePipe('en-US');
          let clientQBRs;
          let first;
          let startDate;
          clientQBRs = data.result || [];
          clientQBRs = clientQBRs.sort(this.utilService.dynamicSort('-created_on'));
          if (clientQBRs.length === 0) {
            first = true;
          } else {
            first = false;
            // const yoyReport = clientQBRs.filter(qbr => qbr.report_type === 'YoY');
            const sorted = clientQBRs.sort((a, b) => a.id - b.id);

            if (sorted.length > 0) {
              startDate = sorted[0].start_date;
            }
            for (const report of clientQBRs) {
              report.created_on = pipe.transform(report.created_on, 'shortDate');
            }
          }
          resolve({reports: clientQBRs, firstReport: first, firstStartDate: startDate});
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getClientQBR(reportId: number): Promise<any> {
    const params = {
      report: reportId
    };
    return new Promise((resolve, reject) => {
      return this.pendingRequest = this.httpService.makeGetRequest('getClientQBR', params).subscribe(
        (data: any) => {
          let clientQBR;
          clientQBR = data.result || [];

          resolve(clientQBR);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  saveMetrics(report, metricsForm): Promise<any> {
    const chosenMetrics = {
      partner_hourly_cost: false,
      associate_hourly_cost: false,
      total_spend: false,
      partner_hours_percent: false,
      associate_hours_percent: false,
      block_billing_percent: false,
      blended_rate: false,
      bodhala_price_index: false
    };
    for (const control in metricsForm.controls) {
      if (metricsForm.controls.hasOwnProperty(control)) {
        chosenMetrics[control] = metricsForm.controls[control].value;
      }
    }

    const payload = {
      qbr_id: report.id,
      metrics: chosenMetrics
    };
    return new Promise((resolve, reject) => {
      return this.pendingRequest = this.httpService.makePostRequest('saveQBRMetrics', payload).subscribe(
        (data: any) => {
          let metricsResult;
          if (data.result) {
            metricsResult = data.result;
          }

          resolve(metricsResult);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  deleteQBRRecommendation(rec): Promise<any> {
    const payload = {
      recommendation: rec
    };
    return new Promise((resolve, reject) => {
      return this.pendingRequest = this.httpService.makePostRequest('deleteQBRRecommendation', payload).subscribe(
        (data: any) => {
          // let metricsResult;
          // if (data.result) {
          //   metricsResult = data.result;
          // }

          resolve(data.result);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  calculateDiscountSavings(rec: any, data: any, expenses: boolean, overallNumbers: boolean): any {
    console.log("calculateDiscountSavings REC: ", rec)
    console.log("calculateDiscountSavings DATA: ", rec)
    console.log("calculateDiscountSavings other: ", expenses, overallNumbers)
    let estimatedSavings = 0;
    let estimatedSpendWithOldDisc = 0;
    let estimatedSpendWithRecommendedDisc = 0;
    if (overallNumbers) {
      if (expenses) {
        estimatedSpendWithOldDisc = (data.total_spend_including_expenses.total * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithOldDisc = estimatedSpendWithOldDisc * ((1 - rec.current_discount_pct) / 100);
        estimatedSpendWithRecommendedDisc = (data.total_spend_including_expenses.total * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithRecommendedDisc = estimatedSpendWithRecommendedDisc * ((1 - rec.recommended_discount_pct_lower_range) / 100);
        estimatedSavings = estimatedSpendWithOldDisc - estimatedSpendWithRecommendedDisc;
      } else {
        estimatedSpendWithOldDisc = (data.total_spend.total * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithOldDisc = estimatedSpendWithOldDisc * ((1 - rec.current_discount_pct) / 100);
        estimatedSpendWithRecommendedDisc = (data.total_spend.total * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithRecommendedDisc = estimatedSpendWithRecommendedDisc * ((1 - rec.recommended_discount_pct_lower_range) / 100);
        estimatedSavings = estimatedSpendWithOldDisc - estimatedSpendWithRecommendedDisc;
      }
    } else {
      if (expenses) {
        estimatedSpendWithOldDisc = ((data.total_billed + data.total_expenses) * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithOldDisc = estimatedSpendWithOldDisc * ((1 - rec.current_discount_pct) / 100);
        estimatedSpendWithRecommendedDisc = ((data.total_billed + data.total_expenses) * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithRecommendedDisc = estimatedSpendWithRecommendedDisc * ((1 - rec.recommended_discount_pct_lower_range) / 100);
        estimatedSavings = estimatedSpendWithOldDisc - estimatedSpendWithRecommendedDisc;
      } else {
        estimatedSpendWithOldDisc = (data.total_billed * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithOldDisc = estimatedSpendWithOldDisc * ((1 - rec.current_discount_pct) / 100);
        estimatedSpendWithRecommendedDisc = (data.total_billed * (1 + (rec.spend_increase_pct / 100)));
        estimatedSpendWithRecommendedDisc = estimatedSpendWithRecommendedDisc * ((1 - rec.recommended_discount_pct_lower_range) / 100);
        estimatedSavings = estimatedSpendWithOldDisc - estimatedSpendWithRecommendedDisc;
      }
    }
    console.log("calculateDiscountSavings estimatedSavings: ", estimatedSavings)
    rec.potential_savings = estimatedSavings;
    rec.savingsData = data;
    rec.expenses = expenses;
    rec.overallNumbers = overallNumbers;
    rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);
    return rec;
  }

  calculateBlockBillingSavings(rec: any, data: any): any {
    console.log("calculateBlockBillingSavings rec: ", rec);
    console.log("calculateBlockBillingSavings data: ", data);
    let estimatedSavings = 0;
    let unacceptableBlockBillingAmount = 0;
    const blockBillingPctDiff = (data.percent_block_billed - rec.desired_block_billing_pct) / 100;
    unacceptableBlockBillingAmount = (data.total_partner_billed + data.total_associate_billed) * blockBillingPctDiff;
    console.log("blockBillingPctDiff: ", blockBillingPctDiff)
    console.log("unacceptableBlockBillingAmount: ", unacceptableBlockBillingAmount)
    estimatedSavings = unacceptableBlockBillingAmount * .2;
    rec.potential_savings = estimatedSavings;
    rec.savingsData = data;
    rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);
    return rec;
  }

  calculateStaffingAllocationSavings(rec: any, data: any, expenses: boolean, overallNumbers: boolean): any {
    let estimatedSavings = 0;
    let estimatedSpendWithOldStaffing = 0;
    let estimatedSpendWithNewStaffing = 0;
    let newPartnerBilled = 0;
    let newAssociateBilled = 0;
    let newParalegalBilled = 0;
    console.log("calculateStaffingAllocationSavings REC: ", rec);
    console.log("calculateStaffingAllocationSavings data: ", data);
    console.log("calculateStaffingAllocationSavings otjers: ", expenses, overallNumbers);

    if (overallNumbers) {
      if (expenses) {
        estimatedSpendWithOldStaffing = (data.total_spend_including_expenses.total * (1 + (rec.spend_increase_pct / 100)));

        if (data.avg_partner_rate !== null && data.avg_partner_rate !== undefined) {
          newPartnerBilled = ((data.total_hours * (rec.desired_partner_pct_of_hours_worked / 100)) * data.avg_partner_rate);
        }
        if (data.avg_associate_rate !== null && data.avg_associate_rate !== undefined) {
          newAssociateBilled = ((data.total_hours * (rec.desired_associate_pct_of_hours_worked / 100)) * data.avg_associate_rate);
        }
        if (data.avg_paralegal_rate !== null && data.avg_paralegal_rate !== undefined) {
          newParalegalBilled = ((data.total_hours * (rec.desired_paralegal_pct_of_hours_worked / 100)) * data.avg_paralegal_rate);
        }

        estimatedSpendWithNewStaffing = newPartnerBilled + newAssociateBilled + newParalegalBilled + data.total_spend_including_expenses.total_expenses;
        estimatedSpendWithNewStaffing = (estimatedSpendWithNewStaffing * (1 + (rec.spend_increase_pct / 100)));
        estimatedSavings = estimatedSpendWithOldStaffing - estimatedSpendWithNewStaffing;

      } else {
        estimatedSpendWithOldStaffing = (data.total_spend.total * (1 + (rec.spend_increase_pct / 100)));

        if (data.avg_partner_rate !== null && data.avg_partner_rate !== undefined) {
          newPartnerBilled = ((data.total_hours * (rec.desired_partner_pct_of_hours_worked / 100)) * data.avg_partner_rate);

        }
        if (data.avg_associate_rate !== null && data.avg_associate_rate !== undefined) {
          newAssociateBilled = ((data.total_hours * (rec.desired_associate_pct_of_hours_worked / 100)) * data.avg_associate_rate);
        }
        if (data.avg_paralegal_legal_assistant_rate !== null && data.avg_paralegal_legal_assistant_rate !== undefined) {
          newParalegalBilled = ((data.total_hours * (rec.desired_paralegal_pct_of_hours_worked / 100)) * data.avg_paralegal_legal_assistant_rate);
        }
        console.log("newPartnerBilled: ", newPartnerBilled, data.avg_partner_rate)
        console.log("newAssociateBilled: ", newAssociateBilled, data.avg_associate_rate)
        console.log("newParalegalBilled: ", newParalegalBilled, data.avg_paralegal_legal_assistant_rate)
        estimatedSpendWithNewStaffing = newPartnerBilled + newAssociateBilled + newParalegalBilled;
        estimatedSpendWithNewStaffing = (estimatedSpendWithNewStaffing * (1 + (rec.spend_increase_pct / 100)));
        estimatedSavings = estimatedSpendWithOldStaffing - estimatedSpendWithNewStaffing;
      }
    } else {
      if (expenses) {
        estimatedSpendWithOldStaffing = ((data.total_billed + data.total_expenses) * (1 + (rec.spend_increase_pct / 100)));

        if (data.avg_partner_rate !== null && data.avg_partner_rate !== undefined) {
          newPartnerBilled = ((data.total_hours * (rec.desired_partner_pct_of_hours_worked / 100)) * data.avg_partner_rate);
        }
        if (data.avg_associate_rate !== null && data.avg_associate_rate !== undefined) {
          newAssociateBilled = ((data.total_hours * (rec.desired_associate_pct_of_hours_worked / 100)) * data.avg_associate_rate);
        }
        if (data.avg_paralegal_rate !== null && data.avg_paralegal_rate !== undefined) {
          newParalegalBilled = ((data.total_hours * (rec.desired_paralegal_pct_of_hours_worked / 100)) * data.avg_paralegal_rate);
        }

        estimatedSpendWithNewStaffing = newPartnerBilled + newAssociateBilled + newParalegalBilled + data.expenses;
        estimatedSpendWithNewStaffing = (estimatedSpendWithNewStaffing * (1 + (rec.spend_increase_pct / 100)));
        estimatedSavings = estimatedSpendWithOldStaffing - estimatedSpendWithNewStaffing;

      } else {
        estimatedSpendWithOldStaffing = (data.total_billed * (1 + (rec.spend_increase_pct / 100)));
        if (data.avg_partner_rate !== null && data.avg_partner_rate !== undefined) {
          newPartnerBilled = ((data.total_hours * (rec.desired_partner_pct_of_hours_worked / 100)) * data.avg_partner_rate);
        }
        if (data.avg_associate_rate !== null && data.avg_associate_rate !== undefined) {
          newAssociateBilled = ((data.total_hours * (rec.desired_associate_pct_of_hours_worked / 100)) * data.avg_associate_rate);
        }
        if (data.avg_paralegal_rate !== null && data.avg_paralegal_rate !== undefined) {
          newParalegalBilled = ((data.total_hours * (rec.desired_paralegal_pct_of_hours_worked / 100)) * data.avg_paralegal_rate);
        }
        estimatedSpendWithNewStaffing = newPartnerBilled + newAssociateBilled + newParalegalBilled;
        estimatedSpendWithNewStaffing = (estimatedSpendWithNewStaffing * (1 + (rec.spend_increase_pct / 100)));
        estimatedSavings = estimatedSpendWithOldStaffing - estimatedSpendWithNewStaffing;
      }

    }
    rec.potential_savings = estimatedSavings;
    rec.savingsData = data;
    rec.expenses = expenses;
    rec.overallNumbers = overallNumbers;
    rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);
    return rec;
  }

  calculateShiftFirmsSavings(rec: any, topFirmData: any, secondFirmData: any): number {
    let estimatedSavings = 0;
    let topFirmEstimatedSpend = 0;
    let secondFirmEstimatedSpend = 0;
    console.log("topFirmData: ", topFirmData)
    console.log("secondFirmData: ", secondFirmData)
    if (topFirmData.avg_blended_rate && secondFirmData.avg_blended_rate) {
      topFirmEstimatedSpend = topFirmData.total_hours * topFirmData.avg_blended_rate;
      secondFirmEstimatedSpend = topFirmData.total_hours * secondFirmData.avg_blended_rate;
      estimatedSavings = topFirmEstimatedSpend - secondFirmEstimatedSpend;
      console.log("topFirmEstimatedSpend: ", topFirmEstimatedSpend)
      console.log("secondFirmEstimatedSpend: ", secondFirmEstimatedSpend)
      console.log("estimatedSavings: ", estimatedSavings)
    }
    rec.potential_savings = estimatedSavings;
    rec.topFirmData = topFirmData;
    rec.secondFirmData = secondFirmData;
    rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);

    return rec;
  }



}
