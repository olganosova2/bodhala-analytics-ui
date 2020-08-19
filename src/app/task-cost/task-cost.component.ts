import { Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {CommonService} from '../shared/services/common.service';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import {Subscription} from 'rxjs';
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
    this.initColumns();
   // this.loadTaskCost();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      { headerName: 'Firms', field: 'column_name', ... this.defaultColumn, width: 250, filter: 'text',  rowGroupIndex: 0 },
      { field: 'line_item_task_group', ... this.defaultColumn,  rowGroupIndex: 1 },
      { field: 'line_item_task_code', ... this.defaultColumn, filter: 'text' },
      { headerName: '# of Matters', field: 'total_matters', ... this.defaultColumn,  aggFunc: 'sum', },
      { headerName: 'Avg Matter Cost', field: 'avg_matter_cost', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... this.defaultColumn, comparator: this.agGridService.zeroNumberComparator,  aggFunc: 'sum'},
      { headerName: 'Avg Hours', field: 'total_hours', ... this.defaultColumn,  aggFunc: 'sum' },
      { headerName: 'Total Billed', field: 'total_billed', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... this.defaultColumn, comparator: this.agGridService.zeroNumberComparator,  aggFunc: 'sum'},
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
    this.gridOptions.api.setRowData(this.taskCostData);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState(AG_GRID_NAME, this.gridOptions);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}
