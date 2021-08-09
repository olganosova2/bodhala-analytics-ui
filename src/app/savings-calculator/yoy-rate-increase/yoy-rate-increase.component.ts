import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {Subscription} from 'rxjs';
import {IYoyRateIncreaseRaw, YoYMetricTypes} from './yoy-rate-increase-model';
import {GridOptions} from 'ag-grid-community';
import {CheckboxCellComponent} from '../../shared/components/checkbox-cell/checkbox-cell.component';
import * as config from '../../shared/services/config';
import {YoyRateIncreaseService} from './yoy-rate-increase.service';

@Component({
  selector: 'bd-yoy-rate-increase',
  templateUrl: './yoy-rate-increase.component.html',
  styleUrls: ['./yoy-rate-increase.component.scss']
})
export class YoyRateIncreaseComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  errorMessage: any;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  paginationPageSize: any = 10;
  years: Array<number> = [];
  linesForGrid: Array<any> = [];
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
    this.commonServ.pageTitle = 'YoY % Rate Increase feature by Firm and Classification';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 50;
    this.getRateIncrease();
  }
  initColumns(): void {
    const defaultColumns = [
      {headerName: 'ID', field: 'firm_id', ...this.defaultColumn, floatingFilter: true, width: 100},
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn, width: 250, filter: 'agTextColumnFilter',  floatingFilter: true},
      {headerName: 'Classification', field: 'bh_classification', ...this.defaultColumn,  filter: 'agTextColumnFilter',  floatingFilter: true}
   ];
    const defs = [];
    this.yoyService.buildColumns(defs, YoYMetricTypes.Rate, this.years);
    this.yoyService.buildColumns(defs, YoYMetricTypes.Spend, this.years);
    this.yoyService.buildColumns(defs, YoYMetricTypes.Increase, this.years);
    this.gridOptions.columnDefs = [...defaultColumns, ...defs];
    this.firstLoad = false;
  }
  getRateIncrease(): void {
    const params = {client_id: this.userService.currentUser.client_info_id, num_years: 3};
    this.pendingRequest = this.httpService.makeGetRequest<IYoyRateIncreaseRaw>('getRateIncreaseByFirm', params).subscribe(
      (data: any) => {
       const x = data.result;
       if (data.result && data.result.rate_increases && data.result.rate_increases.length > 0) {
         this.processRecords(data.result.rate_increases);
         this.initColumns();
       }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  processRecords(records: Array<IYoyRateIncreaseRaw>): void {
    for (const rec of records) {
      if (this.years.indexOf(rec.year) < 0) {
        this.years.push(rec.year);
      }
      const found = this.linesForGrid.find(e => e.firm_name === rec.firm_name && e.bh_classification === rec.bh_classification);
      if (!found) {
        this.linesForGrid.push({firm_id: rec.bh_lawfirm_id, firm_name: rec.firm_name, bh_classification: rec.bh_classification});
      }
    }
    this.years.sort((a, b) => a - b);
    for (const line of this.linesForGrid) {
      for (const y of this.years) {
        const colRateName = y.toString() + '_' + YoYMetricTypes.Rate;
        const colSpendName = y.toString() + '_' + YoYMetricTypes.Spend;
        const colIncreasedName = y.toString() + '_' + YoYMetricTypes.Increase;
        const found = records.find(e => e.firm_name === line.firm_name && e.bh_classification === line.bh_classification && e.year === y);
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
  }
  changePageSize(evt: any): void {
    this.paginationPageSize = evt.value;
    this.gridOptions.api.paginationSetPageSize(this.paginationPageSize);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
