import { Component, OnInit, Input } from '@angular/core';
import {GridOptions} from 'ag-grid-community';
import {AgGridService} from 'bodhala-ui-elements';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'bd-qa-dashboard-grid',
  templateUrl: './qa-dashboard-grid.component.html',
  styleUrls: ['./qa-dashboard-grid.component.scss']
})
export class QaDashboardGridComponent implements OnInit {
  paginationPageSize: number = 10;
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  loaded: boolean = false;
  @Input() gridHeight: string;
  @Input() rowData: Array<any> = [];
  @Input() columnDefs: Array<any> = [];
  constructor(public agGridService: AgGridService) { }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 40;
    this.gridOptions.columnDefs = Object.assign([], this.columnDefs);
    this.loaded = true;
  }
  getRowHeight(params: any) {
    let linesCount = 0;
    const defaultHeight = 46;
    if (!params.node.data.matter_names) {
      return defaultHeight;
    }
    for (const item of params.node.data.matter_names) {
      linesCount += 1;
    }
    return  (linesCount || 1) * 40;
  }

}
