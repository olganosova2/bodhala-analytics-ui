import { Component, OnInit } from '@angular/core';
import {CommonService} from '../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RatesAnalysisService } from './rates-analysis.service';

@Component({
  selector: 'bd-rates-analysis',
  templateUrl: './rates-analysis.component.html',
  styleUrls: ['./rates-analysis.component.scss']
})
export class RatesAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  comparisonFirms: Array<any>;
  practiceArea: string = 'Litigation';
  firmName: string = 'Quinn Emanuel Urquhart & Sullivan';
  firmId: number = 28;
  year: number = 2019;
  firmYearData: any;
  marketAverageData: any;
  firmRateIncreasePct: number;
  cohortRateIncreasePct: number;
  firmClassificationRateIncreaseData: Array<any>;
  cohortClassificationRateIncreaseData: Array<any>;




  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public ratesService: RatesAnalysisService) {
    this.commonServ.pageTitle = 'View Rate Analysis';
    setTimeout(() => {
      this.commonServ.pageSubtitle = this.firmName;
    });
  }

  ngOnInit(): void {
    this.getData();
  }


  getData(): void {
    const firmParam = [];
    const paParam = [];
    paParam.push(this.practiceArea);
    firmParam.push(this.firmId.toString());
    const params = {
      firmId: this.firmId,
      smartPA: 'Litigation',
      marketAverageYear: 2019,
      firms: JSON.stringify(firmParam),
      bdPracticeAreas: JSON.stringify(paParam)
    };
    console.log("params: ", params)
    this.pendingRequest = this.httpService.makeGetRequest('getFirmRateAnalysisIncreaseData', params).subscribe(
      (data: any) => {
        console.log("data: ", data);
        if (data.result) {
          if (data.result.market_average) {
            if (data.result.market_average.length > 0) {
              this.marketAverageData = data.result.market_average;
            }
          }
          if (data.result.firm_data) {
            if (data.result.firm_data.length > 0) {
              this.firmYearData = data.result.firm_data[0];
            }
          }
          if (data.result.firm_rate_result && data.result.cohort_rate_result && data.result.max_year && data.result.firm_rate_result_classification && data.result.cohort_rate_result_classification) {
            console.log("if eval: ")
            // const firmRateIncreasePct = this.ratesService.calculateRateIncreasePct(data.result.firm_rate_result, data.result.max_year);
            // const cohortRateIncreasePct = this.ratesService.calculateRateIncreasePct(data.result.cohort_rate_result, data.result.max_year);
            // this.firmRateIncreasePct = firmRateIncreasePct.yearsData[0].avgRateIncrease;
            // this.cohortRateIncreasePct = cohortRateIncreasePct.yearsData[0].avgRateIncrease;
            // this.firmRateIncreasePct *= 100;
            // this.cohortRateIncreasePct *= 100;

            const firmClassificationRateIncreasePct = this.ratesService.calculateRateIncreasePctClassification(data.result.firm_rate_result, data.result.firm_rate_result_classification, data.result.max_year);
            const cohortClassificationRateIncreasePct = this.ratesService.calculateRateIncreasePctClassification(data.result.cohort_rate_result, data.result.cohort_rate_result_classification, data.result.max_year);
            this.firmClassificationRateIncreaseData = firmClassificationRateIncreasePct.classificationData;
            this.cohortClassificationRateIncreaseData = cohortClassificationRateIncreasePct.classificationData;
            this.firmRateIncreasePct = firmClassificationRateIncreasePct.rateIncreasePct;
            this.cohortRateIncreasePct = cohortClassificationRateIncreasePct.rateIncreasePct;
            this.firmRateIncreasePct *= 100;
            this.cohortRateIncreasePct *= 100;

            const projectedCostImpact = this.ratesService.calculateProjectedCostImpact(this.firmClassificationRateIncreaseData, this.cohortClassificationRateIncreaseData)

            console.log("firmRateIncreasePct: ", this.firmRateIncreasePct)
            console.log("cohortRateIncreasePct: ", this.cohortRateIncreasePct)
            console.log("firmClassificationRateIncreasePct: ", firmClassificationRateIncreasePct)
            console.log("cohortClassificationRateIncreasePct: ", cohortClassificationRateIncreasePct)
            console.log("projectedCostImpact: ", projectedCostImpact)
          }
        }

        // const rateIncreasePcts = this.ratesService.calculateRateIncrease()



      }
    );
  }

}
