import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HARDCODED_MARKET_MATTERS, IMatterDocument, IMatterExecSummary, IMatterTotalsPanel} from '../model';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';

@Component({
  selector: 'bd-matter-staffing',
  templateUrl: './matter-staffing.component.html',
  styleUrls: ['./matter-staffing.component.scss']
})
export class MatterStaffingComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  matterId: string;
  firmId: number;
  summaryData: IMatterExecSummary;
  marketData: IMatterExecSummary;
  marketRecords: Array<IMatterExecSummary> = [];
  totalPanels: Array<IMatterTotalsPanel> = [];
  insightText: string;
  insightExpanded: boolean = false;
  documents: Array<IMatterDocument> = [];
  totalRecordsDocs: number;
  marketMatters: Array<string> =  HARDCODED_MARKET_MATTERS;
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
    this.route.queryParams.subscribe(params => {  this.matterId = params.matterId;
                                                  this.firmId = params.firmId; } );
    if (this.matterId) {
      this.getMatterSummary();
    }
  }

  getMatterSummary(): void {
    const arrFirms = [];
    arrFirms.push(this.firmId.toString());
    const arrMatters = [];
    arrMatters.push(this.matterId);
    const params = { client_id: this.userService.currentUser.client_info_id,
      firms: JSON.stringify(arrFirms),
      matters: JSON.stringify(arrMatters),
      marketMatters: JSON.stringify(this.marketMatters)
    };
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.ade_data) {
          this.summaryData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          this.matterAnalysisService.calculateSingleMatterData(this.summaryData);
          this.marketRecords =  data.result.market_data || [];
          this.marketData = this.matterAnalysisService.calculateMarketData(this.marketRecords);
          this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData, this.marketData);
          const emitted = {
            summaryData: this.summaryData,
            marketData: this.marketData,
            marketRecords: this.marketRecords
          };
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
