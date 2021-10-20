import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {QbrService} from '../qbr.service';
import {IQbrReport} from '../qbr-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-qbr-deck',
  templateUrl: './qbr-deck.component.html',
  styleUrls: ['../qbr-css.scss', './qbr-deck.component.scss']
})
export class QbrDeckComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  qbr: IQbrReport;
  qbrId: string;
  selectedTabIndex: number;
  cardTitle: string;
  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public qbrService: QbrService,
              public utilService: UtilService) {
      this.commonServ.pageTitle = 'View QBR';
      this.cardTitle = this.userService.currentUser.client_info.org.name + ' QBR';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {  this.qbrId = params.qbrId; });
    this.getQbrs();
  }
  getQbrs(): void {
    this.pendingRequest = this.httpService.makeGetRequest('getClientQBRs').subscribe(
      (data: any) => {
        const records = ( data.result || [] ).sort(this.utilService.dynamicSort('id'));
        if (records.length > 0) {
          if (this.qbrId) {
            this.qbr = records.find(e => e.id === Number(this.qbrId));
          }
          if (!this.qbr) {  // for testing default to first one
            this.qbr = records[0];
          }
        }
      }
    );
  }
  changeTab(evt): void {
    this.selectedTabIndex = evt.index;
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
