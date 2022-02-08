import {Component, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {Subscription} from 'rxjs';
import {HARDCODED_MARKET_MATTERS, IMatterExecSummary, IMatterTotalsPanel} from '../model';

@Component({
  selector: 'bd-matter-totals-metrics',
  templateUrl: './matter-totals-metrics.component.html',
  styleUrls: ['./matter-totals-metrics.component.scss']
})
export class MatterTotalsMetricsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  summaryData: IMatterExecSummary;
  marketData: IMatterExecSummary;
  internalData: IMatterExecSummary;
  marketRecords: Array<IMatterExecSummary> = [];
  internalRecords: Array<IMatterExecSummary> = [];
  totalPanels: Array<IMatterTotalsPanel> = [];
  marketMatters: Array<string> =  HARDCODED_MARKET_MATTERS;
  isLoaded: boolean = false;
  @Input() clientId: string;
  @Input() matterId: string;
  @Input() firmId: number;
  @Input() isAdmin: boolean = false;
  @Output() dataLoaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,

              public dialog: MatDialog,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) { }

  ngOnInit(): void {
    this.getMatterSummary();
  }
  getMatterSummary(): void {
    this.isLoaded = false;
    const arrMatters = [];
    const arrFirms = [];
    if (this.firmId) {
      arrFirms.push(this.firmId.toString());
    }
    arrMatters.push(this.matterId);
    const params = { client_id: this.isAdmin ? this.clientId : this.userService.currentUser.client_info_id,
      matterId: this.matterId,
      matters: JSON.stringify(arrMatters),
      marketMatters: JSON.stringify(this.marketMatters),
      firms: JSON.stringify(arrFirms)
    };
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.ade_data) {
          this.summaryData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          this.matterAnalysisService.calculateSingleMatterData(this.summaryData);
          this.marketRecords =  data.result.market_data || [];
          this.marketData = this.matterAnalysisService.calculateMarketData(this.marketRecords);
          this.internalRecords =  data.result.internal_data || [];
          this.internalData = this.matterAnalysisService.calculateMarketData(this.internalRecords);
          this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData, this.marketData, this.internalData);
          const emitted = {
            summaryData: this.summaryData,
            marketData: this.marketData,
            marketRecords: this.marketRecords,
            internalData: this.internalData,
            internalRecords: this.internalRecords,
            internalMatters: data.result.internal_matters
          };
          this.isLoaded = true;
          this.dataLoaded.emit(emitted);
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
