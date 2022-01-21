import {Component, OnInit} from '@angular/core';
import {CommonService, IClient} from '../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, ConfirmModalComponent, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {MatDialog} from '@angular/material/dialog';
import {FRESH_DESK_ARTICLES, SAVINGS_CALCULATOR_CONFIG} from '../shared/services/config';
import { DatePipe } from '@angular/common';
import {confirmDialogConfig} from '../shared/services/config';
import {IRateBenchmark} from '../rates-analysis/rates-analysis.model';

@Component({
  selector: 'bd-rates-analysis',
  templateUrl: './rates-analysis.component.html',
  styleUrls: ['./rates-analysis.component.scss']
})
export class RatesAnalysisComponent implements OnInit {
  pendingRequest: Subscription;
  pendingRequestDelete: Subscription;
  clientRateBenchmarks: Array<any> = [];
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  gridApi: any;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private httpService: HttpService,
    public appStateService: AppStateService,
    public userService: UserService,
    public commonServ: CommonService,
    public utilService: UtilService,
    public dialog: MatDialog,
    public agGridService: AgGridService) {
      this.commonServ.pageTitle = 'Client Rate Benchmarks';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('RateBenchmarksGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    this.getClientRateBenchmarks();
  }

  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn, width: 200, filter: 'text', flex: 1},
      {headerName: 'Practice Area', field: 'smart_practice_area', ...this.defaultColumn, flex: 1},
      {headerName: 'Year', field: 'year', ...this.defaultColumn},
      {headerName: 'Cost Impact', field: 'year', ...this.defaultColumn, flex: 1},
      {headerName: 'Average Assoc. Rate', field: 'year', ...this.defaultColumn, flex: 1},
      {headerName: 'Assoc. +/- Per Hour', field: 'year', ...this.defaultColumn, flex: 1},
      {headerName: 'Average Partner Rate', field: 'year', ...this.defaultColumn, flex: 1},
      {headerName: 'Partner +/- Per Hour', field: 'year', ...this.defaultColumn, flex: 1},
      {headerName: 'Historical Cost Impact', field: 'year', ...this.defaultColumn, flex: 1},
      {headerName: 'View', cellRenderer: this.viewCellRenderer,  ...this.defaultColumn, width: 100, suppressMenu: true,  onCellClicked: this.view.bind(this)},
    ];
  }

  getClientRateBenchmarks(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getRateBenchmarks').subscribe(
      (data: any) => {
        console.log("data: ", data);
        this.clientRateBenchmarks = data.result || [];
        this.clientRateBenchmarks = this.clientRateBenchmarks.sort(this.utilService.dynamicSort('-created_on'));
        const pipe = new DatePipe('en-US');
        for (const report of this.clientRateBenchmarks) {
          report.created_on = pipe.transform(report.created_on, 'shortDate');
        }
        this.loadGrid();
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
    this.gridOptions.api.setRowData(this.clientRateBenchmarks);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }

  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('RateBenchmarksGrid', this.gridOptions);
  }

  viewCellRenderer() {
    const value = '<button mat-flat-button type="button" style="border: none; background-color: #E9F1F4; border-radius: 99px; height: 22px; width: 60px; margin-top: 19%; display: flex; flex-direction: row; justify-content: center; align-items: center; font-size: 12px;">View<i class="fa fa-chevron-right" style="padding-left: 6px; font-weight: 400;"></i></button>';
    return value;
  }

  costImpactCellRenderer() {
    const value = '<button mat-flat-button class="view-button" type="button" style="width: 60px;border: none;background-color: #E9F1F4; border-radius: 99px; height: 22px; width: 52px;"><em class="icon-trash"></em></button>';
    return value;
  }

  view(row: any): void {
    console.log("row: ", row);
    this.router.navigate(['/analytics-ui/rates-benchmarking/view/', row.data.id]);
  }


}
