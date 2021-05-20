import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import * as config from '../../../shared/services/config';
import {MatDialog} from '@angular/material/dialog';
import {SelectItem} from 'primeng/api';
import { RecommendationService } from '../recommendation.service';
import { IRecommendationReport } from '../client-recommendations-model';


@Component({
  selector: 'bd-view-client-recommendation',
  templateUrl: './view-client-recommendation.component.html',
  styleUrls: ['./view-client-recommendation.component.scss']
})
export class ViewClientRecommendationComponent implements OnInit {
  pendingRequest: Subscription;
  errorMessage: any;
  selectedClientId: number;
  selectedOrgId: number;
  reportId: number;
  report: IRecommendationReport;
  step: number = 0;
  selectedFirmName: string;
  selectedPracticeArea: string;
  clientPracticeAreaSetting: string = null;
  recommendationTypes: SelectItem[] = [];
  firmOptions: SelectItem[] = [];
  previousFirmNames: string[] = [];
  newFirmNames: string[] = [];

  lastFullYearFirmData: any[];
  ytdFirmData: any[];
  firmStaffingData: any[] = [];
  firmBlockBillingData: any[] = [];
  firmRateIncreaseData: any[] = [];
  mostRecentYear: number;
  firmPracticeAreas: string[];
  differenceInSpendLower: number;
  differenceInSpendUpper: number;
  estimatedSpendWithOldDisc: number;
  estimatedSpendWithRecommendedDiscLower: number;
  estimatedSpendWithRecommendedDiscUpper: number;
  firmPAOptions: SelectItem[] = [];

  estimatedSpendWithOldStaffing: number = 0;
  estimatedSpendWithNewStaffing: number = 0;
  differenceInSpend: number = 0;

  estimatedBlockBillingSavings: number = null;
  unacceptableBlockBillingAmount: number = null;

  rateIncreasePreventionSavings: number = 0;
  rateIncreasePreventionDetails: any[] = [];

