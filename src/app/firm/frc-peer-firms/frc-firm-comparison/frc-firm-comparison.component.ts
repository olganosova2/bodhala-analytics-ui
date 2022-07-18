import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FrcServiceService, IPeerFirms, MetricType, MetricTypeComparison, MOCK_PEER_FIRMS, MOCK_PEER_FIRMS_ALL} from '../frc-service.service';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {FiltersService} from '../../../shared/services/filters.service';
import {GridOptions} from 'ag-grid-community';
import {AgGridService} from 'bodhala-ui-elements';
import {CheckboxCellComponent} from '../../../shared/components/checkbox-cell/checkbox-cell.component';
import {FrcComparisonCellComponent} from './frc-comparison-cell/frc-comparison-cell.component';

@Component({
  selector: 'bd-frc-firm-comparison',
  templateUrl: './frc-firm-comparison.component.html',
  styleUrls: ['./frc-firm-comparison.component.scss']
})
export class FrcFirmComparisonComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  peerFirmsNames: Array<string> = [];
  frcData: Array<IPeerFirms> = [];
  filterSet: any;
  comparisonData: Array<any> = [];
  formattedMetrics: Array<any> = [];
  gridOptions: GridOptions;
  savedState: any;
  sideBarConfig: any;
  defaultColumn: any;
  defaultState: any;
  firstLoad: boolean = true;
  paginationPageSize: any = 10;
  metrics: any = MetricTypeComparison;
  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              public commonServ: CommonService,
              public frcService: FrcServiceService,
              public userService: UserService,
              public dialog: MatDialog,
              public matDialog: MatDialog,
              public appStateService: AppStateService,
              public agGridService: AgGridService,
              public filtersService: FiltersService) {
    this.commonServ.pageTitle = 'Firm Report Card';
    this.commonServ.pageSubtitle = 'Firm Comparison';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('FRCGrid_Comparison');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 60;
    this.setUpFilters();
    this.getPeerFirmsData();
  }
  setUpFilters(): void {
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    this.filterSet.peerFirms = MOCK_PEER_FIRMS_ALL;
  }
  initColumns(): void {
    const defs = [];
    let column = {headerName: 'Metric', field: 'metric_name', ...this.defaultColumn, width: 200, filter: 'agTextColumnFilter',  floatingFilter: true, pinned: true };
    defs.push(column);
    const averageColumn = Object.assign({}, this.comparisonData[0]);
    column = {headerName: 'Average', field: 'firms', ...this.defaultColumn, width: 120, filter: 'number',  floatingFilter: true, pinned: true,
      cellRendererFramework: FrcComparisonCellComponent, cellRendererParams: { context: averageColumn}};
    defs.push(column);
    for (const sub of this.comparisonData) {
      const col = {headerName: sub.firm_name, field: this.getFieldName(sub.bh_lawfirm_id), ...this.defaultColumn, width: 200, suppressMenu: true, editable: true,
         cellRendererFramework: FrcComparisonCellComponent, cellRendererParams: { context: sub} };
      defs.push(col);
    }
    this.gridOptions.columnDefs = Object.assign([], defs);
    this.firstLoad = false;
  }
  getPeerFirmsData(): void {
    const params = Object.assign({}, this.filterSet);
    let arr = [];
    arr = arr.concat(this.filterSet.peerFirms);
    params.firms = JSON.stringify(arr);

    if (params.peerFirms) {
      delete params.peerFirms;
    }
    this.pendingRequest = this.httpService.makeGetRequest('getFRCKeyMetrics', params).subscribe(
      (data: any) => {
        if (data.result && data.result.length > 0) {
          this.frcData = data.result || [];
          this.comparisonData = this.frcService.formatFRCComparisonFirmsData(this.frcData);
          if (this.comparisonData.length > 0) {
            this.initColumns();
            this.formattedMetrics = this.formatDataForGrid();
          }
        }
      }
    );
  }
  formatDataForGrid(): Array<any> {
    const result = [];
    const firstFirm = this.comparisonData[0].frcMetrics;
    for (const metricName of Object.keys(this.metrics)) {
      if (typeof MetricType[metricName] !== 'string') {
        continue;
      }
      const prop = this.metrics[metricName];
      const row = { metric_name: metricName, firms: 0, metricType: prop};
      const found = firstFirm.find(e => e.metricType === prop);
      if (found) {
        row.firms = found.firms;
        row.metric_name = found.label;
      }
      for (const firm of this.comparisonData) {
        const foundInner = firm.frcMetrics.find(e => e.metricType === prop);
        if (foundInner) {
          row[this.getFieldName(firm.bh_lawfirm_id)] = foundInner.actual;
        }
      }
      result.push(row);
    }
    return result;
  }
  getFieldName(id: number): string {
    return 'firm_' + id.toString();
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
