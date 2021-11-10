import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';

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
  nextStepsValid: boolean = false;
  @Input() recommendations: any;
  @Input() topPAs: SelectItem[];
  @Input() topPAFirms: SelectItem[];
  @Input() secondPAFirms: SelectItem[];
  @Input() editMode: boolean;
  @Input() expenses: boolean;
  @Input() reportData: any;
  @Input() practiceAreaSetting: string;
  // @ViewChild(QbrNextStepsComponent) nextStepsComp: QbrNextStepsComponent;


  constructor(private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public filtersService: FiltersService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public datepipe: DatePipe,
              public router: Router,
              private qbrService: QbrService,
              public parent: QbrCreationComponent,
              private recService: RecommendationService) {}

  ngOnInit(): void {
    this.insightsForm.validator =  this.validateInsightsSelection();
    if (this.editMode) {
      this.nextSteps = this.recommendations.filter(r => r.section === 'Next Steps');
      this.recommendations = this.recommendations.filter(r => r.section === 'Insights');
      if (this.nextSteps.length > 0) {
        this.showNextSteps = true;
      }
    }
    this.currentFirmOptions = this.topPAFirms;
    this.processRecommendations();
    // console.log("recs: ", this.recommendations)
    // console.log("nextSteps: ", this.nextSteps)
    // console.log("INSIGHT EXPENSES: ", this.parent.report.querystring.expenses)
    // console.log("INSIGHT FORM: ", this.insightsForm)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && !changes.expenses.firstChange) {
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


  updateFormStatus(status: string): void {
    // console.log("updateFormStatus: ", status)
    if (status === 'VALID') {
      this.nextStepsValid = true;
    } else {
      this.nextStepsValid = false;
    }
    // console.log("updateFormStatus: ", status, this.nextStepsValid)
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
    const savedInsights = this.recommendations.map(r => Object.assign({}, r, {id: null}));
    // console.log("savedInsights: ", savedInsights);
    for (const rec of this.recommendations) {
      if (rec.included) {
        this.saveInsight(rec);
      }
    }
    for (let savedInsight of savedInsights) {
      // if (!this.editMode) {
      //   rec.id = null;
      // }
      // let savedInsight = rec;
      if (savedInsight.included) {

        if (savedInsight.type === 'Increase Discounts') {
          savedInsight.current_discount_pct = 0;
          savedInsight.spend_increase_pct = 0;
          savedInsight.recommended_discount_pct_lower_range = 5;
          savedInsight.recommended_discount_pct_upper_range = 10;
          if ((savedInsight.practice_area !== null && savedInsight.practice_area !== undefined) && (savedInsight.firm_id === null || savedInsight.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === savedInsight.practice_area);
            if (elementIndex === 1) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.topPA, this.parent.report.querystring.expenses, false);
            } else if (elementIndex === 2) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.secondPA, this.parent.report.querystring.expenses, false);
            } else {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if ((savedInsight.practice_area === null || savedInsight.practice_area === undefined) && (savedInsight.firm_id !== null && savedInsight.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (elementIndex === 1) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (elementIndex === 2) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if (savedInsight.practice_area !== null && savedInsight.practice_area !== undefined && savedInsight.firm_id !== null && savedInsight.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === savedInsight.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.secondPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.secondPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else {
            savedInsight = this.qbrService.calculateDiscountSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
          }


        } else if (savedInsight.type === 'Prevent Rate Increases') {
          savedInsight.spend_increase_pct = 0;
          savedInsight.desired_rate_increase_pct = 3;

          const rateIncreaseData = await this.recService.getRateIncreaseData(savedInsight, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
          savedInsight.potential_savings = rateIncreaseData.savings;
          if ((savedInsight.practice_area !== null && savedInsight.practice_area !== undefined) && (savedInsight.firm_id === null || savedInsight.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === savedInsight.practice_area);
            if (elementIndex === 1) {
              savedInsight.savingsData = this.parent.topPA;
            } else if (elementIndex === 2) {
              savedInsight.savingsData = this.parent.secondPA;
            } else {
              savedInsight.savingsData = this.parent.reportData;
            }
          } else if ((savedInsight.practice_area === null || savedInsight.practice_area === undefined) && (savedInsight.firm_id !== null && savedInsight.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (elementIndex === 1) {
              savedInsight.savingsData = this.parent.topPATopFirm;
            } else if (elementIndex === 2) {
              savedInsight.savingsData = this.parent.topPASecondFirm;
            } else {
              savedInsight.savingsData = this.parent.reportData;
            }
          } else if (savedInsight.practice_area !== null && savedInsight.practice_area !== undefined && savedInsight.firm_id !== null && savedInsight.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === savedInsight.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              savedInsight.savingsData = this.parent.topPATopFirm;
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              savedInsight.savingsData = this.parent.secondPATopFirm;
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              savedInsight.savingsData = this.parent.topPASecondFirm;
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              savedInsight.savingsData = this.parent.secondPASecondFirm;
            } else {
              savedInsight.savingsData = this.parent.reportData;
            }
          } else {
            savedInsight.savingsData = this.parent.reportData;
          }
          // rec.savingsData =
          savedInsight.potential_savings_formatted = moneyFormatter.format(savedInsight.potential_savings);
          savedInsight.practiceAreaSetting = this.practiceAreaSetting;
        } else if (savedInsight.type === 'Partner / Associate Work Allocation') {
          savedInsight.desired_partner_pct_of_hours_worked = 35;
          savedInsight.desired_associate_pct_of_hours_worked = 65;
          savedInsight.desired_paralegal_pct_of_hours_worked = 0;
          savedInsight.spend_increase_pct = 0;

          if ((savedInsight.practice_area !== null && savedInsight.practice_area !== undefined) && (savedInsight.firm_id === null || savedInsight.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === savedInsight.practice_area);
            if (elementIndex === 1) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.topPA, this.parent.report.querystring.expenses, false);
            } else if (elementIndex === 2) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.secondPA, this.parent.report.querystring.expenses, false);
            } else {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if ((savedInsight.practice_area === null || savedInsight.practice_area === undefined) && (savedInsight.firm_id !== null && savedInsight.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (elementIndex === 1) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (elementIndex === 2) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else if (savedInsight.practice_area !== null && savedInsight.practice_area !== undefined && savedInsight.firm_id !== null && savedInsight.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === savedInsight.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.topPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.secondPATopFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.topPASecondFirm, this.parent.report.querystring.expenses, false);
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.secondPASecondFirm, this.parent.report.querystring.expenses, false);
            } else {
              savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
            }
          } else {
            savedInsight = this.qbrService.calculateStaffingAllocationSavings(savedInsight, this.parent.reportData, this.parent.report.querystring.expenses, true);
          }

        } else if (savedInsight.type === 'Decrease Block Billing') {
          savedInsight.desired_block_billing_pct = 20;

          if ((savedInsight.practice_area !== null && savedInsight.practice_area !== undefined) && (savedInsight.firm_id === null || savedInsight.firm_id === undefined)) {
            const elementIndex = this.topPAs.findIndex(pa => pa.label === savedInsight.practice_area);
            if (elementIndex === 1) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.topPA);
            } else if (elementIndex === 2) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.secondPA);
            } else {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.reportData);
            }
          } else if ((savedInsight.practice_area === null || savedInsight.practice_area === undefined) && (savedInsight.firm_id !== null && savedInsight.firm_id !== undefined)) {
            const elementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (elementIndex === 1) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.topPATopFirm);
            } else if (elementIndex === 2) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.topPASecondFirm);
            } else {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.reportData);
            }
          } else if (savedInsight.practice_area !== null && savedInsight.practice_area !== undefined && savedInsight.firm_id !== null && savedInsight.firm_id !== undefined) {
            let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            if (firmElementIndex === -1) {
              firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === savedInsight.firm_id);
            }
            const paElementIndex = this.topPAs.findIndex(pa => pa.value === savedInsight.practice_area);
            if (firmElementIndex === 1 && paElementIndex === 1) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.topPATopFirm);
            } else if (firmElementIndex === 1 && paElementIndex === 2) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.secondPATopFirm);
            } else if (firmElementIndex === 2 && paElementIndex === 1) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.topPASecondFirm);
            } else if (firmElementIndex === 2 && paElementIndex === 2) {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.secondPASecondFirm);
            } else {
              savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.reportData);
            }
          } else {
            savedInsight = this.qbrService.calculateBlockBillingSavings(savedInsight, this.parent.reportData);
          }
        } else if (savedInsight.type === 'Shift Work to Other Firms') {

          const elementIndex = this.topPAs.findIndex(pa => pa.label === savedInsight.practice_area);
          // console.log("elem index: ", elementIndex)
          if (elementIndex === 1) {
            savedInsight = this.qbrService.calculateShiftFirmsSavings(savedInsight, this.parent.topPATopFirm, this.parent.topPASecondFirm);
          } else if (elementIndex === 2) {
            savedInsight = this.qbrService.calculateShiftFirmsSavings(savedInsight, this.parent.secondPATopFirm, this.parent.secondPASecondFirm);
          } else {
            savedInsight = this.qbrService.calculateShiftFirmsSavings(savedInsight, this.parent.topPATopFirm, this.parent.topPASecondFirm);
          }

        } else if (savedInsight.type === 'Custom Recommendation') {
          savedInsight.potential_savings = 0;

        }
        // rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);
        this.nextSteps.push(savedInsight);
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
    // console.log("form: ", this.insightsForm);
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
    // console.log("form: ", this.insightsForm);
  }

  addRecommendation(recType: string): void {
    // console.log("addRecommendation: ", recType);
    // console.log("check: ", recommendationPlaceholderMapping[recType]);
    let sortOrder;
    if (this.editMode) {
      const sorted = this.recommendations.sort((a, b) => a.sort_order - b.sort_order);
      // console.log("sorted: ", sorted);
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
    // console.log("form after new: ", this.insightsForm);
    // console.log("recommendations after new: ", this.recommendations);
    // console.log("newRec: ", newRec);
  }

  async processRecommendations(): Promise<void> {
    // console.log("processRecommendations")
    for (const rec of this.recommendations) {
      rec.section = 'Insights';
      rec.qbr_id = this.parent.report.id;
      rec.currentFirmOptions = this.currentFirmOptions;
      rec.action = recommendationPlaceholderMapping[rec.type].action_placeholder;

      if (this.topPAs.length > 2) {
        if (rec.practice_area === this.topPAs[2].label) {
          rec.currentFirmOptions = this.secondPAFirms;
        } else {
          rec.currentFirmOptions = this.topPAFirms;
        }
      } else {
        rec.currentFirmOptions = this.topPAFirms;
      }

      if (rec.firm_id !== null && rec.firm_id !== undefined) {
        const filteredFirm = rec.currentFirmOptions.filter(firm => firm.value === rec.firm_id);
        // console.log("filtered firm: ", filteredFirm)
        // console.log("currentOptions: ", rec.currentFirmOptions, rec.firm_id)
        if (filteredFirm.length > 0) {
          rec.firm_name = filteredFirm[0].label;
        }
      }
      if (rec.type === 'Partner / Associate Work Allocation' || rec.type === 'Decrease Block Billing') {

        if (rec.firm_name !== null && rec.firm_name !== undefined) {
          rec.action = rec.action.replaceAll('[ Firm ]', rec.firm_name);
        } else {
          rec.action = rec.action.replaceAll('[ Firm ]', 'your firms');
        }
      }

      // console.log("REC PROCESSING: ", rec);
      this.insightsForm.addControl(rec.sort_order + 'include', new FormControl(rec.included));
      this.insightsForm.addControl(rec.sort_order + 'title', new FormControl(rec.title, [Validators.minLength(10), Validators.maxLength(60)]));
      this.insightsForm.addControl(rec.sort_order + 'opportunity', new FormControl(rec.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
      this.insightsForm.addControl(rec.sort_order + 'matters', new FormControl(rec.why_it_matters, [Validators.minLength(40), Validators.maxLength(200)]));
      this.insightsForm.addControl(rec.sort_order + 'firm', new FormControl(rec.firm_id));
      this.insightsForm.addControl(rec.sort_order + 'practice_area', new FormControl(rec.practice_area));
      if (rec.id === null || rec.id === undefined) {
        if (rec.type === 'Increase Discounts') {
          if (this.parent.report.querystring.expenses === true) {
            rec.notable_metrics = moneyFormatter.format(this.parent.reportData.total_spend_including_expenses.total) + '\nTotal Spend\n' + formatter.format(this.parent.reportData.total_spend_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.reportData.total_spend.total) + '\nTotal Spend\n' + formatter.format(this.parent.reportData.total_spend_trend) + '%\nTotal Spend Trend';
          }
        } else if (rec.type === 'Prevent Rate Increases') {
          rec.desired_rate_increase_pct = 3;
          const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
          if (rateIncreaseData.details) {
            if (rateIncreaseData.details.length > 0) {
              rec.notable_metrics = formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
            }
            if (rateIncreaseData.details.length > 1) {
              rec.notable_metrics += formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%\nAvg. Partner Rate Increase';
            }
          }
        } else if (rec.type === 'Partner / Associate Work Allocation') {
          rec.notable_metrics = moneyFormatter.format(this.parent.reportData.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else if (rec.type === 'Decrease Block Billing') {
          if (this.parent.reportData.bb_trend > 0) {
            rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
          } else if (this.parent.reportData.bb_trend < 0) {
            rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
          } else {
            rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
          }
          rec.notable_metrics = formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
          this.insightsForm.controls[rec.sort_order + 'opportunity'].setValue(rec.opportunity);
        } else if (rec.type === 'Shift Work to Other Firms') {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' + this.parent.topPATopFirm.firm_name + ' Blended Rate\n' +
                                moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate) + '\n' + this.parent.topPASecondFirm.firm_name + ' Blended Rate';
        } else if (rec.type === 'Custom Recommendation') {
          rec.notable_metrics = '';
          rec.opportunity = '';
          rec.why_it_matters = '';
        }
      }

      this.insightsForm.addControl(rec.sort_order + 'metrics', new FormControl(rec.notable_metrics, [Validators.minLength(40), Validators.maxLength(200)]));
    }
    this.recommendationsProcessed = true;
    // console.log("recs now: ", this.recommendations)
    // console.log("form: ", this.insightsForm)
  }

  async checkboxClicked(evt, rec) {
    // console.log("checkboxClicked evt: ", evt)
    // console.log("checkboxClicked rec: ", rec)
    rec.included = evt.checked;
    const tempSortOrder = rec.sort_order;
    let alreadySaved = false;
    if (rec.id !== null) {
      alreadySaved = true;
    }
    // console.log("opp", this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value)
    // console.log("title", this.insightsForm.controls[rec.sort_order.toString() + 'title'].value)
    // console.log("metrics", this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value)
    // console.log("matters", this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value)

    if (this.insightsForm.hasError('tooManySelected') !== true) {
      rec.opportunity = this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value;
      rec.title = this.insightsForm.controls[rec.sort_order.toString() + 'title'].value;
      rec.notable_metrics = this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value;
      rec.why_it_matters = this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value;
      if (rec.opportunity === null) {
        rec.opportunity = '';
      }
      if (rec.notable_metrics === null) {
        rec.notable_metrics = '';
      }
      if (rec.why_it_matters === null) {
        rec.why_it_matters = '';
      }
      rec = await this.qbrService.saveRecommendation(rec);
      // console.log("rec: ", rec);
      const elementIndex = this.recommendations.findIndex(r => r.sort_order === tempSortOrder);
      // console.log("elementIndex: ", elementIndex)
      // console.log("RECOMMENDATIONS: ", this.recommendations);
      if (!alreadySaved) {
        this.recommendations[elementIndex].id = rec.id;
      }
    }
  }

  async saveInsight(rec) {
    // console.log("saveInsight: ", rec, this.insightsForm.hasError('tooManySelected') )
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
      rec = await this.qbrService.saveRecommendation(rec);
      const elementIndex = this.recommendations.findIndex(r => r.sort_order === tempSortOrder);
      // console.log("RECOMMENDATIONS: ", this.recommendations);
      if (!alreadySaved) {
        this.recommendations[elementIndex].id = rec.id;
      }
    }
  }


  updateDiscountRecommendation(rec) {
    // console.log("updateDiscountRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPA.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPA.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPA.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPA.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPA.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPA.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPA.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPA.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      } else if (elementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPA.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.secondPA.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.secondPA.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.secondPA.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPA.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.secondPA.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.secondPA.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.secondPA.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (elementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      } else if (elementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
      if (firmElementIndex === 1 && paElementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.secondPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.secondPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.secondPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPASecondFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPASecondFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPASecondFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.secondPASecondFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPASecondFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.secondPASecondFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.secondPASecondFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      } else {
        if (this.parent.report.querystring.expenses === true) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.total_billed_with_expenses) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        } else {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          } else {
            rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.total_billed) + '\nTotal Spend\n' + formatter.format(this.parent.topPATopFirm.total_billed_trend) + '%\nTotal Spend Trend';
          }
        }
      }
    } else {
      if (this.parent.report.querystring.expenses === true) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.reportData.total_spend_including_expenses.total) + '\nTotal Spend\n' + formatter.format(this.parent.reportData.total_spend_trend) + '%\nTotal Spend Trend';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.reportData.total_spend_including_expenses.total) + '\nTotal Spend\n' + formatter.format(this.parent.reportData.total_spend_trend) + '%\nTotal Spend Trend';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.reportData.total_spend.total) + '\nTotal Spend\n' + formatter.format(this.parent.reportData.total_spend_trend) + '%\nTotal Spend Trend';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.reportData.total_spend.total) + '\nTotal Spend\n' + formatter.format(this.parent.reportData.total_spend_trend) + '%\nTotal Spend Trend';
        }
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  async updateRateIncreaseRecommendation(rec): Promise<void> {
    // console.log("updateRateIncreaseRecommendation: ", rec);
    rec.desired_rate_increase_pct = 3;
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          } else {
            rec.notable_metrics = formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%\nAvg. Partner Rate Increase\n';
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const rateIncreaseData = await this.recService.getRateIncreaseData(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          } else {
            rec.notable_metrics = formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%\nAvg. Partner Rate Increase';
        }
      }

    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      const rateIncreaseData = await this.recService.getRateIncreaseData(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          } else {
            rec.notable_metrics = formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%\nAvg. Partner Rate Increase';
        }
      }
    } else {
      const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          if (rec.metrics_edited) {
            rec.notable_metrics += '\n' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          } else {
            rec.notable_metrics = formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\nAvg. Assoc Rate Increase\n';
          }
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%\nAvg. Partner Rate Increase';
        }
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  updateWorkAllocationRecommendation(rec): void {
    // console.log("updateWorkAllocationRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPA.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPA.partner_percent_hours_worked) + '%\nPartner % Hrs Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPA.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPA.partner_percent_hours_worked) +  '%\nPartner % Hrs Billed';
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPA.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.secondPA.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.secondPA.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.secondPA.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.reportData.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.reportData.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPASecondFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPASecondFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.reportData.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.reportData.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\nPartner Hours Billed';
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
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.secondPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.secondPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.secondPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPASecondFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPASecondFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPASecondFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.secondPASecondFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.secondPASecondFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.secondPASecondFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\nPartner Hours Billed';
        }
      }
    } else {
      if (rec.metric_edited) {
        rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.reportData.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\nPartner Hours Billed';
      } else {
        rec.notable_metrics = moneyFormatter.format(this.parent.reportData.avg_partner_rate) + '\nAvg. Partner Rate\n' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\nPartner Hours Billed';
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  updateBlockBillingRecommendation(rec): void {
    // console.log("updateBlockBillingRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + formatter.format(this.parent.topPA.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPA.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.topPA.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPA.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.secondPA.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.secondPA.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.secondPA.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.secondPA.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = '' + formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.secondPATopFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.secondPATopFirm.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.secondPATopFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.secondPATopFirm.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.secondPASecondFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.secondPASecondFirm.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.secondPASecondFirm.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.secondPASecondFirm.bb_trend) + '%\nBlock Billing Trend';
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
          rec.notable_metrics += '\n' + formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
        } else {
          rec.notable_metrics = formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
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
        rec.notable_metrics += '\n' + formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
      } else {
        rec.notable_metrics = formatter.format(this.parent.reportData.percent_block_billed) + '%\nPercent Block Billed\n' + formatter.format(this.parent.reportData.bb_trend) + '%\nBlock Billing Trend';
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
    // console.log("updateShiftWorkRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' + this.parent.topPATopFirm.firm_name + ' Blended Rate\n' +
                                  moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate) + '\n' + this.parent.topPASecondFirm.firm_name + ' Blended Rate';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' + this.parent.topPATopFirm.firm_name + ' Blended Rate\n' +
                                moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate) + '\n' + this.parent.topPASecondFirm.firm_name + ' Blended Rate';
        }
      } else if (elementIndex === 2) {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate) + '\n' + this.parent.secondPATopFirm.firm_name + ' Blended Rate\n' +
                                  moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate) + '\n' + this.parent.secondPASecondFirm.firm_name + ' Blended Rate';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate) + '\n' + this.parent.secondPATopFirm.firm_name + ' Blended Rate\n' +
                                moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate) + '\n' + this.parent.secondPASecondFirm.firm_name + ' Blended Rate';
        }
      } else {
        if (rec.metrics_edited) {
          rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' + this.parent.topPATopFirm.firm_name + ' Blended Rate\n' +
                                  moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate) + '\n' + this.parent.topPASecondFirm.firm_name + ' Blended Rate';
        } else {
          rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' + this.parent.topPATopFirm.firm_name + ' Blended Rate\n' +
                                moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate) + '\n' + this.parent.topPASecondFirm.firm_name + ' Blended Rate';
        }
      }
    }  else {
      if (rec.metrics_edited) {
        rec.notable_metrics += '\n' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' + this.parent.topPATopFirm.firm_name + ' Blended Rate\n' +
                                moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate) + '\n' + this.parent.topPASecondFirm.firm_name + ' Blended Rate';
      } else {
        rec.notable_metrics = moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' + this.parent.topPATopFirm.firm_name + ' Blended Rate\n' +
                              moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate) + '\n' + this.parent.topPASecondFirm.firm_name + ' Blended Rate';
      }
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

}
