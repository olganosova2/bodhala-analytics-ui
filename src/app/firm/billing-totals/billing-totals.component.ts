import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBillingTotalItem, IBillingTotalItemReportCard, IFirm} from '../firm.model';
import {IPracticeArea} from '../../practice-area/practice-area.model';
import {Subscription, Subject} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
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
  firstLoad: boolean = true;
  itemTopRowCount: number = 6;
  @Input() practiceArea: IPracticeArea;
  @Input() isReportCard: boolean = false;
  @Input() isComparison: boolean = false;
  @Input() firm: IFirm;
  filtersUpdated: boolean = false;
  filtersUpdatedSrc: Subject<boolean>;
  reportCardStartDate: string;
  reportCardStartDateSrc: Subject<string>;
  reportCardEndDate: string;
  reportCardEndDateSrc: Subject<string>;

  constructor(private httpService: HttpService,
              public filtersService: FiltersService,
              public commonServ: CommonService) {
                this.filtersUpdatedSrc = this.commonServ.reportCardFilters;
                this.filtersUpdatedSrc.subscribe(value => {
                  this.filtersUpdated = value;
                });

                this.reportCardStartDateSrc = this.commonServ.reportCardStartDate;
                this.reportCardStartDateSrc.subscribe(value => {
                  this.reportCardStartDate = value;
                });

                this.reportCardEndDateSrc = this.commonServ.reportCardEndDate;
                this.reportCardEndDateSrc.subscribe(value => {
                  this.reportCardEndDate = value;
                  this.loadTotals();
                });
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
      const paramsLS = this.filtersService.parseLSQueryString();
      if (paramsLS.firms !== null && paramsLS.firms !== undefined) {
        let otherFirmIDs = paramsLS.firms;
        otherFirmIDs = JSON.parse(otherFirmIDs);
        params.otherFirms = otherFirmIDs;
      }
    } else if (this.isComparison === true && this.firstLoad === true) {
      requestString = 'reportCardComparisonBillingTotals';
      params.secondCall = false;
    } else if (this.isComparison === true && this.firstLoad === false) {
      requestString = 'reportCardComparisonBillingTotals';
      params.secondCall = true;
      params.reportCardStartDate = this.reportCardStartDate;
      params.reportCardEndDate = this.reportCardEndDate;
    } else {
      requestString = 'getBillingTotals';
    }
    this.pendingRequest = this.httpService.makeGetRequest(requestString, params).subscribe(
      (data: any) => {
        if (this.isReportCard === true) {
          this.totalsRaw = data.result.firm_overview;
          this.otherFirms = data.result.all_other_firms;
        } else if (this.isComparison === true && this.firstLoad === true) {
          this.otherFirms = data.result.saved_report_timeframe;
          this.totalsRaw = data.result.comparison_timeframe;
          this.firstLoad = false;
        } else if (this.isComparison === true && this.firstLoad === false) {
          this.otherFirms = data.result.saved_report_timeframe;
          this.totalsRaw = data.result.comparison_timeframe;
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
    if (this.isReportCard || this.isComparison) {
      this.totalsRC = Object.assign([], []);
      this.calculateHoursPercentage(this.totalsRaw);
      this.calculateHoursPercentage(this.otherFirms);
      this.calculateDiffs(this.totalsRaw, this.otherFirms);

      this.totalsRC.push({
        icon: 'icon-layers',
        total: this.filtersService.includeExpenses ? this.totalsRaw.total_spend_including_expenses.total : this.totalsRaw.total_spend.total,
        name: 'Outside Counsel Spend',
        format: 'currency',
        svg: 'bills',
        avg: this.filtersService.includeExpenses ? this.otherFirms.total_spend_including_expenses.total : this.otherFirms.total_spend.total,
        diff: this.otherFirms.total_spend_diff
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
        icon: 'icon-energy',
        total: this.totalsRaw.total_partner_hours_prct,
        name: 'Partner Hours Worked',
        format: 'percent',
        svg: 'partners',
        avg: this.otherFirms.total_partner_hours_prct,
        diff: this.otherFirms.total_partner_hours_prct_diff
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
        icon: 'icon-calendar',
        total: this.totalsRaw.avg_matter_duration.avg_duration || 0,
        name: 'Matter Duration (days)',
        svg: 'matter_dur',
        avg: this.otherFirms.avg_matter_duration.avg_duration || 0,
        diff: this.otherFirms.avg_matter_duration_diff
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
      this.itemTopRowCount = Math.ceil(this.totalsRC.length / 2);
      this.totalsRC[this.itemTopRowCount - 1].lastCell = true;
      this.totalsRC[this.totalsRC.length - 1].lastCell = true;
    } else if (this.isComparison === true) {

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
    otherFirms.avg_matter_cost_diff = 0;
    otherFirms.total_associate_hours_prct_diff = 0;
    otherFirms.total_partner_hours_prct_diff = 0;
    otherFirms.avg_matter_duration_diff = 0;
    otherFirms.avg_partner_rate_diff = 0;
    otherFirms.avg_associate_rate_diff = 0;
    otherFirms.avg_paralegal_legal_assistant_rate_diff = 0;
    otherFirms.avg_blended_rate_diff = 0;
    otherFirms.bodhala_price_index_diff = 0;

    if (!this.filtersService.includeExpenses && otherFirms.total_spend.total > 0 && otherFirms.total_spend.total !== undefined && otherFirms.total_spend.total !== null) {
      if (otherFirms.total_spend.total > totalsRaw.total_spend.total) {
        otherFirms.total_spend_diff = (1 - (totalsRaw.total_spend.total / otherFirms.total_spend.total)) * 100;
        otherFirms.total_spend_diff *= -1;
      } else {
        otherFirms.total_spend_diff = ((totalsRaw.total_spend.total / otherFirms.total_spend.total) - 1) * 100;
      }
    } else if (this.filtersService.includeExpenses && otherFirms.total_spend_including_expenses.total > 0 && otherFirms.total_spend_including_expenses.total !== undefined
      && otherFirms.total_spend_including_expenses.total !== null) {
      if (otherFirms.total_spend_including_expenses.total > totalsRaw.total_spend_including_expenses.total) {
        otherFirms.total_spend_diff = (1 - (totalsRaw.total_spend_including_expenses.total / otherFirms.total_spend_including_expenses.total)) * 100;
        otherFirms.total_spend_diff *= -1;
      } else {
        otherFirms.total_spend_diff = ((totalsRaw.total_spend_including_expenses.total / otherFirms.total_spend_including_expenses.total) - 1) * 100;
      }
    }

    if (!this.filtersService.includeExpenses && otherFirms.avg_matter_cost.avg_cost > 0 && otherFirms.avg_matter_cost.avg_cost !== undefined && otherFirms.avg_matter_cost.avg_cost !== null) {
      if (otherFirms.avg_matter_cost.avg_cost > totalsRaw.avg_matter_cost.avg_cost) {
        otherFirms.avg_matter_cost_diff = (1 - (totalsRaw.avg_matter_cost.avg_cost / otherFirms.avg_matter_cost.avg_cost)) * 100;
        otherFirms.avg_matter_cost_diff *= -1;
      } else {
        otherFirms.avg_matter_cost_diff = ((totalsRaw.avg_matter_cost.avg_cost / otherFirms.avg_matter_cost.avg_cost) - 1) * 100;
      }
    } else if (this.filtersService.includeExpenses && otherFirms.avg_matter_cost_including_expenses.avg_cost > 0 && otherFirms.avg_matter_cost_including_expenses.avg_cost !== undefined
      && otherFirms.avg_matter_cost_including_expenses.avg_cost !== null) {
      if (otherFirms.avg_matter_cost_including_expenses.avg_cost > totalsRaw.avg_matter_cost_including_expenses.avg_cost) {
        otherFirms.avg_matter_cost_diff = (1 - (totalsRaw.avg_matter_cost_including_expenses.avg_cost / otherFirms.avg_matter_cost_including_expenses.avg_cost)) * 100;
        otherFirms.avg_matter_cost_diff *= -1;
      } else {
        otherFirms.avg_matter_cost_diff = ((totalsRaw.avg_matter_cost_including_expenses.avg_cost / otherFirms.avg_matter_cost_including_expenses.avg_cost) - 1) * 100;
      }
    }

    if (otherFirms.total_associate_hours_prct > 0 && otherFirms.total_associate_hours_prct !== undefined && otherFirms.total_associate_hours_prct !== null) {
      if (otherFirms.total_associate_hours_prct > totalsRaw.total_associate_hours_prct) {
        otherFirms.total_associate_hours_prct_diff = (1 - (totalsRaw.total_associate_hours_prct / otherFirms.total_associate_hours_prct)) * 100;
        otherFirms.total_associate_hours_prct_diff *= -1;
      } else {
        otherFirms.total_associate_hours_prct_diff = ((totalsRaw.total_associate_hours_prct / otherFirms.total_associate_hours_prct) - 1) * 100;
      }
    }

    if (otherFirms.total_partner_hours_prct > 0 && otherFirms.total_partner_hours_prct !== undefined && otherFirms.total_partner_hours_prct !== null) {
      if (otherFirms.total_partner_hours_prct > totalsRaw.total_partner_hours_prct) {
        otherFirms.total_partner_hours_prct_diff = (1 - (totalsRaw.total_partner_hours_prct / otherFirms.total_partner_hours_prct)) * 100;
        otherFirms.total_partner_hours_prct_diff *= -1;
      } else {
        otherFirms.total_partner_hours_prct_diff = ((totalsRaw.total_partner_hours_prct / otherFirms.total_partner_hours_prct) - 1) * 100;
      }
    }

    if (otherFirms.avg_matter_duration.avg_duration > 0 && otherFirms.avg_matter_duration.avg_duration !== undefined && otherFirms.avg_matter_duration.avg_duration !== null) {
      if (otherFirms.avg_matter_duration.avg_duration > totalsRaw.avg_matter_duration.avg_duration) {
        otherFirms.avg_matter_duration_diff = (1 - (totalsRaw.avg_matter_duration.avg_duration / otherFirms.avg_matter_duration.avg_duration)) * 100;
        otherFirms.avg_matter_duration_diff *= -1;
      } else {
        otherFirms.avg_matter_duration_diff = ((totalsRaw.avg_matter_duration.avg_duration / otherFirms.avg_matter_duration.avg_duration) - 1) * 100;
      }
    }

    if (otherFirms.avg_partner_rate > 0 && otherFirms.avg_partner_rate !== undefined && otherFirms.avg_partner_rate !== null) {
      if (otherFirms.avg_partner_rate > totalsRaw.avg_partner_rate) {
        otherFirms.avg_partner_rate_diff = (1 - (totalsRaw.avg_partner_rate / otherFirms.avg_partner_rate)) * 100;
        otherFirms.avg_partner_rate_diff *= -1;
      } else {
        otherFirms.avg_partner_rate_diff = ((totalsRaw.avg_partner_rate / otherFirms.avg_partner_rate) - 1) * 100;
      }
    }

    if (otherFirms.avg_associate_rate > 0 && otherFirms.avg_associate_rate !== undefined && otherFirms.avg_associate_rate !== null) {
      if (otherFirms.avg_associate_rate > totalsRaw.avg_associate_rate) {
        otherFirms.avg_associate_rate_diff = (1 - (totalsRaw.avg_associate_rate / otherFirms.avg_associate_rate)) * 100;
        otherFirms.avg_associate_rate_diff *= -1;
      } else {
        otherFirms.avg_associate_rate_diff = ((totalsRaw.avg_associate_rate / otherFirms.avg_associate_rate) - 1) * 100;
      }
    }

    if (otherFirms.avg_paralegal_legal_assistant_rate > 0 && otherFirms.avg_paralegal_legal_assistant_rate !== undefined && otherFirms.avg_paralegal_legal_assistant_rate !== null) {
      if (otherFirms.avg_paralegal_legal_assistant_rate > totalsRaw.avg_paralegal_legal_assistant_rate) {
        otherFirms.avg_paralegal_legal_assistant_rate_diff = (1 - (totalsRaw.avg_paralegal_legal_assistant_rate / otherFirms.avg_paralegal_legal_assistant_rate)) * 100;
        otherFirms.avg_paralegal_legal_assistant_rate_diff *= -1;
      } else {
        otherFirms.avg_paralegal_legal_assistant_rate_diff = ((totalsRaw.avg_paralegal_legal_assistant_rate / otherFirms.avg_paralegal_legal_assistant_rate) - 1) * 100;
      }
    }

    if (otherFirms.avg_blended_rate > 0 && otherFirms.avg_blended_rate !== undefined && otherFirms.avg_blended_rate !== null) {
      if (otherFirms.avg_blended_rate > totalsRaw.avg_blended_rate) {
        otherFirms.avg_blended_rate_diff = (1 - (totalsRaw.avg_blended_rate / otherFirms.avg_blended_rate)) * 100;
        otherFirms.avg_blended_rate_diff *= -1;
      } else {
        otherFirms.avg_blended_rate_diff = ((totalsRaw.avg_blended_rate / otherFirms.avg_blended_rate) - 1) * 100;
      }
    }

    if (otherFirms.bodhala_price_index > 0 && otherFirms.bodhala_price_index !== undefined && otherFirms.bodhala_price_index !== null) {
      if (otherFirms.bodhala_price_index > totalsRaw.bodhala_price_index) {
        otherFirms.bodhala_price_index_diff = (1 - (totalsRaw.bodhala_price_index / otherFirms.bodhala_price_index)) * 100;
        otherFirms.bodhala_price_index_diff *= -1;
      } else {
        otherFirms.bodhala_price_index_diff = ((totalsRaw.bodhala_price_index / otherFirms.bodhala_price_index) - 1) * 100;
      }
    }

  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
