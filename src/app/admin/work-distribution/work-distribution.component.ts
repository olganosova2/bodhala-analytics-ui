import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommonService, IClient} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import {IWorkDistribution} from './work-distrubution-model';
import {IEntityConfig} from '../client-configs/client-configs-model';

@Component({
  selector: 'bd-work-distribution',
  templateUrl: './work-distribution.component.html',
  styleUrls: ['./work-distribution.component.scss']
})
export class WorkDistributionComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  errorMessage: any;
  selectedClient: IClient;
  workRecords: Array<IWorkDistribution> = [];
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'Average Work Distribution';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('WorkDistributionGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Year', field: 'year', ...this.defaultColumn,  floatingFilter: true},
      {headerName: 'Classification', field: 'bh_classification', ...this.defaultColumn,  filter: 'agTextColumnFilter',  floatingFilter: true},
      {headerName: 'Total Spend', field: 'total_spend', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn,  floatingFilter: true},
      {headerName: '% of Spend', field: 'total_spend_per', cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn,  floatingFilter: true},
      {headerName: 'Total Hours', field: 'total_hours', cellRenderer: this.agGridService.roundNumberCellRenderer, ...this.defaultColumn,  floatingFilter: true },
      {headerName: '% of Hours Worked', field: 'total_hours_per', cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn,  floatingFilter: true},
      {headerName: 'Avg Rate', field: 'effective_rate', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn,  floatingFilter: true},
    ];
  }

  loadClient(client: IClient): void {
    this.selectedClient = client;
    if (this.selectedClient) {
      this.getClientData();
      this.commonServ.pageSubtitle = this.selectedClient.org_name;
    }
  }
  getClientData(): void {
    this.workRecords = [];
    const params = { clientId: this.selectedClient.bh_client_id };
    this.pendingRequest = this.httpService.makeGetRequest<IWorkDistribution>('getTkWorkDistribution', params).subscribe(
      (data: any) => {
        this.workRecords = data.result || [];
        this.loadGrid();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  loadGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    if (this.firstLoad) {
      this.defaultState = this.gridOptions.columnApi.getColumnState();
      this.firstLoad = false;
    }
    this.gridOptions.api.setRowData(this.workRecords);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('ClientConfigsGrid', this.gridOptions);
  }

  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
