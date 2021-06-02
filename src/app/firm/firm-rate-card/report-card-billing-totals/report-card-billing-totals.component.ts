import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {IBillingTotalItemReportCard, IFirm} from '../../firm.model';
import {IPracticeArea} from '../../../practice-area/practice-area.model';
import {Subscription} from 'rxjs';
import {HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {FiltersService} from '../../../shared/services/filters.service';
import {IClientPA} from '../../../matters/cirp-matter-summary/cirp.service';

@Component({
  selector: 'bd-report-card-billing-totals',
  templateUrl: './report-card-billing-totals.component.html',
  styleUrls: ['./report-card-billing-totals.component.scss']
})
export class ReportCardBillingTotalsComponent implements OnChanges {
  errorMessage: any;
  totalsRaw: any;
  otherFirms: any;
  totalsRC: Array<IBillingTotalItemReportCard> = [];
  pendingRequest: Subscription;
  isLoaded: boolean = false;
  firstLoad: boolean = true;
  itemTopRowCount: number = 6;
  initialFilterSet: any;
  metricExcludes: Array<string> = [];
  @Input() isReportCard: boolean = false;
  @Input() isComparison: boolean = false;
  @Input() firm: IFirm;
  @Input() reportCardStartDate: string;
  @Input() reportCardEndDate: string;
  @Input() comparisonStartDate: string;
  @Input() comparisonEndDate: string;
  @Input() filtersChanged: boolean = false;
  @Input() practiceArea: IPracticeArea;
  @Input() smartPAs: boolean = false;

  constructor(public httpService: HttpService,
              public filtersService: FiltersService,
              public userService: UserService,
              public commonServ: CommonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoaded = false;
    this.initConfig();
    this.loadTotals();
  }
  initConfig(): void {
    if (this.userService.config && this.userService.config['report.card.excludes']) {
      const configs = this.userService.config['report.card.excludes'].configs || [];
      if (configs.length > 0) {
        const json =  configs[0].json_config || [];
        if (Array.isArray(json)){
          this.metricExcludes = json;
        }
      }
    }
  }

  loadTotals(): void {
    this.totalsRC = Object.assign([], []);
    const params = this.filtersService.getCurrentUserCombinedFilters();
    if (this.firm) {
      const arr = [];
      arr.push(this.firm.id.toString());
      params.firms = JSON.stringify(arr);
    }
    let requestString = '';
    if (this.isReportCard === true) {
      requestString = 'reportCardBillingTotals';
      const paramsLS = this.filtersService.parseLSQueryString();
      if (paramsLS.firms !== null && paramsLS.firms !== undefined) {
        let otherFirmIDs = paramsLS.firms;
        otherFirmIDs = JSON.parse(otherFirmIDs);
        params.otherFirms = otherFirmIDs;
      }
      if (this.practiceArea) {
        const arr = [];
        if (this.practiceArea.client_matter_type === null || this.practiceArea.client_matter_type === undefined) {
          arr.push(this.practiceArea);
        } else {
          arr.push(this.practiceArea.client_matter_type);
        }
        if (this.smartPAs === true) {
          params.bdPracticeAreas = JSON.stringify(arr);
        } else {
          params.practiceAreas = JSON.stringify(arr);
        }
      }
    } else if (this.isComparison === true && this.firstLoad === true) {
      requestString = 'reportCardComparisonBillingTotals';
      params.secondCall = false;
      this.initialFilterSet = params;
    } else if (this.isComparison === true && this.firstLoad === false) {
      requestString = 'reportCardComparisonBillingTotals';
      params.secondCall = true;
      params.reportCardStartDate = this.reportCardStartDate;
      params.reportCardEndDate = this.reportCardEndDate;
    } else {
      requestString = 'getBillingTotals';
    }
    this.isLoaded = false;
    if (this.initialFilterSet !== undefined) {
      if (params.hasOwnProperty('minMatterCost') && !this.initialFilterSet.hasOwnProperty('minMatterCost')) {
        delete params.minMatterCost;
      }
      if (params.hasOwnProperty('maxMatterCost') && !this.initialFilterSet.hasOwnProperty('maxMatterCost')) {
        delete params.maxMatterCost;
      }
      if (!params.hasOwnProperty('minMatterCost') && this.initialFilterSet.hasOwnProperty('minMatterCost')) {
        params.minMatterCost = this.initialFilterSet.minMatterCost;
      }
      if (!params.hasOwnProperty('maxMatterCost') && this.initialFilterSet.hasOwnProperty('maxMatterCost')) {
        params.maxMatterCost = this.initialFilterSet.maxMatterCost;
      }
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
        this.filtersChanged = false;
      },
      err => {
        this.errorMessage = err;
        this.isLoaded = true;
      }
    );
  }

  formatItems(): void {
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
    if (this.metricExcludes.indexOf('MATTER_COST') < 0) {
      this.totalsRC.push({
        icon: 'icon-folder-alt',
        total: this.filtersService.includeExpenses ? this.totalsRaw.avg_matter_cost_including_expenses.avg_cost : this.totalsRaw.avg_matter_cost.avg_cost || 0,
        name: 'Avg. Matter Cost',
        format: 'currency',
        svg: 'avg_matter_cost',
        avg: this.filtersService.includeExpenses ? this.otherFirms.avg_matter_cost_including_expenses.avg_cost : this.otherFirms.avg_matter_cost.avg_cost || 0,
        diff: this.otherFirms.avg_matter_cost_diff
      });
    }
    if (this.metricExcludes.indexOf('PARTNER_HOURS') < 0) {
      this.totalsRC.push({
        icon: 'icon-energy',
        total: this.totalsRaw.total_partner_hours_prct,
        name: 'Partner Hours Worked',
        format: 'percent',
        svg: 'partners',
        avg: this.otherFirms.total_partner_hours_prct,
        diff: this.otherFirms.total_partner_hours_prct_diff
      });
    }
    if (this.metricExcludes.indexOf('ASSOCIATE_HOURS') < 0) {
      this.totalsRC.push({
        icon: 'icon-users',
        total: this.totalsRaw.total_associate_hours_prct,
        name: 'Associate Hours Worked',
        format: 'percent',
        svg: 'avg_ass_matter',
        avg: this.otherFirms.total_associate_hours_prct,
        diff: this.otherFirms.total_associate_hours_prct_diff
      });
    }
    if (this.metricExcludes.indexOf('PARALEGAL_HOURS') < 0) {
      this.totalsRC.push({
        icon: 'icon-briefcase',
        total: this.totalsRaw.total_paralegal_hours_prct,
        name: 'Paralegal Hours Worked',
        format: 'percent',
        svg: 'avg_par_rate',
        avg: this.otherFirms.total_paralegal_hours_prct,
        diff: this.otherFirms.total_paralegal_hours_prct_diff
      });
    }
    if (this.metricExcludes.indexOf('AVG_MATTER_DURATION') < 0) {
      this.totalsRC.push({
        icon: 'icon-calendar',
        total: this.totalsRaw.avg_matter_duration.avg_duration || 0,
        name: 'Matter Duration (days)',
        svg: 'matter_dur',
        avg: this.otherFirms.avg_matter_duration.avg_duration || 0,
        diff: this.otherFirms.avg_matter_duration_diff
      });
    }
    if (this.metricExcludes.indexOf('BLENDED_RATE') < 0) {
      this.totalsRC.push({
        icon: 'icon-picture',
        total: this.totalsRaw.avg_blended_rate,
        name: 'Blended Rate',
        format: 'currency',
        svg: 'bills',
        avg: this.otherFirms.avg_blended_rate,
        diff: this.otherFirms.avg_blended_rate_diff
      });
    }
    if (this.metricExcludes.indexOf('BODHALA_PRICE_INDEX') < 0) {
      this.totalsRC.push({
        icon: 'icon-bar-chart',
        total: this.totalsRaw.bodhala_price_index,
        name: 'BPI',
        format: 'currency',
        svg: 'bpi',
        avg: this.otherFirms.bodhala_price_index,
        diff: this.otherFirms.bodhala_price_index_diff
      });
    }
    if (this.metricExcludes.indexOf('BLOCK_BILLING') < 0) {
      this.totalsRC.push({
        icon: 'icon-clock',
        total: this.totalsRaw.percent_block_billed,
        name: 'Total Block Billed',
        format: 'percent',
        svg: 'total_bb',
        avg: this.otherFirms.percent_block_billed,
        diff: this.otherFirms.percent_block_billed_diff
      });
    }
    if (this.metricExcludes.indexOf('PARTNER_RATE') < 0) {
      this.totalsRC.push({
        icon: 'icon-energy',
        total: this.totalsRaw.avg_partner_rate,
        name: 'Avg. Partner Rate',
        format: 'number2',
        svg: 'partners',
        avg: this.otherFirms.avg_partner_rate,
        diff: this.otherFirms.avg_partner_rate_diff
      });
    }
    if (this.metricExcludes.indexOf('ASSOCIATE_RATE') < 0) {
      this.totalsRC.push({
        icon: 'icon-users',
        total: this.totalsRaw.avg_associate_rate,
        name: 'Avg. Assoc. Rate',
        format: 'number2',
        svg: 'avg_ass_matter',
        avg: this.otherFirms.avg_associate_rate,
        diff: this.otherFirms.avg_associate_rate_diff
      });
    }
    if (this.metricExcludes.indexOf('PARALEGAL_RATE') < 0) {
      this.totalsRC.push({
        icon: 'icon-briefcase',
        total: this.totalsRaw.avg_paralegal_legal_assistant_rate,
        name: 'Avg. Paralegal Rate',
        format: 'number2',
        svg: 'avg_par_rate',
        avg: this.otherFirms.avg_paralegal_legal_assistant_rate,
        diff: this.otherFirms.avg_paralegal_legal_assistant_rate_diff
      });
    }
    this.itemTopRowCount = Math.ceil(this.totalsRC.length / 2);
    this.totalsRC[this.itemTopRowCount - 1].lastCell = true;
    this.totalsRC[this.totalsRC.length - 1].lastCell = true;
  }

  calculateHoursPercentage(totalsRaw: any): void {
    const totalHrs = totalsRaw.total_hours || 1;
    totalsRaw.total_partner_hours_prct = (totalsRaw.total_partner_hours * 100 / totalHrs);
    totalsRaw.total_associate_hours_prct = (totalsRaw.total_associate_hours * 100 / totalHrs);
    totalsRaw.total_paralegal_hours_prct = (totalsRaw.total_paralegal_hours * 100 / totalHrs);
  }

  calculateDiffs(totalsRaw: any, otherFirms: any): void {
    otherFirms.avg_matter_cost_diff = 0;
    otherFirms.total_associate_hours_prct_diff = 0;
    otherFirms.total_paralegal_hours_prct_diff = 0;
    otherFirms.total_partner_hours_prct_diff = 0;
    otherFirms.avg_matter_duration_diff = 0;
    otherFirms.avg_partner_rate_diff = 0;
    otherFirms.avg_associate_rate_diff = 0;
    otherFirms.avg_paralegal_legal_assistant_rate_diff = 0;
    otherFirms.avg_blended_rate_diff = 0;
    otherFirms.bodhala_price_index_diff = 0;
    otherFirms.percent_block_billed_diff = 0;

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
    if (otherFirms.total_paralegal_hours_prct > 0 && otherFirms.total_paralegal_hours_prct !== undefined && otherFirms.total_paralegal_hours_prct !== null) {
      if (otherFirms.total_paralegal_hours_prct > totalsRaw.total_paralegal_hours_prct) {
        otherFirms.total_paralegal_hours_prct_diff = (1 - (totalsRaw.total_paralegal_hours_prct / otherFirms.total_paralegal_hours_prct)) * 100;
        otherFirms.total_paralegal_hours_prct_diff *= -1;
      } else {
        otherFirms.total_paralegal_hours_prct_diff = ((totalsRaw.total_paralegal_hours_prct / otherFirms.total_paralegal_hours_prct) - 1) * 100;
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

    if (otherFirms.percent_block_billed > 0 && otherFirms.percent_block_billed !== undefined && otherFirms.percent_block_billed !== null) {
      if (otherFirms.percent_block_billed > totalsRaw.percent_block_billed) {
        otherFirms.percent_block_billed_diff = (1 - (totalsRaw.percent_block_billed / otherFirms.percent_block_billed)) * 100;
        otherFirms.percent_block_billed_diff *= -1;
      } else {
        otherFirms.percent_block_billed_diff = ((totalsRaw.percent_block_billed / otherFirms.percent_block_billed) - 1) * 100;
      }
    }

  }

}
