import { Injectable } from '@angular/core';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import { TopMattersFirmsService } from './services/top-matters-firms.service';
import {SpendByPracticeAreaService} from './services/spend-by-practice-area.service';
import {TopLeadPartnersService} from './services/top-lead-partners.service';
import {InvoiceIqService} from './services/invoice-iq.service';
import {commonCards, invoiceIQCard, practiceAreaCard, topBillersCard} from './launchpad.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchPadService {

  constructor(
    private http: HttpService,
    private userService: UserService,
    private filters: FiltersService,
    private topMattersFirmsService: TopMattersFirmsService,
    private practiceService: SpendByPracticeAreaService,
    private leadPartnerService: TopLeadPartnersService,
    private invoiceIqService: InvoiceIqService,
    private util: UtilService
  ) { }

  fetchData() {
    const requests: any = {};
    requests.topMatters = this.topMattersFirmsService.fetchMatters();
    requests.topFirms = this.topMattersFirmsService.fetchFirms();
    if (this.userService.hasEntitlement('analytics.practice.areas')) {
      requests.spendByPractice = this.practiceService.fetch();
    }
    requests.topLeadPartners = this.leadPartnerService.fetchLeadPartners();
    requests.mattersByHighestAverageRate = this.topMattersFirmsService.fetchMattersByHighestAverageRate();
    requests.topBlockBillers = this.fetchTopBlockBillers();
    requests.invoiceIQReports = this.invoiceIqService.fetchIQReports();
    requests.activeSpend = this.topMattersFirmsService.fetchActiveSpend();
    if (this.userService.hasEntitlement('analytics.block.billing')) {
      requests.topBlockBillers = this.fetchTopBlockBillers();
    }
    if (this.userService.hasEntitlement('analytics.reports')) {
      requests.invoiceIQReports = this.invoiceIqService.fetchIQReports();
    }
    // TODO - add all requests here
    return requests;
  }
  configureCards(): Array<any> {
    const result = Object.assign([], commonCards);
    if (this.userService.hasEntitlement('analytics.practice.areas')) {
      result.push(practiceAreaCard);
    }
    if (this.userService.hasEntitlement('analytics.block.billing')) {
     result.push(topBillersCard);
    }
    if (this.userService.hasEntitlement('analytics.reports')) {
      result.push(invoiceIQCard);
    }
    return result.sort(this.util.dynamicSort('order'));
  }

  async fetchTopBlockBillers() {
    const response = await this.fetch('analytics/getBlockBillerSummary', {classifications: '["partner"]'});
    const summary = response.result;
    return summary.block_billers.map(biller =>
      ({...biller,
        percent: biller.total_block_billed / summary.total_billed_by_lawyers * 100,
        y: biller.total_block_billed,
        value: biller.total_block_billed,
        category: biller.name}
      ));
  }

  fetch(api, filters) {
    const params = this.filters.getCurrentUserCombinedFilters();
    Object.assign(params, filters);
    return this.http.fetch(api, params);
  }
}
