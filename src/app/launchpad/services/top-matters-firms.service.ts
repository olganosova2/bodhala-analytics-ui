import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import { HttpParams, HttpClient } from '@angular/common/http';

import { ITopMatter } from '../../shared/models/top-matters';
import { ITopAverageMatter } from '../../shared/models/top-average-matters';
import { UtilService, HttpService } from 'bodhala-ui-common';
import { FiltersService } from '../../shared/services/filters.service';
import { map } from 'rxjs/operators';

import * as config from '../../shared/services/config';
import {ITopFirm} from '../../shared/models/top-firms';
import {IActiveSpend} from '../../shared/models/active-spend';


@Injectable({
  providedIn: 'root'
})
export class TopMattersFirmsService {
  excludes: Array<string> = [];
  masterList: Array<ITopMatter> = [];

  constructor(
    private util: UtilService,
    private http: HttpService,
    private httpClient: HttpClient,
    public filters: FiltersService,
    private datePipe: DatePipe
  ) { }

  fetchMatters(smartPAs: boolean) {
    const params = this.filters.getCurrentUserCombinedFilters();
    params.smartPAs = smartPAs;
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

  fetchMattersByHighestAverageRate() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getMattersByHighestAverageRate', params)
      .pipe(map(({ result }) => this.processMattersByHighestAverageRate(result)))
      .toPromise();
  }

  fetchActiveSpend() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getActiveSpend', params).pipe(
      map(response => this.processActiveSpend(response.result))
    ).toPromise();
  }

  processTopMatters(records: Array<ITopMatter>): Array<ITopMatter> {
    this.masterList =  Object.assign([], records);
    const processedRecods = [];
    for (const rec of records) {
      if (rec.lead_partner_name instanceof Array) {
        rec.lead_partner_name = rec.lead_partner_name[0] || 'N/A';
      }
      if (rec.lead_partner_id instanceof Array) {
        rec.lead_partner_id = rec.lead_partner_id[0] || '';
      }
      if (rec.lawfirm_id instanceof Array) {
        rec.lawfirm_id = rec.lawfirm_id[0] || '';
      }
      const sum = this.filters.includeExpenses ? rec.total_spend + rec.total_expenses : rec.total_spend;
      if (this.filters.includeExpenses) {
        rec.total_spend = sum;
      }
      rec.y = Math.round(sum);
      processedRecods.push(rec);
      // processedRecods[0].bio_image_url = 'https://bodhala-assets.s3.amazonaws.com/img/firms/00001/profiles/aeea2542-6952-11e7-80bc-061c87c9764f.jpg';
    }
    return processedRecods.sort(this.util.dynamicSort('-total_spend')).slice(0, config.TOP_RECORDS_NUMBER);
  }
  processTopFirms(records: Array<ITopFirm>): Array<ITopFirm> {
    for (const rec of records) {
      const sum = this.filters.includeExpenses ? rec.total_billed + rec.total_expenses : rec.total_billed;
      const total = this.filters.includeExpenses ? (rec.total_billed_all + rec.total_expenses_all) : rec.total_billed_all || 1;
      if (this.filters.includeExpenses) {
        rec.total_billed = sum;
      }
      rec.total_percent = sum / total * 100;
      rec.y = Math.round(sum);
      rec.name = rec.firm_name;
    }
    return records.sort(this.util.dynamicSort('-total_billed')).slice(0, config.TOP_RECORDS_NUMBER);
    // return records.sort(this.util.dynamicSort('-total_billed'));
  }
  processActiveSpend(response: IActiveSpend): IActiveSpend {
    const result = {} as IActiveSpend;
    const processedRecods = [];
    let accumulated = 0;
    for (const rec of response.data) {
        const sum = this.filters.includeExpenses ? rec.total_spend + rec.total_expenses : rec.total_spend;
        accumulated += sum;
        if (this.filters.includeExpenses) {
          rec.total_spend = sum;
        }
        rec.y = Math.round(sum);
        const label = this.datePipe.transform(rec.month, 'MMM yyyy');
        processedRecods.push([label, rec.total_spend]);
    }
    result.data = Object.assign([], processedRecods.reverse());
    const totals = this.filters.includeExpenses ? response.total_spend + response.total_expenses : response.total_spend;
    const percent = totals ? accumulated / totals : 1;
    result.total_spend = response.total_spend;
    result.total_expenses = response.total_expenses;
    result.active_spend = accumulated;
    result.percent = percent * 100;
    return result;
  }

  processMattersByHighestAverageRate(records: Array<ITopAverageMatter>): Array<ITopAverageMatter> {
    return records.map((record: ITopAverageMatter): ITopAverageMatter => ({
      ...record,
      category: record.matter_name,
      y: record.blended_rate
    }));
  }


}
