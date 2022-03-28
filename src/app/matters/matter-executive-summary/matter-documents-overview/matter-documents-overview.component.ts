import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {IInternalMatter, IMarketDocumentData, IMatterDocument, IMatterExecSummary, IMatterMarketDocument, IMatterTotalsPanel} from '../model';
import {Subscription} from 'rxjs';
import {SAVINGS_CALCULATOR_CONFIG} from '../../../shared/services/config';
import {MatterDocumentModalComponent} from './matter-document-modal/matter-document-modal.component';
import {MOCK_MARKET_DOCS} from '../../../shared/unit-tests/mock-data/matter-overview';

@Component({
  selector: 'bd-matter-documents-overview',
  templateUrl: './matter-documents-overview.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-documents-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatterDocumentsOverviewComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  documents: Array<IMatterDocument> = [];
  marketData: Array<IMarketDocumentData> = [];
  internalMatters: Array<IInternalMatter> = [];
  matterId: string;
  matterName: string;
  totalRecordsDocs: number;
  numRecords: number = 10;
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
    this.isLoaded = false;
    const params = { matterId: this.matterId, clientId: this.userService.currentUser.client_info_id, limit: this.numRecords, add_activity: false};
    // const params = { matterId: this.matterId, clientId: this.userService.currentUser.client_info_id, limit: this.numRecords};
    this.pendingRequest = this.httpService.makeGetRequest('getMatterDocuments', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        if (data.error) {
          this.errorMessage = data.error;
          return;
        }
        this.documents = (data.result || []);
        if (this.documents.length > 0) {
          this.getMarketData(this.documents);
        }
        this.totalRecordsDocs = this.documents.length;
      }
    );
  }
  getMarketData(documents: Array<IMatterDocument>): void {
    // const params = { matterId: this.matterId, client_id: this.userService.currentUser.client_info_id, documents: []};
    let idx = 0;
    for (const doc of documents) {
      doc.index = idx;
      idx ++;
    }
    // this.marketData = MOCK_MARKET_DOCS;
    this.isLoaded = false;
    const params = { matterId: this.matterId, client_id: this.userService.currentUser.client_info_id};
    this.pendingRequest = this.httpService.makeGetRequest('getMatterDocsMarketData', params).subscribe(
      (data: any) => {
        this.isLoaded = true;
        const records =  (data.result.documents || []);
        // this.marketData = (data.result.documents || []);
        this.processMarketDocsData(this.documents, records);
        this.internalMatters = data.result.internal_matters || [];
        this.matterAnalysisService.getDocumentLandingRatings(documents, this.marketData);
      }
    );

  }
  processMarketDocsData(documents: Array<IMatterDocument>, marketData: Array<IMatterMarketDocument>): void {
    const result = [];
    for (const doc of this.documents) {
      const filtered = marketData.filter(e => e.entity === doc.canonical && e.entity_type === doc.entity_type && e.category === doc.category);
      const docMarketRecords = { index: doc.index, market_data: filtered};
      result.push(docMarketRecords);
    }
    this.marketData = result;
  }
  openDetails(document: IMatterDocument): void {
    const modalConfig = {...SAVINGS_CALCULATOR_CONFIG.detailsDialogConfig, data: Object.assign([], document)};
    const dialogRef = this.dialog.open(MatterDocumentModalComponent, {...modalConfig, disableClose: false, panelClass: 'custom-dialog-container' });

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
