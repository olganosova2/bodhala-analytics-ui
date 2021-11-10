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
import {IReport, QbrType, recommendationPlaceholderMapping, formatter, moneyFormatter} from '../../../qbr-model';
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
export class QbrNextStepsComponent implements OnInit {
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
    // console.log("saved: ", this.savedInsights);
    for (const rec of this.savedInsights) {
      rec.section = 'Next Steps';
      this.nextStepsForm.addControl(rec.sort_order + 'title', new FormControl(rec.title, [Validators.minLength(10), Validators.maxLength(60)]));
      this.nextStepsForm.addControl(rec.sort_order + 'opportunity', new FormControl(rec.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
      this.nextStepsForm.addControl(rec.sort_order + 'action', new FormControl(rec.action, [Validators.minLength(40), Validators.maxLength(200)]));
      if (rec.type === 'Custom Recommendation') {
        this.nextStepsForm.addControl(rec.sort_order + 'savings', new FormControl(rec.potential_savings, Validators.required));
      }
    }

    this.nextStepsForm.statusChanges.subscribe(result => {
      this.nextStepsFormStatusChange.emit(result);
    });
    if (this.nextStepsForm.status === 'VALID') {
      setTimeout(() => { this.parent.nextStepsValid = true; });
    } else if (this.nextStepsForm.status === 'INVALID') {
      setTimeout(() => { this.parent.nextStepsValid = false; });
    }
    // console.log("nextStepsForm: ", this.nextStepsForm);
  }

  async viewReport() {
    // console.log("nextStepsComp: ", this.savedInsights);
    for (let insight of this.savedInsights) {
      insight.opportunity = this.nextStepsForm.controls[insight.sort_order.toString() + 'opportunity'].value;
      insight.title = this.nextStepsForm.controls[insight.sort_order.toString() + 'title'].value;
      insight.why_it_matters = this.nextStepsForm.controls[insight.sort_order.toString() + 'action'].value;
      insight = await this.qbrService.saveNextStep(insight);
      // console.log("insiught: ", insight)
    }
    // console.log("navigating away")
    this.router.navigate(['/analytics-ui/qbrs/view'], {queryParams: {
      qbrId: this.parent.parent.report.id
    }});
  }

  saveNextStep(rec: any) {

  }


  openModal(rec): void {
    this.dialog.open(NextStepInputsComponent, {
      data: rec
    });
  }

}
