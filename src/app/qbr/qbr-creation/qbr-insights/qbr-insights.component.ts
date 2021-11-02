import { Component, Input, OnInit } from '@angular/core';
import {CommonService, IClient} from '../../../shared/services/common.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {ActivatedRoute, Router} from '@angular/router';
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
export class QbrInsightsComponent implements OnInit {
  pendingRequest: Subscription;
  insightsForm = new FormGroup({});
  currentFirmOptions: SelectItem[];
  recommendationsProcessed: boolean = false;
  @Input() recommendations: any;
  @Input() topPAs: SelectItem[];
  @Input() topPAFirms: SelectItem[];
  @Input() secondPAFirms: SelectItem[];
  @Input() editMode: boolean;


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
    // this.insightsForm.addControl('startDate', new FormControl(null, Validators.required));
    this.insightsForm.validator =  this.validateInsightsSelection();
    this.currentFirmOptions = this.topPAFirms;
    this.processRecommendations();

    // console.log("recs: ", this.recommendations)
    // console.log("currentFirmOptions: ", this.currentFirmOptions);
    // console.log("topPAs: ", this.topPAs);
    // console.log("topPAFirms: ", this.topPAFirms);
    // console.log("secondPAFirms: ", this.secondPAFirms);
    // console.log("recommendationPlaceholderMapping: ", recommendationPlaceholderMapping)
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

