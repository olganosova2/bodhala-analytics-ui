import { Injectable } from '@angular/core';
import {HttpService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {tkClassifications, IClassification} from '../savings-calculator/savings-calculator.service';
import { IRateBenchmark } from './rates-analysis.model';


@Injectable({
  providedIn: 'root'
})
export class RatesAnalysisService {
  pendingRequest: Subscription;
  errorMessage: any;

  constructor(private httpService: HttpService) { }

  getBenchmark(bmId: number): Promise<any> {
    const params = {benchmarkId: bmId};
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getRateBenchmark', params).subscribe(
        (data: any) => {
          if (!data.result) {
            return;
          }
          const bm = data.result;
          resolve({benchmark: bm, firm_name: data.firm_name, peer_firms: data.peer_firms, num_tiers: data.num_tiers});
        },
        err => {
          return {error: err};
        }
      );
    });
  }


  getRateAnalysisData(bm: any): Promise<any> {
    const firmParam = [];
    const paParam = [];
    paParam.push(bm.smart_practice_area);
    firmParam.push(bm.bh_lawfirm_id.toString());
    let getDataByCluster = true;
    if (bm.market_avg_firms !== null) {
      getDataByCluster = false;
    }
    const params = {
      firmId: bm.bh_lawfirm_id,
      smartPA: bm.smart_practice_area,
      marketAverageYear: bm.year,
      firms: JSON.stringify(firmParam),
      bdPracticeAreas: JSON.stringify(paParam),
      getByCluster: getDataByCluster,
      market_firms: bm.market_avg_firms
    };
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getFirmRateAnalysisIncreaseData', params).subscribe(
        (data: any) => {
          if (!data.result) {
            resolve(data);
          }
          resolve(data);
        },
        err => {
          return {error: err};
        }
      );
    });
  }

  getBenchmarkInsight(benchmark: any): Promise<any> {
    const params = {
      firm: benchmark.bh_lawfirm_id,
      pa: benchmark.smart_practice_area,
      yyyy: benchmark.year
    };
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getBenchmarkInsight', params).subscribe(
        (data: any) => {
          if (!data.result) {
            resolve(data);
          }
          resolve(data);
        },
        err => {
          return {error: err};
        }
      );
    });
  }



  calculateRateIncreasePctClassification(classificationRateIncreaseData: Array<any>, clientMaxYear: number, firmData: boolean, validRange: boolean, bmYear: number): any {
    const result = 0;
    const distinctYears = [];
    const yearRecords = [];
    const classificationRecords = [];
    let assocPctBilled = 0;
    let partnerPctBilled = 0;
    let yoyRateIncrease = 0;
    let totalSpend = 0;
    for (let ix = 0; ix < 2; ix++) {
      distinctYears.push(clientMaxYear - ix);
    }
    // const yearRecs = classificationRateIncreaseData.filter(e => e.year === clientMaxYear) || [];
    // const partnerRec = yearRecs.filter(e => e.bh_classification === 'partner') || [];
    // const assocRec = yearRecs.filter(e => e.bh_classification === 'associate') || [];

    const totalSpendYearRecs = classificationRateIncreaseData.filter(e => e.year === bmYear) || [];
    const partnerRec = totalSpendYearRecs.filter(e => e.bh_classification === 'partner') || [];
    const assocRec = totalSpendYearRecs.filter(e => e.bh_classification === 'associate') || [];
    if (assocRec.length > 0 && partnerRec.length > 0) {
      totalSpend = assocRec[0].total_spend + partnerRec[0].total_spend;
      if (firmData && validRange) {
        if (totalSpend > 0) {
          assocPctBilled = assocRec[0].total_spend / totalSpend;
          partnerPctBilled = partnerRec[0].total_spend / totalSpend;
        }
      } else {
        const yearRecs = classificationRateIncreaseData.filter(e => e.year === clientMaxYear) || [];
        const partnerMaxYearRec = yearRecs.filter(e => e.bh_classification === 'partner') || [];
        const assocMaxYearRec = yearRecs.filter(e => e.bh_classification === 'associate') || [];
        if (assocMaxYearRec.length > 0 && partnerMaxYearRec.length > 0) {
          const mostRecentYearSpend = assocMaxYearRec[0].total_spend + partnerMaxYearRec[0].total_spend;
          if (mostRecentYearSpend > 0) {
            assocPctBilled = assocMaxYearRec[0].total_spend / mostRecentYearSpend;
            partnerPctBilled = partnerMaxYearRec[0].total_spend / mostRecentYearSpend;
          }
        }
      }
    } else {
      const yearRecs = classificationRateIncreaseData.filter(e => e.year === clientMaxYear) || [];
      const partnerMaxYearRec = yearRecs.filter(e => e.bh_classification === 'partner') || [];
      const assocMaxYearRec = yearRecs.filter(e => e.bh_classification === 'associate') || [];
      if (assocMaxYearRec.length > 0 && partnerMaxYearRec.length > 0) {
        const mostRecentYearSpend = assocMaxYearRec[0].total_spend + partnerMaxYearRec[0].total_spend;
        if (mostRecentYearSpend > 0) {
          assocPctBilled = assocMaxYearRec[0].total_spend / mostRecentYearSpend;
          partnerPctBilled = partnerMaxYearRec[0].total_spend / mostRecentYearSpend;
        }
      }
    }
    for (const year of distinctYears) {

      const classificationYearRecs = classificationRateIncreaseData.filter(e => e.year === year) || [];
      const classifications = [];
      const partnerRecords = classificationYearRecs.filter(e => e.bh_classification === 'partner') || [];
      if (partnerRecords.length > 0) {
        classifications.push(partnerRecords[0]);
      }
      const associateRecords = classificationYearRecs.filter(e => e.bh_classification === 'associate') || [];
      if (associateRecords.length > 0) {
        classifications.push(associateRecords[0]);
      }

      if (classifications.length > 0) {
        classificationRecords.push({ rate_increase: classifications});
      } else {
        classificationRecords.push({ rate_increase: []});
      }
    }
    const classificationsProcessed = [];
    for (const key of Object.keys(tkClassifications)) {
      if (key === 'partner' || key === 'associate') {
        classificationsProcessed.push(this.createRateIncreaseClassification(classificationRecords, key, clientMaxYear));
      }
    }
    const classProcessed = classificationsProcessed;
    if (classProcessed) {
      if (classProcessed.length > 0) {
        const assocInfo = classProcessed.filter(c => c.title === 'associate');
        const partnerInfo = classProcessed.filter(c => c.title === 'partner');
        let assocRateIncrease = 0;
        let partnerRateIncrease = 0;
        if (assocInfo.length > 0) {
          assocRateIncrease = assocInfo[0].avgRateIncrease * assocPctBilled;
        }
        if (partnerInfo.length > 0) {
          partnerRateIncrease = partnerInfo[0].avgRateIncrease * partnerPctBilled;
        }
        yoyRateIncrease = partnerRateIncrease + assocRateIncrease;

      }
    }
    return {savings: result, classificationData: classProcessed, rateIncreasePct: yoyRateIncrease, total: totalSpend};
  }

  // using same function as in savings calculator service with some slight changes
  createRateIncreaseClassification(records: Array<any>, level: string, clientMaxYear: number): any {
    if (level === null) {
      const year = {} as IClassification;
      year.title = clientMaxYear.toString();
      const year1 = records[0].rate_increase || [];
      const year2 =  records[1].rate_increase || [];
      const year1Rec = year1.find(e => e.year === clientMaxYear) || {} as any;
      const year2Rec = year2.find(e => e.year === (clientMaxYear - 1)) || {} as any;
      const divider1 = year2Rec.effective_rate ? year2Rec.effective_rate : 1;
      const year1Increase = ((year1Rec.effective_rate || 0) - (year2Rec.effective_rate || 0)) / divider1;
      year.avgRateIncrease = year1Increase;
      year.totalHours = year1Rec.total_hours ||  0;
      year.lastYearRate = year1Rec.effective_rate || 0;
      return year;
    } else {
      const classification = {} as IClassification;
      classification.title = level;
      const year1 = records[0].rate_increase || [];
      const year2 =  records[1].rate_increase || [];
      const year1Rec = year1.find(e => e.bh_classification === level) || {} as any;
      const year2Rec = year2.find(e => e.bh_classification === level) || {} as any;
      const divider1 = year2Rec.effective_rate ? year2Rec.effective_rate : 1;
      const year1Increase = ((year1Rec.effective_rate || 0) - (year2Rec.effective_rate || 0)) / divider1;
      classification.avgRateIncrease = year1Increase;
      classification.totalHours = year1Rec.total_hours ||  0;
      classification.lastYearRate = year1Rec.effective_rate || 0;
      return classification;
    }
  }

  calculateProjectedCostImpact(firmRateIncreaseClassificationData: Array<any>, cohortRateIncreaseClassificationData: Array<any>): any {
    const projectedImpact = {
      firmProjectedImpact: 0,
      marketProjectedImpact: 0
    };
    const tempPartnerFirmInfo = firmRateIncreaseClassificationData.filter(f => f.title === 'partner');
    const tempAssociateFirmInfo = firmRateIncreaseClassificationData.filter(f => f.title === 'associate');
    let partnerFirmInfo;
    let associateFirmInfo;
    let partnerCohortInfo;
    let associateCohortInfo;
    if (tempPartnerFirmInfo.length > 0) {
      partnerFirmInfo = tempPartnerFirmInfo[0];
    }
    if (tempAssociateFirmInfo.length > 0) {
      associateFirmInfo = tempAssociateFirmInfo[0];
    }

    const tempPartnerCohortInfo = cohortRateIncreaseClassificationData.filter(f => f.title === 'partner');
    const tempAssociateCohortInfo = cohortRateIncreaseClassificationData.filter(f => f.title === 'associate');
    if (tempPartnerCohortInfo.length > 0) {
      partnerCohortInfo = tempPartnerCohortInfo[0];
    }
    if (tempAssociateCohortInfo.length > 0) {
      associateCohortInfo = tempAssociateCohortInfo[0];
    }

    const partnerFirmProjectedSpend = ((partnerFirmInfo.avgRateIncrease + 1) * partnerFirmInfo.lastYearRate) * (partnerFirmInfo.totalHours);
    const associateFirmProjectedSpend = ((associateFirmInfo.avgRateIncrease + 1) * associateFirmInfo.lastYearRate) * (associateFirmInfo.totalHours);
    projectedImpact.firmProjectedImpact = partnerFirmProjectedSpend + associateFirmProjectedSpend;

    const partnerCohortProjectedSpend = ((partnerCohortInfo.avgRateIncrease + 1) * partnerFirmInfo.lastYearRate) * (partnerFirmInfo.totalHours);
    const associateCohortProjectedSpend = ((associateCohortInfo.avgRateIncrease + 1) * associateFirmInfo.lastYearRate) * (associateFirmInfo.totalHours);
    projectedImpact.marketProjectedImpact = partnerCohortProjectedSpend + associateCohortProjectedSpend;
    return projectedImpact;
  }

  calculateHistoricalCostImpact(firmData, marketAverageData) {
    const result = {
      blended_rate_lower_diff: 0,
      blended_rate_upper_diff: 0,
      blended_rate_lower_diff_pct: 0,
      blended_rate_upper_diff_pct: 0,
      cost_impact: '',
      blended_within_range: false
    };
    if (firmData.blended_rate >= marketAverageData.blended_rate_hi && firmData.blended_rate >= marketAverageData.blended_rate_lo) {
      result.blended_rate_lower_diff = firmData.total_atty_billed - (firmData.total_atty_hours * marketAverageData.blended_rate_hi);
      result.blended_rate_upper_diff = firmData.total_atty_billed - (firmData.total_atty_hours * marketAverageData.blended_rate_lo);
      result.blended_rate_lower_diff_pct = result.blended_rate_lower_diff / firmData.total_atty_billed;
      result.blended_rate_upper_diff_pct = result.blended_rate_upper_diff / firmData.total_atty_billed;
      result.blended_within_range = false;
      if (result.blended_rate_upper_diff_pct >= 0.2) {
        result.cost_impact = 'HIGH';
      } else if (result.blended_rate_upper_diff_pct < 0.2 && result.blended_rate_upper_diff_pct >= 0.05) {
        result.cost_impact = 'MODERATE';
      } else if (result.blended_rate_upper_diff_pct < 0.05 && result.blended_rate_upper_diff_pct > 0) {
        result.cost_impact = 'LOW';
      } else {
        result.cost_impact = 'NONE';
      }
    } else if (firmData.blended_rate >= marketAverageData.blended_rate_lo && firmData.blended_rate <= marketAverageData.blended_rate_hi) {
      result.blended_rate_lower_diff = firmData.total_atty_billed - (firmData.total_atty_hours * marketAverageData.blended_rate_lo);
      result.blended_rate_upper_diff = firmData.total_atty_billed - (firmData.total_atty_hours * marketAverageData.blended_rate_hi);
      result.blended_rate_lower_diff_pct = result.blended_rate_lower_diff / firmData.total_atty_billed;
      result.blended_rate_upper_diff_pct = result.blended_rate_upper_diff / firmData.total_atty_billed;
      result.blended_within_range = true;
      if (result.blended_rate_lower_diff_pct >= 0.2) {
        result.cost_impact = 'HIGH';
      } else if (result.blended_rate_lower_diff_pct < 0.2 && result.blended_rate_lower_diff_pct >= 0.05) {
        result.cost_impact = 'MODERATE';
      } else if (result.blended_rate_lower_diff_pct < 0.05 && result.blended_rate_lower_diff_pct > 0) {
        result.cost_impact = 'LOW';
      } else {
        result.cost_impact = 'NONE';
      }
    } else if (firmData.blended_rate <= marketAverageData.blended_rate_lo && firmData.blended_rate <= marketAverageData.blended_rate_hi) {
      result.blended_rate_lower_diff = firmData.total_atty_billed - (firmData.total_atty_hours * marketAverageData.blended_rate_lo);
      result.blended_rate_upper_diff = firmData.total_atty_billed - (firmData.total_atty_hours * marketAverageData.blended_rate_hi);
      result.blended_rate_lower_diff_pct = result.blended_rate_lower_diff / firmData.total_atty_billed;
      result.blended_rate_upper_diff_pct = result.blended_rate_upper_diff / firmData.total_atty_billed;
      result.blended_within_range = false;
      result.cost_impact = 'POSITIVE';
    }
    return result;
  }

  // get market average, internal, and firm year data for the granularity page
  // for each seniority bucket
  getGranularityPageData(bm: any, numTiers: number): Promise<any> {
    let getDataByCluster = true;
    if (bm.market_avg_firms !== null) {
      getDataByCluster = false;
    }
    const params = {
      pa: bm.smart_practice_area,
      firm: bm.bh_lawfirm_id,
      yyyy: bm.year,
      numPartnerTiers: numTiers,
      market_firms: bm.market_avg_firms,
      getCluster: getDataByCluster
    };
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getGranularityPageData', params).subscribe(
        (data: any) => {
          if (!data.result) {
            resolve(data);
          }
          resolve(data.result);
        },
        err => {
          return {error: err};
        }
      );
    });
  }
}
