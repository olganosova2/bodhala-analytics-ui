import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {YoyRateIncreaseService} from '../yoy-rate-increase.service';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {IYoyRateIncreaseRaw, YoYMetricTypes} from '../yoy-rate-increase-model';

@Component({
  selector: 'bd-yoy-drill-by-tk',
  templateUrl: './yoy-drill-by-tk.component.html',
  styleUrls: ['./yoy-drill-by-tk.component.scss']
})
export class YoyDrillByTkComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  autoGroupColumnDef: any;
  defaultState: any;
  firstLoad: boolean = true;
  paginationPageSize: any = 25;
  years: Array<number> = [];
  linesForGrid: Array<any> = [];
  gridApi: any;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public yoyService: YoyRateIncreaseService) {
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.autoGroupColumnDef = {
      headerName: 'Firm', minWidth: 300, resizable: true, sortable: true, filter: 'agTextColumnFilter', cellRendererParams: {suppressCount: true},
      filterValueGetter: this.yoyService.firmNameCellRenderer
    };
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.gridOptions = {suppressMenuHide: true, rowHeight: 40};
    this.gridOptions.headerHeight = 30;
    this.gridOptions.groupRowAggNodes = this.yoyService.calculateAggFunc;
    this.getRateIncrease();
  }

  initColumns(): void {

    const defaultColumns = [
      {headerName: 'Firm', field: 'firm_name', valueGetter: this.yoyService.firmNameCellRenderer, ...this.defaultColumn, width: 250, filter: 'agTextColumnFilter', rowGroup: true, hide: true},
      {headerName: 'Classification', field: 'bh_classification', ...this.defaultColumn, filter: 'agTextColumnFilter', rowGroup: true, hide: true},
      {headerName: 'TK Level', field: 'tk_level', ...this.defaultColumn, filter: 'agTextColumnFilter', rowGroup: true, hide: true, cellRenderer: this.yoyService.tkNameCellRenderer},
      {headerName: 'Timekeeper', field: 'timekeeper_name', ...this.defaultColumn, filter: 'agTextColumnFilter', width: 200}
    ];
    const defs = [];
    this.yoyService.buildColumns(defs, YoYMetricTypes.Rate, this.years);
    this.yoyService.buildColumns(defs, YoYMetricTypes.Spend, this.years);
    this.yoyService.buildColumns(defs, YoYMetricTypes.Increase, this.years);
    this.gridOptions.columnDefs = [...defaultColumns, ...defs];
    this.firstLoad = false;
  }

  onGridReady(params): void {
    this.gridApi = params.api;
  }

  getRateIncrease(): void {
    const params = {client_id: this.userService.currentUser.client_info_id, num_years: 3, drill_down: true};
    this.pendingRequest = this.httpService.makeGetRequest<IYoyRateIncreaseRaw>('getRateIncreaseByFirm', params).subscribe(
      (data: any) => {
        const x = data.result;
        if (data.result && data.result.rate_increases && data.result.rate_increases.length > 0) {
          this.processRecords(data.result.rate_increases);
          this.initColumns();
        }
      }
    );
  }

  processRecords(records: Array<IYoyRateIncreaseRaw>): void {
    const uniqueFirms = [...new Set(records.map(item => item.bh_lawfirm_id))];
    const uniqueYears = [...new Set(records.map(item => item.year))];
    this.years = uniqueYears.sort((a, b) => a - b);
    for (const firmId of uniqueFirms) {
      const firmRecords = records.filter(e => e.bh_lawfirm_id === firmId) || [];
      this.linesForGrid = [...this.linesForGrid, ...this.formatFirmLines(firmRecords)];
    }
  }

  formatFirmLines(records: Array<IYoyRateIncreaseRaw>): Array<any> {
    const result = [];
    for (const rec of records) {
      const found = result.find(e => e.firm_name === rec.firm_name && e.bh_classification === rec.bh_classification
        && e.tk_level === rec.tk_level && e.bh_timekeeper_id === rec.bh_timekeeper_id);
      if (!found) {
        result.push({
          firm_id: rec.bh_lawfirm_id, firm_name: rec.firm_name, bh_classification: rec.bh_classification,
          tk_level: rec.tk_level, timekeeper_name: rec.timekeeper_name, bh_timekeeper_id: rec.bh_timekeeper_id
        });
      }
    }
    for (const line of result) {
      for (const y of this.years) {
        const colRateName = y.toString() + '_' + YoYMetricTypes.Rate;
        const colSpendName = y.toString() + '_' + YoYMetricTypes.Spend;
        const colIncreasedName = y.toString() + '_' + YoYMetricTypes.Increase;
        const found = records.find(e => e.firm_name === line.firm_name && e.bh_classification === line.bh_classification && e.year === y
          && e.tk_level === line.tk_level && e.bh_timekeeper_id === line.bh_timekeeper_id);
        if (found) {
          line[colRateName] = found.effective_rate;
          line[colSpendName] = found.total_spend;
          line[colIncreasedName] = 0;
        } else {
          line[colRateName] = 0;
          line[colSpendName] = 0;
          line[colIncreasedName] = 0;
        }
      }
      this.yoyService.calculaterateIncrease(line, this.years);
    }
    return result;
  }

  changePageSize(evt: any): void {
    this.paginationPageSize = evt.value;
    this.gridOptions.api.paginationSetPageSize(this.paginationPageSize);
  }

  setGridHeight(records: Array<any>, paginationPageSize: number): number {
    let minNum = records.length < 10 ? 10 : records.length; // always default to 10 to show grid
    if (minNum >= paginationPageSize) {
      minNum = paginationPageSize;
    }
    return minNum * this.gridOptions.rowHeight + 50;
  }

  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
