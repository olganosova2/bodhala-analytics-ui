import {Component, Input, OnInit, Output, EventEmitter, ComponentFactoryResolver} from '@angular/core';
import {CommonService, IClient, IRecommendationReport, IRecommendation} from '../../../../shared/services/common.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import * as config from '../../../../shared/services/config';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES} from '../../../../shared/services/config';
import {SelectItem, SelectItemGroup} from 'primeng/api';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


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
  errorMessage: any;
  newRecommendation: IRecommendation;
  selectedType: string;
  selectedFirmName: string;
  selectedPracticeArea: string;
  lastFullYearFirmData: any[];
  ytdFirmData: any[];
  firmStaffingData: any[];
  mostRecentYear: number;
  firmPracticeAreas: string[];
  quillConfig: any = config.quillConfig;
  differenceInSpend: number;
  estimatedSpendWithOldDisc: number;
  estimatedSpendWithRecommendedDisc: number;

  recommendationType = new FormControl();
  firmSelection = new FormControl();
  practiceAreaSelection = new FormControl();
  currentDiscountPct = new FormControl();
  recommendedDiscountPct = new FormControl();
  expectedGrowthPct = new FormControl();
  description = new FormControl();

  desiredPartnerPct = new FormControl();
  desiredAssociatePct = new FormControl();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;


  @Input() recommendationTypes: SelectItem[];
  @Input() firmOptions: SelectItem[];
  @Input() paOptions: SelectItem[];
  @Input() paGroupOptions: SelectItemGroup[];
  @Input() clientPracticeAreaSetting: string;
  @Input() selectedClientId: number;
  @Input() newReport: IRecommendationReport;
  @Input() index: number;

  @Output() typeSelected = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });
    this.seventhFormGroup = this._formBuilder.group({
      seventhCtrl: ['', Validators.required]
    });

    this.firstFormGroup.valueChanges.subscribe(data => {
      if (this.selectedType === 'Discount') {
        this.newRecommendation.type_id = data.firstCtrl;
      }
    });
    this.secondFormGroup.valueChanges.subscribe(data => {
      if (this.selectedType === 'Discount') {
        this.newRecommendation.bh_lawfirm_id = data.secondCtrl;
      }
    });
    this.thirdFormGroup.valueChanges.subscribe(data => {
      if (this.selectedType === 'Discount') {
        this.newRecommendation.practice_area = data.thirdCtrl;
      }
    });
    this.fourthFormGroup.valueChanges.subscribe(data => {
      if (this.selectedType === 'Discount') {
        this.newRecommendation.current_discount_pct = data.fourthCtrl;
      }
    });
    this.sixthFormGroup.valueChanges.subscribe(data => {
      if (this.selectedType === 'Discount') {
        this.newRecommendation.recommended_discount_pct = data.fifthCtrl;
      }
    });
    this.firstFormGroup.valueChanges.subscribe(data => {
      if (this.selectedType === 'Discount') {
        this.newRecommendation.spend_increase_pct = data.sixthCtrl;
      }
    });
    this.seventhFormGroup.valueChanges.subscribe(data => {
      if (this.selectedType === 'Discount') {
        this.newRecommendation.comment = data.seventhCtrl;
      }
    });
    if (this.clientPracticeAreaSetting === 'Client Practice Areas') {
      this.newRecommendation.is_smart_practice_area = false;
    } else if (this.clientPracticeAreaSetting === 'Smart Practice Areas') {
      this.newRecommendation.is_smart_practice_area = true;
    }

    // this.newRecommendation = this.constructNewRecommendation();
    this.newRecommendation = this.newReport.recommendations[this.index];
    console.log("add OnInt: ", this.newRecommendation)
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
      recommended_discount_pct: null,
      current_discount_pct: null,
      spend_increase_pct: null,
      rate_increase_pct: null,
      desired_rate_increase_pct: null,
      previous_firm_ids: [],
      recommended_firm_ids: [],
      desired_partner_pct_of_hours_worked: null,
      desired_associate_pct_of_hours_worked: null,
      desired_paralegal_pct_of_hours_worked: null,
      desired_block_billing_pct: null,
      created_on: null,
      created_by: null,
      modified_on: null,
      modified_by: null,
      deleted_on: null,
      deleted_by: null
    };
  }

  typeChange(evt: any): void {
    const filteredType = this.recommendationTypes.filter(type => type.value === evt.value);

    this.selectedType = filteredType[0].label;
    this.newRecommendation.type_id = filteredType[0].value;
    console.log("newRec: ", this.newRecommendation)
    console.log("newReport: ", this.newReport)
    this.typeSelected.emit(this.newRecommendation);
    console.log("selectedType: ", this.selectedType)
  }

  getFirmPracticeAreas(evt: any): void {
    const params = {
      clientId: this.selectedClientId,
      firmId: evt.value
    };
    this.newRecommendation.bh_lawfirm_id = evt.value;
    const filteredFirmName = this.firmOptions.filter(firm => firm.value === evt.value);
    this.selectedFirmName = filteredFirmName[0].label;
    console.log("firmSelection: ", this.selectedFirmName)
    this.pendingRequest = this.httpService.makeGetRequest('getPracticeAreasByFirm', params).subscribe(
      (data: any) => {
        console.log("firm pas: ", data);
        if (data.result) {
          this.firmPracticeAreas = [];
          for (let pa of data.result) {
            console.log("PA: ", pa, pa['client_matter_type'])
            this.firmPracticeAreas.push(pa['client_matter_type'])
          }
          console.log("firmPracticeAreas: ", this.firmPracticeAreas)
        }

      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getFirmPAStats(evt: any): void {
    console.log("secondCtrl: ", this.secondFormGroup)
    const params = {
      clientId: this.selectedClientId,
      clientMatterType: evt.value,
      firmId: this.secondFormGroup.value.secondCtrl
    };
    this.newRecommendation.practice_area = evt.value;
    this.selectedPracticeArea = evt.value;
    this.pendingRequest = this.httpService.makeGetRequest('getAdminFirmStats', params).subscribe(
      (data: any) => {
        console.log("firm stats: ", data);
        if (data.result.previous_year) {
          this.lastFullYearFirmData = data.result.previous_year;
        }
        if (data.result.ytd) {
          this.ytdFirmData = data.result.ytd;
          this.mostRecentYear = this.ytdFirmData[0].year;
        }

      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getFirmStaffing(evt: any): void {
    const params = {
      clientId: this.selectedClientId,
      firmId: evt.value
    };

    this.pendingRequest = this.httpService.makeGetRequest('getFirmStaffing', params).subscribe(
      (data: any) => {
        console.log("staffing data: ", data);
        if (data.result) {
          this.firmStaffingData = data.result;
          if (this.firmStaffingData.length > 0) {
            this.mostRecentYear = this.firmStaffingData[0].year;
          }
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  calcDiscountEffect(): void {
    this.estimatedSpendWithOldDisc = (this.lastFullYearFirmData[0].total_billed * (1 + (this.sixthFormGroup.value.sixthCtrl / 100)));
    const differentInDiscountPcs = (this.fifthFormGroup.value.fifthCtrl - this.fourthFormGroup.value.fourthCtrl) / 100;
    this.estimatedSpendWithRecommendedDisc = (this.lastFullYearFirmData[0].total_billed * (1 + (this.sixthFormGroup.value.sixthCtrl / 100) - differentInDiscountPcs));
    this.differenceInSpend = this.estimatedSpendWithOldDisc - this.estimatedSpendWithRecommendedDisc;
  }

  deleteRecommendation(): void {
    this.newReport.recommendations.pop();
    if (this.newReport.recommendations.length === 0) {
      this.typeSelected.emit({});
    }
    // this.deleteRequested.emit(this.newRecommendation);
  }
}
