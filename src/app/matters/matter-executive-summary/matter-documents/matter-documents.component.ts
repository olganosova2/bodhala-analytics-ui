import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {IMatterDocument} from '../model';

@Component({
  selector: 'bd-matter-documents',
  templateUrl: './matter-documents.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-documents.component.scss']
})
export class MatterDocumentsComponent implements OnInit, OnDestroy {
  documents: Array<IMatterDocument> = [];
  pendingRequest: Subscription;
  totalRecordsDocs: number;
  @Input() includeActivity: boolean = true;
  @Input() page: string;
  @Input() matterId: string;
  @Input() numRecords: number = 3;

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
    this.getDocuments();
  }
  getDocuments(): void {
    const params = { matterId: this.matterId, clientId: this.userService.currentUser.client_info_id, limit: this.numRecords, add_activity: this.includeActivity};
    this.pendingRequest = this.httpService.makeGetRequest('getMatterDocuments', params).subscribe(
      (data: any) => {
        this.documents = (data.result || []);
        this.totalRecordsDocs = this.documents.length;
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
