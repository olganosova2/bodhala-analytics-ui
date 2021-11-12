import { Component, OnInit } from '@angular/core';
import {CommonService, IClient} from '../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {confirmDialogConfig} from '../shared/services/config';
import {QbrService} from './qbr.service';
import {IReport} from './qbr-model';

@Component({
  selector: 'bd-qbr',
  templateUrl: './qbr.component.html',
  styleUrls: ['./qbr.component.scss']
})
export class QbrComponent implements OnInit {
  pendingRequest: Subscription;
  selectedClient: IClient;
  clientQBRs: Array<any> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  firstReport: boolean = false;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              private qbrService: QbrService) {
    this.commonServ.pageTitle = this.userService.currentUser.client_info.org.name + ' QBRs';
  }

  async ngOnInit(): Promise<void> {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('ClientConfigsGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    const result = await this.qbrService.getClientQBRs();
    this.clientQBRs = result.reports;
    console.log("clientQBRs: ", this.clientQBRs)
    this.loadGrid();
  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      // {headerName: 'Year', field: 'year', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'QBR Type', field: 'report_type', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Start Date', field: 'start_date', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'End Date', field: 'end_date', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Status', field: 'status', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Author', field: 'author', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'Created On', field: 'created_on', ...this.defaultColumn,  filter: 'text', flex: 1},
      {headerName: 'View', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.view.bind(this)},
      {headerName: 'Edit', cellRenderer: this.editCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.edit.bind(this)}
    ];
  }

  loadGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    if (this.firstLoad) {
      this.defaultState = this.gridOptions.columnApi.getColumnState();
      this.firstLoad = false;
    }
    this.gridOptions.api.setRowData(this.clientQBRs);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  saveGridConfig(evt: any): void {
    // const state = evt;
    this.agGridService.saveState('ClientQBRsGrid', this.gridOptions);
  }

  viewCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-eye"></em></button>';
    return value;
  }

  editCellRenderer() {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-pencil"></em></button>';
    return value;
  }

  view(row: any): void {
    this.router.navigate(['/analytics-ui/qbrs/view/', row.data.id]);
  }

  edit(row: any): void {
    this.router.navigate(['/analytics-ui/qbrs/edit/', row.data.id]);
  }

  addNew(): void {
    this.router.navigate(['/analytics-ui/qbrs/new']);
  }

}
