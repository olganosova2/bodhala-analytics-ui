import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBillingTotalItem, IPracticeArea} from '../practice-area.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';

@Component({
  selector: 'bd-billing-totals-pa',
  templateUrl: './billing-totals-pa.component.html',
  styleUrls: ['./billing-totals-pa.component.scss']
})
export class BillingTotalsPaComponent implements OnInit {
  errorMessage: any;
  totalsRaw: any;
  totals: Array<IBillingTotalItem> = [];
  pendingRequest: Subscription;
  isLoaded: boolean = false;
  @Input() practiceArea: IPracticeArea;

  constructor(private httpService: HttpService,
              public filtersService: FiltersService) {
  }

  ngOnInit() {
    this.loadTotals();
  }
  loadTotals(): void {
    this.totals = Object.assign([], []);
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.practiceArea.client_matter_type);
    params.practiceAreas = JSON.stringify(arr);
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
    this.totals.push({ icon: 'icon-layers', total: this.filtersService.includeExpenses ? this.totalsRaw.total_spend_including_expenses.total : this.totalsRaw.total_spend.total, name: 'Outside Counsel Spend', format: 'currency',  svg: 'bills'});
    this.totals.push({ icon: 'icon-folder-alt', total: this.filtersService.includeExpenses ? this.totalsRaw.avg_matter_cost_including_expenses.avg_cost : this.totalsRaw.avg_matter_cost.avg_cost,  name: 'Avg. Matter Cost', format: 'currency', svg: 'avg_matter_cost'});
    this.totals.push({ icon: 'icon-clock', total: this.totalsRaw.percent_block_billed, name: 'Total Block Billed', format: 'percent', svg: 'total_bb'});
    this.totals.push({ icon: 'icon-energy', total: this.totalsRaw.partner_tks_per_matter.avg, name: 'Avg. Partners / Matter', format: 'number', svg: 'partners'});
    this.totals.push({ icon: 'icon-users', total: this.totalsRaw.associate_tks_per_matter.avg, name: 'Avg. Assoc. / Matter', format: 'number', svg: 'avg_ass_matter'});
    this.totals.push({ icon: 'icon-calendar', total: this.totalsRaw.avg_matter_duration.avg_duration, name: 'Matter Duration (days)', lastCell: true, svg: 'matter_dur'});

    this.totals.push({ icon: 'icon-energy', total: this.totalsRaw.avg_partner_rate, name: 'Avg. Partner Rate', format: 'number2', svg: 'partners'});
    this.totals.push({ icon: 'icon-users', total: this.totalsRaw.avg_associate_rate, name: 'Avg. Assoc. Rate', format: 'number2', svg: 'avg_ass_matter'});
    this.totals.push({ icon: 'icon-briefcase', total: this.totalsRaw.avg_paralegal_legal_assistant_rate, name: 'Avg. Paralegal Rate', format: 'number2', svg: 'avg_par_rate'});
    this.totals.push({ icon: 'icon-picture', total: this.totalsRaw.avg_blended_rate, name: 'Blended Rate', format: 'currency',  svg: 'bills'});
    this.totals.push({ icon: 'icon-bar-chart', total: this.totalsRaw.bodhala_price_index, name: 'BPI', format: 'currency', lastCell: true,  svg: 'bpi'});
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
