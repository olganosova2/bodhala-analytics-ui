import {Component, Input, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {HttpService, UserService} from 'bodhala-ui-common';
import { DatePipe } from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {QbrService} from '../../../../qbr.service';
import {environment} from '../../../../../../environments/environment';
import { RecommendationService } from 'src/app/admin/client-recommendations/recommendation.service';
import {moneyFormatter} from '../../../../qbr-model';


@Component({
  selector: 'bd-next-step-inputs',
  templateUrl: './next-step-inputs.component.html',
  styleUrls: ['./next-step-inputs.component.scss']
})
export class NextStepInputsComponent implements OnInit {
  @Output() updateNextStepData = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public datePipe: DatePipe,
              public dialogRef: MatDialogRef<NextStepInputsComponent>,
              public httpService: HttpService,
              public userService: UserService,
              private recService: RecommendationService,
              public qbrService: QbrService) { }

  ngOnInit(): void {
  }

  async updateSavings() {
    if (this.data.type === 'Increase Discounts') {
      this.data = this.qbrService.calculateDiscountSavings(this.data, this.data.savingsData, this.data.expenses, this.data.overallNumbers);
    } else if (this.data.type === 'Prevent Rate Increases') {
      const rateIncreaseData = await this.recService.getRateIncreaseData(this.data, this.userService.currentUser.client_info.id, this.data.practiceAreaSetting);
      this.data.potential_savings = rateIncreaseData.savings;
      this.data.potential_savings_formatted = moneyFormatter.format(this.data.potential_savings);
    } else if (this.data.type === 'Partner / Associate Work Allocation') {
      this.data = this.qbrService.calculateStaffingAllocationSavings(this.data, this.data.savingsData, this.data.expenses, this.data.overallNumbers);
    } else if (this.data.type === 'Decrease Block Billing') {
      this.data = this.qbrService.calculateBlockBillingSavings(this.data, this.data.savingsData);
    } else if (this.data.type === 'Shift Work to Other Firms') {
      this.data = this.qbrService.calculateShiftFirmsSavings(this.data, this.data.topFirmData, this.data.secondFirmData);
    }
    this.updateNextStepData.emit(this.data);
    this.dialogRef.close();
  }
}
