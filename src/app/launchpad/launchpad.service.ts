import { Injectable } from '@angular/core';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import { TopMattersFirmsService } from './services/top-matters-firms.service';
import {SpendByPracticeAreaService} from './services/spend-by-practice-area.service';
import {TopLeadPartnersService} from './services/top-lead-partners.service';
import {InvoiceIqService} from './services/invoice-iq.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchPadService {

  constructor(
    private http: HttpService,
    private filters: FiltersService,
    private topMattersFirmsService: TopMattersFirmsService,
    private practiceService: SpendByPracticeAreaService,
    private leadPartnerService: TopLeadPartnersService,
    private invoiceIqService: InvoiceIqService

  ) { }

  fetchData() {
    const requests: any = {};
    requests.topMatters = this.topMattersFirmsService.fetchMatters();
    requests.topFirms = this.topMattersFirmsService.fetchFirms();
    requests.spendByPractice = this.practiceService.fetch();
    requests.topLeadPartners = this.leadPartnerService.fetchLeadPartners();
    requests.topBlockBillers = this.fetchTopBlockBillers();
    requests.invoiceIQReports = this.invoiceIqService.fetchIQReports();
    // TODO - add all requests here
    return requests;
  }

  async fetchTopBlockBillers() {
    const response = await this.fetch('analytics/getBlockBillerSummary');
    const summary = response.result;
    return summary.block_billers.map(biller =>
      ({...biller,
        percent: biller.total_block_billed / summary.total_billed_by_lawyers * 100,
        y: biller.total_block_billed,
        value: biller.total_block_billed,
        category: biller.name}
      ));
  }

  fetch(api) {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.fetch(api, params);
  }

}
