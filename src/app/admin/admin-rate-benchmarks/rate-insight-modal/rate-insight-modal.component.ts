import {Component, OnInit, Inject} from '@angular/core';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IClient } from '../../insights/models';
import { AdminRateBenchmarksComponent } from '../admin-rate-benchmarks.component';


@Component({
  selector: 'bd-rate-insight-modal',
  templateUrl: './rate-insight-modal.component.html',
  styleUrls: ['./rate-insight-modal.component.scss']
})
export class RateInsightModalComponent implements OnInit {

  pendingRequest: Subscription;
  errorMessage: any;
  loaded: boolean = false;
  selectedClient: IClient;
  page: string;
  benchmark: any;
  parentDialogRef: MatDialogRef<AdminRateBenchmarksComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public userService: UserService,
              public dialogRef: MatDialogRef<RateInsightModalComponent>) {}

  ngOnInit(): void {
    this.selectedClient = this.data.client;
    this.loaded = true;
    this.benchmark = this.data.benchmark;
    this.parentDialogRef = this.data.dialog;
  }

  manageSave() {
    this.dialogRef.close(true);
  }

}
