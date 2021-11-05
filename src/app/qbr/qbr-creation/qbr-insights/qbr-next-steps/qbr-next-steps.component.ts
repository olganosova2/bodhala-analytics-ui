import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

@Component({
  selector: 'bd-qbr-next-steps',
  templateUrl: './qbr-next-steps.component.html',
  styleUrls: ['./qbr-next-steps.component.scss']
})
export class QbrNextStepsComponent implements OnInit {
  nextStepsForm = new FormGroup({});
  @Input() savedInsights: any;


  constructor(private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public filtersService: FiltersService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public datepipe: DatePipe,
              private qbrService: QbrService,
              private parent: QbrInsightsComponent,
              private recService: RecommendationService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log("saved: ", this.savedInsights);
    for (const rec of this.savedInsights) {
      rec.section = 'Next Steps';
      this.nextStepsForm.addControl(rec.sort_order + 'title', new FormControl(rec.title, [Validators.minLength(10), Validators.maxLength(60)]));
      this.nextStepsForm.addControl(rec.sort_order + 'opportunity', new FormControl(rec.opportunity, [Validators.minLength(40), Validators.maxLength(200)]));
      this.nextStepsForm.addControl(rec.sort_order + 'action', new FormControl(rec.action, [Validators.minLength(40), Validators.maxLength(200)]));

    }
  }





  saveNextStep(rec: any) {

  }

  openModal(rec): void {
    this.dialog.open(NextStepInputsComponent, {
      data: rec
    });
  }

}
