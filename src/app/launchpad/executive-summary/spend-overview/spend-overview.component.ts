import {Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { FiltersService } from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {ISpendOverviewItem} from '../executive-summary.model';
import { _ } from 'ag-grid-community';

@Component({
  selector: 'bd-spend-overview',
  templateUrl: './spend-overview.component.html',
  styleUrls: ['./spend-overview.component.scss']
})
export class SpendOverviewComponent implements OnInit {

  pendingRequest: Subscription;
  totalsRaw: any;
  totals: Array<ISpendOverviewItem> = [];
  errorMessage: any;
  isLoaded: boolean = false;
  itemRowCount: number = 9;


  constructor(
    private filtersService: FiltersService,
    public httpService: HttpService,
  ) {}

  ngOnInit() {
    this.getSpendOverview();
  }

  getSpendOverview(): void {
    this.totals = Object.assign([], []);
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    let d = new Date(new Date().getFullYear(), 0 , 1);
    let janOne = new Date(d).toISOString().slice(0, 10);
    janOne = janOne.replace('2020', '2019');
    let today = new Date().toISOString().slice(0, 10);
    params.startdate = janOne;
    params.enddate = today;

    this.isLoaded = false;
    this.pendingRequest = this.httpService.makeGetRequest('getBillingTotals', params).subscribe(
      (data: any) => {
        this.totalsRaw = data.result;
        this.formatItems();
        this.isLoaded = true;
      },
      err => {
        this.errorMessage = err;
        this.isLoaded = true;
      }
    );
  }

  formatItems(): void {
    this.totals = Object.assign([], []);

    this.totals.push({
      total: this.filtersService.includeExpenses ? this.totalsRaw.total_spend_including_expenses.total : this.totalsRaw.total_spend.total,
      name: 'Total Spend on Outside Counsel',
      format: 'currency',
    });
    this.totals.push({
      total: this.filtersService.includeExpenses ? this.totalsRaw.avg_matter_cost_including_expenses.avg_cost : this.totalsRaw.avg_matter_cost.avg_cost || 0,
      name: 'Average Matter Cost',
      format: 'currency',
    });
    this.totals.push({
      total: this.totalsRaw.percent_block_billed,
      name: 'Block Billed %',
      format: 'percent',
    });
    this.totals.push({
      total: this.totalsRaw.avg_blended_rate,
      name: 'Blended Attorney Rate',
      format: 'currency',
    });
    this.totals.push({
      total: this.totalsRaw.bodhala_price_index,
      name: 'Bodhala Price Index',
      format: 'currency',
    });
    this.totals.push({
      total: this.totalsRaw.avg_partner_rate,
      name: 'Average Partner Rate',
      format: 'currency',
    });
    this.totals.push({
      total: this.totalsRaw.partner_tks_per_matter.avg,
      name: 'Average Partners per Matter',
      format: 'number',
    });
    this.totals.push({
      total: this.totalsRaw.avg_associate_rate,
      name: 'Average Associate Rate',
      format: 'currency',
    });
    this.totals.push({
      total: this.totalsRaw.associate_tks_per_matter.avg,
      name: 'Average Associates per Matter',
      format: 'number',
    });
    this.itemRowCount = this.totals.length;
    this.totals[this.totals.length - 1].lastCell = true;

  }

}
