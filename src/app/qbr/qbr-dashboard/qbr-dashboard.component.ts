import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as _moment from 'moment';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrService} from '../qbr.service';
import {Subscription} from 'rxjs';
import {IQbrDashboard, IReport, QbrType} from '../qbr-model';
import {AgGridService} from 'bodhala-ui-elements';
import {GridOptions} from 'ag-grid-community';
import {RouterLinkRendererComponent} from '../../shared/components/router-link-renderer/router-link-renderer.component';

const moment = _moment;

@Component({
  selector: 'bd-qbr-dashboard',
  templateUrl: './qbr-dashboard.component.html',
  styleUrls: ['./qbr-dashboard.component.scss']
})
export class QbrDashboardComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  pendingRequestQbr: Subscription;
  practiceAreaSetting: string;
  qbrs: Array<IQbrDashboard> = [];
  gridOptions: GridOptions;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  paginationPageSize: any = 10;
  savedState: any;
  qbrsNumber: number = 0;
  currentNumber: number = 0;
  noRecordsFound: boolean;

  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public qbrService: QbrService,
              public utilService: UtilService,
              public agGridService: AgGridService) {
    this.commonServ.pageTitle = 'QBR Dashboard';
    this.practiceAreaSetting = this.commonServ.getClientPASetting();
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.savedState = this.agGridService.getSavedState('ClientQBRsDashboard');
    this.initColumns();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', ...this.defaultColumn,  sort: 'desc', hide: true},
      {headerName: 'View', field: 'qbrType', ...this.defaultColumn, cellRendererFramework: RouterLinkRendererComponent, flex: 1,
        cellRendererParams: {
          inRouterLink: '/analytics-ui/qbrs/view',
          label: 'Edit',
          control: 'dataLink'
        }},
      {headerName: 'Report Period', field: 'reportPeriod', ...this.defaultColumn,  filter: 'agTextColumnFilter', flex: 1, comparator: this.commonServ.sortDates},
      {headerName: 'Comparison Period', field: 'comparisonPeriod',  ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 1, comparator: this.commonServ.sortDates},
      {headerName: 'Created On', field: 'created_on', ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 1, comparator: this.commonServ.sortDates},
      {headerName: 'Focused Practice Areas', field: 'practiceAreas', cellRenderer: this.arrayPASGroupCellRenderer,  ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 1 },
      {headerName: 'Focused Firms', field: 'firms', cellRenderer: this.arrayFirmGroupCellRenderer,  ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 2 },
    ];
  }
  getQbrs(): void {
    this.pendingRequest = this.httpService.makeGetRequest<IReport>('getClientQBRs').subscribe(
      (data: any) => {
        let records = ( data.result || [] ).sort(this.utilService.dynamicSort('-id'));
        records = records.filter(e => e.status === 'COMPLETE');
        this.qbrsNumber = records.length;
        this.noRecordsFound = this.qbrsNumber === 0;
        for (const rec of records) {
          this.getQbrData(rec);
        }
      }
    );
  }
  getQbrData(rec: IReport): void {
    const qbrLine = {} as IQbrDashboard;
    const dates = this.qbrService.formatPayloadDates(rec.start_date, rec.report_type as QbrType);
    qbrLine.id = rec.id;
    qbrLine.reportPeriod = moment(dates.startDate).format('MM/DD/YYYY') + ' - ' +  moment(dates.endDate).format('MM/DD/YYYY');
    qbrLine.comparisonPeriod = moment(dates.comparisonStartDate).format('MM/DD/YYYY') + ' - ' +  moment(dates.comparisonEndDate).format('MM/DD/YYYY');
    qbrLine.qbrType = rec.title ? rec.title : this.qbrService.formatQbrType(rec.report_type);
    qbrLine.created_on = moment(rec.created_on).format('MM/DD/YYYY');
    qbrLine.firms = [];
    qbrLine.practiceAreas = [];
    const payload = {
      startDate: dates.startDate,
      endDate: dates.endDate,
      client: this.userService.currentUser.client_info.id,
      comparisonStartDate: dates.comparisonStartDate,
      comparisonEndDate: dates.comparisonEndDate,
      paSetting: this.practiceAreaSetting,
    };
    const params = { ... rec.querystring, ... payload };
    this.pendingRequest = this.httpService.makeGetRequest('getClientQBRData', params).subscribe(
      (data: any) => {
        if (data && data.result) {
          this.processPAsAndFirms(data.result, qbrLine);
        }
        this.qbrs.push(qbrLine);
        this.currentNumber ++;
        if (this.currentNumber === this.qbrsNumber) {
          this.buildGrid();
        }
      }
    );
  }
  processPAsAndFirms(qbrData: any, line: IQbrDashboard): void {
    line.paGroup = [];
    if (qbrData.report_timeframe_top_pas) {
      const topPAs  = qbrData.report_timeframe_top_pas.slice(0, 2);
      for (const pa of topPAs) {
        const paGroup = { pa: pa.practice_area, firms: [], lineCount: 1};
        paGroup.firms.push(pa.firm_name);
        if (pa.second_firm_name) {
          paGroup.lineCount ++;
          paGroup.firms.push(pa.second_firm_name);
        }
        line.paGroup.push(paGroup);
      }
    }
  }
  buildGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    const params = this.filtersService.getCurrentUserCombinedFilters();
    this.gridOptions.api.setRowData(this.qbrs);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }
  arrayFirmGroupCellRenderer(params: any) {
    let value = '';
    for (const item of params.node.data.paGroup) {
      for (const firm of item.firms) {
        value += firm + '<br/>';
      }
    }
    return value;
  }
  arrayPASGroupCellRenderer(params: any) {
    let value = '';
    for (const item of params.node.data.paGroup) {
      value += item.pa + '<br/>';
      if (item.lineCount === 2) {
        value += '&nbsp;<br/>';
      }
    }
    return value;
  }
  getRowHeight(params: any) {
    let linesCount = 0;
    const defaultHeight = 40;
    for (const item of params.node.data.paGroup) {
      linesCount += item.lineCount;
    }
    return  (linesCount || 1) * defaultHeight;
  }
  saveGridConfig(evt: any): void {
    this.agGridService.saveState('ClientQBRsDashboard', this.gridOptions);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
