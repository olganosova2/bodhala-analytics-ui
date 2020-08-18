import {Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy, Input} from '@angular/core';
import { FiltersService } from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {ISpendOverviewItem} from '../executive-summary.model';
import { _ } from 'ag-grid-community';
import * as _moment from 'moment';

const moment = _moment;

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
  @Input() maxDate: string;


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
    const lastYear = moment(this.maxDate).year();
    const d = new Date(lastYear, 0 , 1);
    const janOne = new Date(d).toISOString().slice(0, 10);
    // JD: was testing w/ 2019 vs 2018 data as I did not have 2020 data locally
    // janOne = janOne.replace('2020', '2019');
    const today = new Date().toISOString().slice(0, 10);
    params.startdate = janOne;
    params.enddate = this.maxDate;
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
      total: this.totalsRaw.total_hours,
      name: 'Total Hours Billed',
      format: 'number',
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
      total: this.totalsRaw.avg_associate_rate,
      name: 'Average Associate Rate',
      format: 'currency',
    });
    this.itemRowCount = this.totals.length;
    this.totals[this.totals.length - 1].lastCell = true;
  }
}
