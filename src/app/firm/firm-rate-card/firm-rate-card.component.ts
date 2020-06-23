import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import * as _moment from 'moment';
const moment = _moment;
import {HttpService, UtilService} from 'bodhala-ui-common';
import {IFirm} from '../firm.model';
import {FiltersService} from '../../shared/services/filters.service';

@Component({
  selector: 'bd-firm-rate-card',
  templateUrl: './firm-rate-card.component.html',
  styleUrls: ['./firm-rate-card.component.scss']
})
export class FirmRateCardComponent implements OnInit, OnDestroy {
  firmId: string;
  firm: IFirm;
  selectedPracticeArea: string = '';
  errorMessage: any;
  pendingRequestFirm: Subscription;
  pendingRequestPAs: Subscription;
  pendingRequestSummary: Subscription;
  practiceAreas: Array<string> = [];
  enddate: string;
  startdate: string;
  launchpadImage: any;
  logoImage: any;
  percentOfTotal: number;
  @ViewChild('pdfDiv', {static: false}) pdfDiv: ElementRef<HTMLElement>;

  constructor(public commonServ: CommonService,
              private route: ActivatedRoute,
              private httpService: HttpService,
              public filtersService: FiltersService,
              public utilServ: UtilService,
              public router: Router) {
    this.commonServ.pageTitle = 'Firms > Report Card';
  }

  ngOnInit() {
    const dates = this.filtersService.parseLSDateString();
    this.enddate = moment(dates.enddate).format('MMM DD, YYYY');
    this.startdate = moment(dates.startdate).format('MMM DD, YYYY');
    this.route.paramMap.subscribe(params => {
      this.firmId = params.get('id');
      this.initFirm();
      this.loadPAs();
    });
  }

  initFirm(): void {
    this.loadFirm().subscribe(data => {
      let totalSpend = 1;
      if (data[0].result) {
        const firms = data[0].result || [];
        if (firms.length > 0) {
          totalSpend = firms[0].total_billed_all || 1;
        }
      }
      if (data[1].result) {
        if (data[1].result) {
          const firms = data[1].result || [];
          if (firms.length > 0) {
            this.commonServ.pageSubtitle = firms[0].firm_name;
            this.firm = firms[0];
            this.percentOfTotal = firms[0].total_billed / totalSpend;
          }
        }
      }
    }, err => {
      this.errorMessage = err;
    });
  }

  loadFirm(): Observable<any> {
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    const response1 = this.httpService.makeGetRequest('getTopFirms', params);
    const arr = [];
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    const response2 = this.httpService.makeGetRequest('getTopFirms', params);
    return forkJoin([response1, response2]);
  }

  loadPAs(): void {
    this.practiceAreas = [];
    const combined = this.filtersService.getCurrentUserCombinedFilters(true);
    const arr = [];
    arr.push(this.firmId.toString());
    combined.firms = JSON.stringify(arr);
    const params = {...combined, filter_name: 'practiceAreas', limit: 100};
    this.pendingRequestPAs = this.httpService.makeGetRequest('getOptionsForFilter', params).subscribe(
      (data: any) => {
        this.practiceAreas.push(this.selectedPracticeArea);
        let pas = data.result.map(e => e.id) || [];
        pas = pas.sort();
        this.practiceAreas = [...this.practiceAreas, ...pas];
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  editReportCard(): void {
    this.router.navigate(['/analytics-ui/firm/', this.firmId]);
  }

  export(): void {
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
    if (this.pendingRequestFirm) {
      this.pendingRequestFirm.unsubscribe();
    }
    if (this.pendingRequestPAs) {
      this.pendingRequestPAs.unsubscribe();
    }
    if (this.pendingRequestSummary) {
      this.pendingRequestSummary.unsubscribe();
    }
  }

}
