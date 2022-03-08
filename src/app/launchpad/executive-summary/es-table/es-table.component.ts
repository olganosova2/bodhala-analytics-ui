import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { FiltersService } from '../../../shared/services/filters.service';
import {HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import { ITopFirmES, ITopMatterES, ITopTimekeeper } from '../executive-summary.model';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'bd-es-table',
  templateUrl: './es-table.component.html',
  styleUrls: ['./es-table.component.scss']
})
export class EsTableComponent implements OnInit {
  topFirms: Array<ITopFirmES>;
  topFirmsByPA: Array<ITopFirmES>;
  topFirmsPriorYear: Array<ITopFirmES>;
  topMatters: Array<ITopMatterES>;
  topMattersByPA: Array<ITopMatterES>;
  topTKs: Array<ITopTimekeeper>;
  topTKsByPA: Array<ITopTimekeeper>;
  topPracticeArea: string;
  isLoaded: boolean = false;
  pendingRequest: Subscription;
  smartPAs: boolean = false;
  @Input() maxDate: string;
  @Input() fullYear: boolean;
  @Input() lastFullYear: string;
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });
  formatter1 = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1
  });

  constructor(
    private filtersService: FiltersService,
    public httpService: HttpService,
    public commonServ: CommonService,
    public userService: UserService,
    ) { }

  ngOnInit() {
    if (this.userService.config !== undefined) {
      if ('analytics.practice.bodhala.areas' in this.userService.config) {
        const userConfigs = Object.values(this.userService.config);
        for (const configuration of userConfigs) {
          if (configuration.configs[0].description === 'config for analytics practice areas') {
            if (configuration.configs[0].value === 'Smart Practice Areas' || configuration.configs[0].value === 'Both') {
              this.smartPAs = true;
            } else {
              this.smartPAs = false;
            }
            break;
          }
        }
      } else {
        this.smartPAs = false;
      }
    }
    this.getExecutiveSummaryData(this.fullYear);
  }

  getExecutiveSummaryData(fullYear: boolean): void {
    this.isLoaded = false;
    const params = this.filtersService.getCurrentUserCombinedFilters(false);
    const lastYear = moment(this.maxDate).year();
    const d = new Date(lastYear, 0 , 1);
    const janOne = new Date(d).toISOString().slice(0, 10);
    // JD: was testing w/ 2019 vs 2018 data as I did not have 2020 data locally
    // janOne = janOne.replace('2020', '2019');
    const today = new Date().toISOString().slice(0, 10);
    params.startdate = janOne;
    params.enddate = this.maxDate;
    params.fullYear = fullYear;
    params.smart = this.smartPAs;
    this.pendingRequest = this.httpService.makeGetRequest('getExecutiveSummaryData', params).subscribe(
      (data: any) => {
        if (data.result) {
          this.topFirms = data.result.firms;
          this.topFirmsByPA = data.result.firmsByPA;
          this.topFirmsPriorYear = data.result.firmsPriorYear;
          this.topMatters = data.result.matters;
          this.topMattersByPA = data.result.mattersByPA;
          this.topTKs = data.result.timekeepers;
          this.topTKsByPA = data.result.timekeepersByPA;
          this.topPracticeArea = data.result.topPracticeArea;
        }
        if (this.topFirms !== undefined && this.topFirmsByPA !== undefined && this.topFirmsPriorYear !== undefined) {
          this.processFirmsData();
          this.processYOYFirmsData();
        }
        if (this.topMatters !== undefined && this.topMattersByPA !== undefined) {
          this.processMattersData();
        }
        if (this.topTKs !== undefined && this.topTKsByPA !== undefined) {
          this.processTKData();
        }
        this.isLoaded = true;
      }
    );
  }

  processFirmsData(): void {
    for (const firm of this.topFirms) {
      if (firm.partner_hours > 0 || firm.associate_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined || firm.associate_hours !== null || firm.associate_hours !== undefined)) {
        firm.blended_rate = (firm.partner_billed + firm.associate_billed) / (firm.partner_hours + firm.associate_hours);
        firm.blended_rate_formatted = this.formatter.format(firm.blended_rate);
      } else {
        firm.blended_rate_formatted = '--';
      }
      if (firm.total_hours > 0 && firm.total_hours !== null) {
        firm.partner_percent_hours_worked = firm.partner_hours / firm.total_hours;
      }
      if (firm.partner_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined)) {
        firm.avg_partner_rate = firm.partner_billed / firm.partner_hours;
        firm.avg_partner_rate_formatted = this.formatter.format(firm.avg_partner_rate);
      } else {
        firm.avg_partner_rate_formatted = '--';
      }
      if (firm.associate_hours > 0 && (firm.associate_hours !== null || firm.associate_hours !== undefined)) {
        firm.avg_associate_rate = firm.associate_billed / firm.associate_hours;
        firm.avg_associate_rate_formatted = this.formatter.format(firm.avg_associate_rate);
      } else {
        firm.avg_associate_rate_formatted = '--';
      }
      if (firm.closed_matters > 0 && (firm.closed_matters !== null || firm.closed_matters !== undefined || firm.matter_cost_closed !== null || firm.matter_cost_closed !== undefined)) {
        firm.avg_matter_cost_formatted = this.formatter.format(firm.avg_matter_cost);
      } else {
        firm.avg_matter_cost_formatted = '--';
      }
      if (firm.total_billed > 0 && (firm.firm_attorney_billed !== null || firm.firm_attorney_billed !== undefined)) {
        firm.block_billed_per = firm.firm_block_billed / firm.firm_attorney_billed;
      } else {
        firm.block_billed_per = 0;
      }
      if (firm.partner_billed > 0 && (firm.partner_billed !== null || firm.partner_billed !== undefined)) {
        firm.partner_percent = firm.partner_billed / firm.total_billed;
      } else {
        firm.partner_percent = 0;
      }
      if (firm.partner_hours > 0 && firm.associate_hours > 0) {
        const leverage = firm.associate_hours / firm.partner_hours;
        const associateRate = firm.associate_billed / firm.associate_hours;
        firm.bpi = firm.avg_partner_rate + (leverage * associateRate);
        firm.bpi_formatted = this.formatter.format(firm.bpi);
      } else {
        firm.bpi_formatted = '--';
      }

      if (firm.partners > 0 && firm.partners !== null && firm.partners !== undefined) {
        firm.partners_formatted = this.formatter1.format(firm.partners);
      } else {
        firm.partners_formatted = '--';
      }
    }
    for (const firm of this.topFirmsByPA) {
      if (firm.partner_hours > 0 || firm.associate_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined || firm.associate_hours !== null || firm.associate_hours !== undefined)) {
        firm.blended_rate = (firm.partner_billed + firm.associate_billed) / (firm.partner_hours + firm.associate_hours);
        firm.blended_rate_formatted = this.formatter.format(firm.blended_rate);
      } else {
        firm.blended_rate_formatted = '--';
      }
      if (firm.total_hours > 0 && firm.total_hours !== null) {
        firm.partner_percent_hours_worked = firm.partner_hours / firm.total_hours;
      }
      if (firm.partner_billed > 0 && (firm.partner_billed !== null || firm.partner_billed !== undefined)) {
        firm.partner_percent = firm.partner_billed / firm.total_billed;
      } else {
        firm.partner_percent = 0;
      }
      if (firm.partner_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined)) {
        firm.avg_partner_rate = firm.partner_billed / firm.partner_hours;
        firm.avg_partner_rate_formatted = this.formatter.format(firm.avg_partner_rate);
      } else {
        firm.avg_partner_rate_formatted = '--';
      }
      if (firm.closed_matters > 0 && (firm.closed_matters !== null || firm.closed_matters !== undefined || firm.matter_cost_closed !== null || firm.matter_cost_closed !== undefined)) {
        // firm.avg_matter_cost = (firm.matter_cost_closed + firm.total_afa_closed) / firm.closed_matters;
        firm.avg_matter_cost_formatted = this.formatter.format(firm.avg_matter_cost);
      } else {
        firm.avg_matter_cost_formatted = '--';
      }
      if (firm.total_billed > 0 && (firm.total_billed !== null || firm.total_billed !== undefined)) {
        firm.block_billed_per = firm.firm_block_billed / firm.total_billed;
      } else {
        firm.block_billed_per = 0;
      }
    }
    for (const firm of this.topFirmsPriorYear) {
      if (firm.partner_hours > 0 || firm.associate_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined || firm.associate_hours !== null || firm.associate_hours !== undefined)) {
        firm.blended_rate = (firm.partner_billed + firm.associate_billed) / (firm.partner_hours + firm.associate_hours);
        firm.blended_rate_formatted = this.formatter.format(firm.blended_rate);
      } else {
        firm.blended_rate_formatted = '--';
      }
      if (firm.partner_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined)) {
        firm.avg_partner_rate = firm.partner_billed / firm.partner_hours;
        firm.avg_partner_rate_formatted = this.formatter.format(firm.avg_partner_rate);
      } else {
        firm.avg_partner_rate_formatted = '--';
      }
      if (firm.associate_hours > 0 && (firm.associate_hours !== null || firm.associate_hours !== undefined)) {
        firm.avg_associate_rate = firm.associate_billed / firm.associate_hours;
        firm.avg_associate_rate_formatted = this.formatter.format(firm.avg_associate_rate);
      } else {
        firm.avg_associate_rate_formatted = '--';
      }
      if (firm.closed_matters > 0 && (firm.closed_matters !== null || firm.closed_matters !== undefined || firm.matter_cost_closed !== null || firm.matter_cost_closed !== undefined)) {
        // firm.avg_matter_cost = (firm.matter_cost_closed + firm.total_afa_closed) / firm.closed_matters;
        firm.avg_matter_cost_formatted = this.formatter.format(firm.avg_matter_cost);
      } else {
        firm.avg_matter_cost_formatted = '--';
      }
      if (firm.total_billed > 0 && (firm.total_billed !== null || firm.total_billed !== undefined)) {
        firm.block_billed_per = firm.firm_block_billed / firm.total_billed;
      } else {
        firm.block_billed_per = 0;
      }

      if (firm.partner_hours > 0 && firm.associate_hours > 0) {
        const leverage = firm.associate_hours / firm.partner_hours;
        const associateRate = firm.associate_billed / firm.associate_hours;
        firm.bpi = firm.avg_partner_rate + (leverage * associateRate);
        firm.bpi_formatted = this.formatter.format(firm.bpi);
      } else {
        firm.bpi_formatted = '--';
      }
    }
  }
  processYOYFirmsData(): void {

    for (const firm of this.topFirms) {
      for (const priorYearFirm of this.topFirmsPriorYear) {

        if (priorYearFirm.firm_name === firm.firm_name) {
          if (firm.avg_matter_cost > 0 && firm.avg_matter_cost !== null && firm.avg_matter_cost !== undefined) {
            if (firm.avg_matter_cost > priorYearFirm.avg_matter_cost) {
              firm.avg_matter_cost_trend = ((firm.avg_matter_cost / priorYearFirm.avg_matter_cost) - 1) * 100;
            } else {
              firm.avg_matter_cost_trend = (1 - (firm.avg_matter_cost / priorYearFirm.avg_matter_cost)) * 100;
              firm.avg_matter_cost_trend *= -1;
            }
          } else {
            firm.avg_matter_cost_trend = 0;
          }
          if (firm.block_billed_per > 0 && firm.block_billed_per !== null && firm.block_billed_per !== undefined && priorYearFirm.block_billed_per) {
            firm.block_billed_per *= 100;
            priorYearFirm.block_billed_per *= 100;
            if (firm.block_billed_per > priorYearFirm.block_billed_per) {
              firm.block_billed_per_trend = firm.block_billed_per - priorYearFirm.block_billed_per;
            } else {
              firm.block_billed_per_trend = firm.block_billed_per - priorYearFirm.block_billed_per;
              // firm.block_billed_per_trend *= -1;
            }
          } else {
            firm.block_billed_per_trend = 0;
          }

          if (firm.blended_rate > 0 && firm.blended_rate !== null && firm.blended_rate !== undefined) {
            if (firm.blended_rate > priorYearFirm.blended_rate) {
              firm.blended_rate_trend = ((firm.blended_rate / priorYearFirm.blended_rate) - 1) * 100;
            } else {
              firm.blended_rate_trend = (1 - (firm.blended_rate / priorYearFirm.blended_rate)) * 100;
              firm.blended_rate_trend *= -1;
            }
          } else {
            firm.blended_rate_trend = 0;
          }

          if (firm.bpi > 0 && firm.bpi !== null && firm.bpi !== undefined) {
            if (firm.bpi > priorYearFirm.bpi) {
              firm.bpi_trend = ((firm.bpi / priorYearFirm.bpi) - 1) * 100;
            } else {
              firm.bpi_trend = (1 - (firm.bpi / priorYearFirm.bpi)) * 100;
              firm.bpi_trend *= -1;
            }
          } else {
            firm.bpi_trend = 0;
          }

          if (firm.avg_partner_rate > 0 && firm.avg_partner_rate !== null && firm.avg_partner_rate !== undefined) {
            if (firm.avg_partner_rate > priorYearFirm.avg_partner_rate) {
              firm.avg_partner_rate_trend = ((firm.avg_partner_rate / priorYearFirm.avg_partner_rate) - 1) * 100;
            } else {
              firm.avg_partner_rate_trend = (1 - (firm.avg_partner_rate / priorYearFirm.avg_partner_rate)) * 100;
              firm.avg_partner_rate_trend *= -1;
            }
          } else {
            firm.avg_partner_rate_trend = 0;
          }

          if (firm.avg_associate_rate > 0 && firm.avg_associate_rate !== null && firm.avg_associate_rate !== undefined) {
            if (firm.avg_associate_rate > priorYearFirm.avg_associate_rate && priorYearFirm.avg_associate_rate > 0) {
              firm.avg_associate_rate_trend = ((firm.avg_associate_rate / priorYearFirm.avg_associate_rate) - 1) * 100;
            } else {
              firm.avg_associate_rate_trend = (1 - (firm.avg_associate_rate / priorYearFirm.avg_associate_rate)) * 100;
              firm.avg_associate_rate_trend *= -1;
            }
          } else {
            firm.avg_associate_rate_trend = 0;
          }

          if (firm.partners > 0 && firm.partners !== null && firm.partners !== undefined) {
            if (firm.partners > priorYearFirm.partners) {
              firm.avg_partners_trend = ((firm.partners / priorYearFirm.partners) - 1) * 100;
            } else {
              firm.avg_partners_trend = (1 - (firm.partners / priorYearFirm.partners)) * 100;
              firm.avg_partners_trend *= -1;
            }
          } else {
            firm.avg_partners_trend = 0;
          }

        }
      }
    }
  }
  processMattersData(): void {
    let savedMatters = localStorage.getItem('updated_matters_' + this.userService.currentUser.id.toString());
    if (savedMatters) {
      savedMatters = JSON.parse(savedMatters);
    }
    for (const matter of this.topMatters) {
      if (matter.total_partner_hours > 0 && (matter.total_partner_hours !== null || matter.total_partner_hours !== undefined)) {
        matter.avg_partner_rate = matter.total_partner_billed / matter.total_partner_hours;
      }

      if (matter.total_hours > 0 && matter.total_hours !== null) {
        matter.partner_percent_hours_worked = matter.total_partner_hours / matter.total_hours;
      }
      if (savedMatters !== undefined && savedMatters !== null) {
        const savedName = savedMatters[matter.id];
        if (savedName !== undefined) {
          matter.name = savedName;
        }
      }
    }
    for (const matter of this.topMattersByPA) {
      if (matter.total_partner_hours > 0 && (matter.total_partner_hours !== null || matter.total_partner_hours !== undefined)) {
        matter.avg_partner_rate = matter.total_partner_billed / matter.total_partner_hours;
      }
      if (matter.total_hours > 0 && matter.total_hours !== null) {
        matter.partner_percent_hours_worked = matter.total_partner_hours / matter.total_hours;
      }
      if (savedMatters !== undefined && savedMatters !== null) {
        const savedName = savedMatters[matter.id];
        if (savedName !== undefined) {
          matter.name = savedName;
        }
      }
    }

  }
  processTKData(): void {
    for (const tk of this.topTKs) {
      tk.avg_matter_cost_formatted = '';
      if (tk.atty_hours > 0 && (tk.atty_hours !== null || tk.atty_hours !== undefined)) {
        tk.blended_rate = tk.atty_billed / tk.atty_hours;
      }
      if (tk.closed_matters > 0 && (tk.closed_matters !== null || tk.closed_matters !== undefined)) {
        tk.avg_matter_cost = (tk.matter_cost_closed + tk.total_afa_closed)  / tk.closed_matters;
        tk.avg_matter_cost_formatted = this.formatter.format(tk.avg_matter_cost);
      } else {
        tk.avg_matter_cost_formatted = '--';
      }
    }
    for (const tk of this.topTKsByPA) {
      if (tk.atty_hours > 0 && (tk.atty_hours !== null || tk.atty_hours !== undefined)) {
        tk.blended_rate = tk.atty_billed / tk.atty_hours;
      } else {
        tk.blended_rate = 0;
      }
      if (tk.closed_matters > 0 && (tk.closed_matters !== null || tk.closed_matters !== undefined)) {
        tk.avg_matter_cost = (tk.matter_cost_closed + tk.total_afa_closed)  / tk.closed_matters;
        tk.avg_matter_cost_formatted = this.formatter.format(tk.avg_matter_cost);
      } else {
        tk.avg_matter_cost_formatted = '--';
      }
    }
  }

}
