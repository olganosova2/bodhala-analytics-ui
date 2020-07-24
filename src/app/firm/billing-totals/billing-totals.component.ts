import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBillingTotalItem, IBillingTotalItemReportCard, IFirm} from '../firm.model';
import {IPracticeArea} from '../../practice-area/practice-area.model';
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
  otherFirms: any;
  totals: Array<IBillingTotalItem> = [];
  totalsRC: Array<IBillingTotalItemReportCard> = [];
  pendingRequest: Subscription;
  isLoaded: boolean = false;
  itemTopRowCount: number = 6;
  @Input() practiceArea: IPracticeArea;
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
    const params = this.filtersService.getCurrentUserCombinedFilters();
    if (this.firm) {
      const arr = [];
      arr.push(this.firm.id.toString());
      params.firms = JSON.stringify(arr);
    }
    if (this.practiceArea) {
      const arr = [];
      if (this.practiceArea.client_matter_type === null || this.practiceArea.client_matter_type === undefined) {
        arr.push(this.practiceArea);
      } else {
        arr.push(this.practiceArea.client_matter_type);
      }
      // arr.push(this.practiceArea.client_matter_type);
      params.practiceAreas = JSON.stringify(arr);
    }
    this.isLoaded = false;
    let requestString = '';
    if (this.isReportCard === true) {
      requestString = 'reportCardBillingTotals';
    } else {
      requestString = 'getBillingTotals';
    }
    console.log("Vals: ", this.isReportCard, requestString);
    this.pendingRequest = this.httpService.makeGetRequest(requestString, params).subscribe(
      (data: any) => {
        console.log("DATA: ", data);
        if (this.isReportCard === true) {
          this.totalsRaw = data.result.firm_overview;
          this.otherFirms = data.result.all_other_firms;
        } else {
          this.totalsRaw = data.result;
        }
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
      this.totalsRC = Object.assign([], []);
      this.calculateHoursPercentage(this.totalsRaw);
      this.calculateHoursPercentage(this.otherFirms);
      this.calculateDiffs(this.totalsRaw, this.otherFirms);
      console.log("after calc: ", this.totalsRaw);
      console.log("after calc OF: ", this.otherFirms);

      this.totalsRC.push({
        icon: 'icon-layers',
        total: this.filtersService.includeExpenses ? this.totalsRaw.total_spend_including_expenses.total : this.totalsRaw.total_spend.total,
        name: 'Outside Counsel Spend',
        format: 'currency',
        svg: 'bills',
        avg: null,
        diff: null
      });
      this.totalsRC.push({
        icon: 'icon-folder-alt',
        total: this.filtersService.includeExpenses ? this.totalsRaw.avg_matter_cost_including_expenses.avg_cost : this.totalsRaw.avg_matter_cost.avg_cost || 0,
        name: 'Avg. Matter Cost',
        format: 'currency',
        svg: 'avg_matter_cost',
        avg: this.filtersService.includeExpenses ? this.otherFirms.avg_matter_cost_including_expenses.avg_cost : this.otherFirms.avg_matter_cost.avg_cost || 0,
        diff: this.otherFirms.avg_matter_cost_diff
      });
      this.totalsRC.push({
        icon: 'icon-users',
        total: this.totalsRaw.total_associate_hours_prct,
        name: 'Associate Hours Worked',
        format: 'percent',
        svg: 'avg_ass_matter',
        avg: this.otherFirms.total_associate_hours_prct,
        diff: this.otherFirms.total_associate_hours_prct_diff
      });
      this.totalsRC.push({
        icon: 'icon-energy',
        total: this.totalsRaw.total_partner_hours_prct,
        name: 'Partner Hours Worked',
        format: 'percent',
        svg: 'partners',
        avg: this.otherFirms.total_partner_hours_prct,
        diff: this.otherFirms.total_partner_hours_prct_diff
      });
      this.totalsRC.push({
        icon: 'icon-calendar',
        total: this.totalsRaw.avg_matter_duration.avg_duration || 0,
        name: 'Matter Duration (days)',
        svg: 'matter_dur',
        avg: this.otherFirms.avg_matter_duration.avg_duration || 0,
        diff: this.otherFirms.avg_matter_duration_diff
      });
      this.totalsRC.push({
        icon: 'icon-energy',
        total: this.totalsRaw.avg_partner_rate,
        name: 'Avg. Partner Rate',
        format: 'number2',
        svg: 'partners',
        avg: this.otherFirms.avg_partner_rate,
        diff: this.otherFirms.avg_partner_rate_diff
      });
      this.totalsRC.push({
        icon: 'icon-users',
        total: this.totalsRaw.avg_associate_rate,
        name: 'Avg. Assoc. Rate',
        format: 'number2',
        svg: 'avg_ass_matter',
        avg: this.otherFirms.avg_associate_rate,
        diff: this.otherFirms.avg_associate_rate_diff 
      });
      this.totalsRC.push({
        icon: 'icon-briefcase',
        total: this.totalsRaw.avg_paralegal_legal_assistant_rate,
        name: 'Avg. Paralegal Rate',
        format: 'number2',
        svg: 'avg_par_rate',
        avg: this.otherFirms.avg_paralegal_legal_assistant_rate,
        diff: this.otherFirms.avg_paralegal_legal_assistant_rate_diff
      });
      this.totalsRC.push({
        icon: 'icon-picture',
        total: this.totalsRaw.avg_blended_rate,
        name: 'Blended Rate',
        format: 'currency',
        svg: 'bills',
        avg: this.otherFirms.avg_blended_rate,
        diff: this.otherFirms.avg_blended_rate_diff
      });
      this.totalsRC.push({
        icon: 'icon-bar-chart',
        total: this.totalsRaw.bodhala_price_index,
        name: 'BPI',
        format: 'currency',
        svg: 'bpi',
        avg: this.otherFirms.bodhala_price_index,
        diff: this.otherFirms.bodhala_price_index_diff
      });
      this.itemTopRowCount = Math.ceil(this.totalsRC.length / 2);
      this.totalsRC[this.itemTopRowCount - 1].lastCell = true;
      this.totalsRC[this.totalsRC.length - 1].lastCell = true;
      console.log("TOTES: ", this.totalsRC);
    } else {
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

  }

  calculateHoursPercentage(totalsRaw: any): void {
    const totalHrs = totalsRaw.total_hours || 1;
    totalsRaw.total_partner_hours_prct = (totalsRaw.total_partner_hours * 100 / totalHrs);
    totalsRaw.total_associate_hours_prct = (totalsRaw.total_associate_hours * 100 / totalHrs);
  }

  calculateDiffs(totalsRaw: any, otherFirms: any): void {
    // dont forget checks on these
    // if (firm.avg_partner_rate > 0 && firm.avg_partner_rate !== null && firm.avg_partner_rate !== undefined) {
    //   if (firm.avg_partner_rate > priorYearFirm.avg_partner_rate) {
    //     firm.avg_partner_rate_trend = ((firm.avg_partner_rate / priorYearFirm.avg_partner_rate) - 1) * 100;
    //   } else {
    //     firm.avg_partner_rate_trend = (1 - (firm.avg_partner_rate / priorYearFirm.avg_partner_rate)) * 100;
    //     firm.avg_partner_rate_trend *= -1;
    //   }
    // } else {
    //   firm.avg_partner_rate_trend = 0;
    // }
    // if (otherFirms.avg_matter_cost_including_expenses.avg_cost > 0 && otherFirms.avg_matter_cost_including_expenses.avg_cost !== null && otherFirms.avg_matter_cost_including_expenses.avg_cost !== undefined) {
    //   if (firm.avg_partner_rate > priorYearFirm.avg_partner_rate) {
    //     firm.avg_partner_rate_trend = ((firm.avg_partner_rate / priorYearFirm.avg_partner_rate) - 1) * 100;
    //   } else {
    //     firm.avg_partner_rate_trend = (1 - (firm.avg_partner_rate / priorYearFirm.avg_partner_rate)) * 100;
    //     firm.avg_partner_rate_trend *= -1;
    //   }
    // } else {
    //   firm.avg_partner_rate_trend = 0;
    // }
    otherFirms.avg_matter_cost_diff = this.filtersService.includeExpenses ? (totalsRaw.avg_matter_cost_including_expenses.avg_cost /
    otherFirms.avg_matter_cost_including_expenses.avg_cost) : (totalsRaw.avg_matter_cost.avg_cost / otherFirms.avg_matter_cost.avg_cost) || 0;
    otherFirms.total_associate_hours_prct_diff = (totalsRaw.total_associate_hours_prct / otherFirms.total_associate_hours_prct) || 0;
    otherFirms.total_partner_hours_prct_diff = (totalsRaw.total_partner_hours_prct / otherFirms.total_partner_hours_prct) || 0;
    otherFirms.avg_matter_duration_diff = (totalsRaw.avg_matter_duration.avg_duration / otherFirms.avg_matter_duration.avg_duration) || 0;
    otherFirms.avg_partner_rate_diff = (totalsRaw.avg_partner_rate / otherFirms.avg_partner_rate) || 0;
    otherFirms.avg_associate_rate_diff = (totalsRaw.avg_associate_rate / otherFirms.avg_associate_rate) || 0;
    otherFirms.avg_paralegal_legal_assistant_rate_diff = (totalsRaw.avg_paralegal_legal_assistant_rate / otherFirms.avg_paralegal_legal_assistant_rate) || 0;
    otherFirms.avg_blended_rate_diff = (totalsRaw.avg_blended_rate / otherFirms.avg_blended_rate) || 0;
    otherFirms.bodhala_price_index_diff = (totalsRaw.bodhala_price_index / otherFirms.bodhala_price_index);
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
