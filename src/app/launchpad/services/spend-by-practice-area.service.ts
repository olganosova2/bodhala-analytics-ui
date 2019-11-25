import { Injectable } from '@angular/core';

import { UtilService, HttpService } from 'bodhala-ui-common';
import { FiltersService } from '../../shared/services/filters.service';
import { map } from 'rxjs/operators';
import {IPractice} from '../../shared/models/practice';

@Injectable({
  providedIn: 'root'
})
export class SpendByPracticeAreaService {
  practiceList: Array<IPractice> = [];

  constructor(
    private util: UtilService,
    private http: HttpService,
    private filters: FiltersService
  ) { }

  fetch() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('spendByPracticeAreas', params).pipe(
      map(response => this.processPracticeAreas(response.result))
    ).toPromise();
  }

  processPracticeAreas(records: Array<IPractice>): Array<IPractice> {
    this.practiceList =  Object.assign([], records);
    for (const rec of records) {
      rec.y = Math.round(rec.total_billed);
    }
    return this.practiceList.sort(this.util.dynamicSort('-total_billed'));
  }
}
