import { Injectable } from '@angular/core';
import {HttpService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {tkClassifications, IClassification} from '../savings-calculator/savings-calculator.service';


@Injectable({
  providedIn: 'root'
})
export class RatesAnalysisService {
  pendingRequest: Subscription;
  errorMessage: any;

  constructor(private httpService: HttpService) { }



  // calculateRateIncrease(firmRateIncreaseData, cohortRateIncreaseData) {



  // }

  calculateRateIncreasePct(rateIncreaseData: Array<any>, clientMaxYear: number): any {
    let result = 0;
    const distinctYears = [];
    const yearRecords = [];
    const classificationRecords = [];
    for (let ix = 0; ix < 2; ix++) {
      distinctYears.push(clientMaxYear - ix);
    }
    for (const year of distinctYears) {
      const yearRecs = rateIncreaseData.filter(e => e.year === year) || [];
      yearRecords.push({ rate_increase: yearRecs});
    }
    const yearsProcessed = [];
    yearsProcessed.push(this.createRateIncreaseClassification(yearRecords, null, clientMaxYear));
    const processed = yearsProcessed;
    // result = this.calculateIncreaseRateValue(rateIncreaseLimit, processed);

    return {savings: result, yearsData: processed};
  }

  calculateRateIncreasePctClassification(firmRateIncreaseData: Array<any>, classificationRateIncreaseData: Array<any>,clientMaxYear: number): any {
    let result = 0;
    const distinctYears = [];
    const yearRecords = [];
    const classificationRecords = [];
    let assocPctBilled = 0;
    let partnerPctBilled = 0;
    let yoyRateIncrease = 0;
    for (let ix = 0; ix < 2; ix++) {
      distinctYears.push(clientMaxYear - ix);
    }
    const yearRecs = classificationRateIncreaseData.filter(e => e.year === clientMaxYear) || [];
    const partnerRec = yearRecs.filter(e => e.bh_classification === 'partner') || [];
    const assocRec = yearRecs.filter(e => e.bh_classification === 'associate') || [];

    if (assocRec.length > 0 && partnerRec.length > 0) {

      const totalSpend = assocRec[0].total_spend + partnerRec[0].total_spend;
      console.log("associateRecords: ", assocRec)
      console.log("partnerRecords: ", partnerRec)
      if (totalSpend > 0) {
        assocPctBilled = assocRec[0].total_spend / totalSpend;
        partnerPctBilled = partnerRec[0].total_spend / totalSpend;
      }
    }
    console.log("yearRecs: ", yearRecs)

    for (const year of distinctYears) {

      const classificationYearRecs = classificationRateIncreaseData.filter(e => e.year === year) || [];
      console.log("classificationYearRecs: ", classificationYearRecs)
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
        console.log("assocInfo: ", assocInfo)
        console.log("partnerInfo: ", partnerInfo)
        console.log("assocPctBilled: ", assocPctBilled)
        console.log("partnerPctBilled: ", partnerPctBilled)

        if (assocInfo.length > 0) {
          assocRateIncrease = assocInfo[0].avgRateIncrease * assocPctBilled;
        }
        if (partnerInfo.length > 0) {
          partnerRateIncrease = partnerInfo[0].avgRateIncrease * partnerPctBilled;
        }
        yoyRateIncrease = partnerRateIncrease + assocRateIncrease;

      }
    }
    console.log("classProcessed: ", classProcessed)
    // result = this.calculateIncreaseRateValue(rateIncreaseLimit, processed);
    return {savings: result, classificationData: classProcessed, rateIncreasePct: yoyRateIncrease};
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
    console.log("partnerFirmInfo: ", partnerFirmInfo)
    console.log("associateFirmInfo: ", associateFirmInfo)
    console.log("partnerCohortInfo: ", partnerCohortInfo)
    console.log("associateCohortInfo: ", associateCohortInfo)

    const partnerFirmProjectedSpend = ((partnerFirmInfo.avgRateIncrease + 1) * partnerFirmInfo.lastYearRate) * (partnerFirmInfo.totalHours);
    const associateFirmProjectedSpend = ((associateFirmInfo.avgRateIncrease + 1) * associateFirmInfo.lastYearRate) * (associateFirmInfo.totalHours);
    console.log("firm spend: ", partnerFirmProjectedSpend, associateFirmProjectedSpend)
    projectedImpact.firmProjectedImpact = partnerFirmProjectedSpend + associateFirmProjectedSpend;

    const partnerCohortProjectedSpend = ((partnerCohortInfo.avgRateIncrease + 1) * partnerFirmInfo.lastYearRate) * (partnerFirmInfo.totalHours);
    const associateCohortProjectedSpend = ((associateCohortInfo.avgRateIncrease + 1) * associateFirmInfo.lastYearRate) * (associateFirmInfo.totalHours);
    console.log("cohort spend: ", partnerCohortProjectedSpend, associateCohortProjectedSpend)
    projectedImpact.marketProjectedImpact = partnerCohortProjectedSpend + associateCohortProjectedSpend;
    return projectedImpact;
  }
}
