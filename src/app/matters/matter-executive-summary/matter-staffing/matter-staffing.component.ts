import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IInternalMatter, IMatterDocument, IMatterExecSummary, IMatterTotalsPanel, MetricCardType} from '../model';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';

@Component({
  selector: 'bd-matter-staffing',
  templateUrl: './matter-staffing.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-staffing.component.scss']
})
export class MatterStaffingComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  matterId: string;
  firmId: number;
  summaryData: IMatterExecSummary;
  marketData: IMatterExecSummary;
  internalData: IMatterExecSummary;
  marketRecords: Array<IMatterExecSummary> = [];
  internalRecords: Array<IMatterExecSummary> = [];
  internalMatters: Array<IInternalMatter> = [];
  totalPanels: Array<IMatterTotalsPanel> = [];
  insightText: string;
  insightExpanded: boolean = false;
  documents: Array<IMatterDocument> = [];
  totalRecordsDocs: number;
  marketMatters: Array<string> =  [];
  metrics: Array<string> = [];
  isLoaded: boolean = false;
  errorMessage: string;
  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public router: Router,
              public dialog: MatDialog,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:forin
    for (const item in MetricCardType) {
      this.metrics.push(item);
    }
    this.route.queryParams.subscribe(params => {  this.matterId = params.matterId; } );
    if (this.matterId) {
      this.getMatterSummary();
    }
  }
  selectFirm(evt: number) {
    this.firmId = evt; // 8668; // 8635;
    if (this.firmId) {
      this.summaryData = null;
      this.getMatterSummary();
    }
  }

  getMatterSummary(): void {
    this.isLoaded = false;
    const arrFirms = [];
    if (this.firmId && this.firmId !== undefined) {
      arrFirms.push(this.firmId.toString());
    }
    const arrMatters = [];
    arrMatters.push(this.matterId);
    const params = { client_id: this.userService.currentUser.client_info_id,
      matterId: this.matterId,
      firms: JSON.stringify(arrFirms),
      matters: JSON.stringify(arrMatters)
    };
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.error) {
          this.errorMessage = data.error;
          return;
        }
        if (data.result && data.result.ade_data) {
          this.summaryData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          this.matterAnalysisService.calculateSingleMatterData(this.summaryData);
          this.marketRecords =  data.result.market_data || [];
          this.marketData = this.matterAnalysisService.calculateMarketData(this.marketRecords);
          this.internalRecords =  data.result.internal_data || [];
          this.internalMatters = data.result.internal_matters;
          this.internalData = this.matterAnalysisService.calculateMarketData(this.internalRecords);
          this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData, this.marketData, this.internalData);
          this.isLoaded = true;
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
