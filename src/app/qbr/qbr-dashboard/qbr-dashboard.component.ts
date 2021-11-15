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
    this.getQbrs();
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
      // {headerName: 'Report Name', field: 'qbrType', ...this.defaultColumn, filter: 'agTextColumnFilter', cellRenderer: this.reportNameCellRenderer, flex: 1},
      {headerName: 'Report Period', field: 'reportPeriod', ...this.defaultColumn,  filter: 'agTextColumnFilter', flex: 1, comparator: this.commonServ.sortDates},
      {headerName: 'Comparison Period', field: 'comparisonPeriod',  ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 1, comparator: this.commonServ.sortDates},
      {headerName: 'Created On', field: 'created_on', ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 1, comparator: this.commonServ.sortDates},
      {headerName: 'Focused Practice Areas', field: 'practiceAreas', cellRenderer: this.arrayPASCellRenderer,  ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 1 },
      {headerName: 'Focused Firms', field: 'firms', cellRenderer: this.arrayFirmCellRenderer,  ...this.defaultColumn, filter: 'agTextColumnFilter', flex: 2 },
    ];
  }
  getQbrs(): void {
    this.pendingRequest = this.httpService.makeGetRequest<IReport>('getClientQBRs').subscribe(
      (data: any) => {
        const records = ( data.result || [] ).sort(this.utilService.dynamicSort('-id'));
        // records = records.filter(e => e.status === 'COMPLETE'); // TODO uncomment when flow is completed
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
    const firms = [];
    const PAs = [];
    if (qbrData.report_timeframe_top_pas) {
      const topPAs  = qbrData.report_timeframe_top_pas.slice(0, 2);
      for (const pa of topPAs) {
        if (PAs.indexOf(pa.practice_area < 0 && pa.practice_area)) {
          PAs.push(pa.practice_area);
        }
        if (firms.indexOf(pa.firm_name) < 0 && pa.firm_name) {
          firms.push(pa.firm_name);
        }
        if (firms.indexOf(pa.second_firm_name) < 0 && pa.second_firm_name) {
          firms.push(pa.second_firm_name);
        }
      }
    }
    line.practiceAreas = PAs.sort();
    line.firms = firms.sort();
  }
  buildGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    const params = this.filtersService.getCurrentUserCombinedFilters();
    this.gridOptions.api.setRowData(this.qbrs);
    this.agGridService.restoreGrid(this.savedState, this.gridOptions);
  }
  reportNameCellRenderer(params: any) {
    const id = params.node.data.id;
    const value = '<a class="href-link-primary" href="/analytics-ui/qbrs/view?id=' + id + '">' + params.value + '</a>';
    return value;
  }
  arrayFirmCellRenderer(params: any) {
    let value = '';
    for (const item of params.node.data.firms) {
      value += item + '<br/>';
    }
    return value;
  }
  arrayPASCellRenderer(params: any) {
    let value = '';
    for (const item of params.node.data.practiceAreas) {
      value += item + '<br/>';
    }
    return value;
  }
  getRowHeight(params: any) {
    let firmsCount = 0;
    let paCount = 0;
    const defaultHeight = 40;
    if (params.node.data.firms && params.node.data.firms.length > 0) {
      firmsCount = params.node.data.firms.length;
    }
    if (params.node.data.practiceAreas && params.node.data.practiceAreas.length > 0) {
      paCount = params.node.data.practiceAreas.length;
    }
    let result = firmsCount > paCount ? firmsCount : paCount;
    result = (result || 1) * defaultHeight;
    return result;
  }
  saveGridConfig(evt: any): void {
    this.agGridService.saveState('ClientQBRsDashboard', this.gridOptions);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
    if (this.pendingRequestQbr) {
      this.pendingRequestQbr.unsubscribe();
    }
  }

}
