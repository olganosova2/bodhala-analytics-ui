import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { FiltersService } from '../../../shared/services/filters.service';
import {HttpService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import { columns, ITopFirmES, ITopMatterES, ITopTimekeeper } from '../executive-summary.model';
import * as config from '../../../shared/services/config';

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
  errorMessage: any;
  pendingRequest: Subscription;
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
    public commonServ: CommonService
    ) {}

  ngOnInit() {
    this.getExecutiveSummaryData();
  }

  getExecutiveSummaryData(): void {
    this.isLoaded = false;
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    let d = new Date(new Date().getFullYear(), 0 , 1);
    let janOne = new Date(d).toISOString().slice(0, 10);
    janOne = janOne.replace('2020', '2019');
    let today = new Date().toISOString().slice(0, 10);
    params.startdate = janOne;
    params.enddate = today;
    console.log("params: ", params);
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
          console.log("now: ", this.topFirms);
          console.log("prior: ", this.topFirmsPriorYear)
        }
        this.processFirmsData();
        this.processYOYFirmsData();
        this.processMattersData();
        this.processTKData();
        this.isLoaded = true;
      
      },
      err => {
        this.errorMessage = err;
        this.isLoaded = true;
      }
    );
  }

  processFirmsData(): void {
    console.log("firms prior: ", this.topFirmsPriorYear);
    for (let firm of this.topFirms) {
      if (firm.partner_hours > 0 || firm.associate_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined || firm.associate_hours !== null || firm.associate_hours !== undefined)) {
        firm.blended_rate = (firm.partner_billed + firm.associate_billed) / (firm.partner_hours + firm.associate_hours);
        firm.blended_rate_formatted = this.formatter.format(firm.blended_rate);
      } else {
        firm.blended_rate_formatted = '--';
      }
      if (firm.partner_billed > 0 && (firm.partner_billed !== null || firm.partner_billed !== undefined)) {
        firm.partner_percent = firm.partner_billed / firm.total_billed;
      } else {
        firm.partner_percent = 0;
      }
      if (firm.closed_matters > 0 && (firm.closed_matters !== null || firm.closed_matters !== undefined || firm.matter_cost_closed !== null || firm.matter_cost_closed !== undefined)) {
        firm.avg_matter_cost = firm.matter_cost_closed / firm.closed_matters;
        firm.avg_matter_cost_formatted = this.formatter.format(firm.avg_matter_cost);
      } else {
        firm.avg_matter_cost_formatted = '--';
      }
      if (firm.partner_hours > 0 && firm.associate_hours > 0) {
        const leverage = firm.associate_hours / firm.partner_hours;
        const associateRate = firm.associate_billed / firm.associate_hours;
        firm.bpi = firm.avg_partner_rate + (leverage * associateRate);
        firm.bpi_formatted = this.formatter.format(firm.bpi);
      } else {
        firm.bpi_formatted = '--';
      }

      if (firm.total_firm_matters > 0) {
        firm.avg_partners = firm.partners / firm.total_firm_matters;
        firm.avg_partners_formatted = this.formatter1.format(firm.avg_partners);
      } else {
        firm.avg_partners_formatted = '--';
      }

    }
    for (let firm of this.topFirmsByPA) {
      if (firm.partner_hours > 0 || firm.associate_hours > 0 && (firm.partner_hours !== null || firm.partner_hours !== undefined || firm.associate_hours !== null || firm.associate_hours !== undefined)) {
        firm.blended_rate = (firm.partner_billed + firm.associate_billed) / (firm.partner_hours + firm.associate_hours);
        firm.blended_rate_formatted = this.formatter.format(firm.blended_rate);
      } else {
        firm.blended_rate_formatted = '--';
      }
      if (firm.partner_billed > 0 && (firm.partner_billed !== null || firm.partner_billed !== undefined)) {
        firm.partner_percent = firm.partner_billed / firm.partner_hours;
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
        firm.avg_matter_cost = firm.matter_cost_closed / firm.closed_matters;
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
    for (let firm of this.topFirmsPriorYear) {
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
      if (firm.closed_matters > 0 && (firm.closed_matters !== null || firm.closed_matters !== undefined || firm.matter_cost_closed !== null || firm.matter_cost_closed !== undefined)) {
        firm.avg_matter_cost = firm.matter_cost_closed / firm.closed_matters;
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

      if (firm.total_firm_matters > 0) {
        firm.avg_partners = firm.partners / firm.total_firm_matters;
        firm.avg_partners_formatted = this.formatter1.format(firm.avg_partners);
      } else {
        firm.avg_partners_formatted = '--';
      }


    }
  }
  processYOYFirmsData(): void {

    for (let priorFirm of this.topFirmsPriorYear) {
      console.log("PRIOR: ", priorFirm);
      for(let firm of this.topFirms) {
        
        if (priorFirm.firm_name === firm.firm_name) {
          console.log("MATCH: ", firm);
          if (firm.avg_matter_cost > 0 && firm.avg_matter_cost !== null && firm.avg_matter_cost !== undefined) {
            priorFirm.avg_matter_cost_trend = priorFirm.avg_matter_cost / firm.avg_matter_cost;
          } else {
            priorFirm.avg_matter_cost_trend = 0;
          }
          // if (firm.block)
        }
      }
    }
  }
  processMattersData(): void {
    for(let matter of this.topMatters) {
      if(matter.total_partner_hours > 0 && (matter.total_partner_hours !== null || matter.total_partner_hours !== undefined)) {
        matter.avg_partner_rate = matter.total_partner_billed / matter.total_partner_hours;
      }
    }
    for(let matter of this.topMattersByPA) {
      if(matter.total_partner_hours > 0 && (matter.total_partner_hours !== null || matter.total_partner_hours !== undefined)) {
        matter.avg_partner_rate = matter.total_partner_billed / matter.total_partner_hours;
      }
    }

  }
  processTKData(): void {
    for (let tk of this.topTKs) {
      tk.avg_matter_cost_formatted = '';
      if (tk.atty_hours > 0 && (tk.atty_hours !== null || tk.atty_hours !== undefined)) {
        tk.blended_rate = tk.atty_billed / tk.atty_hours;
      }
      if (tk.closed_matters > 0 && (tk.closed_matters !== null || tk.closed_matters !== undefined)) {
        tk.avg_matter_cost = tk.matter_cost_closed / tk.closed_matters;
        tk.avg_matter_cost_formatted = this.formatter.format(tk.avg_matter_cost);
      } else {
        tk.avg_matter_cost_formatted = '--';
      }
      tk.partner_billed_per = tk.total_partner_billed / tk.total_billed;
    }
    for (let tk of this.topTKsByPA) {
      if (tk.atty_hours > 0 && (tk.atty_hours !== null || tk.atty_hours !== undefined)) {
        tk.blended_rate = tk.atty_billed / tk.atty_hours;
      } else {
        tk.blended_rate = 0;
      }
      if (tk.closed_matters > 0 && (tk.closed_matters !== null || tk.closed_matters !== undefined)) {
        tk.avg_matter_cost = tk.matter_cost_closed / tk.closed_matters;
        tk.avg_matter_cost_formatted = this.formatter.format(tk.avg_matter_cost);
      } else {
        tk.avg_matter_cost_formatted = '--';
      }
      tk.partner_billed_per = tk.total_partner_billed / tk.total_billed;
    }
  }

}
