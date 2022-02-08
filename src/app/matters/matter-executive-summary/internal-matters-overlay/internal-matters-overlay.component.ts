import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService, IClient} from '../../../shared/services/common.service';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from 'bodhala-ui-elements';
import {FiltersService as LocalFiltersService} from '../../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {MatterAnalysisService} from '../matter-analysis.service';
import {IInternalMatter} from '../model';
import * as config from '../../../shared/services/config';
import * as _moment from 'moment';
import {Subscription} from 'rxjs';

const moment = _moment;

@Component({
  selector: 'bd-internal-matters-overlay',
  templateUrl: './internal-matters-overlay.component.html',
  styleUrls: ['./internal-matters-overlay.component.scss']
})
export class InternalMattersOverlayComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  maxDate: string;
  minDate: string;
  @Input() internalMatters: Array<IInternalMatter> = [];
  @Input() matterId: string;
  matters: Array<any> = [];

  constructor(private route: ActivatedRoute,
              public commonServ: CommonService,
              public appStateService: AppStateService,
              public userService: UserService,
              private httpService: HttpService,
              public elemFiltersService: FiltersService,
              public filtersService: LocalFiltersService,
              public router: Router,
              public dialog: MatDialog,
              public utilService: UtilService,
              public matterAnalysisService: MatterAnalysisService) { }

  ngOnInit(): void {
  }
  getMatterNames(): void {
    if (this.matters.length > 0) {
      return;
    }
    if (this.internalMatters.length === 0) {
      return;
    }
    const params = { clientId: this.userService.currentUser.client_info_id, matters: null };
    const arr = [];
    for (const matter of this.internalMatters) {
      arr.push(matter.sim_matter_id);
    }
    params.matters = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('getMatterBreakdownByName', params).subscribe(
      (data: any) => {
        if (data) {
          let matters = data.result || [];
          matters = matters.sort(this.utilService.dynamicSort('matter_name'));
          for (const matter of matters) {
            this.matters.push({id: matter.client_matter_id, name: matter.matter_name});
          }
        }
      }
    );
  }
  goToMatter(matterId: string): void {
    const enc = encodeURIComponent(matterId);
    const href = '/' + config.outerAppLinks.viewMatter + encodeURIComponent(enc);
    this.viewMatters(false, href);
  }
  viewMatters(viewAll: boolean, url: string): void {
    const params = {clientId: this.userService.currentUser.client_info.id};
    this.pendingRequest = this.httpService.makeGetRequest('getDateRange', params).subscribe(
      (data: any) => {
        if (data) {
          const maxDate = data.result.max;
          const minDate = data.result.min;
          for (const filter of this.elemFiltersService.filters) {
            filter.clear();
          }
          const savedFilters = localStorage.getItem(config.SAVED_FILTERS_NAME + this.userService.currentUser.id);
          const serializedQs = JSON.parse(savedFilters);
          const includeExpenses = localStorage.getItem('include_expenses_' + this.userService.currentUser.id);
          let qs = '&threshold=4&startdate=' + minDate + '&enddate=' + maxDate;
          if (includeExpenses !== null) {
            qs += '&expenses=' + includeExpenses;
          }
          const matters = [this.matterId];
          for (const matter of this.internalMatters) {
            matters.push(matter.sim_matter_id);
          }
          if (viewAll) {
            qs += '&matters=' + JSON.stringify(matters);
          }
          serializedQs.querystring = qs;
          serializedQs.datestring = 'startdate=' + minDate + '&enddate=' + maxDate;
          const dateFilter = serializedQs.dataFilters.find(e => e.fieldName === 'dateRange');
          if (dateFilter) {
            dateFilter.value = { startDate: moment(minDate).toString() , endDate: moment(maxDate).toString()};
          }
          const mcFilter = serializedQs.dataFilters.find(e => e.fieldName === 'matterCost');
          if (mcFilter) {
            mcFilter.value = [];
          }
          const matterFilter = serializedQs.dataFilters.find(e => e.fieldName === 'matters');
          if (matterFilter && viewAll) {
            matterFilter.value = this.matterAnalysisService.buildMattersForFilter(matters);
            if (!matterFilter.value || matterFilter.value.length === 0) {
              return;
            }
          }

          localStorage.setItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString(), JSON.stringify(serializedQs));
          localStorage.setItem('ELEMENTS_MATTER_BM_' + this.userService.currentUser.id.toString(), JSON.stringify(serializedQs));
          if (!viewAll) {
            setTimeout(() => {
              window.open(
                url,
                '_blank'
              );
              // window.location.href = url;
            });
          } else {
            setTimeout(() => {
           // window.location.href = '/#/app/client-dashboard/matter';
           window.open(
                '/#/app/client-dashboard/matter',
                '_blank'
              );
            });
          }
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
