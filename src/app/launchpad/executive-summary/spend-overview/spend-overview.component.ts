import {Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy, Input} from '@angular/core';
import { FiltersService } from '../../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {ISpendOverviewItem} from '../executive-summary.model';
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
  priorYearTotalsRaw: any;
  diffs: any;
  totals: Array<ISpendOverviewItem> = [];
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
    const params = this.filtersService.getCurrentUserCombinedFilters(false);
    const lastYear = moment(this.maxDate).year();
    const d = new Date(lastYear, 0 , 1);
    const janOne = new Date(d).toISOString().slice(0, 10);
    // JD: was testing w/ 2019 vs 2018 data as I did not have 2020 data locally
    // janOne = janOne.replace('2020', '2019');
    const today = new Date().toISOString().slice(0, 10);
    params.startdate = janOne;
    params.enddate = this.maxDate;
    this.isLoaded = false;
    this.pendingRequest = this.httpService.makeGetRequest('getExecutiveSummaryBillingTotals', params).subscribe(
      (data: any) => {
        const ytd = 'ytd';
        const priorYear = 'prior_year';
        if (data.result[ytd]) {
          this.totalsRaw = data.result[ytd];
        }
        if (data.result[priorYear]) {
          this.priorYearTotalsRaw = data.result[priorYear];
        }
        this.formatItems();
        this.isLoaded = true;
      }
    );
  }

  formatItems(): void {
    this.totals = Object.assign([], []);

    this.diffs = this.calculateDiffs();

    this.totals.push({
      total: this.filtersService.includeExpenses ? this.totalsRaw.total_spend_including_expenses.total : this.totalsRaw.total_spend.total,
      name: 'Total Spend on Outside Counsel',
      format: 'currency',
      priorYearTotal: this.filtersService.includeExpenses ? this.priorYearTotalsRaw.total_spend_including_expenses.total : this.priorYearTotalsRaw.total_spend.total,
      diff: this.diffs.totalBilledDiff
    });
    this.totals.push({
      total: this.totalsRaw.total_hours,
      name: 'Total Hours Billed',
      format: 'number',
      priorYearTotal: this.priorYearTotalsRaw.total_hours,
      diff: this.diffs.totalHoursDiff
    });
    this.totals.push({
      total: this.filtersService.includeExpenses ? this.totalsRaw.avg_matter_cost_including_expenses.avg_cost : this.totalsRaw.avg_matter_cost.avg_cost || 0,
      name: 'Average Matter Cost',
      format: 'currency',
      priorYearTotal: this.filtersService.includeExpenses ? this.priorYearTotalsRaw.avg_matter_cost_including_expenses.avg_cost : this.priorYearTotalsRaw.avg_matter_cost.avg_cost || 0,
      diff: this.diffs.avgMatterCostDiff
    });
    this.totals.push({
      total: this.totalsRaw.percent_block_billed,
      name: 'Block Billed %',
      format: 'percent',
      priorYearTotal: this.priorYearTotalsRaw.percent_block_billed,
      diff: this.diffs.blockBillingDiff
    });
    this.totals.push({
      total: this.totalsRaw.avg_blended_rate,
      name: 'Blended Attorney Rate',
      format: 'currency',
      priorYearTotal: this.priorYearTotalsRaw.avg_blended_rate,
      diff: this.diffs.blendedRateDiff
    });
    this.totals.push({
      total: this.totalsRaw.bodhala_price_index,
      name: 'Bodhala Price Index',
      format: 'currency',
      priorYearTotal: this.priorYearTotalsRaw.bodhala_price_index,
      diff: this.diffs.bpiDiff
    });
    this.totals.push({
      total: this.totalsRaw.avg_partner_rate,
      name: 'Average Partner Rate',
      format: 'currency',
      priorYearTotal: this.priorYearTotalsRaw.avg_partner_rate,
      diff: this.diffs.avgPartnerRateDiff
    });
    this.totals.push({
      total: this.totalsRaw.avg_associate_rate,
      name: 'Average Associate Rate',
      format: 'currency',
      priorYearTotal: this.priorYearTotalsRaw.avg_associate_rate,
      diff: this.diffs.avgAssociateRateDiff
    });
    this.itemRowCount = this.totals.length;
    this.totals[this.totals.length - 1].lastCell = true;
  }

  calculateDiffs(): any {
    let diffs = {};
    let totalBilled = 0;
    let totalHours = 0;
    let avgMatterCost = 0;
    let blockBilling = 0;
    let blendedRate = 0;
    let bpi = 0;
    let avgPartnerRate = 0;
    let avgAssociateRate = 0;

    if (this.filtersService.includeExpenses) {
      if (this.priorYearTotalsRaw.total_spend_including_expenses.total > 0 && this.priorYearTotalsRaw.total_spend_including_expenses.total !== null && this.priorYearTotalsRaw.total_spend_including_expenses.total !== undefined) {
        totalBilled = ((this.totalsRaw.total_spend_including_expenses.total / this.priorYearTotalsRaw.total_spend_including_expenses.total) - 1) * 100;
      }
    } else {
      if (this.priorYearTotalsRaw.total_spend.total > 0 && this.priorYearTotalsRaw.total_spend.total !== null && this.priorYearTotalsRaw.total_spend.total !== undefined) {
        totalBilled = ((this.totalsRaw.total_spend.total / this.priorYearTotalsRaw.total_spend.total) - 1) * 100;
      }
    }
    if (this.priorYearTotalsRaw.total_hours > 0 && this.priorYearTotalsRaw.total_hours !== null && this.priorYearTotalsRaw.total_hours !== undefined) {
      totalHours = ((this.totalsRaw.total_hours / this.priorYearTotalsRaw.total_hours) - 1) * 100;
    }
    if (this.filtersService.includeExpenses) {
      if (this.priorYearTotalsRaw.avg_matter_cost_including_expenses.avg_cost > 0 && this.priorYearTotalsRaw.avg_matter_cost_including_expenses.avg_cost !== null && this.priorYearTotalsRaw.avg_matter_cost_including_expenses.avg_cost !== undefined) {
        avgMatterCost = ((this.totalsRaw.avg_matter_cost_including_expenses.avg_cost / this.priorYearTotalsRaw.avg_matter_cost_including_expenses.avg_cost) - 1) * 100;
      }
    } else {
      if (this.priorYearTotalsRaw.avg_matter_cost.avg_cost > 0 && this.priorYearTotalsRaw.avg_matter_cost.avg_cost !== null && this.priorYearTotalsRaw.avg_matter_cost.avg_cost !== undefined) {
        avgMatterCost = ((this.totalsRaw.avg_matter_cost.avg_cost / this.priorYearTotalsRaw.avg_matter_cost.avg_cost) - 1) * 100;
      }
    }
    if (this.priorYearTotalsRaw.percent_block_billed > 0 && this.priorYearTotalsRaw.percent_block_billed !== null && this.priorYearTotalsRaw.percent_block_billed !== undefined) {
      // blockBilling = ((this.totalsRaw.percent_block_billed / this.priorYearTotalsRaw.percent_block_billed) - 1) * 100;
      blockBilling = this.totalsRaw.percent_block_billed - this.priorYearTotalsRaw.percent_block_billed;
    }
    if (this.priorYearTotalsRaw.avg_blended_rate > 0 && this.priorYearTotalsRaw.avg_blended_rate !== null && this.priorYearTotalsRaw.avg_blended_rate !== undefined) {
      blendedRate = ((this.totalsRaw.avg_blended_rate / this.priorYearTotalsRaw.avg_blended_rate) - 1) * 100;
    }
    if (this.priorYearTotalsRaw.bodhala_price_index > 0 && this.priorYearTotalsRaw.bodhala_price_index !== null && this.priorYearTotalsRaw.bodhala_price_index !== undefined) {
      bpi = ((this.totalsRaw.bodhala_price_index / this.priorYearTotalsRaw.bodhala_price_index) - 1) * 100;
    }
    if (this.priorYearTotalsRaw.avg_partner_rate > 0 && this.priorYearTotalsRaw.avg_partner_rate !== null && this.priorYearTotalsRaw.avg_partner_rate !== undefined) {
      avgPartnerRate = ((this.totalsRaw.avg_partner_rate / this.priorYearTotalsRaw.avg_partner_rate) - 1) * 100;
    }
    if (this.priorYearTotalsRaw.avg_associate_rate > 0 && this.priorYearTotalsRaw.avg_associate_rate !== null && this.priorYearTotalsRaw.avg_associate_rate !== undefined) {
      avgAssociateRate = ((this.totalsRaw.avg_associate_rate / this.priorYearTotalsRaw.avg_associate_rate) - 1) * 100;
    }
    diffs = {
      totalBilledDiff: totalBilled,
      totalHoursDiff: totalHours,
      avgMatterCostDiff: avgMatterCost,
      blockBillingDiff: blockBilling,
      blendedRateDiff: blendedRate,
      bpiDiff: bpi,
      avgPartnerRateDiff: avgPartnerRate,
      avgAssociateRateDiff: avgAssociateRate
    };
    return diffs;
  }
}
