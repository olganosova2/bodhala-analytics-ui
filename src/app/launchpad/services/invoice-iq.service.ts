import { Injectable } from '@angular/core';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {map} from 'rxjs/operators';
import {IInvoiceIQ} from '../../shared/models/invoiceIq';
import * as config from '../../shared/services/config';

@Injectable({
  providedIn: 'root'
})
export class InvoiceIqService {

  constructor(
    private http: HttpService,
    private filters: FiltersService
  ) { }

  fetchIQReports() {
    const params = this.filters.getCurrentUserCombinedFilters();
    return this.http.makeGetRequest('getInvoiceIQReports', params).pipe(
      map(response => this.processIQReports(response.result))
    ).toPromise();
  }

  processIQReports(records: Array<IInvoiceIQ>): Array<IInvoiceIQ> {
    for (const rec of records) {
      rec.name = rec.report_name;
      rec.y = Math.round(rec.total_billed);
    }
    return records.slice(0, config.TOP_RECORDS_NUMBER);
  }
}
