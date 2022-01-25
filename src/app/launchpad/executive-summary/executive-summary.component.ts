import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {Subscription} from 'rxjs';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import * as config from '../../shared/services/config';
import {IUiAnnotation} from '../../shared/components/annotations/model';
import {EsTableComponent} from './es-table/es-table.component';
import {SpendOverviewComponent} from './spend-overview/spend-overview.component';

const moment = _moment;

@Component({
  selector: 'bd-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.scss']
})
export class ExecutiveSummaryComponent implements OnInit, OnDestroy {
  pendingRequest: Subscription;
  maxDate: string;
  lastFullYear: string;
  lowerDateRangeMaxYear: string;
  upperDateRangeMaxYear: string;
  lowerDateRangeLastFullYear: string;
  upperDateRangeLastFullYear: string;
  fullYear: boolean = false;
  notes: Array<IUiAnnotation> = [];
  uiId: string = config.UI_ANNOTATIONS_IDS.executiveSummary;
  @ViewChild(EsTableComponent) executiveSummaryTablesComp: EsTableComponent;
  @ViewChild(SpendOverviewComponent) executiveSummaryOverviewComp: SpendOverviewComponent;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public commonServ: CommonService,
              public datepipe: DatePipe) {
  }

  ngOnInit() {
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    params.startdate = '';
    params.enddate = '';
    this.pendingRequest = this.httpService.makeGetRequest('getDateRange', params).subscribe(
      (data: any) => {
        if (data) {
          this.maxDate = data.result.max;
          const lastYear = moment(this.maxDate).year();
          const d = new Date(lastYear, 0 , 1);
          const lastFullYear = lastYear - 1;
          this.lastFullYear = lastFullYear.toString();
          const janOne = new Date(d).toISOString().slice(0, 10);
          this.lowerDateRangeMaxYear = this.datepipe.transform(janOne, 'mediumDate');
          this.upperDateRangeMaxYear = this.datepipe.transform(this.maxDate, 'mediumDate');
          const dLastYearStart = new Date(lastFullYear, 0 , 1);
          const dLastYearEnd = new Date(lastFullYear, 11 , 31);
          this.lowerDateRangeLastFullYear = this.datepipe.transform(dLastYearStart, 'mediumDate');
          this.upperDateRangeLastFullYear = this.datepipe.transform(dLastYearEnd, 'mediumDate');
        }
      }
    );
  }
  loadNotes(notes: Array<IUiAnnotation>): void {
    this.notes = Object.assign([], notes);
  }
  export(): void {
    this.commonServ.pdfLoading = true;
    let exportName = '';
    if (this.userService.currentUser.client_info.org.name !== null) {
      exportName = this.userService.currentUser.client_info.org.name + ' Executive Summary';
    } else {
      exportName = 'Executive Summary';
    }
    setTimeout(() => {
      this.commonServ.generatePdfOuter(exportName, 'executiveSummary', null);
    }, 200);
  }
  refreshData(): void {
    this.executiveSummaryTablesComp.getExecutiveSummaryData(this.fullYear);
    this.executiveSummaryOverviewComp.getSpendOverview(this.fullYear);
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
