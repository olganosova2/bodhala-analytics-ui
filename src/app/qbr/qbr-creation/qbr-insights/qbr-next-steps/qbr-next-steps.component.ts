import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {CommonService} from '../../../../shared/services/common.service';
import {FiltersService} from '../../../../shared/services/filters.service';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {confirmDialogConfig} from '../../../../shared/services/config';
import {FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {QbrService} from '../../../qbr.service';
import {IReport, QbrType, recommendationPlaceholderMapping, formatter, moneyFormatter, tkHoursPasChartOptions} from '../../../qbr-model';
import {SelectItem} from 'primeng/api';
import { RecommendationService } from 'src/app/admin/client-recommendations/recommendation.service';
import { QbrInsightsComponent } from '../qbr-insights.component';
import { NextStepInputsComponent } from './next-step-inputs/next-step-inputs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'bd-qbr-next-steps',
  templateUrl: './qbr-next-steps.component.html',
  styleUrls: ['./qbr-next-steps.component.scss']
})
export class QbrNextStepsComponent implements OnInit, OnChanges {
  nextStepsForm = new FormGroup({});
  @Input() savedInsights: any;
  @Input() exiting: boolean = false;
  @Output() nextStepsFormStatusChange = new EventEmitter<string>();


  constructor(private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public filtersService: FiltersService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public datepipe: DatePipe,
              public router: Router,
              private qbrService: QbrService,
              private parent: QbrInsightsComponent,
              private recService: RecommendationService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    for (const rec of this.savedInsights) {
      rec.section = 'Next Steps';
      this.nextStepsForm.addControl(rec.sort_order + 'title', new FormControl(rec.title, [Validators.minLength(10), Validators.maxLength(35)]));
      this.nextStepsForm.addControl(rec.sort_order + 'opportunity', new FormControl(rec.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
      this.nextStepsForm.addControl(rec.sort_order + 'action', new FormControl(rec.action, [Validators.minLength(40), Validators.maxLength(200)]));
      // this.nextStepsForm.addControl(rec.sort_order + 'savings_override', new FormControl(rec.savings_override, [Validators.minLength(0), Validators.maxLength(25)]));
      if (rec.type === 'Custom Recommendation') {
        this.nextStepsForm.addControl(rec.sort_order + 'savings', new FormControl(rec.potential_savings, Validators.required));
      }
    }
    // still needed?
    this.nextStepsForm.statusChanges.subscribe(result => {
      this.nextStepsFormStatusChange.emit(result);
    });
    if (this.nextStepsForm.status === 'VALID') {
      setTimeout(() => { this.parent.nextStepsValid = true; });
    } else if (this.nextStepsForm.status === 'INVALID') {
      setTimeout(() => { this.parent.nextStepsValid = false; });
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.savedInsights && !changes.savedInsights.firstChange && changes.savedInsights.currentValue.length === 3) {
      for (const insight of changes.savedInsights.currentValue) {
        if (this.nextStepsForm.controls[insight.sort_order + 'title']) {
          this.nextStepsForm.controls[insight.sort_order + 'title'].setValue(insight.title);
          this.nextStepsForm.controls[insight.sort_order + 'opportunity'].setValue(insight.opportunity);
          this.nextStepsForm.controls[insight.sort_order + 'action'].setValue(insight.action);
          if (insight.type === 'Custom Recommendation') {
            this.nextStepsForm.addControl(insight.sort_order + 'savings', new FormControl(insight.potential_savings, Validators.required));
            this.nextStepsForm.controls[insight.sort_order + 'savings'].setValue(insight.potential_savings);
          }
        } else {
          this.nextStepsForm.addControl(insight.sort_order + 'title', new FormControl(insight.title, [Validators.minLength(10), Validators.maxLength(35)]));
          this.nextStepsForm.addControl(insight.sort_order + 'opportunity', new FormControl(insight.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
          this.nextStepsForm.addControl(insight.sort_order + 'action', new FormControl(insight.action, [Validators.minLength(40), Validators.maxLength(200)]));
          if (insight.type === 'Custom Recommendation') {
            this.nextStepsForm.addControl(insight.sort_order + 'savings', new FormControl(insight.potential_savings, Validators.required));
          }
        }
      }
    }
    if (changes.exiting && !changes.exiting.firstChange) {
      for (let insight of this.savedInsights) {
        insight.opportunity = this.nextStepsForm.controls[insight.sort_order.toString() + 'opportunity'].value;
        insight.title = this.nextStepsForm.controls[insight.sort_order.toString() + 'title'].value;
        insight.action = this.nextStepsForm.controls[insight.sort_order.toString() + 'action'].value;
        insight = await this.qbrService.saveNextStep(insight);
      }
      this.router.navigate(['analytics-ui/qbrs']);
    }
  }

  async viewReport() {
    for (let insight of this.savedInsights) {
      insight.opportunity = this.nextStepsForm.controls[insight.sort_order.toString() + 'opportunity'].value;
      insight.title = this.nextStepsForm.controls[insight.sort_order.toString() + 'title'].value;
      insight.action = this.nextStepsForm.controls[insight.sort_order.toString() + 'action'].value;
      insight = await this.qbrService.saveNextStep(insight);
    }
    this.router.navigate(['/analytics-ui/qbrs/view'], {queryParams: {
      id: this.parent.parent.report.id
    }});
  }

  async saveNextStep(rec: any) {
    rec.opportunity = this.nextStepsForm.controls[rec.sort_order.toString() + 'opportunity'].value;
    rec.title = this.nextStepsForm.controls[rec.sort_order.toString() + 'title'].value;
    rec.action = this.nextStepsForm.controls[rec.sort_order.toString() + 'action'].value;
    if (this.nextStepsForm.controls[rec.sort_order + 'action'].hasError('maxlength') || this.nextStepsForm.controls[rec.sort_order + 'action'].hasError('minlength')
        || this.nextStepsForm.controls[rec.sort_order + 'title'].hasError('maxlength') || this.nextStepsForm.controls[rec.sort_order + 'title'].hasError('minlength')
        || this.nextStepsForm.controls[rec.sort_order + 'opportunity'].hasError('maxlength') || this.nextStepsForm.controls[rec.sort_order + 'opportunity'].hasError('minlength')) {
        return;
    } else {
      if (rec.type === 'Custom Recommendation') {
        rec.potential_savings = this.nextStepsForm.controls[rec.sort_order + 'savings'].value;
      }
      if (rec.savings_override && rec.type !== 'Custom Recommendation') {
        rec.potential_savings = rec.savings_override;
        rec.potential_savings_formatted = moneyFormatter.format(rec.potential_savings);
      }
      rec = await this.qbrService.saveNextStep(rec);
    }

    const elementIndex = this.savedInsights.findIndex(si => si.corresponding_insight_id === rec.corresponding_insight_id);
    if (elementIndex >= 0) {
      this.savedInsights[elementIndex].id = rec.id;
    }
  }


  openModal(rec): void {
    const dialogRef = this.dialog.open(NextStepInputsComponent, {
      data: rec
    });
    dialogRef.componentInstance.updateNextStepData.subscribe(async data => {
      if (this.nextStepsForm.controls[rec.sort_order + 'action'].hasError('maxlength') || this.nextStepsForm.controls[rec.sort_order + 'action'].hasError('minlength')
        || this.nextStepsForm.controls[rec.sort_order + 'title'].hasError('maxlength') || this.nextStepsForm.controls[rec.sort_order + 'title'].hasError('minlength')
        || this.nextStepsForm.controls[rec.sort_order + 'opportunity'].hasError('maxlength') || this.nextStepsForm.controls[rec.sort_order + 'opportunity'].hasError('minlength')) {
          return;
      } else {
        data = await this.qbrService.saveNextStep(data);
        const elementIndex = this.savedInsights.findIndex(si => si.corresponding_insight_id === data.corresponding_insight_id);
        if (elementIndex >= 0) {
          this.savedInsights[elementIndex].id = data.id;
        }
      }
    });
  }

}