  previousFirmsData: any[] = [];
  recommendedFirmsData: any[] = [];


  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public recommendationService: RecommendationService) {
    this.commonServ.pageTitle = 'View Client Recommendation';
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.reportId = Number(params.get('reportId'));
    });
    this.route.queryParams.subscribe(params => {
      this.selectedOrgId = Number(params.orgId);
      this.selectedClientId = Number(params.clientId);
    });

    this.recommendationTypes = await this.recommendationService.getRecommendationTypes();
    this.firmOptions = await this.recommendationService.getFirms(this.selectedClientId);
    this.report = await this.recommendationService.getReport(this.reportId);
    this.processRecommendations();
  }

  processRecommendations(): void {
    for (let recommendation of this.report.recommendations) {
      console.log("rec: ", recommendation);
      const selectedType = this.recommendationTypes.filter(type => type.value === recommendation.type_id);
      recommendation.selected_type = selectedType[0].label;

      if (recommendation.selected_type !== 'Shift Work From Firm(s) to Firm(s)') {
        const selectedFirm = this.firmOptions.filter(type => type.value === recommendation.bh_lawfirm_id);
        recommendation.firm_name = selectedFirm[0].label;
      } else {
        recommendation.previous_firm_names = [];
        recommendation.recommended_firm_names = [];
        for (let firm of recommendation.previous_firm_ids) {
          const selectedFirm = this.firmOptions.filter(type => type.value === firm);
          recommendation.previous_firm_names.push(selectedFirm[0].label);
        }
        for (let firm of recommendation.recommended_firm_ids) {
          const selectedFirm = this.firmOptions.filter(type => type.value === firm);
          recommendation.recommended_firm_names.push(selectedFirm[0].label);
        }
      }
    }
    this.changeTab({index: 0});
  }

  async changeTab(evt: any): Promise<void> {
    console.log("evt: ", evt);
    console.log("rec: ", this.report.recommendations[evt.index], this.report.recommendations[evt.index].selected_type);
    if (this.report.recommendations[evt.index].selected_type === 'Discount') {
      const result = await this.recommendationService.getDiscountData(this.report.recommendations[evt.index], this.selectedClientId, this.clientPracticeAreaSetting);
      const discountData = this.recommendationService.calcDiscountSavings(result['prior_year'], this.report.recommendations[evt.index]);
      this.lastFullYearFirmData = result.prior_year;
      this.mostRecentYear = result.most_recent_year;
      this.differenceInSpendLower = discountData['diff_in_spend_lower'];
      this.differenceInSpendUpper = discountData['diff_in_spend_upper'];
      this.estimatedSpendWithOldDisc = discountData['estimated_spend_with_old_disc'];
      this.estimatedSpendWithRecommendedDiscLower = discountData['estimated_spend_with_rec_disc_lower'];
      this.estimatedSpendWithRecommendedDiscUpper = discountData['estimated_spend_with_rec_disc_upper'];
      this.selectedFirmName = this.report.recommendations[evt.index].firm_name;
      this.selectedPracticeArea = this.report.recommendations[evt.index].practice_area;

    } else if (this.report.recommendations[evt.index].selected_type === 'Shift Work From Firm(s) to Firm(s)') {
      const result = await this.recommendationService.getFirmsByPracticeArea(this.report.recommendations[evt.index], this.selectedClientId, this.clientPracticeAreaSetting);
      console.log("SHIFT REZ: ", result);
      this.previousFirmsData = result.previous;
      this.recommendedFirmsData = result.recommended;
    } else if (this.report.recommendations[evt.index].selected_type === 'Reduce / Eliminate Block Billing') {
      this.firmBlockBillingData = await this.recommendationService.getBlockBillingData(this.report.recommendations[evt.index], this.selectedClientId, this.clientPracticeAreaSetting);
      this.mostRecentYear = 0;
      if (this.firmBlockBillingData.length > 0) {
        this.mostRecentYear = this.firmBlockBillingData[0].year;
      }
      const bbSavings = this.recommendationService.calcBlockBillingSavings(this.firmBlockBillingData, this.report.recommendations[evt.index], this.mostRecentYear);
      this.unacceptableBlockBillingAmount = bbSavings.unacceptable_bb_amount;
      this.estimatedBlockBillingSavings = bbSavings.estimated_bb_savings;

    } else if (this.report.recommendations[evt.index].selected_type === 'Modify Staffing Allocation') {
      this.firmStaffingData = await this.recommendationService.getStaffingData(this.report.recommendations[evt.index], this.selectedClientId);
      let mostRecentYear = 0;
      if (this.firmStaffingData.length > 0) {
        mostRecentYear = this.firmStaffingData[0].year;
      }
      const staffingData = this.recommendationService.calcStaffingAllocationSavings(this.firmStaffingData, this.report.recommendations[evt.index], mostRecentYear)
      this.estimatedSpendWithOldStaffing = staffingData.estimated_spend_with_old_staffing;
      this.estimatedSpendWithNewStaffing = staffingData.estimated_spend_with_rec_staffing;
      this.differenceInSpend = staffingData.diff_in_spend;

    } else if (this.report.recommendations[evt.index].selected_type === 'Rate Increase Prevention / Reduction') {
      const result = await this.recommendationService.getRateIncreaseData(this.report.recommendations[evt.index], this.selectedClientId, this.clientPracticeAreaSetting);
      this.rateIncreasePreventionDetails = result.details;
      this.rateIncreasePreventionSavings = result.savings;
      if (result.data.length > 0) {
        this.mostRecentYear = result.data[0].year;
      }
    }
  }

  edit(): void {
    this.router.navigate(['/analytics-ui/admin/client-recommendations/edit/', this.selectedClientId], {queryParams: {
      reportId: this.reportId,
      orgId: this.selectedOrgId,
    }});
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

}
