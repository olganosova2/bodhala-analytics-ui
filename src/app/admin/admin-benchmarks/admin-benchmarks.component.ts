import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService, IClient} from '../../shared/services/common.service';
import {BenchmarkService} from '../../benchmarks/benchmark.service';
import {Subscription} from 'rxjs';
import {AG_GRID_NAME, IAdminBenchmark} from './admin-benchmarks-model';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import {RouterLinkRendererComponent} from '../../shared/components/router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'bd-admin-benchmarks',
  templateUrl: './admin-benchmarks.component.html',
  styleUrls: ['./admin-benchmarks.component.scss']
})
export class AdminBenchmarksComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  errorMessage: any;
  benchmarks: Array<IAdminBenchmark> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  totalRecords: number = 0;
  gridHeight: number = 629;
  defaultState: any;
  firstLoad: boolean = true;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public agGridService: AgGridService,
              public benchmarkServ: BenchmarkService) {
    this.commonServ.pageTitle = 'Admin Benchmarks';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState(AG_GRID_NAME);
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: '#', field: 'id', ...this.defaultColumn, sort: 'asc'},
      {headerName: 'Client', field: 'client', ...this.defaultColumn, cellRenderer: this.clientCellRenderer, filter: 'text', flex: 2},
      {headerName: 'Firm', field: 'firm', ...this.defaultColumn, cellRenderer: this.firmCellRenderer, filter: 'text',  flex: 2 },
      {headerName: 'Year', field: 'year', ...this.defaultColumn},
      {headerName: 'View', field: 'id', ...this.defaultColumn, cellRendererFramework: RouterLinkRendererComponent,
        cellRendererParams: {
          inRouterLink: '/analytics-ui/admin/benchmark-edit/',
          label: 'Edit',
          control: 'button'
        }},
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
    this.gridOptions.api.setRowData(this.benchmarks);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  getBenchmarks(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getAdminBenchmarks').subscribe(
      (data: any) => {
        this.benchmarks = data.result || [];
        this.loadGrid();
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  clientCellRenderer(params: any) {
    return params.node.data.client + ' (' + params.node.data.client_id + ')';
  }
  firmCellRenderer(params: any) {
    return params.node.data.firm + ' (' + params.node.data.firm_id + ')';
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState(AG_GRID_NAME, this.gridOptions);
  }
  addNew() {
    this.router.navigate(['analytics-ui/admin/benchmark-add']);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
