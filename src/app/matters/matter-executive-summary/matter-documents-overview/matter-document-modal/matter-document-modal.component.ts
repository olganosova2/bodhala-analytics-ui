import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {IMatterDocument, IMatterExecSummary, IMatterTotalsPanel} from '../../model';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../../shared/services/filters.service';
import {MatterAnalysisService} from '../../matter-analysis.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-matter-document-modal',
  templateUrl: './matter-document-modal.component.html',
  styleUrls: ['./matter-document-modal.component.scss']
})
export class MatterDocumentModalComponent implements OnInit {
  pendingRequest: Subscription;
  document: IMatterDocument;
  matterId: string;
  firmId: number;
  summaryData: IMatterExecSummary;
  marketData: IMatterExecSummary;
  internalData: IMatterExecSummary;
  marketRecords: Array<IMatterExecSummary> = [];
  internalRecords: Array<IMatterExecSummary> = [];
  totalPanels: Array<IMatterTotalsPanel> = [];

  constructor(
    public dialogRef: MatDialogRef<MatterDocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMatterDocument,
    private route: ActivatedRoute,
    public commonServ: CommonService,
    public appStateService: AppStateService,
    public userService: UserService,
    private httpService: HttpService,
    public filtersService: FiltersService,
    public router: Router,
    public dialog: MatDialog,
    public utilService: UtilService,
    public matterAnalysisService: MatterAnalysisService
  ) {
    this.document = Object.assign({}, data);
  }

  ngOnInit(): void {
    this.matterId = this.document.client_matter_id;
    this.getDocumentBenchmarks();
  }
  getDocumentBenchmarks(): void {
    const arrMatters = [];
    arrMatters.push(this.matterId);
    const params = { client_id: this.userService.currentUser.client_info_id,
      matterId: this.matterId,
      matters: JSON.stringify(arrMatters),
      entity: this.document.canonical,
      category: this.document.category,
      entity_type: this.document.entity_type
    };
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.ade_data) {
          this.summaryData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          // this.matterAnalysisService.calculateSingleMatterData(this.summaryData);
          // this.marketRecords =  data.result.market_data || [];
          // this.marketData = this.matterAnalysisService.calculateMarketData(this.marketRecords);
          // this.internalRecords =  data.result.internal_data || [];
          // this.internalData = this.matterAnalysisService.calculateMarketData(this.internalRecords);
          // this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData, this.marketData, this.internalData);
        }
      }
    );

  }

}
