import {Component, Input, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  @Output() saveComplete: EventEmitter<any> = new EventEmitter<string>();
  parentDialogRef : MatDialogRef<AdminRateBenchmarksComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public userService: UserService,
                private httpService: HttpService) {}

  ngOnInit(): void {
    console.log("NG ON INIT: ", this.data)
    this.selectedClient = this.data.client;
    this.loaded = true;
    this.benchmark = this.data.benchmark;
    this.parentDialogRef = this.data.dialog;
  }

  manageSave() {
    this.saveComplete.emit('CLOSE_PARENT_MODAL');
  }

}
