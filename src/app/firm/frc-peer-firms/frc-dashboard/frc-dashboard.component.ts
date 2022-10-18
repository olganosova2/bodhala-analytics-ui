import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, IPeerFirms, MetricType} from '../frc-service.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService, FiltersComponent} from 'bodhala-ui-elements';
import {FiltersService as FiltersServiceGlobal} from 'bodhala-ui-elements';
import {FiltersService} from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {GridOptions} from 'ag-grid-community';
import {RouterLinkRendererComponent} from '../../../shared/components/router-link-renderer/router-link-renderer.component';
import {CheckboxCellComponent} from '../../../shared/components/checkbox-cell/checkbox-cell.component';

@Component({
  selector: 'bd-frc-dashboard',
  templateUrl: './frc-dashboard.component.html',
  styleUrls: ['./frc-dashboard.component.scss']
})
export class FrcDashboardComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
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
  pageName: string = 'analytics-ui/frc-dashboard/';
  excludeFilters: Array<string> = [];
  isLoaded: boolean = true;
  selectedFiltersCount: number = 0;
  noRecordsFound: boolean;
  selectedFirms: Array<number> = [];
  totalSpend: number = 0;
  totalHours: number = 0;

  @ViewChild(FiltersComponent) filtersComp: FiltersComponent;


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
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('FRCGrid_Dashboard');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 80;
    const savedFRCCompare = localStorage.getItem('frc_compare_' + this.userService.currentUser.id.toString());
    if (savedFRCCompare) {
      localStorage.removeItem('frc_compare_' + this.userService.currentUser.id.toString());
    }
    this.setUpFilters();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', ...this.defaultColumn, floatingFilter: true, hide: true},
      {headerName: '', headerCheckboxSelection: this.formattedMetrics.length <= 20,  field: 'selected', ...this.defaultColumn, suppressMenu: true, editable: true, headerClass: 'justify-center-header', cellStyle: {textAlign: 'center'},
        cellRendererFramework: CheckboxCellComponent, resizable: false, suppressMovable: true, lockPosition: 'left', cellRendererParams: { onAdd: this.addFirm.bind(this), onDelete: this.deleteFirm.bind(this)}},
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn, cellRenderer: this.firmCellRenderer,  filter: 'agTextColumnFilter', flex: 1, floatingFilter: true},
      {headerName: 'Total Spend', field: 'total_billed', ...this.defaultColumn, cellRenderer: this.agGridService.roundCurrencyCellRenderer,  filter: 'number',  sort: 'desc'},
      {headerName: '% of Total Spend', field: 'total_billed_perc', ...this.defaultColumn, cellRenderer: this.agGridService.roundToPercentNumberCellRenderer,  filter: 'number'},
      {headerName: 'Total Hours', field: 'total_hours', ...this.defaultColumn,  filter: 'number',  cellRenderer: this.agGridService.roundNumberCellRenderer},
      {headerName: '% of Total Hours', field: 'total_hours_perc', ...this.defaultColumn, cellRenderer: this.agGridService.roundToPercentNumberCellRenderer,  filter: 'number'},
      {headerName: '# Matters', field: 'total_matters', ... this.defaultColumn, width: 150},
      {headerName: 'Average Partner Rate', field: 'avg_partner_rate', ... this.defaultColumn, width: 150,  cellRenderer: this.bubbleCellRenderer},
      {headerName: 'Average Associate Rate', field: 'avg_associate_rate', ... this.defaultColumn, width: 150, cellRenderer: this.bubbleCellRenderer},
      {headerName: 'Blended Rate', field: 'blended_rate', ... this.defaultColumn, width: 150, cellRenderer: this.bubbleCellRenderer},
    ];
  }
  setUpFilters(): void {
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    this.getPeerFirmsData();
  }
  getPeerFirmsData(): void {
    this.formattedMetrics = [];
    this.isLoaded = false;
    this.totalSpend = 0;
    this.totalHours = 0;
    const params = Object.assign({}, this.filterSet);
    this.pendingRequest = this.httpService.makeGetRequest('getFRCKeyMetrics', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        this.noRecordsFound = data.result && data.result.length === 0;
        if (data.result && data.result.length > 0) {
          this.frcService.processExpenses(data.result);
          this.frcData = data.result || [];
          for (const firm of this.frcData) {
            this.totalSpend += firm.total_billed;
            this.totalHours += firm.total_hours_billed;
          }
          this.calculatePercentOfWork(this.frcData);
          if (this.frcData && this.frcData.length <= 100) {
            this.comparisonData = this.frcService.formatFRCComparisonFirmsData(this.frcData);
            if (this.comparisonData.length > 0) {
              this.formatMetrics();
            }
          }else {
            this.formatLargeData();
          }
          this.initColumns();
        }
      }
    );
  }
  calculatePercentOfWork(records: Array<IPeerFirms>): void {
    for (const firm of records) {
     firm.total_billed_perc = this.frcService.getPercentOfWork(firm.total_billed, this.totalSpend);
     firm.total_hours_perc = this.frcService.getPercentOfWork(firm.total_hours_billed, this.totalHours);
    }
  }
  formatLargeData(): void {
    this.formattedMetrics = [];
    for (const rec of this.frcData) {
      this.frcService.calculateSingleFirmData(rec);
      this.formattedMetrics.push({id: rec.bh_lawfirm_id, firm_name: rec.firm_name, selected: null,
        total_billed: rec.total_billed, total_hours: Math.round(rec.total_hours_billed), total_matters: rec.total_matters,
        total_billed_perc: rec.total_billed_perc, total_hours_perc: rec.total_hours_perc,
        avg_partner_rate: ' ... ', avg_associate_rate: ' ... ', blended_rate: ' ... '});
    }
  }
  formatMetrics(): void {
    this.formattedMetrics = [];
    let selectedFirms = [];
    if (this.filterSet.firms) {
      selectedFirms = JSON.parse(this.filterSet.firms);
    }
    for (const firm of this.comparisonData) {
      const totalBilled = firm.frcMetrics.find(e => e.metricType === 'total_billed');
      const totalHours = firm.frcMetrics.find(e => e.metricType === 'total_hours_billed');
      const totalMatters = firm.frcMetrics.find(e => e.metricType === 'total_matters');
      const avgPartnerRate = firm.frcMetrics.find(e => e.metricType === 'avg_partner_rate');
      const avgAssociateRate = firm.frcMetrics.find(e => e.metricType === 'avg_associate_rate');
      const blendedRate = firm.frcMetrics.find(e => e.metricType === 'blended_rate');
      const selectedId = null;
      this.formattedMetrics.push({id: firm.bh_lawfirm_id, firm_name: firm.firm_name, selected: selectedId, total_billed: totalBilled.actual,
        total_hours: totalHours.actual, total_matters: totalMatters.actual,
        total_billed_perc: this.frcService.getPercentOfWork(totalBilled.actual, this.totalSpend), total_hours_perc: this.frcService.getPercentOfWork(totalHours.actual, this.totalHours),
      avg_partner_rate: this.commonServ.capitalize(avgPartnerRate.grade), avg_associate_rate: this.commonServ.capitalize(avgAssociateRate.grade), blended_rate: this.commonServ.capitalize(blendedRate.grade)});
    }
  }
  refreshData(evt: any): void {
    this.selectedFirms = [];
    this.formattedMetrics = [];
    this.setUpFilters();
  }
  bubbleCellRenderer(params: any) {
    let gradeClass = 'oval-label-light-gray';
    if (params.value === 'Good') {
      gradeClass = 'oval-label-green';
    }
    if (params.value === 'Fair') {
      gradeClass = 'oval-label-orange';
    }
    if (params.value === 'Poor') {
      gradeClass = 'oval-label-red';
    }
    return '<span class="oval-label-grid ' + gradeClass + '">' + params.value + '</span>';
  }
  firmCellRenderer(params: any) {
    const firmId = params.node.data.id;
    const value = '<a class="href-link-primary" href="/analytics-ui/frc-peer-firms/' + firmId + '">' + params.value + '</a>';
    return value;
  }
  addFirm(evt: any): void {
    this.selectedFirms.push(Number(evt.data.id));
  }
  deleteFirm(evt: any): void {
    const ix = this.selectedFirms.indexOf(Number(evt.data.id));
    if (ix > -1) {
      this.selectedFirms.splice(ix, 1);
    }
  }
  compare(): void {
    // this.updateFiters();
    this.saveComparedFirms();
    setTimeout(() => {
      this.router.navigate(['/analytics-ui/frc-firm-comparison']);
    });
  }
  saveComparedFirms(): void {
    let newPairsStr = '';
    if (this.selectedFirms && this.selectedFirms.length > 0) {
      newPairsStr = JSON.stringify(this.selectedFirms);
    }
    localStorage.setItem('frc_compare_' + this.userService.currentUser.id.toString(), newPairsStr);
  }
  checkFilterSet(): boolean {
    return this.selectedFirms && this.selectedFirms.length > 1;
  }
  onSelectionChanged(evt: any): void {
    const nodes = evt.api.getSelectedNodes();
    let selectedIDs = this.selectedFirms || [];
    for (const node of nodes) {
      node.data.selected = node.data.id;
      node.setData(node.data);
      if (selectedIDs.indexOf(Number(node.data.id)) < 0) {
        selectedIDs.push(Number(node.data.id));
      }
    }
    if (nodes.length === 0) {
      // tslint:disable-next-line:only-arrow-functions
      this.gridOptions.api.forEachNode(function(node) {
        node.data.selected = null;
        node.setData(node.data);
      });
      selectedIDs = [];
    }
    this.selectedFirms = Object.assign([], selectedIDs);
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
