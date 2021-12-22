import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {IMatterDocument, IMatterExecSummary, IMatterTotalsPanel, MOCK_INSIGHT_TEXT} from './model';
import {MatterAnalysisService} from './matter-analysis.service';
import {IInsight} from '../../admin/insights/models';

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
  insightText: string;
  insightExpanded: boolean = false;
  marketMatters: Array<string> = ['087260/818', '087260/843', '087260/101*'];
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
    this.matterId = '087260/785'; // 'OSOS000CZ'; // 'OSOS751VD';
    this.firmId = 4; // 8668; // 8635;
    if (this.matterId) {
      this.getMatterSummary();
      this.getDocuments();
      this.getMatterInsight();
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
      marketMatters: JSON.stringify(this.marketMatters),
    };
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.ade_data) {
          this.summaryData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData);
        }
      }
    );
  }
  getMatterInsight(): void {
    const params = {client_id: this.userService.currentUser.client_info_id, matter_id: this.matterId, firm_id: this.firmId};
    this.pendingRequest = this.httpService.makeGetRequest<IInsight>('getMatterInsight', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.insightText = data.result.description;
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
