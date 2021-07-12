import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {Subscription} from 'rxjs';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {GridOptions} from 'ag-grid-community';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
import {ILedesImport} from './ledes-imports-model';
import {AgGridService} from 'bodhala-ui-elements';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/overlay-directives';



@Component({
  selector: 'bd-ledes-imports',
  templateUrl: './ledes-imports.component.html',
  styleUrls: ['./ledes-imports.component.scss']
})
export class LedesImportsComponent implements OnInit {
  pendingRequest: Subscription;
  errorMessage: any;
  daysOptions: SelectItem[] = [{label: 'Yesterday', value: 1},
                               {label: 'Last 7 Days', value: 7},
                               {label: 'Last 2 Weeks', value: 14},
                               {label: 'Last Month', value: 30},
                               {label: 'Last 3 Months', value: 90}];
  selectedDateRange: number = 7;
  dropdownWidth: any = {'width': '325px'};
  imports: Array<ILedesImport> = [];
  paginationPageSize: number = 10;
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
              public utilService: UtilService,
              public commonServ: CommonService,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'Auto LEDES Imports';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('AutoLEDESGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    this.getLEDESImports();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Client', field: 'name', ...this.defaultColumn, floatingFilter: true, width: 300},
      {headerName: 'Firms', field: 'name', ...this.defaultColumn,  filter: 'agTextColumnFilter', floatingFilter: true, width: 300},
      {headerName: 'Status', field: 'status', ...this.defaultColumn, floatingFilter: true, width: 140},
      {headerName: '# Imported', field: 'num_imported', ...this.defaultColumn, floatingFilter: true, width: 140},
      {headerName: '# Failed', field: 'num_failed', ...this.defaultColumn, floatingFilter: true, width: 140},
      {headerName: 'Files', cellRenderer: this.filesCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true},
      {headerName: 'Errors', cellRenderer: this.errorsCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true},
      {headerName: 'View', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true},
      {headerName: 'Re-run', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true}
    ];
  }


  getLEDESImports(): void {
    console.log("hello!", this.selectedDateRange);
    const params = { range: this.selectedDateRange };
    this.pendingRequest = this.httpService.makeGetRequest<ILedesImport>('getAutoLEDESImports', params).subscribe(
      (data: any) => {
        console.log("Data: ", data);
        this.imports = data.result || [];
        this.imports = this.imports.sort(this.utilService.dynamicSort('created_on'));
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
    this.gridOptions.api.setRowData(this.imports);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    // this.agGridService.saveState('AutoLEDESGrid', this.gridOptions); TODO
  }

  filesCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-docs"></em></button>';
    return value;
  }
  errorsCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-warning"></em></button>';
    return value;
  }
  viewCellRenderer(params: any) {
    const value = '<button mat-flat-button type="button" style="width: 60px;border: none;background-color: #e1e2e3;"><em class="icon-eye"></em></button>';
    return value;
  }

}
