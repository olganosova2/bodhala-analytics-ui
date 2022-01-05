import {Component, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {Subscription} from 'rxjs';
import {IMatterExecSummary, IMatterTotalsPanel} from '../model';

@Component({
  selector: 'bd-matter-totals-metrics',
  templateUrl: './matter-totals-metrics.component.html',
  styleUrls: ['./matter-totals-metrics.component.scss']
})
export class MatterTotalsMetricsComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  summaryData: IMatterExecSummary;
  marketData: IMatterExecSummary;
  totalPanels: Array<IMatterTotalsPanel> = [];
  marketMatters: Array<string> =  ['087260/818', '087260/843', '087260/101*'];
  @Input() clientId: string;
  @Input() matterId: string;
  @Input() firmId: number;
  @Input() isAdmin: boolean = false;
  @Output() dataLoaded: EventEmitter<any> = new EventEmitter<Array<IMatterExecSummary>>();

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
    this.getMatterSummary();
  }
  getMatterSummary(): void {
    const arrFirms = [];
    arrFirms.push(this.firmId.toString());
    const arrMatters = [];
    arrMatters.push(this.matterId);
    const params = { client_id: this.isAdmin ? this.clientId : this.userService.currentUser.client_info_id,
      firms: JSON.stringify(arrFirms),
      matters: JSON.stringify(arrMatters),
      marketMatters: JSON.stringify(this.marketMatters)
    };
    this.pendingRequest = this.httpService.makeGetRequest<IMatterExecSummary>('getMatterExecSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.ade_data) {
          this.summaryData = data.result.ade_data.length > 0 ? data.result.ade_data[0] : null;
          this.marketData =  data.result.market_data.length > 0 ? data.result.market_data[0] : null;
          this.matterAnalysisService.calculateMarketData(this.marketData, this.marketMatters.length);
          this.totalPanels = this.matterAnalysisService.buildTotalPanels(this.summaryData, this.marketData);
          const emitted = [];
          emitted.push(this.summaryData);
          emitted.push(this.marketData);
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
