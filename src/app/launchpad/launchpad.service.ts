import { Injectable } from '@angular/core';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import { TopMattersFirmsService } from './services/top-matters-firms.service';
import {SpendByPracticeAreaService} from './services/spend-by-practice-area.service';
import {BlockBillingService} from './services/block-billing.service';
import {TopLeadPartnersService} from './services/top-lead-partners.service';
import {InvoiceIqService} from './services/invoice-iq.service';
import {commonCards, invoiceIQCard, practiceAreaCard, topBillersCard} from './launchpad.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchPadService {
  smartPAs: boolean;

  constructor(
    private http: HttpService,
    private userService: UserService,
    private filters: FiltersService,
    private topMattersFirmsService: TopMattersFirmsService,
    private practiceService: SpendByPracticeAreaService,
    private leadPartnerService: TopLeadPartnersService,
    private invoiceIqService: InvoiceIqService,
    private blockBillingService: BlockBillingService,
    private util: UtilService
  ) {
    if (this.userService.config !== undefined) {
      if ('analytics.practice.bodhala.areas' in this.userService.config) {
        const userConfigs = Object.values(this.userService.config);
        for (const config of userConfigs) {
          if (config.configs[0].description === 'config for analytics practice areas') {
            if (config.configs[0].value === 'Smart Practice Areas' || config.configs[0].value === 'Both') {
              this.smartPAs = true;
              practiceAreaCard.header = 'Spend By Smart Practice Area';
            } else {
              this.smartPAs = false;
              practiceAreaCard.header = 'Spend By Practice Area';
            }
            break;
          }
        }
      } else {
        this.smartPAs = false;
      }
    }
  }

  fetchData() {
    const requests: any = {};
    requests.topMatters = this.topMattersFirmsService.fetchMatters(this.smartPAs);
    requests.topFirms = this.topMattersFirmsService.fetchFirms();
    if (this.userService.hasEntitlement('analytics.practice.areas')) {
      requests.spendByPractice = this.practiceService.fetch(this.smartPAs);
    }
    requests.topLeadPartners = this.leadPartnerService.fetchLeadPartners(this.smartPAs);
    requests.mattersByHighestAverageRate = this.topMattersFirmsService.fetchMattersByHighestAverageRate();
    requests.activeSpend = this.topMattersFirmsService.fetchActiveSpend();
    if (this.userService.hasEntitlement('analytics.block.billing')) {
      requests.topBlockBillers = this.blockBillingService.getBlockBillingFirms();
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
    if (this.smartPAs === true) {
      for (const card of commonCards) {
        if (card.header === 'Top Matters by Spend' || card.header === 'Top Lead Partners') {
          for (const column of card.columns) {
            if (column.name === 'Practice Area') {
              column.name = 'Smart Practice Area';
            }
          }
        }
      }
    }
    return result.sort(this.util.dynamicSort('order'));
  }
}
