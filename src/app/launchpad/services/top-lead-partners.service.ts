import { Injectable } from '@angular/core';
import {HttpService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {map} from 'rxjs/operators';

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

  fetchLeadPartners(smartPAs: boolean) {
    const params = this.filters.getCurrentUserCombinedFilters();
    params.smartPAs = smartPAs;
    return this.http.makeGetRequest('getTopLeadPartners', params).pipe(
      map(response => this.processLeadPartners(response.result, smartPAs))
    ).toPromise();
  }

  processLeadPartners(records: Array<ITopLeadPartner>, smartPAs: boolean): Array<ITopLeadPartner> {
    for (const rec of records) {
      rec.top_matter_id = rec.top_matter.id;
      rec.top_matter_name = rec.top_matter.name;
      rec.top_matter_total = rec.top_matter.total_billed;
      rec.y = Math.round(rec.total_billed);
      if (rec.top_practice.length > 0) {
        if (smartPAs) {
          rec.link_name = rec.top_practice + ' - [Smart]';
        } else {
          rec.link_name = null;
        }
      }
    }
    return records.slice(0, config.TOP_RECORDS_NUMBER);
  }

}
