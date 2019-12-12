import { Injectable } from '@angular/core';

import { HttpService } from 'bodhala-ui-common';
import { FiltersService } from '../../shared/services/filters.service';
import { map } from 'rxjs/operators';
import * as config from '../../shared/services/config';
import {IBlockBillingFirms} from '../../shared/models/top-block-billers';

@Injectable({
  providedIn: 'root'
})
export class BlockBillingService {
  constructor(
    private http: HttpService,
    private filters: FiltersService
  ) { }

  getBlockBillingFirms() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getBlockBillingFirms', params).pipe(
      map(response => this.processBlockBillingFirms(response.result))
    ).toPromise();
  }

  processBlockBillingFirms(records: Array<IBlockBillingFirms>): Array<IBlockBillingFirms> {
    return records.slice(0, config.TOP_RECORDS_NUMBER).map(biller =>
      ({...biller,
        percent: biller.pct_block_billed * 100,
        y: biller.pct_block_billed * 100,
        value: biller.total_block_billed,
        category: biller.law_firm,
        name: biller.lead_partners[0].name,
        timekeeper_id: biller.lead_partners[0].timekeeper_id}
      ));
  }
}