  updateFirmDropdown(evt, rec) {
    // console.log("topPAs: ", this.topPAs)
    // console.log("currentFirmOptions: ", this.currentFirmOptions);
    // console.log("topPAFirms: ", this.topPAFirms);
    // console.log("secondPAFirms: ", this.secondPAFirms);
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
    } else if (rec.type === 'Associate Work Allocation') {
      this.updateAssociateWorkAllocationRecommendation(rec);
    } else if (rec.type === 'Partner Work Allocation') {
      this.updatePartnerWorkAllocationRecommendation(rec);
    } else if (rec.type === 'Decrease Block Billing') {
      this.updateBlockBillingRecommendation(rec);
    } else if (rec.type === 'Shift Work to Other Firms') {
      this.updateShiftWorkRecommendation(rec);
    }
    if (rec.included) {
      this.saveInsight(rec);
    }
    // console.log("rec: ", rec);
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
    } else if (rec.type === 'Associate Work Allocation') {
      this.updateAssociateWorkAllocationRecommendation(rec);
    } else if (rec.type === 'Partner Work Allocation') {
      this.updatePartnerWorkAllocationRecommendation(rec);
    } else if (rec.type === 'Decrease Block Billing') {
      this.updateBlockBillingRecommendation(rec);
    } else if (rec.type === 'Shift Work to Other Firms') {
      this.updateShiftWorkRecommendation(rec);
    }
    if (rec.included) {
      this.saveInsight(rec);
    }
  }

  addRecommendation(recType: string): void {
    // console.log("addRecommendation: ", type);
    // console.log("check: ", recommendationPlaceholderMapping[type]);
    let sortOrder;
    if (this.editMode) {
      if (this.recommendations.at(-1)) {
        sortOrder = this.recommendations.at(-1).sort_order + 1;
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
    this.insightsForm.addControl(newRec.sort_order + 'title', new FormControl(newRec.title, [Validators.minLength(10), Validators.maxLength(100)]));
    this.insightsForm.addControl(newRec.sort_order + 'opportunity', new FormControl(newRec.opportunity, [Validators.required, Validators.minLength(50), Validators.maxLength(400)]));
    this.insightsForm.addControl(newRec.sort_order + 'matters', new FormControl(newRec.why_it_matters, [Validators.minLength(50), Validators.maxLength(400)]));
    this.insightsForm.addControl(newRec.sort_order + 'firm', new FormControl(newRec.firm_id));
    this.insightsForm.addControl(newRec.sort_order + 'practice_area', new FormControl(newRec.practice_area));

    if (newRec.type === 'Increase Discounts') {
      this.updateDiscountRecommendation(newRec);
    } else if (newRec.type === 'Prevent Rate Increases') {
      this.updateRateIncreaseRecommendation(newRec);
    } else if (newRec.type === 'Associate Work Allocation') {
      this.updateAssociateWorkAllocationRecommendation(newRec);
    } else if (newRec.type === 'Partner Work Allocation') {
      this.updatePartnerWorkAllocationRecommendation(newRec);
    } else if (newRec.type === 'Decrease Block Billing') {
      this.updateBlockBillingRecommendation(newRec);
    } else if (newRec.type === 'Shift Work to Other Firms') {
      this.updateShiftWorkRecommendation(newRec);
    }
    this.recommendations.push(newRec);
    this.insightsForm.addControl(newRec.sort_order + 'metrics', new FormControl(newRec.notable_metrics));
    // console.log("form after new: ", this.insightsForm);
    // console.log("recommendations after new: ", this.recommendations);
    // console.log("newRec: ", newRec);
  }

  async processRecommendations(): Promise<void> {
    for (const rec of this.recommendations) {
      rec.section = 'Insights';
      rec.qbr_id = this.parent.report.id;
      rec.currentFirmOptions = this.currentFirmOptions;
      this.insightsForm.addControl(rec.sort_order + 'include', new FormControl(rec.included));
      this.insightsForm.addControl(rec.sort_order + 'title', new FormControl(rec.title, [Validators.minLength(10), Validators.maxLength(100)]));
      this.insightsForm.addControl(rec.sort_order + 'opportunity', new FormControl(rec.opportunity, [Validators.required, Validators.minLength(50), Validators.maxLength(400)]));
      this.insightsForm.addControl(rec.sort_order + 'matters', new FormControl(rec.why_it_matters, [Validators.minLength(50), Validators.maxLength(400)]));
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
          if (rateIncreaseData.details) {
            if (rateIncreaseData.details.length > 0) {
              rec.notable_metrics = 'Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
            }
            if (rateIncreaseData.details.length > 1) {
              rec.notable_metrics += 'Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
            }
          }
        } else if (rec.type === 'Associate Work Allocation') {
          rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
        } else if (rec.type === 'Partner Work Allocation') {
          rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
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

      this.insightsForm.addControl(rec.sort_order + 'metrics', new FormControl(rec.notable_metrics));
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

    // console.log("tempSortOrder: ", tempSortOrder)
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
    if (rec.included === true && this.insightsForm.hasError('tooManySelected') !== true) {
      rec.opportunity = this.insightsForm.controls[rec.sort_order.toString() + 'opportunity'].value;
      rec.title = this.insightsForm.controls[rec.sort_order.toString() + 'title'].value;
      rec.notable_metrics = this.insightsForm.controls[rec.sort_order.toString() + 'metrics'].value;
      rec.why_it_matters = this.insightsForm.controls[rec.sort_order.toString() + 'matters'].value;
      rec = await this.qbrService.saveRecommendation(rec);
      const elementIndex = this.recommendations.findIndex(r => r.sort_order === tempSortOrder);
      // console.log("elementIndex: ", elementIndex)
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
    // console.log("updateRateIncreaseRecommendation: ", rec);
    rec.desired_rate_increase_pct = 3;
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          rec.notable_metrics = rec.practice_area + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += rec.practice_area + ' Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {

      const rateIncreaseData = await this.recService.getRateIncreaseData(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          rec.notable_metrics = rec.firm_name + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += rec.firm_name + ' Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }

    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {

      const rateIncreaseData = await this.recService.getRateIncreaseData(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          rec.notable_metrics = rec.firm_name + ' - ' + rec.practice_area + ' Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += rec.firm_name + ' - ' + rec.practice_area + ' Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }

    } else {

      const rateIncreaseData = await this.recService.getRateIncreaseDataByClient(rec, this.userService.currentUser.client_info.id, this.parent.practiceAreaSetting);
      if (rateIncreaseData.details) {
        if (rateIncreaseData.details.length > 0) {
          rec.notable_metrics = 'Associate Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[0].avgRateIncrease * 100)) + '%\n';
        }
        if (rateIncreaseData.details.length > 1) {
          rec.notable_metrics += 'Partner Rate Increase (Avg. Last 3 Years): ' + formatter.format((rateIncreaseData.details[1].avgRateIncrease * 100)) + '%';
        }
      }
    }
  }

  updateAssociateWorkAllocationRecommendation(rec): void {
    // console.log("updateAssociateWorkAllocationRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPA.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPA.assoc_hrs_trend) + '%';
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPA.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPA.assoc_hrs_trend) + '%';
      } else {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.assoc_hrs_trend) + '%';
      } else {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {

      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);

      if (firmElementIndex === 1 && paElementIndex === 1) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPATopFirm.assoc_hrs_trend) + '%';
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.assoc_hrs_trend) + '%';
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.secondPASecondFirm.assoc_hrs_trend) + '%';
      } else {
        rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.assoc_hrs_trend) + '%';
      }
    } else {
      rec.notable_metrics = 'Assoc % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.associate_percent_hours_worked) + '%\n' + 'Assoc % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.assoc_hrs_trend) + '%';
    }
    this.insightsForm.controls[rec.sort_order + 'metrics'].setValue(rec.notable_metrics);
  }

  updatePartnerWorkAllocationRecommendation(rec): void {
    // console.log("updatePartnerWorkAllocationRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPA.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPA.partner_hrs_trend) + '%';
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPA.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPA.partner_hrs_trend) + '%';
      } else {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.partner_hrs_trend) + '%';
      } else {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
      if (firmElementIndex === 1 && paElementIndex === 1) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPATopFirm.partner_hrs_trend) + '%';
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPASecondFirm.partner_hrs_trend) + '%';
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.secondPASecondFirm.partner_hrs_trend) + '%';
      } else {
        rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.topPATopFirm.partner_hrs_trend) + '%';
      }
    } else {
      rec.notable_metrics = 'Partner % of Hours Worked (Report Timeframe): ' + formatter.format(this.parent.reportData.partner_percent_hours_worked) + '%\n' + 'Partner % of Hours Worked Trend: ' + formatter.format(this.parent.reportData.partner_hrs_trend) + '%';
    }
  }

  updateBlockBillingRecommendation(rec): void {
    // console.log("updateBlockBillingRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPA.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPA.bb_trend) + '%';
        if (this.parent.topPA.bb_trend > 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.topPA.bb_trend) + '%';
        } else if (this.parent.topPA.bb_trend < 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.topPA.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.topPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPA.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPA.bb_trend) + '%';
        if (this.parent.secondPA.bb_trend > 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.secondPA.bb_trend) + '%';
        } else if (this.parent.secondPA.bb_trend < 0) {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.secondPA.bb_trend) + '%';
        } else {
          rec.opportunity = 'Block billing across all firms in ' + this.parent.secondPA.practice_area + ' from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
        }
      } else {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
      } else {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
      if (firmElementIndex === 1 && paElementIndex === 1) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPATopFirm.bb_trend) + '%';
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPATopFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPATopFirm.bb_trend) + '%';
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.topPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.topPASecondFirm.bb_trend) + '%';
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.secondPASecondFirm.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.secondPASecondFirm.bb_trend) + '%';
      } else {
        rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';

      }
    } else {
      rec.notable_metrics = 'Block Billing % (Report Timeframe): ' + formatter.format(this.parent.reportData.percent_block_billed) + '%\n' + 'Block Billing % Trend: ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      if (this.parent.reportData.bb_trend > 0) {
        rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' increased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      } else if (this.parent.reportData.bb_trend < 0) {
        rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' decreased by ' + formatter.format(this.parent.reportData.bb_trend) + '%';
      } else {
        rec.opportunity = 'Block billing across all firms from ' + this.datepipe.transform(this.parent.reportStartDate, 'mediumDate') + ' to ' + this.datepipe.transform(this.parent.reportEndDate, 'mediumDate') + ' remained the same.';
      }
    }
    this.insightsForm.controls[rec.sort_order + 'opportunity'].setValue(rec.opportunity);
  }

  updateShiftWorkRecommendation(rec): void {
    // console.log("updateShiftWorkRecommendation: ", rec);
    if ((rec.practice_area !== null && rec.practice_area !== undefined) && (rec.firm_id === null || rec.firm_id === undefined)) {
      const elementIndex = this.topPAs.findIndex(pa => pa.label === rec.practice_area);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                              'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate) + '\n' +
                              'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate);
      } else {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                              'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      }
    } else if ((rec.practice_area === null || rec.practice_area === undefined) && (rec.firm_id !== null && rec.firm_id !== undefined)) {
      const elementIndex = this.topPAFirms.findIndex(f => f.value === rec.firm_id);
      if (elementIndex === 1) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate);
      } else if (elementIndex === 2) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      } else {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                              'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      }
    } else if (rec.practice_area !== null && rec.practice_area !== undefined && rec.firm_id !== null && rec.firm_id !== undefined) {
      let firmElementIndex = this.topPAFirms.findIndex(pa => pa.value === rec.firm_id);
      if (firmElementIndex === -1) {
        firmElementIndex = this.secondPAFirms.findIndex(pa => pa.value === rec.firm_id);
      }
      const paElementIndex = this.topPAs.findIndex(pa => pa.value === rec.practice_area);
      if (firmElementIndex === 1 && paElementIndex === 1) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate);
      } else if (firmElementIndex === 1 && paElementIndex === 2) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPATopFirm.avg_blended_rate);
      } else if (firmElementIndex === 2 && paElementIndex === 1) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      } else if (firmElementIndex === 2 && paElementIndex === 2) {
        rec.notable_metrics = 'Blended Rate (' + this.parent.secondPA.practice_area + ' - ' + this.parent.secondPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.secondPASecondFirm.avg_blended_rate);
      } else {
        rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                              'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
      }
    } else {
      rec.notable_metrics = 'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPATopFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPATopFirm.avg_blended_rate) + '\n' +
                            'Blended Rate (' + this.parent.topPA.practice_area + ' - ' + this.parent.topPASecondFirm.firm_name + ') Report Timeframe: ' + moneyFormatter.format(this.parent.topPASecondFirm.avg_blended_rate);
    }
  }

}
