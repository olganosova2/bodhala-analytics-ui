import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../shared/services/common.service';
import {Subscription} from 'rxjs';
import {ICirpMatterSummary, ICirpTimekeeper, IClientPA} from './cirp.service';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'bd-cirp-matter-summary',
  templateUrl: './cirp-matter-summary.component.html',
  styleUrls: ['./cirp-matter-summary.component.scss']
})
export class CirpMatterSummaryComponent implements OnInit {
  errorMessage: any;
  matterId: string;
  matterName: string;
  practiceAreaType: string = IClientPA.client;
  pendingRequest: Subscription;
  matterSummary: ICirpMatterSummary;
  totalSpend: number = 0;
  timekeepers: Array<ICirpTimekeeper> = [];

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public dialog: MatDialog,
              public utilService: UtilService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Cirp Matter Summary';
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.matterId = decodeURIComponent(params.id);
        const matterName = params.matter;
        if (matterName && matterName !== undefined) {
          this.matterName = decodeURIComponent(matterName);
        }
        if (this.matterId) {
          this.initConfig();
          this.loadSummary();
        }
      });
  }

  initConfig(): void {
    if (this.userService.config && this.userService.config['analytics.practice.bodhala.areas']) {
      const configs = this.userService.config['analytics.practice.bodhala.areas'].configs || [];
      if (configs.length > 0) {
        this.practiceAreaType = configs[0].value || IClientPA.client;
      }
    }
  }

  loadSummary(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    const arr = [];
    arr.push(this.matterId);
    params.matters = JSON.stringify(arr);
    params.startdate = null;
    params.enddate = null;
    params.matterId = this.matterId;
    this.pendingRequest = this.httpService.makeGetRequest('getCirpMatterSummary', params).subscribe(
      (data: any) => {
        if (data.result && data.result.matter_summary.length > 0) {
          const records = data.result.matter_summary;
          let matter = Object.assign({}, data.result.matter_summary[0]);
          if (this.matterName && records.length > 1) {
            matter = records.find(e => e.matter_name === this.matterName);
          }
          if (matter) {
            this.matterSummary = Object.assign({}, matter);
          }
          this.calculateTotals(records);
          this.processMatterSummary();
        }
        if (data.result && data.result.timekeepers.length > 0) {
          this.timekeepers = Object.assign([], data.result.timekeepers);
          this.processTimeKeepers();
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  calculateTotals(records: Array<ICirpMatterSummary>): void {
    let total = 0;
    for (const rec of records) {
      total += rec.total;
    }
    this.totalSpend = total;
  }
  processMatterSummary(): void {
    this.commonServ.pageSubtitle = this.matterName;
    const start = moment(this.matterSummary.line_item_date);
    const end = moment();
    this.matterSummary.daysSince = (end.diff(start, 'days')).toString();
  }

  processTimeKeepers(): void {
    for (const tk of this.timekeepers) {
      const subTotal = this.totalSpend || 1;
      tk.spend_percent = tk.total_billed / subTotal * 100;
    }
  }

}
