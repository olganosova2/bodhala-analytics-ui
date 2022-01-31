import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {IMarketDocumentData, IMatterDocument, IMatterExecSummary, IMatterTotalsPanel} from '../model';
import {Subscription} from 'rxjs';
import {SAVINGS_CALCULATOR_CONFIG} from '../../../shared/services/config';
import {MatterDocumentModalComponent} from './matter-document-modal/matter-document-modal.component';
import {MOCK_MARKET_DOCS} from '../../../shared/unit-tests/mock-data/matter-overview';

@Component({
  selector: 'bd-matter-documents-overview',
  templateUrl: './matter-documents-overview.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-documents-overview.component.scss']
})
export class MatterDocumentsOverviewComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  documents: Array<IMatterDocument> = [];
  marketData: Array<IMarketDocumentData> = [];
  matterId: string;
  matterName: string;
  totalRecordsDocs: number;
  numRecords: number = 10;
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
    this.route.queryParams.subscribe(params => {  this.matterId = params.matterId; } );
    if (this.matterId) {
      this.load();
      this.getDocuments();
    }
  }

  load(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    const arr = [];
    if (!this.matterId) {
      return;
    }
    arr.push(this.matterId);
    params.matters = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getMatterBreakdownByName', params).subscribe(
      (data: any) => {
        if (data.result && data.result.length > 0) {
          this.matterName = data.result[0].matter_name;
        }
      }
    );
  }
  getDocuments(): void {
    const params = { matterId: this.matterId, clientId: this.userService.currentUser.client_info_id, limit: this.numRecords, add_activity: true};
    this.pendingRequest = this.httpService.makeGetRequest('getMatterDocuments', params).subscribe(
      (data: any) => {
        this.documents = (data.result || []);
        if (this.documents.length > 0) {
          this.getMarketData(this.documents);
        }
        this.totalRecordsDocs = this.documents.length;
      }
    );
  }
  getMarketData(documents: Array<IMatterDocument>): void {
    const params = { matterId: this.matterId, client_id: this.userService.currentUser.client_info_id, documents: []};
    let idx = 0;
    for (const doc of documents) {
      doc.index = idx;
      params.documents.push({ entity: doc.canonical, entity_type: doc.entity_type, category: doc.category, index: doc.index});
      idx ++;
    }
    // this.marketData = MOCK_MARKET_DOCS;
    this.pendingRequest = this.httpService.makePostRequest('getMatterDocsMarketData', params).subscribe(
      (data: any) => {
        this.marketData = (data.result || []);
        this.matterAnalysisService.getDocumentLandingRatings(documents, this.marketData);
      }
    );

  }
  openDetails(document: IMatterDocument): void {
    const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], document)};
    const dialogRef = this.dialog.open(MatterDocumentModalComponent, {...modalConfig, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }


}
