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


  configureCards(): Array<any> {
    const result = Object.assign([], commonCards);
    return result.sort(this.util.dynamicSort('order'));
  }

}
