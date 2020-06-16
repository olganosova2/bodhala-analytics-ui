import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBillingTotalItem, IFirm} from '../firm.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';

@Component({
  selector: 'bd-billing-totals',
  templateUrl: './billing-totals.component.html',
  styleUrls: ['./billing-totals.component.scss']
})
export class BillingTotalsComponent implements OnInit, OnDestroy {
  errorMessage: any;
  totalsRaw: any;
  totals: Array<IBillingTotalItem> = [];
  pendingRequest: Subscription;
  isLoaded: boolean = false;
  itemTopRowCount: number = 6;
  @Input() practiceArea: string;
  @Input() isReportCard: boolean = false;
  @Input() firm: IFirm;

  constructor(private httpService: HttpService,
              public filtersService: FiltersService) {
  }

  ngOnInit() {
    this.loadTotals();
  }

  loadTotals(): void {
    this.totals = Object.assign([], []);
    const params = this.filtersService.getCurrentUserCombinedFilters(this.isReportCard);
    if (this.firm) {
      const arr = [];
      arr.push(this.firm.id.toString());
      params.firms = JSON.stringify(arr);
    }
    if (this.practiceArea) {
      const arr = [];
      arr.push(this.practiceArea.toString());
      params.practiceAreas = JSON.stringify(arr);
    }
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
    if (this.isReportCard) {
      this.calculateHoursPercentage(this.totalsRaw);
    }
    this.totals.push({
      icon: 'icon-layers',
      total: this.filtersService.includeExpenses ? this.totalsRaw.total_spend_including_expenses.total : this.totalsRaw.total_spend.total,
      name: 'Outside Counsel Spend',
      format: 'currency',
      svg: 'bills'
    });
    this.totals.push({
      icon: 'icon-folder-alt',
      total: this.filtersService.includeExpenses ? this.totalsRaw.avg_matter_cost_including_expenses.avg_cost : this.totalsRaw.avg_matter_cost.avg_cost || 0,
      name: 'Avg. Matter Cost',
      format: 'currency',
      svg: 'avg_matter_cost'
    });
    this.totals.push({
      icon: 'icon-clock',
      total: this.totalsRaw.percent_block_billed,
      name: 'Total Block Billed',
      format: 'percent',
      svg: 'total_bb'
    });
    if (!this.isReportCard) {
      this.totals.push({
        icon: 'icon-energy',
        total: this.totalsRaw.partner_tks_per_matter.avg,
        name: 'Avg. Partners / Matter',
        format: 'number',
        svg: 'partners'
      });
      this.totals.push({
        icon: 'icon-users',
        total: this.totalsRaw.associate_tks_per_matter.avg,
        name: 'Avg. Assoc. / Matter',
        format: 'number',
        svg: 'avg_ass_matter'
      });
    } else {
      this.totals.push({
        icon: 'icon-users',
        total: this.totalsRaw.total_associate_hours_prct,
        name: 'Associate Hours Worked',
        format: 'percent',
        svg: 'avg_ass_matter'
      });
      this.totals.push({
        icon: 'icon-energy',
        total: this.totalsRaw.total_partner_hours_prct,
        name: 'Partner Hours Worked',
        format: 'percent',
        svg: 'partners'
      });
    }

    this.totals.push({
      icon: 'icon-calendar',
      total: this.totalsRaw.avg_matter_duration.avg_duration || 0,
      name: 'Matter Duration (days)',
      svg: 'matter_dur'
    });

    this.totals.push({
      icon: 'icon-energy',
      total: this.totalsRaw.avg_partner_rate,
      name: 'Avg. Partner Rate',
      format: 'number2',
      svg: 'partners'
    });
    this.totals.push({
      icon: 'icon-users',
      total: this.totalsRaw.avg_associate_rate,
      name: 'Avg. Assoc. Rate',
      format: 'number2',
      svg: 'avg_ass_matter'
    });
    this.totals.push({
      icon: 'icon-briefcase',
      total: this.totalsRaw.avg_paralegal_legal_assistant_rate,
      name: 'Avg. Paralegal Rate',
      format: 'number2',
      svg: 'avg_par_rate'
    });
    this.totals.push({
      icon: 'icon-picture',
      total: this.totalsRaw.avg_blended_rate,
      name: 'Blended Rate',
      format: 'currency',
      svg: 'bills'
    });
    this.totals.push({icon: 'icon-bar-chart', total: this.totalsRaw.bodhala_price_index, name: 'BPI', format: 'currency', svg: 'bpi'});
    this.itemTopRowCount = Math.ceil(this.totals.length / 2);
    this.totals[this.itemTopRowCount - 1].lastCell = true;
    this.totals[this.totals.length - 1].lastCell = true;
  }

  calculateHoursPercentage(totalsRaw: any): void {
    const totalHrs = totalsRaw.total_partner_hours + totalsRaw.total_associate_hours || 1;
    totalsRaw.total_partner_hours_prct = (totalsRaw.total_partner_hours * 100 / totalHrs);
    totalsRaw.total_associate_hours_prct = (totalsRaw.total_associate_hours * 100 / totalHrs);
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
