import { Injectable } from '@angular/core';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import { TopMattersFirmsService } from '../services/top-matters-firms.service';
import {TopLeadPartnersService} from '../services/top-lead-partners.service';
import {InvoiceIqService} from '../services/invoice-iq.service';
import {commonCards} from './executive-summary.model';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveSummaryService {

  constructor(
    private http: HttpService,
    private userService: UserService,
    private filters: FiltersService,
    private topMattersFirmsService: TopMattersFirmsService,
    private leadPartnerService: TopLeadPartnersService,
    private util: UtilService
  ) { }

  fetchData() {
    let d = new Date(new Date().getFullYear(), 0 , 1);
    let janOne = new Date(d).toISOString().slice(0, 10);
    janOne = janOne.replace('2020', '2019');
    let today = new Date().toISOString().slice(0, 10);

    const requests: any = {};
    requests.topMatters = this.topMattersFirmsService.fetchESMatters(janOne, today);
    // requests.topFirms = this.topMattersFirmsService.fetchFirms();

    requests.topTimekeepers = this.leadPartnerService.fetchTopTimekeepers(janOne, today);
    // requests.mattersByHighestAverageRate = this.topMattersFirmsService.fetchMattersByHighestAverageRate();

    // TODO - add all requests here
    return requests;
  }

  configureCards(): Array<any> {
    const result = Object.assign([], commonCards);
    console.log("result: ", result);
    return result.sort(this.util.dynamicSort('order'));
  }

}
