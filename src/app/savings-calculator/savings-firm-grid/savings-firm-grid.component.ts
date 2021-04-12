import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
import {ISavingsRecord} from '../savings-calculator.service';
import {GridOptions} from 'ag-grid-community';
import {UserService} from 'bodhala-ui-common';

@Component({
  selector: 'bd-savings-firm-grid',
  templateUrl: './savings-firm-grid.component.html',
  styleUrls: ['./savings-firm-grid.component.scss']
})
export class SavingsFirmGridComponent implements OnInit, AfterViewInit {
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  totalRecords: number = 0;
  gridHeight: number = 629;
  defaultState: any;
  firstLoad: boolean = true;
  subTotalBB: number = 0;
  subTotal: number = 0;
  showDelayedBilling: boolean = false;
  constructor( public dialogRef: MatDialogRef<SavingsFirmGridComponent>,
               public userService: UserService,
               @Inject(MAT_DIALOG_DATA) public data: Array<ISavingsRecord>,
               public agGridService: AgGridService) { }

  ngOnInit(): void {
    if (this.userService.hasEntitlement('analytics.savings.dellayed.billing')) {
      this.showDelayedBilling = true;
    }
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('SavingsByFirmGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 40;
    this.initColumns();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.savedState) {
        const colDB = this.savedState.find(e => e.colId === 'delayed_billing') || {};
        colDB.hide = !this.showDelayedBilling;
      }
      this.agGridService.restoreGrid(this.savedState, this.gridOptions);
      for (const rec of this.data) {
        this.subTotal += rec.total;
        this.subTotalBB += rec.bb;
      }
    });
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', ...this.defaultColumn, width: 100},
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn,  filter: 'text', width: 350},
      {headerName: 'Block Billing', field: 'bb',  cellRenderer: this.agGridService.roundCurrencyCellRenderer,  ...this.defaultColumn, width: 150, comparator: this.agGridService.zeroNumberComparator },
      {headerName: 'Rate Increase', field: 'rate_increase',  cellRenderer: this.agGridService.roundCurrencyCellRenderer,  ...this.defaultColumn, width: 150, comparator: this.agGridService.zeroNumberComparator },
      {headerName: 'Internal Meetings', field: 'overstaffing',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, width: 150, comparator: this.agGridService.zeroNumberComparator },
      {headerName: 'Delayed Billing', field: 'delayed_billing', hide: !this.showDelayedBilling,  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, width: 150, comparator: this.agGridService.zeroNumberComparator },
      {headerName: 'Total', field: 'total',  cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, width: 150, sort: 'desc', comparator: this.agGridService.zeroNumberComparator }
    ];
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('SavingsByFirmGrid', this.gridOptions);
    const gridFilters = this.gridOptions.api.getFilterModel();
  }

}
