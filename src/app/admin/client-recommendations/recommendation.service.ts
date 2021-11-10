import { Injectable } from '@angular/core';
import {HttpService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {SAVINGS_CALCULATOR_CONFIG} from '../../shared/services/config';
import {tkClassifications, IClassification} from '../../savings-calculator/savings-calculator.service';
import { IRecommendation } from './client-recommendations-model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  pendingRequest: Subscription;
  errorMessage: any;

  constructor(private httpService: HttpService) { }

  async getRecommendationTypes(): Promise<any> {
    let apiCall = '';
    if (window.location.toString().includes('admin')) {
      apiCall = 'getRecommendationTypes';
    } else {
      apiCall = 'getRecommendationTypesClient';
    }
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest(apiCall).subscribe(
        (data: any) => {
          const recommendationTypes = [];
          if (data.result) {
            for (const res of data.result) {
              recommendationTypes.push({label: res.name, value: res.id});
            }
          }
          resolve(recommendationTypes);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  async getOrgPracticeAreaSetting(selectedOrgId: number): Promise<string> {
    const params = {id: selectedOrgId};
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getOrgPracticeAreaSetting', params).subscribe(
        (data: any) => {
        let clientPracticeAreaSetting;
        if (data.result) {
          if (data.result.enabled) {
            clientPracticeAreaSetting = data.result.enabled.value;
          } else {
            clientPracticeAreaSetting = 'Client Practice Areas';
          }
        }
        resolve(clientPracticeAreaSetting);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getFirms(selectedClientId): Promise<any>  {
    let apiCall = '';
    if (window.location.toString().includes('admin')) {
      apiCall = 'getFirmsByClient';
    } else {
      apiCall = 'getFirmsListByClient';
    }
    const params = {clientId: selectedClientId};

    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest(apiCall, params).subscribe(
        (data: any) => {
          if (!data.result) {
            return;
          }
          const firmOptions = [];
          for (const firm of data.result) {
            firmOptions.push({label: firm.law_firm_name, value: firm.id});
          }
          resolve(firmOptions);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getReport(selectedReportId): Promise<any> {
    let apiCall = '';
    if (window.location.toString().includes('admin')) {
      apiCall = 'getRecommendationReport';
    } else {
      apiCall = 'getRecommendationReportClient';
    }
    const params = {reportId: selectedReportId};
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest(apiCall, params).subscribe(
        (data: any) => {
          if (!data.result) {
            return;
          }
          const report = data.result;
          resolve(report);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getDiscountData(recommendation: any, selectedClientId: number, paSetting: string): Promise<any> {
    let apiCall = '';
    if (window.location.toString().includes('admin')) {
      apiCall = 'getAdminFirmStats';
    } else {
      apiCall = 'getFirmStatsClient';
    }
    let params;

    params = {
      clientId: selectedClientId,
      clientMatterType: recommendation.practice_area,
      firmId: recommendation.bh_lawfirm_id,
      paType: paSetting
    };

    if (recommendation.id && recommendation.year) {
      params.year = recommendation.year;
    }

    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest(apiCall, params).subscribe(
        (data: any) => {
          let ytdFirmData;
          let mostRecentYear;
          let lastFullYearFirmData;
          if (data.result.ytd && data.result.ytd.length > 0) {
            ytdFirmData = data.result.ytd;
            mostRecentYear = ytdFirmData[0].year;
          } else {
            ytdFirmData = [];
          }

          if (data.result.previous_year && data.result.previous_year.length > 0) {
            lastFullYearFirmData = data.result.previous_year;
            if (mostRecentYear === null || mostRecentYear === undefined) {
              mostRecentYear = lastFullYearFirmData[0].year + 1;
            }
          } else {
            lastFullYearFirmData = [];
          }
          resolve({ytd: ytdFirmData, prior_year: lastFullYearFirmData, most_recent_year: mostRecentYear});
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getBlockBillingData(recommendation: any, selectedClientId: number, paSetting: string): Promise<any> {
    let params;
    let apiCall = '';
    if (window.location.toString().includes('admin')) {
      apiCall = 'getFirmBlockBillingData';
    } else {
      apiCall = 'getFirmBlockBillingDataClient';
    }
    if (recommendation.practice_area !== null) {
      params = {
        clientId: selectedClientId,
        firmId: recommendation.bh_lawfirm_id,
        practiceArea: recommendation.practice_area,
        paType: paSetting
      };
    } else {
      params = {
        clientId: selectedClientId,
        firmId: recommendation.bh_lawfirm_id,
        paType: paSetting
      };
    }
    if (recommendation.id && recommendation.year) {
      params.year = recommendation.year;
    }

    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest(apiCall, params).subscribe(
        (data: any) => {
          let firmBlockBillingData;
          let mostRecentYear;
          if (data.result) {
            firmBlockBillingData = data.result;
            if (firmBlockBillingData.length > 0) {
              mostRecentYear = firmBlockBillingData[0].year;
            }
          }
          resolve(firmBlockBillingData);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getRateIncreaseData(recommendation: any, selectedClientId: number, paSetting: string): Promise<any> {
    const firmParam = [];
    if (recommendation.bh_lawfirm_id) {
      firmParam.push(recommendation.bh_lawfirm_id.toString());
    } else if (recommendation.firm_id) {
      firmParam.push(recommendation.firm_id.toString());
    }
    const paParam = [];
    let apiCall = '';
    if (window.location.toString().includes('admin')) {
      apiCall = 'getFirmRateIncreaseData';
    } else {
      apiCall = 'getFirmRateIncreaseDataClient';
    }
    let params;
    if (recommendation.practice_area === null) {
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam)
      };
    } else if (recommendation.practice_area !== null && paSetting === 'Client Practice Areas') {
      paParam.push(recommendation.practice_area);
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam),
        practiceAreas: JSON.stringify(paParam)
      };
    } else if (recommendation.practice_area !== null && paSetting === 'Smart Practice Areas') {
      paParam.push(recommendation.practice_area);
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam),
        bdPracticeAreas: JSON.stringify(paParam)
      };
    } else if (recommendation.practice_area !== null && paSetting === 'Both') {
      if (recommendation.practice_area.includes('[Smart]')) {
        const formattedPA = recommendation.practice_area.split(' - [Smart]')[0];
        paParam.push(formattedPA);
        params = {
          clientId: selectedClientId,
          firms: JSON.stringify(firmParam),
          bdPracticeAreas: JSON.stringify(paParam)
        };
      } else {
        paParam.push(recommendation.practice_area);
        params = {
          clientId: selectedClientId,
          firms: JSON.stringify(firmParam),
          practiceAreas: JSON.stringify(paParam)
        };
      }
    } else {
      paParam.push(recommendation.practice_area);
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam),
        practiceAreas: JSON.stringify(paParam)
      };
    }

    if (recommendation.id && recommendation.year) {
      params.year = recommendation.year;
    }

    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest(apiCall, params).subscribe(
        (data: any) => {
          let firmRateIncreaseData;
          let rateIncreasePreventionSavings;
          let rateIncreasePreventionDetails;
          if (data.result) {
            firmRateIncreaseData = data.result;
            if (firmRateIncreaseData.length > 0) {
              const mostRecentYear = firmRateIncreaseData[0].year;
              const rateIncreaseData = this.calculateRateIncreaseSavingsForFirm(firmRateIncreaseData, mostRecentYear, recommendation.desired_rate_increase_pct);
              rateIncreasePreventionSavings = rateIncreaseData.savings;
              rateIncreasePreventionDetails = rateIncreaseData.classificationData;
            }
          }
          resolve({data: firmRateIncreaseData, savings: rateIncreasePreventionSavings, details: rateIncreasePreventionDetails});
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getRateIncreaseDataByClient(recommendation: any, selectedClientId: number, paSetting: string): Promise<any> {
    const firmParam = [];
    if (recommendation.bh_lawfirm_id) {
      firmParam.push(recommendation.bh_lawfirm_id.toString());
    }
    if (recommendation.firm_id) {
      firmParam.push(recommendation.firm_id.toString());
    }
    const paParam = [];
    // let apiCall = '';
    // if (window.location.toString().includes('admin')) {
    //   apiCall = 'getFirmRateIncreaseData';
    // } else {
    //   apiCall = 'getFirmRateIncreaseDataClient';
    // }
    let params;
    if (recommendation.practice_area === null) {
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam)
      };
    } else if (recommendation.practice_area !== null && paSetting === 'Client Practice Areas') {
      paParam.push(recommendation.practice_area);
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam),
        practiceAreas: JSON.stringify(paParam)
      };
    } else if (recommendation.practice_area !== null && paSetting === 'Smart Practice Areas') {
      paParam.push(recommendation.practice_area);
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam),
        bdPracticeAreas: JSON.stringify(paParam)
      };
    } else if (recommendation.practice_area !== null && paSetting === 'Both') {
      if (recommendation.practice_area.includes('[Smart]')) {
        const formattedPA = recommendation.practice_area.split(' - [Smart]')[0];
        paParam.push(formattedPA);
        params = {
          clientId: selectedClientId,
          firms: JSON.stringify(firmParam),
          bdPracticeAreas: JSON.stringify(paParam)
        };
      } else {
        paParam.push(recommendation.practice_area);
        params = {
          clientId: selectedClientId,
          firms: JSON.stringify(firmParam),
          practiceAreas: JSON.stringify(paParam)
        };
      }
    } else {
      paParam.push(recommendation.practice_area);
      params = {
        clientId: selectedClientId,
        firms: JSON.stringify(firmParam),
        practiceAreas: JSON.stringify(paParam)
      };
    }

    if (recommendation.id && recommendation.year) {
      params.year = recommendation.year;
    }

    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getClientRateIncreaseData', params).subscribe(
        (data: any) => {
          let firmRateIncreaseData;
          let rateIncreasePreventionSavings;
          let rateIncreasePreventionDetails;
          if (data.result) {
            firmRateIncreaseData = data.result;
            if (firmRateIncreaseData.length > 0) {
              const mostRecentYear = firmRateIncreaseData[0].year;
              const rateIncreaseData = this.calculateRateIncreaseSavingsForFirm(firmRateIncreaseData, mostRecentYear, recommendation.desired_rate_increase_pct);
              rateIncreasePreventionSavings = rateIncreaseData.savings;
              rateIncreasePreventionDetails = rateIncreaseData.classificationData;
            }
          }
          resolve({data: firmRateIncreaseData, savings: rateIncreasePreventionSavings, details: rateIncreasePreventionDetails});
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getStaffingData(recommendation: IRecommendation, selectedClientId: number): Promise<any> {
    let apiCall = '';
    if (window.location.toString().includes('admin')) {
      apiCall = 'getFirmStaffing';
    } else {
      apiCall = 'getFirmStaffingClient';
    }
    let params;
    params = {
      clientId: selectedClientId,
      firmId: recommendation.bh_lawfirm_id
    };

    if (recommendation.id && recommendation.year) {
      params.year = recommendation.year;
    }

    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest(apiCall, params).subscribe(
        (data: any) => {
          let firmStaffingData;
          if (data.result) {
            firmStaffingData = data.result;
          }
          resolve(firmStaffingData);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  async getFirmsByPracticeArea(recommendation: IRecommendation, selectedClientId: number, paSetting: string): Promise<any> {
    const params = {
      clientId: selectedClientId,
      practiceArea: recommendation.practice_area,
      paType: paSetting
    };

    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getFirmsByPracticeAreaClient', params).subscribe(
        (data: any) => {
          const previousFirmsData = [];
          const recommendedFirmsData = [];
          if (data.result) {
            if (data.result.length > 0) {
              for (const firm of data.result) {
                if (firm.blended_rate !== null && firm.blended_rate !== undefined && typeof(firm.blended_rate) !== 'string') {
                  firm.formatted_blended_rate = firm.blended_rate.toFixed(2);
                }
                let formattedTier;
                if (firm.tier) {
                  formattedTier = firm.tier.toString();
                } else {
                  formattedTier = 'N/A';
                }
                if (recommendation.previous_firm_ids.includes(firm.bh_lawfirm_id)) {
                  previousFirmsData.push({tier: formattedTier, blended_rate: firm.formatted_blended_rate, firm: firm.firm_name});
                }
                if (recommendation.recommended_firm_ids.includes(firm.bh_lawfirm_id)) {
                  recommendedFirmsData.push({tier: formattedTier, blended_rate: firm.formatted_blended_rate, firm: firm.firm_name});
                }

              }
            }
          }
          resolve({previous: previousFirmsData, recommended: recommendedFirmsData});
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  calculateIncreaseRateValue(val: number, classifications: any): number {
    let result = 0;
    if (!classifications || classifications.length === 0) {
      return result;
    }
    for (const rec of classifications) {
      result += (rec.avgRateIncrease - val / 100) * rec.totalHours * rec.lastYearRate;
    }
    return result;
  }

  calculateRateIncreaseSavingsForFirm(records: Array<any>, lastYear: number, rateIncreaseLimit: number): any {
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
        tkClassificationsProcessed.push(this.createRateIncreaseClassification(key, yearRecords));
      }
    }
    const processed = tkClassificationsProcessed;
    result = this.calculateIncreaseRateValue(rateIncreaseLimit, processed);

    return {savings: result, classificationData: processed};
  }

  // using same function as in savings calculator service with some slight changes
  createRateIncreaseClassification(name: string, records: Array<any>): any {
    const classification = {} as IClassification;
    classification.title = name;
    const year1 = records[0].rate_increase || [];
    const year2 =  records[1].rate_increase || [];
    const year3 =  records[2].rate_increase || [];
    const year1Rec = year1.find(e => e.bh_classification === name) || {} as any;
    const year2Rec = year2.find(e => e.bh_classification === name) || {} as any;
    const year3Rec = year3.find(e => e.bh_classification === name) || {} as any;
    const divider1 = year2Rec.effective_rate ? year2Rec.effective_rate : 1;
    const year1Increase = ((year1Rec.effective_rate || 0) - (year2Rec.effective_rate || 0)) / divider1;
    const divider2 = year3Rec.effective_rate ? year3Rec.effective_rate : 1;
    const year2Increase = ((year2Rec.effective_rate || 0) - (year3Rec.effective_rate || 0)) / divider2;
    classification.avgRateIncrease = (year1Increase + year2Increase) / 2;

    if (!year2Rec.effective_rate && !year3Rec.effective_rate) {
      classification.avgRateIncrease = 0;
    } else if (!year3Rec.effective_rate) {
      classification.avgRateIncrease = year1Increase;
    } else if (!year2Rec.effective_rate) {
      const div1 = year3Rec.effective_rate ? year3Rec.effective_rate : 1;
      const year1Incr = ((year1Rec.effective_rate || 0) - (year3Rec.effective_rate || 0)) / div1;
      classification.avgRateIncrease = year1Incr;
    }
    classification.totalHours = year1Rec.total_hours ||  0;
    classification.lastYearRate = year1Rec.effective_rate || 0;
    return classification;
  }

  calcDiscountSavings(lastFullYearFirmData: any, recommendation: IRecommendation): any {
    let estimatedSpendWithOldDisc = 0;
    let estimatedSpendWithRecommendedDiscLower = 0;
    let estimatedSpendWithRecommendedDiscUpper = 0;
    let differenceInSpendLower = 0;
    let differenceInSpendUpper = 0;
    if (lastFullYearFirmData.length > 0) {
      estimatedSpendWithOldDisc = (lastFullYearFirmData[0].total_billed * (1 + (recommendation.spend_increase_pct / 100)));
      const differentInDiscountPcsLower = (recommendation.recommended_discount_pct_lower_range - recommendation.current_discount_pct) / 100;
      const differentInDiscountPcsUpper = (recommendation.recommended_discount_pct_upper_range - recommendation.current_discount_pct) / 100;

      estimatedSpendWithRecommendedDiscLower = (lastFullYearFirmData[0].total_billed * (1 + (recommendation.spend_increase_pct / 100) - differentInDiscountPcsLower));
      estimatedSpendWithRecommendedDiscUpper = (lastFullYearFirmData[0].total_billed * (1 + (recommendation.spend_increase_pct / 100) - differentInDiscountPcsUpper));
      differenceInSpendLower = estimatedSpendWithOldDisc - estimatedSpendWithRecommendedDiscLower;
      differenceInSpendUpper = estimatedSpendWithOldDisc - estimatedSpendWithRecommendedDiscUpper;
    }
    return({estimated_spend_with_old_disc: estimatedSpendWithOldDisc,
            estimated_spend_with_rec_disc_lower: estimatedSpendWithRecommendedDiscLower,
            estimated_spend_with_rec_disc_upper: estimatedSpendWithRecommendedDiscUpper,
            diff_in_spend_lower: differenceInSpendLower,
            diff_in_spend_upper: differenceInSpendUpper});
  }

  calcStaffingAllocationSavings(firmStaffingData: any, recommendation: IRecommendation, mostRecentYear: number): any {
    const getStaffingData = firmStaffingData.filter(data => data.year === mostRecentYear - 1);
    let lastFullYearStaffingData;
    let estimatedSpendWithOldStaffing = 0;
    let estimatedSpendWithNewStaffing = 0;
    let differenceInSpend = 0;
    if (getStaffingData.length > 0) {
      lastFullYearStaffingData = getStaffingData[0];
    }
    if (lastFullYearStaffingData) {

      estimatedSpendWithOldStaffing = (lastFullYearStaffingData.total_billed * (1 + (recommendation.spend_increase_pct / 100))) + (lastFullYearStaffingData.total_expenses * (1 + (recommendation.spend_increase_pct / 100)));

      const newPartnerBilled = ((lastFullYearStaffingData.total_hours * (recommendation.desired_partner_pct_of_hours_worked / 100)) * lastFullYearStaffingData.avg_partner_rate);
      const newAssociateBilled = ((lastFullYearStaffingData.total_hours * (recommendation.desired_associate_pct_of_hours_worked / 100)) * lastFullYearStaffingData.avg_associate_rate);
      const newParalegalBilled = ((lastFullYearStaffingData.total_hours * (recommendation.desired_paralegal_pct_of_hours_worked / 100)) * lastFullYearStaffingData.avg_paralegal_rate);

      estimatedSpendWithNewStaffing = newPartnerBilled + newAssociateBilled + newParalegalBilled + lastFullYearStaffingData.total_expenses;
      estimatedSpendWithNewStaffing = (estimatedSpendWithNewStaffing * (1 + (recommendation.spend_increase_pct / 100)));
      differenceInSpend = estimatedSpendWithOldStaffing - estimatedSpendWithNewStaffing;
    }
    return({estimated_spend_with_old_staffing: estimatedSpendWithOldStaffing,
            estimated_spend_with_rec_staffing: estimatedSpendWithNewStaffing,
            diff_in_spend: differenceInSpend});
  }

  calcBlockBillingSavings(firmBlockBillingData: any, recommendation: IRecommendation, mostRecentYear: number): any {
    const getBlockBillingData = firmBlockBillingData.filter(data => data.year === mostRecentYear - 1);
    let lastFullYearBBData;
    let unacceptableBlockBillingAmount = 0;
    let estimatedBlockBillingSavings = 0;
    if (getBlockBillingData.length > 0) {
      lastFullYearBBData = getBlockBillingData[0];
    }
    if (lastFullYearBBData) {
      const blockBillingPctDiff = (lastFullYearBBData.bb_percent - recommendation.desired_block_billing_pct) / 100;
      unacceptableBlockBillingAmount = lastFullYearBBData.total_attorney_billed * blockBillingPctDiff;
      estimatedBlockBillingSavings = unacceptableBlockBillingAmount * .2;
    }
    return({unacceptable_bb_amount: unacceptableBlockBillingAmount,
            estimated_bb_savings: estimatedBlockBillingSavings});
  }

  roundNumber(unroundedNumber: number): number {
    if (unroundedNumber !== null && unroundedNumber !== undefined) {
      if (unroundedNumber < 10000) {
        unroundedNumber = Math.ceil(unroundedNumber / 1000) * 1000;
      } else if (unroundedNumber >= 10000) {
        unroundedNumber = Math.ceil(unroundedNumber / 10000) * 10000;
      }
    } else {
      unroundedNumber = 0;
    }

    return unroundedNumber;
  }
}
