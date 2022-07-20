import { Component, OnInit } from '@angular/core';
import {IClient, IInsight} from '../insights/models';
import {BM_MATTER_CONFIG_NAME} from '../../shared/services/config';
import {HttpService, MessagingService, UserService, UtilService} from 'bodhala-ui-common';
import {MatterAnalysisService} from '../../matters/matter-executive-summary/matter-analysis.service';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import * as _moment from 'moment';
import {AgGridService} from 'bodhala-ui-elements';

const moment = _moment;

@Component({
  selector: 'bd-qa-dashboard',
  templateUrl: './qa-dashboard.component.html',
  styleUrls: ['./qa-dashboard.component.scss']
})
export class QaDashboardComponent implements OnInit {
  selectedClient: IClient;
  pendingRequest: Subscription;
  invalidDateLines: Array<any> = [];
  defaultColumn: any;
  invalidDateLinesCols: Array<any> = [];
  multipleMattersData: Array<any> = [];
  multipleMattersCols: Array<any> = [];
  tkMoreThan24: Array<any> = [];
  tkMoreThan24Cols: Array<any> = [];
  tkMoreThan2k: Array<any> = [];
  tkMoreThan2kCols: Array<any> = [];
  constructor(private httpService: HttpService,
              public matterAnalysisService: MatterAnalysisService,
              public messageService: MessagingService,
              public commonServ: CommonService,
              private util: UtilService,
              public dialog: MatDialog,
              public agGridService: AgGridService,
              public userService: UserService) {
    this.commonServ.pageTitle = 'Data Validation Checks';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
  }

  getInvalidDateLines(client: IClient): void {
    this.selectedClient = null;
    this.selectedClient = client;
    const params = {clientId: this.selectedClient.bh_client_id };
    this.pendingRequest = this.httpService.makeGetRequest('getQAHealthChecks', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.invalidDateLines = data.result.invalid_dates || [];
          this.multipleMattersData = data.result.multiple_matter_names || [];
          this.tkMoreThan24 = data.result.tk_more_24 || [];
          this.tkMoreThan2k = data.result.tk_more_2000 || [];
          this.formatColumns();
        }
      }
    );
  }
  formatColumns(): void {
    this.invalidDateLinesCols = [
      { headerName: 'Line Item Date', field: 'line_item_date', ... this.defaultColumn, filter: 'agDateColumnFilter', width: 150, valueFormatter: this.dateFormatter , floatingFilter: true },
      { headerName: 'Invoice Date', field: 'invoice_date', ... this.defaultColumn, filter: 'agDateColumnFilter', width: 150, valueFormatter: this.dateFormatter , floatingFilter: true },

      { headerName: 'Line #', field: 'line_item_number', ... this.defaultColumn, filter: 'agTextColumnFilter', floatingFilter: true },
      { headerName: 'Matter ID', field: 'client_matter_id', ... this.defaultColumn, filter: 'agTextColumnFilter', flex: 1, floatingFilter: true },
      { headerName: 'Matter Name', field: 'matter_name', ... this.defaultColumn, filter: 'agTextColumnFilter', flex: 2, floatingFilter: true },
      { headerName: 'Firm', field: 'firm_name', ... this.defaultColumn,  filter: 'agTextColumnFilter', flex: 2, floatingFilter: true },
      { headerName: 'Batch ID', field: 'bh_batch_id', ... this.defaultColumn, floatingFilter: true}
    ];
    this.tkMoreThan24Cols = [
      { headerName: 'Date', field: 'line_item_date', ... this.defaultColumn, filter: 'agDateColumnFilter', width: 150, valueFormatter: this.dateFormatter , floatingFilter: true },
      { headerName: 'Timekeeper', field: 'tk_name', ... this.defaultColumn, filter: 'agTextColumnFilter', width: 200, floatingFilter: true },
      { headerName: 'Classification', field: 'bh_classification', ... this.defaultColumn, filter: 'agTextColumnFilter', width: 150, floatingFilter: true },
      { headerName: 'Firm', field: 'firm_name', ... this.defaultColumn,  filter: 'agTextColumnFilter', flex: 2, floatingFilter: true },
      { headerName: 'Batch ID', field: 'bh_batch_id', ... this.defaultColumn, floatingFilter: true},
      { headerName: 'Hours', field: 'hours', ... this.defaultColumn, floatingFilter: true},
      { headerName: 'Matters', field: 'matters', ... this.defaultColumn, floatingFilter: true},
      { headerName: 'Total Billed', field: 'total_billed', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... this.defaultColumn, floatingFilter: true},
    ];
    this.multipleMattersCols =  [
      { headerName: 'Firm', field: 'firm', ... this.defaultColumn,  filter: 'agTextColumnFilter', flex: 2, floatingFilter: true },
      { headerName: 'Matter ID', field: 'client_matter_id', ... this.defaultColumn, filter: 'agTextColumnFilter', flex: 2, floatingFilter: true },
      { headerName: 'Matters count', field: 'matter_count', ... this.defaultColumn, floatingFilter: true},
      {headerName: 'Matter names', field: 'firms', cellRenderer: this.arrayFirmGroupCellRenderer,  ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 2 },
    ];
    this.tkMoreThan2kCols =  [
      { headerName: 'Timekeeper', field: 'name', ... this.defaultColumn,  filter: 'agTextColumnFilter', flex: 1, floatingFilter: true },
      { headerName: 'Classification', field: 'bh_classification', ... this.defaultColumn, filter: 'agTextColumnFilter', floatingFilter: true },
      { headerName: 'Firm', field: 'firm_name', ... this.defaultColumn,  filter: 'agTextColumnFilter', flex: 2, floatingFilter: true },
      { headerName: 'Matter ID', field: 'client_matter_id', ... this.defaultColumn, filter: 'agTextColumnFilter', flex: 1, floatingFilter: true },
      { headerName: 'Matter Name', field: 'matter_name', ... this.defaultColumn, filter: 'agTextColumnFilter', flex: 2, floatingFilter: true },
      {headerName: 'Unit Cost', field: 'line_item_unit_cost', cellRenderer: this.agGridService.roundToTwoCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true },
      {headerName: 'Effective Rate', field: 'rate', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ...this.defaultColumn, floatingFilter: true },
      { headerName: '# Line Items', field: 'cnt', ... this.defaultColumn, floatingFilter: true},
      { headerName: 'Batch ID', field: 'bh_batch_id', ... this.defaultColumn, floatingFilter: true},
    ];
  }
  arrayFirmGroupCellRenderer(params: any) {
    let value = '';
    for (const item of params.node.data.matter_names) {
        value += item + '<br/>';
    }
    return value;
  }
  getGridHeight(lines: Array<any>): string {
    if (lines.length <= 10) {
      return (lines.length * 50) + 150 + 'px';
    }
    return '610px';
  }
  dateFormatter(params) {
    return moment(params.value).format('MMM DD, YYYY');
  }

}


