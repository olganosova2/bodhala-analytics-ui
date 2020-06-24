import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommonService} from '../../../shared/services/common.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../../shared/services/filters.service';

@Component({
  selector: 'bd-rate-card-tables',
  templateUrl: './rate-card-tables.component.html',
  styleUrls: ['./rate-card-tables.component.scss']
})
export class RateCardTablesComponent implements OnInit, OnDestroy {
  errorMessage: any;
  summary: any;
  isLoaded: boolean = false;
  @Input() practiceArea: string;
  @Input() firmId: string;
  pendingRequestFirm: Subscription;
  constructor(public commonServ: CommonService,
              private route: ActivatedRoute,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public utilServ: UtilService) { }

  ngOnInit() {
    this.getFirmTopSummary();
  }
  getFirmTopSummary(): void {
    this.isLoaded = false;
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    let arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    if (this.practiceArea) {
      arr = [];
      arr.push(this.practiceArea.toString());
      params.practiceAreas = JSON.stringify(arr);
    }
    this.pendingRequestFirm = this.httpService.makeGetRequest('getFirmTopSummary', params).subscribe(
      (data: any) => {
        this.summary = data.result;
        this.processData();
        this.isLoaded = true;
      },
      err => {
        this.errorMessage = err;
        this.isLoaded = true;
      }
    );
  }
  processData(): void {
    if (this.summary.matters) {
      for (const rec of this.summary.matters) {
        rec.total_spend = this.filtersService.includeExpenses ? rec.total_spend + rec.total_expenses : rec.total_spend;
      }
    }
    if (this.summary.timekeepers) {
      for (const rec of this.summary.timekeepers) {
        const total = rec.total_billed || 1;
        rec.pct = rec.last_of_month / total * 100;
      }
    }
  }
  ngOnDestroy() {
    if (this.pendingRequestFirm) {
      this.pendingRequestFirm.unsubscribe();
    }
  }
}
