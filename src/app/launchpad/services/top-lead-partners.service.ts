import { Injectable } from '@angular/core';
import {HttpService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {map} from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';

import * as config from '../../shared/services/config';
import {ITopLeadPartner} from '../../shared/models/top-lead-partner';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

@Injectable({
  providedIn: 'root'
})
export class TopLeadPartnersService {

  constructor(
    private util: UtilService,
    private http: HttpService,
    private filters: FiltersService
  ) { }

  fetchLeadPartners() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getTopLeadPartners', params).pipe(
      map(response => this.processLeadPartners(response.result))
    ).toPromise();
  }

  processLeadPartners(records: Array<ITopLeadPartner>): Array<ITopLeadPartner> {
    for (const rec of records) {
      rec.top_matter_id = rec.top_matter.id;
      rec.top_matter_name = rec.top_matter.name;
      rec.top_matter_total = rec.top_matter.total_billed;
      rec.y = Math.round(rec.total_billed);
    }
    return records.slice(0, config.TOP_RECORDS_NUMBER);
  }

}
