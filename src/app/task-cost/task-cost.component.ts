import { Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {CommonService} from '../shared/services/common.service';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {LicenseManager} from 'ag-grid-enterprise';

import {AG_GRID_NAME, ITaskCost} from './task-cost.model';

@Component({
  selector: 'bd-task-cost',
  templateUrl: './task-cost.component.html',
  styleUrls: ['./task-cost.component.scss']
})
export class TaskCostComponent implements OnInit, OnDestroy {
  errorMessage: any;
  pageName: string = 'app.client-dashboard.task-cost';
  pageType: string = 'Task Cost';
  pendingRequest: Subscription;
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  totalRecords: number = 0;
  gridHeight: number = 629;
  autoGroupColumnDef: any;
  defaultState: any;
  firstLoad: boolean = true;
  taskCostData: Array<ITaskCost> = [];

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public agGridService: AgGridService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Task Cost';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState(AG_GRID_NAME);
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.autoGroupColumnDef = { minWidth: 350, headerName: 'Firms', sortable: true, resizable: true, filter: 'agTextColumnFilter' };
    this.initColumns();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {  headerName: 'Firms', field: 'column_name',  rowGroup: true, hide: true, sortable: true },
      {  field: 'line_item_task_group',  rowGroup: true,  hide: true, ... this.defaultColumn, filter: 'text', sort: 'desc' },
      {  headerName: 'Code', field: 'line_item_task_code_formatted', ... this.defaultColumn,  flex: 2, filter: 'agTextColumnFilter'},
      {  headerName: '# of Matters', field: 'total_matters', ... this.defaultColumn, aggFunc: 'sum',  flex: 1 },
      { headerName: 'Avg Matter Cost', field: 'avg_matter_cost', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... this.defaultColumn, comparator: this.agGridService.zeroNumberComparator,  aggFunc: 'sum',  flex: 1},
      { headerName: 'Avg Hours', field: 'total_hours', ... this.defaultColumn, cellRenderer: this.agGridService.roundNumberCellRenderer,  aggFunc: 'sum' ,  flex: 1},
      { headerName: 'Total Billed', field: 'total_billed', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... this.defaultColumn, comparator: this.agGridService.zeroNumberComparator,  aggFunc: 'sum',  flex: 1},
    ];
  }

  loadTaskCost(): void {
    this.totalRecords = 0;
    this.taskCostData = [];
    const params = this.filtersService.getCurrentUserCombinedFilters();
    params.column = 'firms';
    this.pendingRequest = this.httpService.makeGetRequest('getTaskCost', params).subscribe(
      (data: any) => {
        this.taskCostData = data.result || [];
        this.formatLineCode();
        this.taskCostData.sort((a, b) => a.column_name.localeCompare(b.column_name) || a.line_item_task_group.localeCompare(b.line_item_task_group) || a.line_item_task_code_formatted.localeCompare(b.line_item_task_code_formatted));
        this.loadGrid();
      },
      err => {
        this.errorMessage = err;
      }
    );

  }
  refreshData(evt: any): void {
    this.loadTaskCost();
  }
  loadGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    if (this.firstLoad) {
      this.defaultState = this.gridOptions.columnApi.getColumnState();
      this.firstLoad = false;
    }
    this.gridOptions.api.setRowData(this.taskCostData);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }
  formatLineCode(): void {
    for (const rec of this.taskCostData) {
      const descr = rec.line_item_task_description ? rec.line_item_task_description : '';
      rec.line_item_task_code_formatted = rec.line_item_task_code + ' (' + descr + ')';
    }
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState(AG_GRID_NAME, this.gridOptions);
  }
  changePageSize(evt: any): void {
    this.paginationPageSize = evt.value;
    this.gridOptions.api.paginationSetPageSize(this.paginationPageSize);
    setTimeout(() => {
      this.gridHeight = this.agGridService.setGridHeight(this.taskCostData, this.paginationPageSize);
    });
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
