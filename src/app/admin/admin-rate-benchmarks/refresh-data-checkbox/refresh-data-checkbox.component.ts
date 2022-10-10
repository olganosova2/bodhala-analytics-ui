import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {AppStateService, GenericConfirmModalComponent, HttpService} from 'bodhala-ui-common';
import {MatDialog} from '@angular/material/dialog';
import * as config from '../../../shared/services/config';

@Component({
  selector: 'bd-refresh-data-checkbox',
  template: `
    <input
      type="checkbox"
      (click)="checkedHandler($event)"
      [checked]="params.value"
    />
  `
})
export class RefreshDataCheckboxComponent implements  ICellRendererAngularComp {
  params: any;
  pendingRequest: Subscription;

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
    this.updateBMRefreshStatus(checked);
  }

  updateBMRefreshStatus(checked): void {
    const params = {bmId: this.params.data.id, refresh: checked };
    this.pendingRequest = this.httpService.makePostRequest('updateBMRefreshStatus', params).subscribe(
      (data: any) => {
        const published = data.result;
      }
    );
  }

}
