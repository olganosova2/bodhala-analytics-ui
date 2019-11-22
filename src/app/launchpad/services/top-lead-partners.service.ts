import { Injectable } from '@angular/core';
import {HttpService, UtilService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {map} from 'rxjs/operators';
import {ITopLeadPartner} from '../../shared/models/top-lead-partner';

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
    }
    return records;
  }

}
