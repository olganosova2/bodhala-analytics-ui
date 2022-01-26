import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {IMatterExecSummary, IMatterTotalsPanel} from '../model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-matter-documents-overview',
  templateUrl: './matter-documents-overview.component.html',
  styleUrls: ['../matter-executive-summary.component.scss', './matter-documents-overview.component.scss']
})
export class MatterDocumentsOverviewComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  matterId: string;
  matterName: string;
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
    }
  }

  load(): void {
    let matters = [];
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
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }


}
