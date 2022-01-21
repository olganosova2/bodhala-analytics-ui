import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RatesAnalysisService } from '../rates-analysis.service';
import { IRateBenchmark, moneyFormatter } from '../rates-analysis.model';
import { IBenchmarkRate } from 'src/app/benchmarks/model';

@Component({
  selector: 'bd-view-rate-analysis',
  templateUrl: './view-rate-analysis.component.html',
  styleUrls: ['./view-rate-analysis.component.scss']
})
export class ViewRateAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  benchmarkId: number;
  benchmark: IRateBenchmark
  peerFirms: Array<string>;
  loaded: boolean = false;
  diffsCalculated: boolean = false;
  practiceArea: string;
  firmName: string;
  firmId: number;
  year: number;
  firmYearData: any;
  internalYearData: any;
  marketAverageData: any;
  firmRateIncreasePct: number;
  cohortRateIncreasePct: number;
  firmClassificationRateIncreaseData: Array<any>;
  cohortClassificationRateIncreaseData: Array<any>;
  firmTotalSpend: number;
  firmCostImpact: number;
  cohortCostImpact: number;
  firmCostImpactFormatted: string;
  cohortCostImpactFormatted: string;
  helpText: string = 'An estimated increase in spend should your rates increase at this rate.';
  marketBlendedRateLowerRangeDiff: string;
  marketBlendedRateUpperRangeDiff: string;
  internalBlendedRateDiff: string;

  marketBPILowerRangeDiff: string;
  marketBPIUpperRangeDiff: string;
  internalBPIDiff: string;


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
    this.route.paramMap
      .subscribe(async params => {
        // this.report = this.qbrService.savedQBR;
        this.benchmarkId = Number(params.get('id'));
        console.log("pre benchmark call")
        this.benchmark = await this.getBenchmark();
        this.firmId = this.benchmark.bh_lawfirm_id;
        this.practiceArea = this.benchmark.smart_practice_area;
        this.year = this.benchmark.year;
        this.peerFirms = this.benchmark.peers;
        console.log("post benchmark call: ", this.benchmark)
        this.getData();
      });

  }

  getBenchmark(): Promise<IRateBenchmark> {
    const params = {benchmarkId: this.benchmarkId};
    console.log("getBenchmark params: ", params);
    return new Promise((resolve, reject) => {
      return this.httpService.makeGetRequest('getRateBenchmark', params).subscribe(
        (data: any) => {
          if (!data.result) {
            return;
          }
          const bm = data.result
          console.log("getBenchmark data: ", data);
          this.firmName = data.firm_name;
          resolve(bm);
        },
        err => {
          return {error: err};
        }
      );
    });
  }


  getData(): void {
    const firmParam = [];
    const paParam = [];
    paParam.push(this.practiceArea);
    firmParam.push(this.firmId.toString());
    const params = {
      firmId: this.firmId,
      smartPA: this.benchmark.smart_practice_area,
      marketAverageYear: this.benchmark.year,
      firms: JSON.stringify(firmParam),
      bdPracticeAreas: JSON.stringify(paParam)
    };
    console.log("getData params: ", params)
    this.pendingRequest = this.httpService.makeGetRequest('getFirmRateAnalysisIncreaseData', params).subscribe(
      (data: any) => {
        console.log("getData data: ", data);
        if (data.result) {
          if (data.result.market_average) {
            if (data.result.market_average.length > 0) {
              this.marketAverageData = data.result.market_average[0];
            }
          }
          if (data.result.firm_data) {
            if (data.result.firm_data.length > 0) {
              this.firmYearData = data.result.firm_data[0];
              this.firmYearData = this.firmYearData[0];
            }
          }
          if (data.result.internal_data) {
            if (data.result.internal_data.length > 0) {
              this.internalYearData = data.result.internal_data[0];
            }
          }
          // if (this.internalYearData && this.firmYearData && this.marketAverageData) {
          //   this.ratesService.calculateDiffs(this.firmYearData, this.internalYearData, this.marketAverageData);
          // }
          this.loaded = true;
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
            this.firmTotalSpend = firmClassificationRateIncreasePct.total;

            const projectedCostImpact = this.ratesService.calculateProjectedCostImpact(this.firmClassificationRateIncreaseData, this.cohortClassificationRateIncreaseData);
            if (this.firmTotalSpend && projectedCostImpact) {
              if (projectedCostImpact.firmProjectedImpact) {
                this.firmCostImpact = projectedCostImpact.firmProjectedImpact - this.firmTotalSpend;
                this.firmCostImpactFormatted = moneyFormatter.format(this.firmCostImpact);
              }
              if (projectedCostImpact.marketProjectedImpact) {
                // this.cohortCostImpact = projectedCostImpact.marketProjectedImpact - this.firmTotalSpend;
                const projectedCohortSpend = this.firmTotalSpend * (1 + (this.cohortRateIncreasePct / 100));
                this.cohortCostImpact = projectedCohortSpend - this.firmTotalSpend;
                this.cohortCostImpactFormatted = moneyFormatter.format(this.cohortCostImpact);
              }
            }
            console.log("internalYearData: ", this.internalYearData)
            console.log("firmYearData: ", this.firmYearData)
            console.log("marketAverageData: ", this.marketAverageData)
            console.log("firmRateIncreasePct: ", this.firmRateIncreasePct)
            console.log("cohortRateIncreasePct: ", this.cohortRateIncreasePct)
            console.log("firmTotalSpend: ", this.firmTotalSpend)
            console.log("firmCostImpact: ", this.firmCostImpact)
            console.log("cohortCostImpact: ", this.cohortCostImpact)
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
