import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';

import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {HARDCODED_MATTER_ID, IInternalMatter, IMatterDocument, IMatterExecSummary, IMatterTotalsPanel} from './model';
import {MatterAnalysisService} from './matter-analysis.service';
import {IInsight} from '../../admin/insights/models';
import {MatterTotalsMetricsComponent} from './matter-totals-metrics/matter-totals-metrics.component';
import {FiltersService} from 'bodhala-ui-elements';
import * as config from '../../shared/services/config';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'bd-matter-executive-summary',
  templateUrl: './matter-executive-summary.component.html',
  styleUrls: ['./matter-executive-summary.component.scss']
})
export class MatterExecutiveSummaryComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  matterId: string;
  firmId: number;
  summaryData: IMatterExecSummary;
  marketData: IMatterExecSummary;
  internalData: IMatterExecSummary;
  marketRecords: Array<IMatterExecSummary> = [];
  internalRecords: Array<IMatterExecSummary> = [];
  totalPanels: Array<IMatterTotalsPanel> = [];
  insightText: string;
  internalMatters: Array<IInternalMatter> = [];
  insightExpanded: boolean = false;
  documents: Array<IMatterDocument> = [];

  @ViewChild(MatterTotalsMetricsComponent) totalMetrics: MatterTotalsMetricsComponent;

  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public elemFiltersService: FiltersService,
              public router: Router,
              public dialog: MatDialog,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {  this.matterId = params.matterId; });
    if (!this.matterId) {
      this.matterId = HARDCODED_MATTER_ID;
    }
  }
  selectFirm(evt: number) {
    this.firmId = evt; // 8668; // 8635;
    if (this.firmId) {
      this.summaryData = null;
      this.getMatterInsight(evt);
      setTimeout(() => {
        this.totalMetrics.getMatterSummary();
      });
    }
  }
  assignData(evt: any): void {
    this.summaryData = evt.summaryData;
    this.marketData = evt.marketData;
    this.internalData = evt.internalData;
    this.marketRecords = evt.marketRecords;
    this.internalRecords = evt.internalRecords;
    this.internalMatters = evt.internalMatters;
  }
  getMatterInsight(firmId: number): void {
    const params = {client_id: this.userService.currentUser.client_info_id, matter_id: this.matterId, firm_id: firmId};
    this.pendingRequest = this.httpService.makeGetRequest<IInsight>('getMatterInsight', params).subscribe(
      (data: any) => {
        if (data.result && data.result.is_enabled) {
          this.insightText = data.result.description;
        }
      }
    );
  }
  toggleInsight(toExpand: boolean): void {
    this.insightExpanded = toExpand;
  }
  viewMatters(): void {
    this.elemFiltersService.clearFilters();
    const params = {clientId: this.userService.currentUser.client_info.id};
    this.pendingRequest = this.httpService.makeGetRequest('getDateRange', params).subscribe(
      (data: any) => {
        if (data) {
          const maxDate = data.result.max;
          const minDate = data.result.min;
          for (const filter of this.elemFiltersService.filters) {
            filter.clear();
          }
          const savedFilters = localStorage.getItem(config.SAVED_FILTERS_NAME + this.userService.currentUser.id);
          const serializedQs = JSON.parse(savedFilters);
          const includeExpenses = localStorage.getItem('include_expenses_' + this.userService.currentUser.id);
          let qs = '&threshold=4&startdate=' + minDate + '&enddate=' + maxDate;
          if (includeExpenses !== null) {
            qs += '&expenses=' + includeExpenses;
          }
          const matters = [this.matterId];
          for (const matter of this.internalMatters) {
            matters.push(matter.sim_matter_id);
          }
          qs += '&matters=' + JSON.stringify(matters);
          serializedQs.querystring = qs;
          serializedQs.datestring = 'startdate=' + minDate + '&enddate=' + maxDate;
          const dateFilter = serializedQs.dataFilters.find(e => e.fieldName === 'dateRange');
          if (dateFilter) {
            dateFilter.value = { startDate: moment(minDate).utc() , endDate: moment(maxDate).utc()};
          }
          const matterFilter = serializedQs.dataFilters.find(e => e.fieldName === 'matters');
          if (matterFilter) {
            matterFilter.value = this.matterAnalysisService.buildMattersForFilter(matters);
          }

          localStorage.setItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString(), JSON.stringify(serializedQs));
          setTimeout(() => {
            window.location.href = '/#/app/client-dashboard/matter';
            // window.open(
            //   '/#/app/client-dashboard/matter',
            //   // '_blank'
            // );
          });
        }
      }
    );
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
