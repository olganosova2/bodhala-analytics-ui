import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IOverstaffingRow} from '../savings-calculator.service';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'bd-overstaffing-grid',
  templateUrl: './overstaffing-grid.component.html',
  styleUrls: ['./overstaffing-grid.component.scss']
})
export class OverstaffingGridComponent implements OnInit, AfterViewInit {
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  constructor(
    public dialogRef: MatDialogRef<OverstaffingGridComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<IOverstaffingRow>,
    public agGridService: AgGridService) {}

  ngOnInit() {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('OverstaffingGrid');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 40;
    this.initColumns();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.agGridService.restoreGrid(this.savedState, this.gridOptions);
    });
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    this.agGridService.saveState('OverstaffingGrid', this.gridOptions);
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      { headerName: 'Firm', field: 'firm_name', ... this.defaultColumn, width: 350, filter: 'text' },
    //  { headerName: 'Firm Id', field: 'firm_id', ... this.defaultColumn },
      { headerName: 'Matter', field: 'matter_name', ... this.defaultColumn, width: 350, filter: 'text' },
      { headerName: '# of TKs', field: 'timekeepers', ... this.defaultColumn },
      { headerName: 'Date', field: 'line_item_date', ... this.defaultColumn,  filter: 'agDateColumnFilter',  valueFormatter: this.dateFormatter },
      { headerName: 'Total Billed', field: 'total_billed', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... this.defaultColumn, comparator: this.agGridService.zeroNumberComparator},
      { headerName: 'Total Hours', field: 'total_hours', ... this.defaultColumn },
    ];
  }
  dateFormatter(params) {
    return moment(params.value).format('MMM DD, YYYY');
  }
}
