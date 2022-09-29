import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CLIENT_CONFIG_KEY_METRICS_NAME, FrcServiceService, IMetricDisplayData, IPeerFirms, MetricType, MetricTypeComparison, MOCK_PEER_FIRMS, MOCK_PEER_FIRMS_ALL} from '../frc-service.service';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {FiltersService} from '../../../shared/services/filters.service';
import {GridOptions} from 'ag-grid-community';
import {AgGridService} from 'bodhala-ui-elements';
import {CheckboxCellComponent} from '../../../shared/components/checkbox-cell/checkbox-cell.component';
import {FrcComparisonCellComponent} from './frc-comparison-cell/frc-comparison-cell.component';
import {VisibleKeyMetricsComponent} from '../visible-key-metrics/visible-key-metrics.component';

@Component({
  selector: 'bd-frc-firm-comparison',
  templateUrl: './frc-firm-comparison.component.html',
  styleUrls: ['../frc-peer-firms.component.scss', './frc-firm-comparison.component.scss']
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
  filteredMetrics: Array<IMetricDisplayData> = [];
  keyMetrics: Array<IMetricDisplayData> = [];
  excludeFilters: Array<string> = ['firms'];
  pageName: string = 'analytics-ui/frc-firm-comparison/';
  noFirmsSelected: boolean = false;
  selectedFirms: Array<number> = [];
  selectedFilters: Array<any> = [];
  isLoaded: boolean = true;
  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              public router: Router,
              public commonServ: CommonService,
              public frcService: FrcServiceService,
              public userService: UserService,
              public dialog: MatDialog,
              public matDialog: MatDialog,
              public appStateService: AppStateService,
              public agGridService: AgGridService,
              public filtersService: FiltersService) {
    this.commonServ.pageTitle = 'Firm Report Cards';
    this.commonServ.pageSubtitle = 'Firm Comparison';
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('FRCGrid_Comparison');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 80;
    this.setUpFilters();
  }
  setUpFilters(): void {
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    this.selectedFilters = this.frcService.formatAppliedFilters(true);
    const savedFRCCompare = localStorage.getItem('frc_compare_' + this.userService.currentUser.id.toString());
    this.noFirmsSelected = false;
    if (savedFRCCompare) {
     this.selectedFirms = JSON.parse(savedFRCCompare);
    }  else {
      this.noFirmsSelected = true;
      return;
    }
    setTimeout(() => {
      this.getPeerFirmsData();
    });
  }
  initColumns(): void {
    const defs = [];
    let column = {headerName: 'Metric', field: 'metric_name', ...this.defaultColumn, width: 200, filter: 'agTextColumnFilter',  pinned: true, cellStyle: {'font-weight': '600' }};
    defs.push(column);
    const averageColumn = Object.assign({}, this.comparisonData[0]);
    column = {headerName: 'Metric Average', field: 'firms', ...this.defaultColumn, width: 120, filter: 'number',  pinned: true, headerClass: 'text-underline',
      cellRendererFramework: FrcComparisonCellComponent, cellRendererParams: { context: averageColumn}};
    defs.push(column);
    for (const sub of this.comparisonData) {
      const col = {headerName: sub.firm_name, field: this.getFieldName(sub.bh_lawfirm_id), ...this.defaultColumn, width: 180, suppressMenu: true, editable: true, headerClass: 'text-underline',
         cellRendererFramework: FrcComparisonCellComponent, cellRendererParams: { context: sub}, cellStyle: {'border-left-color': '#cccccc'} };
      defs.push(col);
    }
    this.gridOptions.columnDefs = Object.assign([], defs);
    this.firstLoad = false;
  }
  refreshData(evt: any): void {
    this.setUpFilters();
  }
  getPeerFirmsData(): void {
    this.formattedMetrics = [];
    if (this.noFirmsSelected) {
      return;
    }
    this.isLoaded = false;
    const params = Object.assign({}, this.filterSet);
    let arr = [];
    arr = arr.concat(this.selectedFirms);
    params.firms = JSON.stringify(arr);

    this.pendingRequest = this.httpService.makeGetRequest('getFRCKeyMetrics', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        if (data.result && data.result.length > 0) {
          this.frcService.processExpenses(data.result);
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
    this.keyMetrics = Object.assign([], this.comparisonData[0].frcMetrics) || [];
    if (this.filteredMetrics.length === 0) {
      this.filteredMetrics = Object.assign([], this.formatKeyMetrics(this.keyMetrics, true));
    }
    for (const metricName of Object.keys(this.metrics)) {
      const foundMetric = this.filteredMetrics.find(e => e.metricType === this.metrics[metricName]);
      if (!foundMetric) {
        continue;
      }
      if (!this.userService.hasEntitlement('data.analytics.diversity') && (metricName === 'FemaleHours' || metricName === 'MinorityHours')) {
        continue;
      }
      const prop = this.metrics[metricName];
      const row = { metric_name: metricName, firms: 0, metricType: prop};
      const found = this.keyMetrics.find(e => e.metricType === prop);
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
  export(): void {
    this.commonServ.pdfLoading = true;
    const exportName = 'Firm Report Card Comparison';

    setTimeout(() => {
      this.commonServ.generatePdfOuter(exportName, 'frcDiv', null);
    }, 200);
  }
  openDetails(): void {
    const packaged = { filteredMetrics: [],  keyMetrics: this.formatKeyMetrics(this.keyMetrics, false), doNotSave: true};
    const dialogConfig =  {
      height: '450px',
      width: '40vw',
    };
    const modalConfig = {...dialogConfig, data: Object.assign([], packaged)};
    const dialogRef = this.dialog.open(VisibleKeyMetricsComponent, {...modalConfig, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.formattedMetrics = [];
      this.filteredMetrics = Object.assign([], this.formatKeyMetrics(result, true));
      this.formattedMetrics = this.formatDataForGrid();
    });
  }
  formatKeyMetrics(metrics: Array<IMetricDisplayData>, toSelect: boolean): Array<any> {
    const result = [];
    for (const metricName of Object.keys(this.metrics)) {
      if (!this.userService.hasEntitlement('data.analytics.diversity') && (metricName === 'FemaleHours' || metricName === 'MinorityHours')) {
        continue;
      }
      const prop = this.metrics[metricName];
      const found = metrics.find(e => e.metricType === prop);
      if (found) {
        if (toSelect) {
          found.selected = toSelect;
        } else {
          const found2 = this.filteredMetrics.find(e => e.fieldName === this.metrics[metricName]);
          found.selected = found2 ? true : false;
        }
        result.push(found);
      }
    }
    return result;
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
