import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {confirmDialogConfig} from '../../../shared/services/config';
import {FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {QbrService} from '../../qbr.service';
import {IReport, QbrType, recommendationPlaceholderMapping, formatter, moneyFormatter} from '../../qbr-model';
import {SelectItem} from 'primeng/api';
import { QbrCreationComponent } from '../qbr-creation.component';
import { RecommendationService } from 'src/app/admin/client-recommendations/recommendation.service';

@Component({
  selector: 'bd-qbr-insights',
  templateUrl: './qbr-insights.component.html',
  styleUrls: ['./qbr-insights.component.scss']
})
export class QbrInsightsComponent implements OnInit, OnChanges {
  pendingRequest: Subscription;
  insightsForm = new FormGroup({});
  currentFirmOptions: SelectItem[];
  recommendationsProcessed: boolean = false;
  showNextSteps: boolean = false;
  nextSteps: Array<any> = [];
  @Input() recommendations: any;
  @Input() topPAs: SelectItem[];
  @Input() topPAFirms: SelectItem[];
  @Input() secondPAFirms: SelectItem[];
  @Input() editMode: boolean;
  @Input() expenses: boolean;
  @Input() reportData: any;
  @Input() practiceAreaSetting: string;


  constructor(private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public filtersService: FiltersService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public datepipe: DatePipe,
              private qbrService: QbrService,
              private parent: QbrCreationComponent,
              private recService: RecommendationService) {}

  ngOnInit(): void {
    this.insightsForm.validator =  this.validateInsightsSelection();
    this.currentFirmOptions = this.topPAFirms;
    this.processRecommendations();
    console.log("recs: ", this.recommendations)
    console.log("INSIGHT EXPENSES: ", this.parent.report.querystring.expenses)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes: ", changes);
    if (changes.expenses && !changes.expenses.firstChange) {
      console.log("this.expenses: ", this.expenses)
      // this.processRecommendations();
      for (const rec of this.recommendations) {
        rec.currentFirmOptions = this.currentFirmOptions;
        if (rec.type === 'Increase Discounts') {
          this.updateDiscountRecommendation(rec);
        } else if (rec.type === 'Prevent Rate Increases') {
          this.updateRateIncreaseRecommendation(rec);
        } else if (rec.type === 'Partner / Associate Work Allocation') {
          this.updateWorkAllocationRecommendation(rec);
        } else if (rec.type === 'Decrease Block Billing') {
          this.updateBlockBillingRecommendation(rec);
        } else if (rec.type === 'Shift Work to Other Firms') {
          this.updateShiftWorkRecommendation(rec);
        }
      }
    }
    if (changes.reportData && !changes.reportData.firstChange) {

      for (const rec of this.recommendations) {
        if (rec.type === 'Increase Discounts') {
          this.updateDiscountRecommendation(rec);
        } else if (rec.type === 'Prevent Rate Increases') {
          this.updateRateIncreaseRecommendation(rec);
        } else if (rec.type === 'Partner / Associate Work Allocation') {
          this.updateWorkAllocationRecommendation(rec);
        } else if (rec.type === 'Decrease Block Billing') {
          this.updateBlockBillingRecommendation(rec);
        } else if (rec.type === 'Shift Work to Other Firms') {
          this.updateShiftWorkRecommendation(rec);
        }
      }
    }
  }

  validateInsightsSelection(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      let checked = 0;
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control.value === true) {
          checked++;
        }
      });
      // make this an entity_config check at some point

      if (checked > 3) {
        return {tooManySelected: true};
      }
      if (checked !== 3) {
        return {notEnoughSelected: true};
      }
      return null;
    };
  }

  async generateNextSteps(): Promise<void> {
    this.nextSteps = [];
    for (let rec of this.recommendations) {
      if (rec.included) {
        this.saveInsight(rec);

        if (rec.type === 'Increase Discounts') {
          rec.current_discount_pct = 0;
          rec.spend_increase_pct = 0;
          rec.recommended_discount_pct_lower_range = 5;
          rec.recommended_discount_pct_upper_range = 10;
          if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
            if (elementIndex === 1) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.topPA, this.parent.report.querystring.expenses, false);
            } else if (elementIndex == 2) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.secondPA, this.parent.report.querystring.expenses, false);
            } else {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (elementIndex === 1) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (elementIndex == 2) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.secondPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.secondPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              rec = this.qbrService.calculateDiscountSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else {
            rec = this.qbrService.calculateDiscountSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
          }


        } else if (rec.type === 'Prevent Rate Increases') {
          rec.spend_increase_pct = 0;
          rec.desired_rate_increase_pct = 3;

          const rateIncreaseData = await this.recService.getRateIncreaseData(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
          rec.potential_savings = rateIncreaseData.savings;
          if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
            if (elementIndex === 1) {
              rec.savingsData = this.parent.topPA;
            } else if (elementIndex == 2) {
              rec.savingsData = this.parent.secondPA;
            } else {
              rec.savingsData = this.parent.reportData;
            }
          } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (elementIndex === 1) {
              rec.savingsData = this.parent.topPATopFirm;
            } else if (elementIndex == 2) {
              rec.savingsData = this.parent.topPASecondFirm;
            } else {
              rec.savingsData = this.parent.reportData;
            }
          } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              rec.savingsData = this.parent.topPATopFirm;
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              rec.savingsData = this.parent.secondPATopFirm;
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              rec.savingsData = this.parent.topPASecondFirm;
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              rec.savingsData = this.parent.secondPASecondFirm;
            } else {
              rec.savingsData = this.parent.reportData;
            }
          } else {
            rec.savingsData = this.parent.reportData;
          }
          // rec.savingsData =
          rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);
          rec.practiceAreaSetting = this.practiceAreaSetting;
        } else if (rec.type === 'Partner / Associate Work Allocation') {
          rec.desired_partner_pct_of_hours_worked = 35;
          rec.desired_associate_pct_of_hours_worked = 65;
          rec.desired_paralegal_pct_of_hours_worked = 0;
          rec.spend_increase_pct = 0;

          if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
            if (elementIndex === 1) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.topPA, this.parent.report.querystring.expenses, false);
            } else if (elementIndex == 2) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.secondPA, this.parent.report.querystring.expenses, false);
            } else {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (elementIndex === 1) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (elementIndex == 2) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.secondPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.secondPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else {
            rec = this.qbrService.calculateStaffingAllocationSavings(rec, this.parent.reportData, this.parent.report.querystring.expenses, true);
          }

        } else if (rec.type === 'Decrease Block Billing') {
          rec.desired_block_billing_pct = 20;

          if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
            if (elementIndex === 1) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.topPA);
            } else if (elementIndex == 2) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.secondPA);
            } else {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.reportData);
            }
          } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (elementIndex === 1) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.topPATopFirm);
            } else if (elementIndex == 2) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.topPASecondFirm);
            } else {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.reportData);
            }
          } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.topPATopFirm);
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.secondPATopFirm);
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.topPASecondFirm);
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.secondPASecondFirm);
            } else {
              rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.reportData);
            }
          } else {
            rec = this.qbrService.calculateBlockBillingSavings(rec, this.parent.reportData);
          }
        } else if (rec.type === 'Shift Work to Other Firms') {

          const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
          console.log("elem index: ", elementIndex)
          if (elementIndex === 1) {
            rec = this.qbrService.calculateShiftFirmsSavings(rec, this.parent.topPATopFirm, this.parent.topPASecondFirm);
          } else if (elementIndex == 2) {
            rec = this.qbrService.calculateShiftFirmsSavings(rec, this.parent.secondPATopFirm, this.parent.secondPASecondFirm);
          } else {
            rec = this.qbrService.calculateShiftFirmsSavings(rec, this.parent.topPATopFirm, this.parent.topPASecondFirm);
          }




        } else if (rec.type === 'Custom Recommendation') {
          rec.potential_savings = 0;

        }
        // rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);
        this.nextSteps.push(rec);
      }

    }
    this.showNextSteps = true;
  }

  updateFirmDropdown(evt, rec) {
    rec.practice_area = evt.value;
    if (this.topPAs.length > 2) {
      if (evt.value === this.topPAs[2].label) {
        rec.currentFirmOptions = this.secondPAFirms;
        rec.firm_id = null;
      } else {
        rec.currentFirmOptions = this.topPAFirms;
        rec.firm_id = null;
      }
    } else {
      rec.currentFirmOptions = this.topPAFirms;
    }
    if (rec.type === 'Increase Discounts') {
      this.updateDiscountRecommendation(rec);
    } else if (rec.type === 'Prevent Rate Increases') {
      this.updateRateIncreaseRecommendation(rec);
    } else if (rec.type === 'Partner / Associate Work Allocation') {
      this.updateWorkAllocationRecommendation(rec);
    } else if (rec.type === 'Decrease Block Billing') {
      this.updateBlockBillingRecommendation(rec);
    } else if (rec.type === 'Shift Work to Other Firms') {
      this.updateShiftWorkRecommendation(rec);
    }
    if (rec.included) {
      this.saveInsight(rec);
    }
    // console.log("rec: ", rec);
    console.log("form: ", this.insightsForm);
  }

  updateFirmSelection(evt, rec) {
    rec.firm_id = evt.value;
    const nameCheck = this.currentFirmOptions.filter(f => f.value === evt.value);
    if (nameCheck.length > 0) {
      rec.firm_name = nameCheck[0].label;
    }
    if (rec.type === 'Increase Discounts') {

      this.updateDiscountRecommendation(rec);
    } else if (rec.type === 'Prevent Rate Increases') {
      this.updateRateIncreaseRecommendation(rec);
    } else if (rec.type === 'Partner / Associate Work Allocation') {
      this.updateWorkAllocationRecommendation(rec);
    } else if (rec.type === 'Decrease Block Billing') {
      this.updateBlockBillingRecommendation(rec);
    } else if (rec.type === 'Shift Work to Other Firms') {
      this.updateShiftWorkRecommendation(rec);
    }
    if (rec.included) {
      this.saveInsight(rec);
    }
    console.log("form: ", this.insightsForm);
  }

  addRecommendation(recType: string): void {
    console.log("addRecommendation: ", recType);
    console.log("check: ", recommendationPlaceholderMapping[recType]);
    let sortOrder;
    if (this.editMode) {
      const sorted = this.recommendations.sort((a,b) => a.sort_order - b.sort_order);
      console.log("sorted: ", sorted);
      if (sorted.at(-1)) {
        sortOrder = sorted.at(-1).sort_order + 1;
      } else {
        sortOrder = this.recommendations.length + 1;
      }
    } else {
      sortOrder = this.recommendations.length + 1;
    }
    const newRec = {
      id: null,
      firm_id: null,
      practice_area: null,
      recommendation_type_id: recommendationPlaceholderMapping[recType].id,
      opportunity: recommendationPlaceholderMapping[recType].opportunity_placeholder,
      why_it_matters: recommendationPlaceholderMapping[recType].why_it_matters_placeholder,
      action: recommendationPlaceholderMapping[recType].action_placeholder,
      potential_savings: 0,
      title: recType,
      type: recType,
      included: false,
      currentFirmOptions: this.topPAFirms,
      notable_metrics: '',
      sort_order: sortOrder,
      section: 'Insights',
      qbr_id: null,
      opp_edited: false,
      metrics_edited: false
    };
    if (this.parent.report !== null && this.parent.report !== undefined) {
      newRec.qbr_id = this.parent.report.id;
    }
    this.insightsForm.addControl(newRec.sort_order + 'include', new FormControl(newRec.included));
    this.insightsForm.addControl(newRec.sort_order + 'title', new FormControl(newRec.title, [Validators.minLength(10), Validators.maxLength(60)]));
    this.insightsForm.addControl(newRec.sort_order + 'opportunity', new FormControl(newRec.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
    this.insightsForm.addControl(newRec.sort_order + 'matters', new FormControl(newRec.why_it_matters, [Validators.minLength(40), Validators.maxLength(200)]));
    this.insightsForm.addControl(newRec.sort_order + 'firm', new FormControl(newRec.firm_id));
    this.insightsForm.addControl(newRec.sort_order + 'practice_area', new FormControl(newRec.practice_area));
    this.insightsForm.addControl(newRec.sort_order + 'metrics', new FormControl(newRec.notable_metrics, [Validators.minLength(40), Validators.maxLength(200)]));

    if (newRec.type === 'Increase Discounts') {
      this.updateDiscountRecommendation(newRec);
    } else if (newRec.type === 'Prevent Rate Increases') {
      this.updateRateIncreaseRecommendation(newRec);
    } else if (newRec.type === 'Partner / Associate Work Allocation') {
      this.updateWorkAllocationRecommendation(newRec);
    } else if (newRec.type === 'Decrease Block Billing') {
      this.updateBlockBillingRecommendation(newRec);
    } else if (newRec.type === 'Shift Work to Other Firms') {
      this.updateShiftWorkRecommendation(newRec);
    }
    this.recommendations.push(newRec);
    console.log("form after new: ", this.insightsForm);
    console.log("recommendations after new: ", this.recommendations);
    console.log("newRec: ", newRec);
  }

  async processRecommendations(): Promise<void> {
    console.log("processRecommendations")
    for (const rec of this.recommendations) {
      rec.section = 'Insights';
      rec.qbr_id = this.parent.report.id;
      rec.currentFirmOptions = this.currentFirmOptions;
      rec.action = recommendationPlaceholderMapping[rec.type].action_placeholder;
      if (rec.type === 'Partner / Associate Work Allocation' || rec.type === 'Decrease Block Billing') {
        if (rec.firm_name !== null && rec.firm_name !== undefined) {
          rec.action = rec.action.replace('[ Firm ]', rec.firm_name);
        }
      }

      if (this.topPAs.length > 2) {
        if (rec.practice_area === this.topPAs[2].label) {
          rec.currentFirmOptions = this.secondPAFirms;
        } else {
          rec.currentFirmOptions = this.topPAFirms;
        }
      } else {
        rec.currentFirmOptions = this.topPAFirms;
      }
      this.insightsForm.addControl(rec.sort_order + 'include', new FormControl(rec.included));
      this.insightsForm.addControl(rec.sort_order + 'title', new FormControl(rec.title, [Validators.minLength(10), Validators.maxLength(60)]));
      this.insightsForm.addControl(rec.sort_order + 'opportunity', new FormControl(rec.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
      this.insightsForm.addControl(rec.sort_order + 'matters', new FormControl(rec.why_it_matters, [Validators.minLength(40), Validators.maxLength(200)]));
      this.insightsForm.addControl(rec.sort_order + 'firm', new FormControl(rec.firm_id));
      this.insightsForm.addControl(rec.sort_order + 'practice_area', new FormControl(rec.practice_area));
      if (rec.id === null || rec.id === undefined) {
        if (rec.type === 'Increase Discounts') {
          if (this.parent.report.querystring.expenses === true) {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.reportData.total_spend_including_expenses.total) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.reportData.total_spend_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.reportData.total_spend.total) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.reportData.total_spend_trend) + '%';
          }
        } else if (rec.type === 'Prevent Rate Increases') {
          rec.desired_rate_increase_pct = 3;
          const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
          console.log("rateIncreaseData: ", rateIncreaseData)
          if (rateIncreaseData.details) {
            if (rateIncreaseData.details.length > 0) {
              rec.notable_metrics = 'Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
            }
            if (rateIncreaseData.details.length > 1) {
              rec.notable_metrics += 'Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
            }
          }
        } else if (rec.type === 'Partner / Associate Work Allocation') {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
        } else if (rec.type === 'Decrease Block Billing') {
          if (this.parent.reportData.bb_trend > 0) {
            rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
          } else if (this.parent.reportData.bb_trend < 0) {
            rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
          } else {
            rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
          }
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
          this.insightsForm.controls[rec.sort_order + 'opportunity'].setValue(rec.opportunity);
        } else if (rec.type === 'Shift Work to Other Firms') {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        } else if (rec.type === 'Custom Recommendation') {
          rec.notable_metrics = '';
        }
      }

      this.insightsForm.addControl(rec.sort_order + 'metrics', new FormControl(rec.notable_metrics, [Validators.minLength(40), Validators.maxLength(200)]));
    }
    this.recommendationsProcessed = true;
    console.log("recs now: ", this.recommendations)
    console.log("form: ", this.insightsForm)
  }

  async checkboxClicked(evt, rec) {
    console.log("checkboxClicked evt: ", evt)
    console.log("checkboxClicked rec: ", rec)
    rec.included = evt.checked;
    const tempSortOrder = rec.sort_order;
    let alreadySaved = false;
    if (rec.id !== null) {
      alreadySaved = true;
    }
    console.log("opp", this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value)
    console.log("title", this.insightsForm.controls[rec.sort_order.toString() + 'title'].value)
    console.log("metrics", this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value)
    console.log("matters", this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value)

    if (this.insightsForm.hasError('tooManySelected') !== true) {
      // console.log("opp", this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value)
      // console.log("title", this.insightsForm.controls[rec.sort_order.toString() + 'title'].value)
      // console.log("metrics", this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value)
      // console.log("matters", this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value)

      rec.opportunity = this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value;
      rec.title = this.insightsForm.controls[rec.sort_order.toString() + 'title'].value;
      rec.notable_metrics = this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value;
      rec.why_it_matters = this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value;

      rec = await this.qbrService.saveRecommendation(rec);
      const elementIndex = this.recommendations.findIndex(r => r.sort_order === tempSortOrder);
      console.log("elementIndex: ", elementIndex)
      console.log("RECOMMENDATIONS: ", this.recommendations);
      if (!alreadySaved) {
        this.recommendations[elementIndex].id = rec.id;
      }
    }
  }

  async saveInsight(rec) {
    console.log("saveInsight: ", rec, this.insightsForm.hasError('tooManySelected') )
    let alreadySaved = false;
    const tempSortOrder = rec.sort_order;
    if (rec.id !== null) {
      alreadySaved = true;
    }
    if (rec.opportunity !== this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value) {
      rec.opp_edited = true;
    }
    if (rec.notable_metrics !== this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value) {
      rec.metrics_edited = true;
    }
    rec.opportunity = this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value;
    rec.title = this.insightsForm.controls[rec.sort_order.toString() + 'title'].value;
    rec.notable_metrics = this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value;
    rec.why_it_matters = this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value;
    if (rec.included === true && this.insightsForm.hasError('tooManySelected') !== true) {
      // rec.opportunity = this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value;
      // rec.title = this.insightsForm.controls[rec.sort_order.toString() + 'title'].value;
      // rec.notable_metrics = this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value;
      // rec.why_it_matters = this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value;
      rec = await this.qbrService.saveRecommendation(rec);
      const elementIndex = this.recommendations.findIndex(r => r.sort_order === tempSortOrder);
      // console.log("elementIndex: ", elementIndex)
      console.log("RECOMMENDATIONS: ", this.recommendations);
      if (!alreadySaved) {
        this.recommendations[elementIndex].id = rec.id;
      }
    }
  }


  updateDiscountRecommendation(rec) {
    console.log("updateDiscountRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      console.log("IF EVAL: ", rec.metrics_edited, rec.practice_area, rec.firm_id);
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPA.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPA.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPA.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPA.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPA.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPA.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPA.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPA.total_billed_trend) + '%';
          }
        }
      } else if (elementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPA.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPA.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPA.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPA.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPA.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPA.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPA.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPA.total_billed_trend) + '%';
          }
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      console.log("FIRST ELSE IF EVAL: ", rec.metrics_edited, rec.practice_area, rec.firm_id);
      const elementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (elementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          }
        }
      } else if (elementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          }
        }
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      console.log("SECOND ELSE IF EVAL: ", rec.metrics_edited, rec.practice_area, rec.firm_id);
      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
      if (firmElementIndex === 1 && paElementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          }
        }
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%';
          }
        }
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%';
          }
        }
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPASecondFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPASecondFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPASecondFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.secondPASecondFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%';
          }
        }
      } else {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          } else {
            rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%';
          }
        }
      }
    } else {
      console.log("ELSE EVAL: ", rec.metrics_edited, rec.practice_area, rec.firm_id);
      if (this.parent.report.querystring.expenses === true) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.reportData.total_spend_including_expenses.total) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.reportData.total_spend_trend) + '%';
        } else {
          rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.reportData.total_spend_including_expenses.total) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.reportData.total_spend_trend) + '%';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nTotal Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.reportData.total_spend.total) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.reportData.total_spend_trend) + '%';
        } else {
          rec.notable_metrics = 'Total Spend (Report Timeframe): ' + moneyFormatter.format(this.parent.reportData.total_spend.total) + '\n' + 'Total Spend Trend: ' + formatter.format(this.parent.reportData.total_spend_trend) + '%';
        }
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  async updateRateIncreaseRecommendation(rec): Promise<void> {
    console.log("updateRateIncreaseRecommendation: ", rec);
    rec.desired_rate_increase_pct = 3;
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      console.log("rateIncreaseData: ", rateIncreaseData)
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + rec.practice_area + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          } else {
            rec.notable_metrics = rec.practice_area + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += rec.practice_area + ' Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {

      const rateIncreaseData = await this.recService.getRateIncreaseData(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      console.log("rateIncreaseData: ", rateIncreaseData)
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + rec.firm_name + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          } else {
            rec.notable_metrics = rec.firm_name + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += rec.firm_name + ' Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }

    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {

      const rateIncreaseData = await this.recService.getRateIncreaseData(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      console.log("rateIncreaseData: ", rateIncreaseData)
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + rec.firm_name + ' - ' + rec.practice_area + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          } else {
            rec.notable_metrics = rec.firm_name + ' - ' + rec.practice_area + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += rec.firm_name + ' - ' + rec.practice_area + ' Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }
    } else {
      const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      console.log("rateIncreaseData: ", rateIncreaseData)
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\nAssociate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          } else {
            rec.notable_metrics = 'Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += 'Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  updateWorkAllocationRecommendation(rec): void {
    console.log("updateWorkAllocationRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          console.log('the fuck')
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPA.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPA.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPA.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPA.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPA.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPA.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPA.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPA.partner_hrs_trend) + '%';
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPA.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPA.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPA.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPA.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPA.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPA.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPA.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPA.partner_hrs_trend) + '%';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.partner_hrs_trend) + '%';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
        }
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {

      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);

      if (firmElementIndex === 1 && paElementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
        }
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPATopFirm.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPATopFirm.partner_hrs_trend) + '%';
        }
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.partner_hrs_trend) + '%';
        }
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPASecondFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPASecondFirm.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPASecondFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPASecondFirm.partner_hrs_trend) + '%';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
        } else {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
          rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
        }
      }
    } else {
      if (rec.metric_edited) {
        rec.notable_metrics += '\nAssoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
        rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
      } else {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
        rec.notable_metrics += '\nPartner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  updateBlockBillingRecommendation(rec): void {
    console.log("updateBlockBillingRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.topPA.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPA.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPA.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPA.bb_trend) + '%';
        }
        if (this.parent.topPA.bb_trend > 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.topPA.bb_trend) + '%';
        } else if (this.parent.topPA.bb_trend < 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.topPA.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPA.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPA.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPA.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPA.bb_trend) + '%';
        }
        if (this.parent.secondPA.bb_trend > 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.secondPA.bb_trend) + '%';
        } else if (this.parent.secondPA.bb_trend < 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.secondPA.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        }
        if (this.parent.reportData.bb_trend > 0) {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else if (this.parent.reportData.bb_trend < 0) {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        }
        if (this.parent.topPATopFirm.bb_trend > 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPATopFirm.firm_name + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        } else if (this.parent.topPATopFirm.bb_trend < 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPATopFirm.firm_name + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing for ' + this.parent.topPATopFirm.firm_name + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        }
        if (this.parent.topPASecondFirm.bb_trend > 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPASecondFirm.firm_name + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        } else if (this.parent.topPASecondFirm.bb_trend < 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPASecondFirm.firm_name + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing for ' + this.parent.topPASecondFirm.firm_name + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        }
        if (this.parent.reportData.bb_trend > 0) {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else if (this.parent.reportData.bb_trend < 0) {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
      if (firmElementIndex === 1 && paElementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        }
        if (this.parent.topPATopFirm.bb_trend > 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPATopFirm.firm_name + ' in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        } else if (this.parent.topPASecondFirm.bb_trend < 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPATopFirm.firm_name + ' in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing for ' + this.parent.topPATopFirm.firm_name + ' in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPATopFirm.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPATopFirm.bb_trend) + '%';
        }
        if (this.parent.secondPATopFirm.bb_trend > 0) {
          rec.opportunity = 'Block billing for ' + this.parent.secondPATopFirm.firm_name + ' in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.secondPATopFirm.bb_trend) + '%';
        } else if (this.parent.secondPATopFirm.bb_trend < 0) {
          rec.opportunity = 'Block billing for ' + this.parent.secondPATopFirm.firm_name + ' in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.secondPATopFirm.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing for ' + this.parent.secondPATopFirm.firm_name + ' in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        }
        if (this.parent.topPASecondFirm.bb_trend > 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPASecondFirm.firm_name + ' in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        } else if (this.parent.topPASecondFirm.bb_trend < 0) {
          rec.opportunity = 'Block billing for ' + this.parent.topPASecondFirm.firm_name + ' in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing for ' + this.parent.topPASecondFirm.firm_name + ' in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPASecondFirm.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPASecondFirm.bb_trend) + '%';
        }
        if (this.parent.secondPASecondFirm.bb_trend > 0) {
          rec.opportunity = 'Block billing for ' + this.parent.secondPASecondFirm.firm_name + ' in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.secondPASecondFirm.bb_trend) + '%';
        } else if (this.parent.topPASecondFirm.bb_trend < 0) {
          rec.opportunity = 'Block billing for ' + this.parent.secondPASecondFirm.firm_name + ' in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.secondPASecondFirm.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing for ' + this.parent.secondPASecondFirm.firm_name + ' in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else {
          rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        }
        if (this.parent.reportData.bb_trend > 0) {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else if (this.parent.reportData.bb_trend < 0) {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      }
    } else {
      if (rec.metrics_edited) {
        rec.notable_metrics += '\nBlock Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      } else {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      }
      if (this.parent.reportData.bb_trend > 0) {
        rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      } else if (this.parent.reportData.bb_trend < 0) {
        rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      } else {
        rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
      }
    }
    this.insightsForm.controls[rec.sort_order + 'opportunity'].setValue(rec.opportunity);
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  updateShiftWorkRecommendation(rec): void {
    console.log("updateShiftWorkRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate);
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate);
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        }
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
      if (firmElementIndex === 1 && paElementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate);
        }
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate);
        }
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        }
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate);
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        } else {
          rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                                'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
        }
      }
    } else {
      if (rec.metrics_edited) {
        rec.notable_metrics += '\nBlended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                              'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      } else {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                              'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

}
