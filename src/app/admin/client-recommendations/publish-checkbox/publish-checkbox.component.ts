import { Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {AppStateService, GenericConfirmModalComponent, HttpService} from 'bodhala-ui-common';
import {MatDialog} from '@angular/material/dialog';
import * as config from '../../../shared/services/config';


@Component({
  selector: 'bd-publish-checkbox',
  template: `
    <input
      type="checkbox"
      (click)="checkedHandler($event)"
      [checked]="params.value"
    />
  `
})
export class PublishCheckboxComponent implements ICellRendererAngularComp, OnDestroy  {
  params: any;
  pendingRequest: Subscription;
  errorMessage: any;

  constructor(private httpService: HttpService,
              public appStateService: AppStateService,
              public dialog: MatDialog)  { }


  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
  }

  checkedHandler(event) {
    const checked = event.target.checked;
    const colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
    this.openPublishDialog(checked);
  }

  openPublishDialog(checked: boolean): void {
    let modalConfig;
    if (checked) {
      modalConfig = {...config.confirmDialogConfig, data: {title: 'Publish Report', text: 'After publishing this report it will be visible by clients.'}};
    } else {
      modalConfig = {...config.confirmDialogConfig, data: {title: 'Unpublish Report', text: 'After unpublishing this report, it will no longer be visible by clients.'}};
    }
    const dialogRef = this.dialog.open(GenericConfirmModalComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.publishReport();
      } else {
        if (checked === true) {
          this.params.value = false;
        } else {
          this.params.value = true;
        }
        const colId = this.params.column.colId;
        this.params.node.setDataValue(colId, this.params.value);
      }
    });
  }

  publishReport(): void {
    const params = {reportId: this.params.data.id, published: this.params.value };
    this.pendingRequest = this.httpService.makePostRequest('publishRecommendationReport', params).subscribe(
      (data: any) => {
        const published = data.result;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  ngOnDestroy(): void {
  }
}
