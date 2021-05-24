import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CommonService} from '../../../../shared/services/common.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {RecommendationService} from '../../recommendation.service';
import {IRecommendationReport, IRecommendation} from '../../client-recommendations-model';
import {Subscription} from 'rxjs';
import * as config from '../../../../shared/services/config';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES} from '../../../../shared/services/config';
import {SelectItem, SelectItemGroup} from 'primeng/api';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {confirmDialogConfig} from '../../../../shared/services/config';

@Component({
  selector: 'bd-add-edit-recommendation',
  templateUrl: './add-edit-recommendation.component.html',
  styleUrls: ['./add-edit-recommendation.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddEditRecommendationComponent implements OnInit {
  pendingRequest: Subscription;
  pendingRequestDelete: Subscription;
  errorMessage: any;
  newRecommendation: IRecommendation;
  selectedType: string;
  selectedFirmName: string;
  selectedPracticeArea: string;
  lastFullYearFirmData: any[] = [];
  ytdFirmData: any[] = [];
  firmStaffingData: any[] = [];
  firmBlockBillingData: any[] = [];
  firmRateIncreaseData: any[] = [];
  mostRecentYear: number;
  firmPracticeAreas: SelectItem[] = [];
  firmPracticeAreasGroup: SelectItemGroup[];
  quillConfig: any = config.quillConfig;
  differenceInSpendLower: number = 0;
  differenceInSpendUpper: number = 0;
  estimatedSpendWithOldDisc: number = 0;
  estimatedSpendWithRecommendedDiscLower: number = 0;
  estimatedSpendWithRecommendedDiscUpper: number = 0;
  firmPAOptions: SelectItem[] = [];
  previousFirmNames: string[] = [];
  newFirmNames: string[] = [];

  estimatedSpendWithOldStaffing: number = 0;
  estimatedSpendWithNewStaffing: number = 0;
  differenceInSpend: number = 0;

  estimatedBlockBillingSavings: number = null;
  unacceptableBlockBillingAmount: number = null;

  rateIncreasePreventionSavings: number = 0;
  rateIncreasePreventionDetails: any[] = [];

  firstFormGroup: FormGroup;
  currentForm: FormGroup;

  typeForm = new FormGroup({
    typeId: new FormControl('', [
      Validators.required
    ])
  });

  discountForm = new FormGroup({
    firm: new FormControl(null, [
      Validators.required
    ]),
    practiceArea: new FormControl(null, [
      Validators.required
    ]),
    currentDiscPct: new FormControl(null, [
      Validators.required
    ]),
    recommendedDiscPctLower: new FormControl(null, [
      Validators.required
    ]),
    recommendedDiscPctUpper: new FormControl(null, [
      Validators.required
    ]),
    projectedSpendIncrease: new FormControl(0),
    comment: new FormControl(null, [
      Validators.required
    ])
  });

  staffingForm = new FormGroup({
    firm: new FormControl(null, [
      Validators.required
    ]),
    desiredPartnerPct: new FormControl(0, [
      Validators.required
    ]),
    desiredAssociatePct: new FormControl(0, [
      Validators.required
    ]),
    desiredParalegalPct: new FormControl(0, [
      Validators.required
    ]),
    projectedSpendIncrease: new FormControl(0),
    comment: new FormControl(null, [
      Validators.required
    ])
  });

  rateForm = new FormGroup({
    firm: new FormControl(null, [
      Validators.required
    ]),
    practiceArea: new FormControl(null),
    desiredRateIncreasePct: new FormControl(null, [
      Validators.required
    ]),
    comment: new FormControl(null, [
      Validators.required
    ])
  });

  blockBillingForm = new FormGroup({
    firm: new FormControl(null, [
      Validators.required
    ]),
    practiceArea: new FormControl(null),
    recommendedBlockBillingPct: new FormControl(null, [
      Validators.required
    ]),
    comment: new FormControl(null, [
      Validators.required
    ])
  });

  firmChangeForm = new FormGroup({
    practiceArea: new FormControl(null, [
      Validators.required
    ]),
    previousFirms: new FormControl(null, [
      Validators.required
    ]),
    newFirms: new FormControl(null, [
      Validators.required
    ]),
    comment: new FormControl(null, [
      Validators.required
    ])
  });

  @Input() recommendationTypes: SelectItem[];
  @Input() firmOptions: SelectItem[];
  @Input() paOptions: SelectItem[];
  @Input() paGroupOptions: SelectItemGroup[];
  @Input() clientPracticeAreaSetting: string;
  @Input() selectedClientId: number;
  @Input() newReport: IRecommendationReport;
  @Input() index: number;
  @Input() editMode: boolean;

  @Output() typeSelected = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.newRecommendation = this.newReport.recommendations[this.index];
    if (this.newRecommendation.id) {
      const filteredType = this.recommendationTypes.filter(type => type.value === this.newRecommendation.type_id);
      if (filteredType.length > 0) {
        this.selectedType = filteredType[0].label;
      }
      this.typeForm.patchValue({
        typeId: this.newRecommendation.type_id
      });

      if (this.selectedType === 'Discount') {
        this.getPracticeAreasByFirm();
        this.getFirmPAStats({value: this.newRecommendation.practice_area});
        this.discountForm.patchValue({
          firm: this.newRecommendation.bh_lawfirm_id,
          practiceArea: this.newRecommendation.practice_area,
          currentDiscPct: this.newRecommendation.current_discount_pct,
          recommendedDiscPctLower: this.newRecommendation.recommended_discount_pct_lower_range,
          recommendedDiscPctUpper: this.newRecommendation.recommended_discount_pct_upper_range,
          projectedSpendIncrease: this.newRecommendation.spend_increase_pct,
          comment: this.newRecommendation.comment
        });
      } else if (this.selectedType === 'Modify Staffing Allocation') {
        this.getFirmStaffing();
        this.staffingForm.patchValue({
          firm: this.newRecommendation.bh_lawfirm_id,
          desiredPartnerPct: this.newRecommendation.desired_partner_pct_of_hours_worked,
          desiredAssociatePct: this.newRecommendation.desired_associate_pct_of_hours_worked,
          desiredParalegalPct: this.newRecommendation.desired_paralegal_pct_of_hours_worked,
          projectedSpendIncrease: this.newRecommendation.spend_increase_pct,
          comment: this.newRecommendation.comment
        });

      } else if (this.selectedType === 'Shift Work From Firm(s) to Firm(s)') {
        this.getFirmsByPracticeArea();
        this.firmChangeForm.patchValue({
          practiceArea: this.newRecommendation.practice_area,
          previousFirms: this.newRecommendation.previous_firm_ids,
          newFirms: this.newRecommendation.recommended_firm_ids,
          comment: this.newRecommendation.comment
        });

      } else if (this.selectedType === 'Reduce / Eliminate Block Billing') {
        this.getPracticeAreasByFirm();
        this.blockBillingForm.patchValue({
          firm: this.newRecommendation.bh_lawfirm_id,
          practiceArea: this.newRecommendation.practice_area,
          recommendedBlockBillingPct: this.newRecommendation.desired_block_billing_pct,
          projectedSpendIncrease: this.newRecommendation.spend_increase_pct,
          comment: this.newRecommendation.comment
        });
      } else if (this.selectedType === 'Rate Increase Prevention / Reduction') {
        this.getPracticeAreasByFirm();
        this.rateForm.patchValue({
          firm: this.newRecommendation.bh_lawfirm_id,
          practiceArea: this.newRecommendation.practice_area,
          desiredRateIncreasePct: this.newRecommendation.desired_rate_increase_pct,
          comment: this.newRecommendation.comment
        });
      }
    }

    this.discountForm.statusChanges.subscribe(result => {
      this.typeSelected.emit(result);
    });
    this.discountForm.valueChanges.subscribe(data => {
      this.newRecommendation.bh_lawfirm_id = data.firm;
      this.newRecommendation.practice_area = data.practiceArea;
      if (this.clientPracticeAreaSetting === 'Both' && data.practiceArea) {
        if (data.practiceArea.includes('[Smart]')) {
          this.newRecommendation.is_smart_practice_area = true;
        }
      }
      this.newRecommendation.current_discount_pct = data.currentDiscPct;
      this.newRecommendation.recommended_discount_pct_lower_range = data.recommendedDiscPctLower;
      this.newRecommendation.recommended_discount_pct_upper_range = data.recommendedDiscPctUpper;
      this.newRecommendation.spend_increase_pct = data.projectedSpendIncrease;
      this.newRecommendation.comment = data.comment;
    });

    this.staffingForm.statusChanges.subscribe(result => {
      this.typeSelected.emit(result);
    });
    this.staffingForm.valueChanges.subscribe(data => {
      this.newRecommendation.bh_lawfirm_id = data.firm;
      this.newRecommendation.desired_associate_pct_of_hours_worked = data.desiredAssociatePct;
      this.newRecommendation.desired_partner_pct_of_hours_worked = data.desiredPartnerPct;
      this.newRecommendation.desired_paralegal_pct_of_hours_worked = data.desiredParalegalPct;
      this.newRecommendation.spend_increase_pct = data.projectedSpendIncrease;
      this.newRecommendation.comment = data.comment;

    });

    this.rateForm.statusChanges.subscribe(result => {
      this.typeSelected.emit(result);
    });
    this.rateForm.valueChanges.subscribe(data => {
      this.newRecommendation.bh_lawfirm_id = data.firm;
      this.newRecommendation.practice_area = data.practiceArea;
      this.newRecommendation.desired_rate_increase_pct = data.desiredRateIncreasePct;
      this.newRecommendation.comment = data.comment;

    });

    this.blockBillingForm.statusChanges.subscribe(result => {
      this.typeSelected.emit(result);
    });
    this.blockBillingForm.valueChanges.subscribe(data => {
      this.newRecommendation.bh_lawfirm_id = data.firm;
      this.newRecommendation.practice_area = data.practiceArea;
      if (this.clientPracticeAreaSetting === 'Both' && data.practiceArea) {
        if (data.practiceArea.includes('[Smart]')) {
          this.newRecommendation.is_smart_practice_area = true;
        }
      }
      this.newRecommendation.desired_block_billing_pct = data.recommendedBlockBillingPct;
      this.newRecommendation.comment = data.comment;
    });

    this.firmChangeForm.statusChanges.subscribe(result => {
      this.typeSelected.emit(result);
    });
    this.firmChangeForm.valueChanges.subscribe(data => {
      this.newRecommendation.practice_area = data.practiceArea;
      if (this.clientPracticeAreaSetting === 'Both' && data.practiceArea) {
        if (data.practiceArea.includes('[Smart]')) {
          this.newRecommendation.is_smart_practice_area = true;
        }
      }
      this.newRecommendation.previous_firm_ids = data.previousFirms;
      this.newRecommendation.recommended_firm_ids = data.newFirms;
      this.newRecommendation.comment = data.comment;
      if (data.previousFirms) {
        this.previousFirmNames = [];
        for (const previousFirm of data.previousFirms) {
          const previousFirmName = this.firmPAOptions.filter(firm => firm.value === previousFirm);
          if (previousFirmName.length > 0) {
            this.previousFirmNames.push(previousFirmName[0].label);
          }
        }
      }
      if (data.newFirms) {
        this.newFirmNames = [];
        for (const newFirm of data.newFirms) {
          const newFirmName = this.firmPAOptions.filter(firm => firm.value === newFirm);
          if (newFirmName.length > 0) {
            this.newFirmNames.push(newFirmName[0].label);
          }
        }
      }
    });

    this.typeForm.valueChanges.subscribe(data => {
      this.newRecommendation.type_id = data.typeId;
    });

    if (this.clientPracticeAreaSetting === 'Client Practice Areas' || this.clientPracticeAreaSetting === undefined || this.clientPracticeAreaSetting === null) {
      this.newRecommendation.is_smart_practice_area = false;
    } else if (this.clientPracticeAreaSetting === 'Smart Practice Areas') {
      this.newRecommendation.is_smart_practice_area = true;
    }
  }

  constructNewRecommendation(): IRecommendation {
    return {
      id: null,
      report_id: null,
      type_id: null,
      bh_lawfirm_id: null,
      comment: null,
      title: null,
      year: null,
      practice_area: null,
      is_smart_practice_area: null,
      discount_type: null,
      recommended_discount_pct_lower_range: null,
      recommended_discount_pct_upper_range: null,
      current_discount_pct: null,
      spend_increase_pct: null,
      rate_increase_pct: null,
      desired_rate_increase_pct: null,
      previous_firm_ids: [],
      recommended_firm_ids: [],
      previous_firm_names: [],
      recommended_firm_names: [],
      desired_partner_pct_of_hours_worked: null,
      desired_associate_pct_of_hours_worked: null,
      desired_paralegal_pct_of_hours_worked: null,
      desired_block_billing_pct: null,
      created_on: null,
      created_by: null,
      modified_on: null,
      modified_by: null,
      deleted_on: null,
      deleted_by: null,
      selected_type: null,
      firm_name: null
    };
  }

  typeChange(evt: any): void {
    const filteredType = this.recommendationTypes.filter(type => type.value === evt.value);
    this.selectedType = filteredType[0].label;
    this.newRecommendation.selected_type = this.selectedType;
    this.typeSelected.emit('VALID');
  }

  getPracticeAreasByFirm(): void {
    const params = {
      clientId: this.selectedClientId,
      firmId: this.newRecommendation.bh_lawfirm_id,
      paType: this.clientPracticeAreaSetting
    };
    const filteredFirmName = this.firmOptions.filter(firm => firm.value === this.newRecommendation.bh_lawfirm_id);
    if (filteredFirmName.length > 0) {
      this.selectedFirmName = filteredFirmName[0].label;
    }
    this.pendingRequest = this.httpService.makeGetRequest('getPracticeAreasByFirm', params).subscribe(
      (data: any) => {

        const bodhalaPracticeAreas = data.result.bodhala;
        const clientPracticeAreas = data.result.clients;
        this.paGroupOptions = [];

        if (data.result) {
          this.firmPracticeAreas = [];
          if (this.clientPracticeAreaSetting === 'Client Practice Areas') {
            if (this.selectedType !== 'Discount') {
              this.firmPracticeAreas.push({label: '-- None --', value: null});
            }
            for (const pa of clientPracticeAreas) {
              this.firmPracticeAreas.push({label: pa.client_matter_type, value: pa.client_matter_type});
            }
          } else if (this.clientPracticeAreaSetting === 'Smart Practice Areas') {
            if (this.selectedType !== 'Discount') {
              this.firmPracticeAreas.push({label: '-- None --', value: null});
            }
            for (const pa of bodhalaPracticeAreas) {
              this.firmPracticeAreas.push({label: pa.client_matter_type, value: pa.client_matter_type});
            }
          } else if (this.clientPracticeAreaSetting === 'Both') {
            this.paGroupOptions = [
              {
                label: 'Smart Practice Areas',
                items: []
              },
              {
                label: 'Client Practice Areas',
                items: []
              }
            ];
            for (const group of this.paGroupOptions) {
              if (group.label === 'Smart Practice Areas') {
                if (this.selectedType !== 'Discount') {
                  this.firmPracticeAreas.push({label: '-- None --', value: null});
                }
                for (const practiceArea of bodhalaPracticeAreas) {
                  group.items.push({label: practiceArea.client_matter_type + ' - [Smart]', value: practiceArea.client_matter_type + ' - [Smart]'});
                }
              }
              else if (group.label === 'Client Practice Areas') {
                for (const practiceArea of clientPracticeAreas) {
                  group.items.push({label: practiceArea.client_matter_type, value: practiceArea.client_matter_type});
                }
              }
            }
          } else {
            if (this.selectedType !== 'Discount') {
              this.firmPracticeAreas.push({label: '-- None --', value: null});
            }
            for (const pa of clientPracticeAreas) {
              this.firmPracticeAreas.push({label: pa.client_matter_type, value: pa.client_matter_type});
            }
          }
        }
        if (this.selectedType === 'Reduce / Eliminate Block Billing') {
          this.getFirmBlockBillingData();
        } else if (this.selectedType === 'Rate Increase Prevention / Reduction') {
          this.getFirmRateIncreaseData();
        }

      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  async getFirmPAStats(evt: any): Promise<void> {
    const result = await this.recommendationService.getDiscountData(this.newRecommendation, this.selectedClientId, this.clientPracticeAreaSetting);
    this.ytdFirmData = result.ytd;
    this.lastFullYearFirmData = result.prior_year;
    this.mostRecentYear = result.most_recent_year;
    if (this.newRecommendation.id) {
      this.getDiscountSavings();
    } else {
      this.newRecommendation.year = this.mostRecentYear;
    }
  }

  async getFirmStaffing(): Promise<void> {
    this.firmStaffingData = await this.recommendationService.getStaffingData(this.newRecommendation, this.selectedClientId);
    if (this.firmStaffingData.length > 0) {
      this.mostRecentYear = this.firmStaffingData[0].year;
    }
    if (this.newRecommendation.id) {
      this.getStaffingAllocationSavings();
    } else {
      this.newRecommendation.year = this.mostRecentYear;
    }
  }

  async getFirmRateIncreaseData(): Promise<void> {
    const firmParam = [];
    firmParam.push(this.newRecommendation.bh_lawfirm_id.toString());
    const paParam = [];
    const result = await this.recommendationService.getRateIncreaseData(this.newRecommendation, this.selectedClientId, this.clientPracticeAreaSetting);
    this.firmRateIncreaseData = result.data;
    if (this.firmRateIncreaseData.length > 0) {
      this.mostRecentYear = this.firmRateIncreaseData[0].year;
    }
    if (this.newRecommendation.id === null) {
      this.newRecommendation.year = this.mostRecentYear + 1;
    }
    this.rateIncreasePreventionSavings = result.savings;
    this.rateIncreasePreventionDetails = result.details;
  }

  getFirmsByPracticeArea(): void {
    const params = {
      clientId: this.selectedClientId,
      practiceArea: this.newRecommendation.practice_area,
      paType: this.clientPracticeAreaSetting
    };
    this.pendingRequest = this.httpService.makeGetRequest('getFirmsByPracticeArea', params).subscribe(
      (data: any) => {
        if (data.result) {
          if (data.result.length > 0) {
            for (const firm of data.result) {
              let tier;
              if (firm.tier) {
                tier = firm.tier.toString();
              } else {
                tier = 'N/A';
              }
              firm.blended_rate = firm.blended_rate.toFixed(2);
              this.firmPAOptions.push({label: firm.firm_name + ' (Tier: ' + tier + ', Blended Rate: $' + firm.blended_rate + ')', value: firm.bh_lawfirm_id});
            }
          }
        }
        if (this.selectedType === 'Rate Increase Prevention / Reduction') {
          this.getFirmRateIncreaseData();
        } else if (this.selectedType === 'Shift Work From Firm(s) to Firm(s)') {
          if (this.newRecommendation.previous_firm_ids) {
            this.previousFirmNames = [];
            for (const previousFirm of this.newRecommendation.previous_firm_ids) {
              const previousFirmName = this.firmPAOptions.filter(firm => firm.value === previousFirm);
              if (previousFirmName.length > 0) {
                this.previousFirmNames.push(previousFirmName[0].label);
              }
            }
          }
          if (this.newRecommendation.recommended_firm_ids) {
            this.newFirmNames = [];
            for (const newFirm of this.newRecommendation.recommended_firm_ids) {
              const newFirmName = this.firmPAOptions.filter(firm => firm.value === newFirm);
              if (newFirmName.length > 0) {
                this.newFirmNames.push(newFirmName[0].label);
              }
            }
          }
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  async getFirmBlockBillingData(): Promise<void> {
    this.firmBlockBillingData = await this.recommendationService.getBlockBillingData(this.newRecommendation, this.selectedClientId, this.clientPracticeAreaSetting);
    if (this.firmBlockBillingData.length > 0) {
      this.mostRecentYear = this.firmBlockBillingData[0].year;
    }
    if (this.newRecommendation.id) {
      this.getBlockBillingSavings();
    } else {
      this.newRecommendation.year = this.mostRecentYear;
    }
  }

  getDiscountSavings(): void {
    const result = this.recommendationService.calcDiscountSavings(this.lastFullYearFirmData, this.newRecommendation);
    this.estimatedSpendWithOldDisc = result.estimated_spend_with_old_disc;
    this.estimatedSpendWithRecommendedDiscLower = result.estimated_spend_with_rec_disc_lower;
    this.estimatedSpendWithRecommendedDiscUpper = result.estimated_spend_with_rec_disc_upper;
    this.differenceInSpendLower = result.diff_in_spend_lower;
    this.differenceInSpendUpper = result.diff_in_spend_upper;
  }

  getStaffingAllocationSavings(): void {
    const result = this.recommendationService.calcStaffingAllocationSavings(this.firmStaffingData, this.newRecommendation, this.mostRecentYear);
    this.estimatedSpendWithOldStaffing = result.estimated_spend_with_old_staffing;
    this.estimatedSpendWithNewStaffing = result.estimated_spend_with_rec_staffing;
    this.differenceInSpend = result.diff_in_spend;
  }

  getBlockBillingSavings(): void {
    const result = this.recommendationService.calcBlockBillingSavings(this.firmBlockBillingData, this.newRecommendation, this.mostRecentYear);
    this.unacceptableBlockBillingAmount = result.unacceptable_bb_amount;
    this.estimatedBlockBillingSavings = result.estimated_bb_savings;
  }

  calcRateIncreasePreventionSavings(): void {
    const result = this.recommendationService.calculateRateIncreaseSavingsForFirm(this.firmRateIncreaseData, this.mostRecentYear, this.newRecommendation.desired_rate_increase_pct);
    this.rateIncreasePreventionSavings = result.savings;
    this.rateIncreasePreventionDetails = result.classificationData;
  }

  deleteRecommendation(): void {
    if (this.newRecommendation.id) {
      this.openDeleteDialog();
    } else {
      this.newReport.recommendations.splice(this.index, 1);
      if (this.newReport.recommendations.length === 0) {
        this.typeSelected.emit('INVALID');
      }
    }
  }

  deleteSavedRecommendation(): void {
    const params = { id: this.newRecommendation.id};
    this.pendingRequestDelete = this.httpService.makeDeleteRequest('deleteClientRecommendation', params).subscribe(
      (data: any) => {
        const deleted = data.result;
        if (deleted) {
          this.newReport.recommendations = this.newReport.recommendations.filter(rec => rec.id !== this.newRecommendation.id);
          if (this.newReport.recommendations.length === 0) {
            this.typeSelected.emit('INVALID');
          }
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  openDeleteDialog(): void {
    const modalConfig = {...confirmDialogConfig, data: {title: 'Confirm Delete', item: 'recommendation'}};
    const dialogRef = this.dialog.open(ConfirmModalComponent, {...modalConfig, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSavedRecommendation();
      }
    });
  }
  goToTop(): void {
    window.scroll(0, 0);
  }
}
