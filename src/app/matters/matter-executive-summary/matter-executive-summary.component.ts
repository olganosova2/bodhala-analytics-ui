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
   // if (this.firmId) {
      this.summaryData = null;
      this.getMatterInsight(evt);
      setTimeout(() => {
        this.totalMetrics.getMatterSummary();
      });
    //}
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
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}


