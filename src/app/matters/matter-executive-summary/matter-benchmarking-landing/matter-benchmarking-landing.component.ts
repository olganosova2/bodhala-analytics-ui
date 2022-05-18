import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService, IHeaderColumn} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {Subscription} from 'rxjs';
import {BMSetupType, IMatterOverview} from '../model';
import {IBmMatters} from '../../../admin/benchmark-matters/model';
import {SelectItem} from 'primeng/api';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'bd-matter-benchmarking-landing',
  templateUrl: './matter-benchmarking-landing.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-benchmarking-landing.component.scss']
})
export class MatterBenchmarkingLandingComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  userBMSetup: BMSetupType;
  pageEvent: PageEvent;
  selectedByAdminMatters: Array<string> = [];
  selectedByAdminSmartPAs: Array<string> = [];
  smartPAs: Array<SelectItem> = [];
  smartPA: SelectItem;
  matters: Array<IMatterOverview> = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalMattersCount: number = 0;
  orderBy: string = 'total_billed desc';
  searchWord: string;
  columns: Array<IHeaderColumn> = [];
  noEligibleMattersFound: boolean;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) {
    this.commonServ.pageTitle = 'Practice Area Overview';
  }

  ngOnInit(): void {
    this.checkConfig();
    // this.getBMEligibleMattersByPA();
  }
  checkConfig(): void {
    if (this.userService.config !== undefined) {
      if (this.userService.config && this.userService.config['benchmarks.matter.config']) {
        const configs = this.userService.config['benchmarks.matter.config'].configs || [];
        if (configs.length > 0) {
          const json = configs[0].json_config;
          if (json.hideButton === 1) {
            return;
          }
          if (json.matters && json.matters.length > 0) {
            this.userBMSetup = BMSetupType.SelectedMatters;
            this.selectedByAdminMatters = Object.assign([], json.matters);
            this.formatTableColumns();
            this.getSelectedMattersData();
            return;
          }
          if (json.smartPAs && json.smartPAs.length > 0) {
            this.userBMSetup = BMSetupType.SmartPAs;
            this.selectedByAdminSmartPAs = Object.assign([], json.smartPAs);
            this.smartPAs = this.formatSmartDD(json.smartPAs);
            this.formatTableColumns();
            return;
          }
          this.userBMSetup = BMSetupType.AllMatters;
          this.formatTableColumns();
          this.getSmartPAs();
        }
      }
    }
  }
  formatTableColumns(): void {
    this.columns.push({ label: 'Matters', field: 'matter_name', direction: null, width: '25%'});
    this.columns.push({ label: 'Matter ID', field: 'client_matter_id', direction: null, width: '20%'});
    this.columns.push({ label: 'Total Cost', field: 'total_billed', direction: -1, width: '*'});
    this.columns.push({ label: '# Hours Worked', field: 'total_hours_billed', direction: null, width: '*'});
    if (this.userBMSetup === BMSetupType.SelectedMatters) {
      this.columns.push({ label: 'Practice Area', field: 'smart_pa', direction: null, width: '*'});
    }
    this.columns.push({ label: 'Primary Firm', field: 'firm_name', direction: null, width: '*'});
  }
  sort(column: IHeaderColumn): void {
   // always start from page 1
    this.goToFirstPage();
    this.orderBy = this.getSortByString(column);
    for (const col of this.columns) {
      if (col.field !== column.field) {
        col.direction = null;
      }
    }
    if (this.userBMSetup === BMSetupType.SelectedMatters) {
      this.getSelectedMattersData();
    } else {
      this.getBMEligibleMattersByPA();
    }
  }
  getSortByString(column: IHeaderColumn): string {
    const result = 'total_billed desc';
    let direction = null;
    if (column.direction === 1) {
      direction = ' asc';
    }
    if (column.direction === -1) {
      direction = ' desc';
    }
    return column.field + direction;
  }
  getSelectedMattersData(): void {
    const params = {clientId: this.userService.currentUser.client_info.id, matters: JSON.stringify(this.selectedByAdminMatters), orderBy: this.orderBy};
    this.pendingRequest = this.httpService.makeGetRequest<IBmMatters>('getClientBMMatters', params).subscribe(
      (data: any) => {
        if (!data.result  || data.error) {
          return;
        }
        this.matters = Object.assign([], data.result);
        for (const rec of this.matters) {
          rec.total_billed = this.filtersService.includeExpenses ? rec.total_billed + rec.total_expenses : rec.total_billed;
          this.matterAnalysisService.processLandingMatter(rec);
        }
      }
    );
  }
  getSmartPAs(): void {
    const params = {clientId: this.userService.currentUser.client_info.id };
    this.pendingRequest = this.httpService.makeGetRequest('getPracticeAreasListByClient', params).subscribe(
      (data: any) => {
        if (!data.result || !data.result.bodhala) {
          return;
        }
        this.smartPAs = this.formatSmartDD(data.result.bodhala);
      }
    );
  }
  formatSmartDD(pas: Array<string>): Array<SelectItem> {
    const result = [];
    result.push( {value: null, label: '--Select--'});
    for (const pa of pas) {
      result.push( {value: pa, label: pa});
    }
    return result;
  }
  changeSmartPA(evt: SelectItem): void {
    if (!evt.value) {
      return;
    }
    this.orderBy = 'total_billed desc';
    this.searchWord = null;
    this.goToFirstPage();
    this.getBMEligibleMattersByPA();
  }
  getBMEligibleMattersByPA(): void {
    this.noEligibleMattersFound = null;
    const params = {
      clientId: this.userService.currentUser.client_info.id,
      smartPa: this.smartPA.toString(), // 'Real Estate', // 'Capital Markets',
      orderBy: this.orderBy,
      pageNum: this.pageNumber,
      pageSize: this.pageSize,
      search: null
    };
    if (this.searchWord && this.searchWord.length > 3) {
      params.search = this.searchWord.trim();
    } else {
      delete params.search;
    }
    this.pendingRequest = this.httpService.makeGetRequest('getBMEligibleMattersByPA', params).subscribe(
      (data: any) => {
        if (!data.result  || data.error) {
          return;
        }
        this.noEligibleMattersFound = (data.result.matters && data.result.matters.length === 0);
        this.matters = Object.assign([], data.result.matters);
        this.totalMattersCount = data.result.num_matters;
        for (const rec of this.matters) {
          rec.total_billed = this.filtersService.includeExpenses ? rec.total_billed + rec.total_expenses : rec.total_billed;
          this.matterAnalysisService.processLandingMatter(rec);
        }
      }
    );
  }
  goToFirstPage() {
    this.pageNumber = 1;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageNumber - 1; // number of the page you want to jump.
    }
  }
  public getNextPrevPage(event?: PageEvent): PageEvent{
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getBMEligibleMattersByPA();
    return event;
  }
  makeSearch(): void {
    if (this.searchWord && (this.searchWord.length > 0 && this.searchWord.length < 3)) {
      return;
    }
    this.goToFirstPage();
    this.getBMEligibleMattersByPA();
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
