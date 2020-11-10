import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPracticeArea, IFirmData} from '../practice-area.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import * as config from '../../shared/services/config';

@Component({
  selector: 'bd-pa-top-firms',
  templateUrl: './pa-top-firms.component.html',
  styleUrls: ['./pa-top-firms.component.scss']
})
export class PaTopFirmsComponent implements OnInit, OnDestroy {
  errorMessage: any;
  firms: Array<IFirmData> = [];
  firmsData: Array<IFirmData> = [];
  helpText: string = 'Total billed for each firm display how much was spent at each firm for this Practice Area.';
  @Input() clientMatterType: string;
  @Input() practiceArea: IPracticeArea;
  @Input() bodhalaPA: boolean;
  pendingRequest: Subscription;
  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public commonServ: CommonService,
              public filtersService: FiltersService,
              public userService: UserService) { }


  ngOnInit() {
    this.getDateRange();
    this.getTopFirms();
  }

  getDateRange(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.practiceArea.client_matter_type);

    if (this.bodhalaPA === true) {
      params.bdPracticeAreas = JSON.stringify(arr);
    } else {
      params.practiceAreas = JSON.stringify(arr);
    }
   
    this.pendingRequest = this.httpService.makeGetRequest('getDateRange', params).subscribe(
      (data: any) => {
        if (data) {
          const minDate = data.result.min;
          const maxDate = data.result.max;
          const tempMinDate = new Date(minDate);
          tempMinDate.setDate(tempMinDate.getDate() + 1);
          const tempMaxDate = new Date(maxDate);
          tempMaxDate.setDate(tempMaxDate.getDate() + 1);
          const newMinDate = new Date(tempMinDate).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });
          const newMaxDate = new Date(tempMaxDate).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric'});
          const dateRange = document.getElementsByClassName('min-max-range min-max-range-width');
          if (dateRange &&  dateRange[0]) {
            dateRange[0].firstChild.textContent = 'Active Data Range: ' + newMinDate.toString() + ' - ' + newMaxDate.toString();
          }
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

  getTopFirms(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.practiceArea.client_matter_type);
    if (this.bodhalaPA === true) {
      params.bdPracticeAreas = JSON.stringify(arr);
    } else {
      params.practiceAreas = JSON.stringify(arr);
    }
    this.pendingRequest = this.httpService.makeGetRequest('getTopFirms', params).subscribe(
      (data: any) => {
        this.firms = data.result;
        if (this.firms.length > 10) {
          this.firms = this.firms.slice(0, 10);
        }

      },
      err => {
        this.errorMessage = err;
      }
    );
  }
  goToView(): void {
    const qs =  localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    let serializedQs = JSON.parse(qs).querystring.toString();
    const tempQs = JSON.parse(qs);
    tempQs.querystring = serializedQs;
    serializedQs += '&practiceAreas=["' + encodeURIComponent(this.practiceArea.client_matter_type) + '"]';
    tempQs.querystring = serializedQs;

    for (const filter of tempQs.dataFilters) {
      if (filter.fieldName === 'practiceAreas') {
        filter.value = [{id: this.practiceArea.client_matter_type, name: this.practiceArea.client_matter_type, sortField: this.practiceArea.client_matter_type}];
        break;
      }
    }
    localStorage.setItem(config.SAVED_FILTERS_NAME + this.userService.currentUser.id, JSON.stringify(tempQs));

    window.location.href = '/#/app/client-dashboard/firm?practiceArea=' + this.practiceArea.client_matter_type;
  }
  goToFirmView(href: string, id: string): void {
    const enc = encodeURIComponent(id);
    window.location.href = href + encodeURIComponent(enc);
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
