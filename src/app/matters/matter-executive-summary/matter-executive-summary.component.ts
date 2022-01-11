import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {IMatterDocument, IMatterExecSummary, IMatterTotalsPanel} from './model';
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
  marketData: IMatterExecSummary;
  marketRecords: Array<IMatterExecSummary> = [];
  totalPanels: Array<IMatterTotalsPanel> = [];
  insightText: string;
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
    this.matterId = '087260/834'; // '087260/818'; //
    this.firmId = 4; // 8668; // 8635;
    if (this.matterId) {
      this.getDocuments();
      this.getMatterInsight();
    }
  }
  assignData(evt: any): void {
    this.summaryData = evt.summaryData;
    this.marketData = evt.marketData;
    this.marketRecords = evt.marketRecords;
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
    const params = { matterId: this.matterId, clientId: this.userService.currentUser.client_info_id, limit: 3};
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
  goToViewDocs(): void {

  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
