import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {FrcServiceService, IPeerFirms} from '../frc-service.service';
import {MatDialog} from '@angular/material/dialog';
import {AgGridService} from 'bodhala-ui-elements';
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
  }

  ngOnInit(): void {
    this.defaultColumn = this.agGridService.getDefaultColumn();
    this.sideBarConfig = this.agGridService.getDefaultSideBar();
    this.savedState = this.agGridService.getSavedState('FRCGrid_Dashboard');
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.gridOptions.headerHeight = 80;
    this.initColumns();
    this.setUpFilters();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', ...this.defaultColumn, floatingFilter: true, hide: true},
      {headerName: '', headerCheckboxSelection: true,  field: 'selected', ...this.defaultColumn, suppressMenu: true, editable: true, headerClass: 'text-center', cellStyle: {textAlign: 'center'},
        cellRendererFramework: CheckboxCellComponent, cellRendererParams: { onAdd: this.addFirm.bind(this), onDelete: this.deleteFirm.bind(this)}},
      {headerName: 'Firm', field: 'firm_name', ...this.defaultColumn, cellRenderer: this.firmCellRenderer, filter: 'agTextColumnFilter', flex: 1, floatingFilter: true},
      {headerName: 'Total Spend', field: 'total_billed', ...this.defaultColumn, cellRenderer: this.agGridService.roundCurrencyCellRenderer,  filter: 'number',  sort: 'desc'},
      {headerName: 'Total Hours', field: 'total_hours', ...this.defaultColumn,  filter: 'number',  cellRenderer: this.agGridService.roundToOneNumberCellRenderer},
      {headerName: '# Matters', field: 'total_matters', ... this.defaultColumn, width: 150},
      {headerName: 'Avgerage Partner Rate', field: 'avg_partner_rate', ... this.defaultColumn, width: 150, cellRenderer: this.bubbleCellRenderer},
      {headerName: 'Avgerage Associate Rate', field: 'avg_associate_rate', ... this.defaultColumn, width: 150, cellRenderer: this.bubbleCellRenderer},
      {headerName: 'Blended Rate', field: 'blended_rate', ... this.defaultColumn, width: 150, cellRenderer: this.bubbleCellRenderer},
    ];
  }
  setUpFilters(): void {
    this.filterSet = this.filtersService.getCurrentUserCombinedFilters();
    if (!this.filterSet.bdPracticeAreas && !this.filterSet.firms) {
      return;
    }
    setTimeout(() => {
      this.getPeerFirmsData();
    });
  }
  getPeerFirmsData(): void {
    this.formattedMetrics = [];
    this.isLoaded = false;
    const params = Object.assign({}, this.filterSet);
    this.pendingRequest = this.httpService.makeGetRequest('getFRCKeyMetrics', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        if (data.result && data.result.length > 0) {
          this.frcData = data.result || [];
          this.comparisonData = this.frcService.formatFRCComparisonFirmsData(this.frcData);
          if (this.comparisonData.length > 0) {
          this.formatMetrics();
          }
        }
      }
    );
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
      let selectedId = null;
      if (selectedFirms.includes(firm.bh_lawfirm_id.toString())) {
        selectedId = firm.bh_lawfirm_id;
      }
      this.formattedMetrics.push({id: firm.bh_lawfirm_id, firm_name: firm.firm_name, selected: selectedId, total_billed: totalBilled.actual, total_hours: totalHours.actual, total_matters: totalMatters.actual,
      avg_partner_rate: this.commonServ.capitalize(avgPartnerRate.grade), avg_associate_rate: this.commonServ.capitalize(avgAssociateRate.grade), blended_rate: this.commonServ.capitalize(blendedRate.grade)});
    }
  }
  refreshData(evt: any): void {
    this.formattedMetrics = [];
    this.initColumns();
    this.setUpFilters();
  }
  bubbleCellRenderer(params: any) {
    let gradeClass = 'oval-label-black';
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
    const value = '<a class="href-link-primary" href="/analytics-ui/firm/frc-peer-firms/' + firmId + '">' + params.value + '</a>';
    return value;
  }
  addFirm(evt: any): void {
    let parsed = [];
    if (this.filterSet.firms) {
      parsed = JSON.parse(this.filterSet.firms);
    }
    parsed.push(evt.data.id.toString());
    this.filterSet.firms = JSON.stringify(parsed);
    this.updateFiters();
  }
  deleteFirm(evt: any): void {
    if (this.filterSet.firms) {
      const parsed = JSON.parse(this.filterSet.firms);
      const ix = parsed.indexOf(evt.data.id.toString());
      if (ix > -1) {
        parsed.splice(ix, 1);
      }
      this.filterSet.firms = JSON.stringify(parsed);
      this.updateFiters();
    }
  }
  updateFiters(): void {
    const savedFilters = localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    const savedFiltersDict = JSON.parse(savedFilters);
    const firmFilter = savedFiltersDict.dataFilters.find(e => e.fieldName === 'firms');
    if (firmFilter) {
      const parsedFilters = JSON.parse(this.filterSet.firms);
      const result = [];
      for (const entry of parsedFilters) {
        const firm = this.formattedMetrics.find(e => e.id === Number(entry));
        result.push({ id: Number(entry), name: firm.firm_name});
      }
      firmFilter.value = Object.assign([], result);
    }
    const serializedQs = savedFiltersDict.querystring.toString();
    const pairs = serializedQs.split('&');
    const newPairs = [];
    for (const pair of pairs) {
      const keys = pair.split('=');
      if (keys.length === 2) {
        if (keys[0] !== 'firms') {
          newPairs.push(pair);
        }
      }
    }
    let newPairsStr = newPairs.join('&');
    if (this.filterSet.firms && JSON.parse(this.filterSet.firms).length > 0) {
      newPairsStr += '&firms=' + this.filterSet.firms;
    }
    savedFiltersDict.querystring = newPairsStr;
    localStorage.setItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString(), JSON.stringify(savedFiltersDict));
  }
  checkFilterSet(): boolean {
    if (!this.filterSet.firms) {
      return false;
    }
    const parsed = JSON.parse(this.filterSet.firms) || [];
    if (parsed.length === 0) {
      return false;
    }
    return true;
  }
  onSelectionChanged(evt: any): void {
    const nodes = evt.api.getSelectedNodes();
    for (const node of nodes) {
     // node.data.selected = node.data.id;
    }
    if (nodes.length > 0) {
      for (const firm of this.formattedMetrics) {
        firm.selected = firm.id;
      }
    } else {
      for (const firm of this.formattedMetrics) {
        firm.selected = null;
      }
    }
    this.gridOptions.api.setRowData(this.formattedMetrics);
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
