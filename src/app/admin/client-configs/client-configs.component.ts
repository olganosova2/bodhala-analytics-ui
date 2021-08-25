import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService, IClient} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {IEntityConfig} from './client-configs-model';
import * as config from '../../shared/services/config';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES, SAVINGS_CALCULATOR_CONFIG} from '../../shared/services/config';
import {AddEditConfigComponent} from './add-edit-config/add-edit-config.component';

@Component({
  selector: 'bd-client-configs',
  templateUrl: './client-configs.component.html',
  styleUrls: ['./client-configs.component.scss']
})
export class ClientConfigsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestDelete: Subscription;
  selectedClient: IClient;
  clientConfigs: Array<IEntityConfig> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  gridApi: any;
  helpArticleId: string = FRESH_DESK_ARTICLES.EntityConfig;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'Manage Clients Configs';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('ClientConfigsGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    this.getClientConfigs();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', ...this.defaultColumn, floatingFilter: true, width: 80},
      {headerName: 'Client ID', field: 'client_id', ...this.defaultColumn,  floatingFilter: true,  width: 100},
      {headerName: 'Org. ID', field: 'org_id', ...this.defaultColumn,  floatingFilter: true, width: 100},
      {headerName: 'Client Name', field: 'client_name', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, flex: 1},
      {headerName: 'User ID', field: 'user_id', ...this.defaultColumn,  floatingFilter: true, width: 100},
      {headerName: 'Email', field: 'email', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true,  width: 150},
      {headerName: 'Entity Name', field: 'name', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true,  flex: 1},
      // {headerName: 'Description', field: 'description', ...this.defaultColumn,  filter: 'text', floatingFilter: true},
      {headerName: 'Value', field: 'value', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true,  width: 220},
      {headerName: 'Edit', cellRenderer: this.editCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.edit.bind(this)},
      {headerName: 'Delete', cellRenderer: this.deleteCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.openDeleteDialog.bind(this)},
    ];
  }
  getClientConfigs(): void {
    this.pendingRequest = this.httpService.makeGetRequest<IEntityConfig>('getAllConfigsExtended').subscribe(
      (data: any) => {
        this.clientConfigs = data.result || [];
        this.firstLoad = false;
      }
    );
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    // this.agGridService.saveState('ClientConfigsGrid', this.gridOptions); TODO
  }
  editCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-pencil"></em></button>';
    return value;
  }
  deleteCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-trash"></em></button>';
    return value;
  }
  edit(row: any): void {
    const item = row.data;
    this.openModal(item);
  }
  openModal(item: IEntityConfig): void {
    const packaged = { config: Object.assign({}, item), records: this.clientConfigs};
    const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], packaged)};
    const dialogRef = this.dialog.open(AddEditConfigComponent, {...modalConfig, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (!item.id) {
        this.getClientConfigs();
      } else if (result) {
        const rowNode = this.gridApi.getRowNode(item.id);
        rowNode.setData(result);
      }
    });

  }
  addNew(): void {
    const newItem = this.createNewConfig();
    this.openModal(newItem);
  }
  createNewConfig(): IEntityConfig {
    return { id: null, description: '', name: '', value: null, client_id: null, user_id: null, org_id: null, client_name: null, json_config: null};
  }
  openDeleteDialog(row: any): void {
    const modalConfig = {...config.confirmDialogConfig, data: {title: 'Confirm Delete', item: 'config'}};
    const dialogRef = this.dialog.open(ConfirmModalComponent, {...modalConfig});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.deleteConfig(row.data);
      }
    });
  }
  deleteConfig(item: IEntityConfig): void {
    const params = { id: item.id};
    this.pendingRequestDelete = this.httpService.makeDeleteRequest('deleteClientConfig', params).subscribe(
      (data: any) => {
        const deleted = data.result;
        if (deleted) {
          this.getClientConfigs();
        }
      }
    );
  }
  openHelp(): void {
    this.commonServ.openHelpArticle(this.helpArticleId);
  }
  changePageSize(evt: any): void {
    this.paginationPageSize = evt.value;
    this.gridOptions.api.paginationSetPageSize(this.paginationPageSize);
  }
  getRowNodeId(data: any) {
    return data.id;
  }
  onGridReady(params): void {
    this.gridApi = params.api;
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestDelete) {
      this.pendingRequestDelete.unsubscribe();
    }
  }

}
