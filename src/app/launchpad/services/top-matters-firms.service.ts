import { Injectable } from '@angular/core';

import { ITopMatter } from '../../shared/models/top-matters';
import { UtilService, HttpService } from 'bodhala-ui-common';
import { FiltersService } from '../../shared/services/filters.service';
import { map } from 'rxjs/operators';
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
  processTopFirms(records: Array<ITopFirm>): Array<ITopFirm> {
    for (const rec of records) {
      const sum = this.filters.includeExpenses ? rec.total_billed + rec.total_expenses : rec.total_billed;
      const total = this.filters.includeExpenses ? (rec.total_billed_all + rec.total_expenses_all) : rec.total_billed_all || 1;
      rec.total_percent = sum / total * 100;
    }
    return records;
  }
}
