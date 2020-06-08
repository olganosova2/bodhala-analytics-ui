import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {CommonService} from '../shared/services/common.service';
import {Subscription} from 'rxjs';
import {GridOptions, SideBarDef} from 'ag-grid-community';
import {AgGridService, defaultColumn, defaultSideBar} from '../shared/services/ag-grid.service';

@Component({
  selector: 'bd-lead-attorney',
  templateUrl: './lead-attorney.component.html',
  styleUrls: ['./lead-attorney.component.scss']
})
export class LeadAttorneyComponent implements OnInit, OnDestroy {
  pageName = 'app.client-dashboard.lead-partners';
  pendingRequest: Subscription;
  errorMessage: any;
  gridOptions: GridOptions;
  attorneys: Array<any> = [];
  sideBarConfig: any = defaultSideBar;
  totalRecords: number = 0;
  defaultState: any;
  savedState: any;
  paginationPageSize: any = 10;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public utilServ: UtilService,
              public agGridService: AgGridService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Lead Attorneys';
  }

  ngOnInit() {
    const saved = localStorage.getItem('LeadAttorneyGrid_' + this.userService.currentUser.id.toString());
    if (saved) {
      this.savedState = JSON.parse(saved);
    }
    this.gridOptions = this.agGridService.getDefaultGridOptions();
    this.initColumns();
    this.load();
    // this.gridOptions.onGridColumnsChanged.
  }
  load(): void {
    this.totalRecords = 0;
    const params = this.filtersService.getCurrentUserCombinedFilters();
    this.pendingRequest = this.httpService.makeGetRequest('getLeadAttorneyTable', params).subscribe(
      (data: any) => {
        this.attorneys = data.result || [];
        this.totalRecords = this.attorneys.length;
        if (this.attorneys.length > 0) {
          this.processData();
          this.buildGrid();
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  refreshData(evt: any): void {
    this.filtersService.setCurrentUserFilters();
    this.load();
  }
  initColumns(): void {
    this.gridOptions.columnDefs = [
      { headerName: 'Lead Attorney', field: 'name', ... defaultColumn, width: 150, cellRenderer: this.leadAttorneyCellRenderer, filter: 'text' },
      { headerName: 'Classification', headerTooltip: 'Classification', field: 'bh_classification', ... defaultColumn, filter: 'text' },
      {headerName: 'Firm', field: 'firm', ... defaultColumn, width: 180, filter: 'text' },
      {headerName: 'Leverage', field: 'leverage', ... defaultColumn },
      {headerName: 'Matters', field: 'total_matters', ... defaultColumn,  filter: 'agNumberColumnFilter' },
      {headerName: 'Avg. Matter Cost',  headerTooltip: 'Avg. Matter Cost', field: 'avg_matter_cost', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... defaultColumn},
      {headerName: 'Blended Rate', headerTooltip: 'Blended Rate', field: 'blended_rate', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... defaultColumn},
      {headerName: 'Bodhala Price Index', headerTooltip: 'Bodhala Price Index', field: 'bpi', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... defaultColumn},
      {headerName: '# of Partners', headerTooltip: '# of Partners',  field: 'avg_partners', cellRenderer: this.agGridService.roundToOneNumberCellRenderer, ... defaultColumn},
      {headerName: '# of Associates', headerTooltip: '# of Associates',  field: 'avg_associates', cellRenderer: this.agGridService.roundToOneNumberCellRenderer, ... defaultColumn},
      {headerName: 'Partner Hours', headerTooltip: 'Partner Hours', field: 'avg_partner_hours', cellRenderer: this.agGridService.roundNumberCellRenderer, ... defaultColumn},
      {headerName: 'Associate Hours', field: 'avg_associate_hours', cellRenderer: this.agGridService.roundNumberCellRenderer, ... defaultColumn},
      {headerName: 'Partner % Billed by $', field: 'avg_ptnr_pct_billed', cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ... defaultColumn},
      {headerName: 'Associate % Billed by $', field: 'avg_ass_pct_billed', cellRenderer: this.agGridService.roundToPercentNumberCellRenderer, ... defaultColumn},
      {headerName: 'Total Billed', field: 'total_billed_and_afa', cellRenderer: this.agGridService.roundCurrencyCellRenderer, ... defaultColumn}
    ];
  }
  buildGrid(): void {
    if (!this.gridOptions.api) {
      return;
    }
    this.gridOptions.api.setRowData(this.attorneys);
    // this.rowData = Object.assign([], this.attorneys);
    this.defaultState = this.gridOptions.columnApi.getColumnState();
    this.restoreGrid();
  }
  processData(): void {
    for (const rec of this.attorneys) {
      rec.blended_rate = this.calcBlendedRate(rec);
      rec.bpi = this.calcBPI(rec);
      rec.avg_ptnr_pct_billed = this.calcAvgTKPctPartnerBilledPerMatter(rec);
      rec.avg_ass_pct_billed = this.calcAvgTKPctAssociateBilledPerMatter(rec);
      rec.total_billed_and_afa = rec.total_billed + rec.total_afa;
    }
    this.attorneys = this.attorneys.sort(this.utilServ.dynamicSort('-total_billed_and_afa'));
  }
  calcBlendedRate(rec: any): number {
    const result = 0;
    if (!rec.total_atty_hours) {
      return result;
    }
    return (rec.total_atty_billed - rec.total_atty_writeoff) / rec.total_atty_hours;
  }
  calcBPI(rec: any): number {
    let result = 0;
    if (rec.avg_partner_hours === 0 || rec.avg_associate_hours === 0 || rec.total_associate_hours === 0 || rec.total_partner_hours === 0 ) {
      return result;
    }
    const avgleverage = rec.avg_associate_hours / rec.avg_partner_hours;
    const avgassociaterate = rec.avg_associate_billed / rec.avg_associate_hours;
    const avgpartnerrate = rec.avg_partner_billed / rec.avg_partner_hours;
    result = avgpartnerrate + (avgleverage * avgassociaterate);
    return result;
  }
  calcAvgTKPctPartnerBilledPerMatter(rec: any): number {
    let result = 0;
    const totalBilled = rec.total_billed - rec.total_writeoff;
    if (!totalBilled) {
      return result;
    }
    result = (rec.total_partner_billed - rec.total_partner_writeoff) / totalBilled * 100;
    return result;
  }
  calcAvgTKPctAssociateBilledPerMatter(rec: any): number {
    let result = 0;
    const totalBilled = rec.total_billed - rec.total_writeoff;
    if (!totalBilled) {
      return result;
    }
    result = (rec.total_associate_billed - rec.total_associate_writeoff) / totalBilled * 100;
    return result;
  }
  leadAttorneyCellRenderer(params: any) {
    const id = params.node.data.id;
    const firmId = params.node.data.firm_id;
    const value = '<a class="href-link-primary" href="/#/app/client-dashboard/lead-attorneys/' + id + '/' + firmId + '">' + params.value + '</a>';

    return value;
  }
  resetGrid(): void {
   // this.gridOptions.columnApi.resetColumnState();
    if (!this.defaultState) {
      return;
    }
    this.gridOptions.columnApi.setColumnState(this.defaultState);
    this.gridOptions.api.setFilterModel(null);
  }
  restoreGrid(): void {
    if (!this.savedState) {
      return;
    }
    this.gridOptions.columnApi.setColumnState(this.savedState);
  }
  sizeToFit(): void {
    this.gridOptions.api.sizeColumnsToFit();
  }
  saveGridConfig(evt: any): void {
    const state = evt;
    const currentState = this.gridOptions.columnApi.getColumnState();
    localStorage.setItem('LeadAttorneyGrid_' + this.userService.currentUser.id.toString(), JSON.stringify(currentState));
    setTimeout(() => {
     // this.sizeToFit();
    });
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
  }
}
