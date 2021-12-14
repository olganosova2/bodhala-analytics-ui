import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {IMatterDocument, IMatterExecSummary, IMatterTotalsPanel, MOCK_INSIGHT_TEXT} from './model';
import {MatterAnalysisService} from './matter-analysis.service';

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
  totalPanels: Array<IMatterTotalsPanel> = [];
  insightText: string = MOCK_INSIGHT_TEXT;
  insightExpanded: boolean = false;
  documents: Array<IMatterDocument> = [];
  totalRecordsDocs: number;

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
    this.route.queryParams.subscribe(params => {  this.matterId = params.matterId; });
    this.matterId = '116332.0004'; // 'OSOS751VD';
    this.firmId = 59; // 8635;
    if (this.matterId) {
      this.getMatterSummary();
      this.getDocuments();
    }
  }
  getMatterSummary(): void {
    const params = { matter_id: this.matterId, firm_id: this.firmId};
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.summaryData = data.result[0];
          this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData);
        }
      }
    );

  }
  getDocuments(): void {
    const params = { matterId: this.matterId, clientId: this.userService.currentUser.client_info_id};
    this.pendingRequest = this.httpService.makeGetRequest('getMatterDocuments', params).subscribe(
      (data: any) => {
        this.documents = (data.result || []);
        // this.documents = MOCK_NERS_DATA.result.slice(0, 5) as Array<IMatterDocument>;
        this.totalRecordsDocs = this.documents.length;
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
