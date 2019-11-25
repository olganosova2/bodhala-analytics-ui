import { Injectable } from '@angular/core';

import { ITopMatter } from '../../shared/models/top-matters';
import { UtilService, HttpService } from 'bodhala-ui-common';
import { FiltersService } from '../../shared/services/filters.service';
import { map } from 'rxjs/operators';

import * as config from '../../shared/services/config';
import {ITopFirm} from '../../shared/models/top-firms';


@Injectable({
  providedIn: 'root'
})
export class TopMattersFirmsService {
  excludes: Array<string> = [];
  masterList: Array<ITopMatter> = [];

  constructor(
    private util: UtilService,
    private http: HttpService,
    private filters: FiltersService
  ) { }

  fetchMatters() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getTopMattersAndLeadPartners', params).pipe(
      map(response => this.processTopMatters(response.result))
    ).toPromise();
  }
  fetchFirms() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getTopFirms', params).pipe(
      map(response => this.processTopFirms(response.result))
    ).toPromise();
  }

  processTopMatters(records: Array<ITopMatter>): Array<ITopMatter> {
    this.masterList =  Object.assign([], records);
    const processedRecods = [];
    for (const rec of records) {
      if (rec.lead_partner_name instanceof Array) {
        rec.lead_partner_name = rec.lead_partner_name[0] || 'N/A';
      }
      if (rec.bio_image_url instanceof Array) {
        rec.bio_image_url = rec.bio_image_url[0] || '';
      }
      processedRecods.push(rec);
    }
    return processedRecods.sort(this.util.dynamicSort('-total_spend')).slice(0, config.TOP_RECORDS_NUMBER);
  }
  processTopFirms(records: Array<ITopFirm>): Array<ITopFirm> {
    for (const rec of records) {
      const sum = this.filters.includeExpenses ? rec.total_billed + rec.total_expenses : rec.total_billed;
      const total = this.filters.includeExpenses ? (rec.total_billed_all + rec.total_expenses_all) : rec.total_billed_all || 1;
      rec.total_percent = sum / total * 100;
    }
    return records;
  }
}
