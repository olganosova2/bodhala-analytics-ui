import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid-community';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {ISubscriptionGroup} from '../subscription-list-model';
import {CheckboxCellComponent} from '../../../shared/components/checkbox-cell/checkbox-cell.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-subscription-grid',
  templateUrl: './subscription-grid.component.html',
  styleUrls: ['./subscription-grid.component.scss']
})
export class SubscriptionGridComponent implements OnInit, OnDestroy {
  pendingRequestAdd: Subscription;
  pendingRequestDelete: Subscription;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  paginationPageSize: any = 10;
  @Input() groupData: ISubscriptionGroup;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) { }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('SubscriptionGrid_' + this.groupData.groupName);
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 60;
    this.initColumns();
  }
  initColumns(): void {
    const defs = [];
    const column = {headerName: 'Client', field: 'org_name', ...this.defaultColumn, width: 220, filter: 'agTextColumnFilter',  floatingFilter: true, pinned: true };
    defs.push(column);
    for (const sub of this.groupData.subscriptions) {
      const col = {headerName: sub.description, field: this.getSubscriptionFieldName(sub.id), ...this.defaultColumn, suppressMenu: true, editable: true, cellStyle: {textAlign: 'center'},
        cellRendererFramework: CheckboxCellComponent, cellRendererParams: { onAdd: this.addSubscription.bind(this), onDelete: this.deleteSubscription.bind(this)}};
      defs.push(col);
    }
    this.gridOptions.columnDefs = Object.assign([], defs);
    this.firstLoad = false;
  }
  addSubscription(evt: any): void {
    this.updateSubscription(evt, true);
  }
  deleteSubscription(evt: any): void {
    this.updateSubscription(evt, false);
  }
  updateSubscription(colData: any, isEnabled: boolean): void {
    const efId = colData.value;
    const oprgId = colData.data.org_id;
    const featureId = this.getSubscriptionId(colData.colDef.field);
    if (isEnabled) {
      const params = { base_feature: false, feature_id: featureId, org_id: oprgId, feature_version: '0.1'};
      this.pendingRequestAdd = this.httpService.makePostRequest('addSubscription', params).subscribe(
        (data: any) => {
          if (data.result){
            colData.value = data.result.id;
            colData.data[this.getSubscriptionFieldName(featureId)] = data.result.id;
          }
        }
      );
    } else {
      const params = { id: efId};
      this.pendingRequestDelete = this.httpService.makeDeleteRequest('deleteSubscription', params).subscribe(
        (data: any) => {
            colData.value = null;
            colData.data[this.getSubscriptionFieldName(featureId)] = null;
        }
      );
    }
  }
  getSubscriptionFieldName(id: number): string {
    return 'feature_' + id.toString();
  }
  getSubscriptionId(colName: string): number {
    return Number(colName.substring(8));
  }
  changePageSize(evt: any): void {
    this.paginationPageSize = evt.value;
    this.gridOptions.api.paginationSetPageSize(this.paginationPageSize);
  }
  ngOnDestroy() {
    if (this.pendingRequestAdd) {
      this.pendingRequestAdd.unsubscribe();
    }
    if (this.pendingRequestDelete) {
      this.pendingRequestDelete.unsubscribe();
    }
  }

}
