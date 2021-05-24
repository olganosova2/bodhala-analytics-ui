import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import * as config from '../../shared/services/config';
import {MatDialog} from '@angular/material/dialog';
import {SelectItem} from 'primeng/api';
import { RecommendationService } from '../../admin/client-recommendations/recommendation.service';
import { IRecommendationReport } from '../../admin/client-recommendations/client-recommendations-model';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'bd-view-recommendations',
  templateUrl: './view-recommendations.component.html',
  styleUrls: ['./view-recommendations.component.scss']
})
export class ViewRecommendationsComponent implements OnInit {
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
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public recommendationService: RecommendationService) {
    this.commonServ.pageTitle = 'View Bodhala Recommendation Report';
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.reportId = Number(params.get('reportId'));
    });
    if (this.userService.config !== undefined) {
      if ('analytics.practice.bodhala.areas' in this.userService.config) {
        const userConfigs = Object.values(this.userService.config);
        for (const userConfig of userConfigs) {
          if (userConfig.configs[0].description === 'config for analytics practice areas') {
            this.clientPracticeAreaSetting = userConfig.configs[0].value;
            break;
          }
        }
      }
    }

    this.recommendationTypes = await this.recommendationService.getRecommendationTypes();
    this.firmOptions = await this.recommendationService.getFirms(this.selectedClientId);

    this.report = await this.recommendationService.getReport(this.reportId);
    this.processRecommendations();
  }

  processRecommendations(): void {
    for (const recommendation of this.report.recommendations) {
      const selectedType = this.recommendationTypes.filter(type => type.value === recommendation.type_id);
      recommendation.selected_type = selectedType[0].label;

      if (recommendation.selected_type !== 'Shift Work From Firm(s) to Firm(s)') {
        const selectedFirm = this.firmOptions.filter(type => type.value === recommendation.bh_lawfirm_id);
        recommendation.firm_name = selectedFirm[0].label;
      } else {
        recommendation.previous_firm_names = [];
        recommendation.recommended_firm_names = [];
        for (const firm of recommendation.previous_firm_ids) {
          const selectedFirm = this.firmOptions.filter(type => type.value === firm);
          if (selectedFirm.length > 0) {
            recommendation.previous_firm_names.push(selectedFirm[0].label);
          }
        }
        for (const firm of recommendation.recommended_firm_ids) {
          const selectedFirm = this.firmOptions.filter(type => type.value === firm);
          if (selectedFirm.length > 0) {
            recommendation.recommended_firm_names.push(selectedFirm[0].label);
          }
        }
      }
    }
    this.changeTab({index: 0});
  }

  async changeTab(evt: any): Promise<void> {
    if (this.report.recommendations[evt.index].selected_type === 'Discount') {
      const result = await this.recommendationService.getDiscountData(this.report.recommendations[evt.index], this.userService.currentUser.client_info_id, this.clientPracticeAreaSetting);
      const discountData = this.recommendationService.calcDiscountSavings(result.prior_year, this.report.recommendations[evt.index]);
      this.lastFullYearFirmData = result.prior_year;
      this.mostRecentYear = result.most_recent_year;
      this.differenceInSpendLower = discountData.diff_in_spend_lower;
      this.differenceInSpendUpper = discountData.diff_in_spend_upper;
      this.estimatedSpendWithOldDisc = discountData.estimated_spend_with_old_disc;
      this.estimatedSpendWithRecommendedDiscLower = discountData.estimated_spend_with_rec_disc_lower;
      this.estimatedSpendWithRecommendedDiscUpper = discountData.estimated_spend_with_rec_disc_upper;
      this.selectedFirmName = this.report.recommendations[evt.index].firm_name;
      this.selectedPracticeArea = this.report.recommendations[evt.index].practice_area;

    } else if (this.report.recommendations[evt.index].selected_type === 'Shift Work From Firm(s) to Firm(s)') {
      const result = await this.recommendationService.getFirmsByPracticeArea(this.report.recommendations[evt.index], this.userService.currentUser.client_info_id, this.clientPracticeAreaSetting);
      this.previousFirmsData = result.previous;
      this.recommendedFirmsData = result.recommended;
    } else if (this.report.recommendations[evt.index].selected_type === 'Reduce / Eliminate Block Billing') {
      this.firmBlockBillingData = await this.recommendationService.getBlockBillingData(this.report.recommendations[evt.index], this.userService.currentUser.client_info_id, this.clientPracticeAreaSetting);
      this.mostRecentYear = 0;
      if (this.firmBlockBillingData.length > 0) {
        this.mostRecentYear = this.firmBlockBillingData[0].year;
      }
      const bbSavings = this.recommendationService.calcBlockBillingSavings(this.firmBlockBillingData, this.report.recommendations[evt.index], this.mostRecentYear);
      this.unacceptableBlockBillingAmount = bbSavings.unacceptable_bb_amount;
      this.estimatedBlockBillingSavings = bbSavings.estimated_bb_savings;

    } else if (this.report.recommendations[evt.index].selected_type === 'Modify Staffing Allocation') {
      this.firmStaffingData = await this.recommendationService.getStaffingData(this.report.recommendations[evt.index], this.userService.currentUser.client_info_id);
      let mostRecentYear = 0;
      if (this.firmStaffingData.length > 0) {
        mostRecentYear = this.firmStaffingData[0].year;
      }
      const staffingData = this.recommendationService.calcStaffingAllocationSavings(this.firmStaffingData, this.report.recommendations[evt.index], mostRecentYear);
      this.estimatedSpendWithOldStaffing = staffingData.estimated_spend_with_old_staffing;
      this.estimatedSpendWithNewStaffing = staffingData.estimated_spend_with_rec_staffing;
      this.differenceInSpend = staffingData.diff_in_spend;

    } else if (this.report.recommendations[evt.index].selected_type === 'Rate Increase Prevention / Reduction') {
      const result = await this.recommendationService.getRateIncreaseData(this.report.recommendations[evt.index], this.userService.currentUser.client_info_id, this.clientPracticeAreaSetting);
      this.rateIncreasePreventionDetails = result.details;
      this.rateIncreasePreventionSavings = result.savings;
      if (result.data.length > 0) {
        this.mostRecentYear = result.data[0].year;
      }
    }
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
