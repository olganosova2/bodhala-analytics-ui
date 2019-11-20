import { Injectable } from '@angular/core';

import { ITopMatter } from '../shared/models/top-matters';
import { UtilService, HttpService } from 'bodhala-ui-common';
import { FiltersService } from '../shared/services/filters.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopMattersService {
  excludes: Array<string> = [];
  masterList: Array<ITopMatter> = [];

  constructor(
    private util: UtilService,
    private http: HttpService,
    private filters: FiltersService
  ) { }

  fetch() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getTopMattersAndLeadPartners', params).pipe(
      map(response => this.processTopMatters(response.result))
    ).toPromise();
  }

  processTopMatters(records: Array<ITopMatter>): Array<ITopMatter> {
    this.masterList =  Object.assign([], records);
    const processedRecods = [];
    for (const rec of records) {
      if (this.excludes.indexOf(rec.id) > -1) {
        continue;
      }
      const founds = this.masterList.filter(e => e.id === rec.id && e.lead_partner_id !== rec.lead_partner_id) || [];
      for (const dup of founds) {
        if (dup.hours > rec.hours) {
          rec.lead_partner_name = dup.lead_partner_name;
          rec.lead_partner_id = dup.lead_partner_id;
        }
        rec.total_spend += dup.total_spend;
        rec.total_expenses += dup.total_expenses;
        this.excludes.push(dup.id);
      }
      processedRecods.push(rec);
    }
    return processedRecods.sort(this.util.dynamicSort('-total_spend')).slice(0, 10);
  }
}
