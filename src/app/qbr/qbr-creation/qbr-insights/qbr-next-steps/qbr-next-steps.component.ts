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
    console.log("saved: ", this.savedInsights);
    for (const rec of this.savedInsights) {
      rec.section = 'Next Steps';
      this.nextStepsForm.addControl(rec.sort_order + 'title', new FormControl(rec.title, [Validators.minLength(10), Validators.maxLength(35)]));
      this.nextStepsForm.addControl(rec.sort_order + 'opportunity', new FormControl(rec.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
      this.nextStepsForm.addControl(rec.sort_order + 'action', new FormControl(rec.action, [Validators.minLength(40), Validators.maxLength(200)]));
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
    console.log("nextStepsForm: ", this.nextStepsForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes in next steps: ", changes)
    console.log("Changes check: ", changes.savedInsights.currentValue, changes.savedInsights.currentValue.length)
    if (changes.savedInsights && !changes.savedInsights.firstChange && changes.savedInsights.currentValue.length === 3) {
      for (const insight of changes.savedInsights.currentValue) {
        console.log("INSIGHT IN NGONCHANGES: ", insight)
        if (insight)
        if (this.nextStepsForm.controls[insight.sort_order + 'title']) {
          console.log("if eval onChanges")
          continue;
        } else {
          console.log("else eval onChanges")
          this.nextStepsForm.addControl(insight.sort_order + 'title', new FormControl(insight.title, [Validators.minLength(10), Validators.maxLength(35)]));
          this.nextStepsForm.addControl(insight.sort_order + 'opportunity', new FormControl(insight.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
          this.nextStepsForm.addControl(insight.sort_order + 'action', new FormControl(insight.action, [Validators.minLength(40), Validators.maxLength(200)]));
          if (insight.type === 'Custom Recommendation') {
            this.nextStepsForm.addControl(insight.sort_order + 'savings', new FormControl(insight.potential_savings, Validators.required));
          }
        }
      }

      // for (const insight of changes.savedInsights.previousValue) {
      //   console.log("previous insight: ", insight);
      //   const stillIncluded = changes.savedInsights.currentValue.find(c => c.id === insight.id);
      //   console.log("stillIncluded: ", stillIncluded)
      //   if (stillIncluded) {
      //     continue;
      //   } else {
      //     console.log("else eval: ", insight)
      //     this.qbrService.deleteQBRRecommendation(insight);
      //   }

      // }
    }
    console.log("form after changes: ", this.nextStepsForm);
    console.log("nextSteps after changes: ", this.savedInsights);
  }

  async viewReport() {
    console.log("nextStepsComp: ", this.savedInsights);
    for (let insight of this.savedInsights) {
      insight.opportunity = this.nextStepsForm.controls[insight.sort_order.toString() + 'opportunity'].value;
      insight.title = this.nextStepsForm.controls[insight.sort_order.toString() + 'title'].value;
      insight.action = this.nextStepsForm.controls[insight.sort_order.toString() + 'action'].value;
      insight = await this.qbrService.saveNextStep(insight);
      console.log("insiught: ", insight)
    }
    console.log("navigating away")
    this.router.navigate(['/analytics-ui/qbrs/view'], {queryParams: {
      qbrId: this.parent.parent.report.id
    }});
  }

  async saveNextStep(rec: any) {
    rec.opportunity = this.nextStepsForm.controls[rec.sort_order.toString() + 'opportunity'].value;
    rec.title = this.nextStepsForm.controls[rec.sort_order.toString() + 'title'].value;
    rec.action = this.nextStepsForm.controls[rec.sort_order.toString() + 'action'].value;
    rec = await this.qbrService.saveNextStep(rec);
    const elementIndex = this.savedInsights.findIndex(si => si.corresponding_insight_id === rec.corresponding_insight_id);
    if (elementIndex >= 0) {
      this.savedInsights[elementIndex].id = rec.id;
    }

    console.log("saveNextStep rec: ", rec);
    console.log("saveNextStep savedInsights: ", this.savedInsights);
  }


  openModal(rec): void {
    const dialogRef = this.dialog.open(NextStepInputsComponent, {
      data: rec
    });

    dialogRef.componentInstance.updateNextStepData.subscribe(async data => {
      console.log("on close data: ", data);
      data = await this.qbrService.saveNextStep(data);
    });
  }

}
