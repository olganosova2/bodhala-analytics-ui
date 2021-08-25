import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {IWorkDistribution, IWorkDistributionByPA} from '../work-distrubution-model';
import {GridOptions} from 'ag-grid-community';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-work-distribution-by-pa',
  templateUrl: './work-distribution-by-pa.component.html',
  styleUrls: ['./work-distribution-by-pa.component.scss']
})
export class WorkDistributionByPaComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  paginationPageSize: any = 10;
  workRecordsByPA: Array<IWorkDistributionByPA> = [];
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
    this.savedState = this.agGridService.getSavedState('WorkDistributionByPaGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    this.getDistributionByPA();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'BD Practice Area', field: 'client_matter_type', ...this.defaultColumn, width: 200, filter: 'agTextColumnFilter',  floatingFilter: true},
      {headerName: 'Classification', field: 'bh_classification', ...this.defaultColumn,  filter: 'agTextColumnFilter',  floatingFilter: true},
      {headerName: 'Total Spend For Class', field: 'total_spend', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn,  floatingFilter: true},
      {headerName: '% of Total Spend', field: 'total_spend_per', cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn,  floatingFilter: true},
      {headerName: 'Total Hours For Class', field: 'total_hours', cellRenderer: this.agGridService.roundNumberCellRenderer, ...this.defaultColumn,  floatingFilter: true },
      {headerName: '% of Total Hours', field: 'total_hours_per', cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ...this.defaultColumn,  floatingFilter: true},
      {headerName: 'Total Spend', field: 'sub_total_spend', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn,  floatingFilter: true},
      {headerName: 'Total Hours', field: 'sub_total_hours', cellRenderer: this.agGridService.roundNumberCellRenderer, ...this.defaultColumn,  floatingFilter: true },
    ];
  }
  getDistributionByPA(): void {
    this.workRecordsByPA = [];
    this.pendingRequest = this.httpService.makeGetRequest<IWorkDistribution>('getTkWorkDistributionByPA').subscribe(
      (data: any) => {
        const records = data.result || [];
        this.processRecords(records);
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
    this.gridOptions.api.setRowData(this.workRecordsByPA);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('WorkDistributionByPaGrid', this.gridOptions);
  }
  processRecords(records: Array<IWorkDistributionByPA>): void {
    const pas = [];
    for (const rec of records) {
      const found = pas.find(e => e.client_matter_type === rec.client_matter_type);
      if (!found) {
        pas.push({ client_matter_type: rec.client_matter_type, sub_total_spend: rec.total_spend, sub_total_hours: rec.total_hours});
      } else {
        found.sub_total_spend += rec.total_spend;
        found.sub_total_hours += rec.total_hours;
      }
    }
    for (const rec of records) {
      const found = pas.find(e => e.client_matter_type === rec.client_matter_type);
      if (found) {
        rec.sub_total_spend = found.sub_total_spend;
        rec.sub_total_hours = found.sub_total_hours;
        const subSpend = rec.sub_total_spend || 1;
        const subHours = rec.sub_total_hours || 1;
        rec.total_spend_per = rec.total_spend / subSpend * 100;
        rec.total_hours_per = rec.total_hours / subHours * 100;
      }
    }
    records = records.filter(e => e.bh_classification !== null && e.bh_classification !== undefined);
    this.workRecordsByPA = Object.assign([], records);
  }
  saveValue(evt: any): void {
    const x = evt;
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
