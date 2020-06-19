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
  pendingRequest: Subscription;
  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public commonServ: CommonService,
              public filtersService: FiltersService,
              public userService: UserService) { }


  ngOnInit() {
    this.getTopFirms();
  }

  getTopFirms(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.practiceArea.client_matter_type);
    params.practiceAreas = JSON.stringify(arr);
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
    let qs =  localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    let serializedQs = JSON.parse(qs).querystring.toString();
    let temp_qs = JSON.parse(qs);
    temp_qs.querystring = serializedQs
    serializedQs += '&practiceAreas=["' + encodeURIComponent(this.practiceArea.client_matter_type) + '"]';
    temp_qs.querystring = serializedQs

    for (let i = 0; i < temp_qs.dataFilters.length; i++) {
      if (temp_qs.dataFilters[i].fieldName === 'practiceAreas') {
        temp_qs.dataFilters[i].value = [{id: this.practiceArea.client_matter_type, name: this.practiceArea.client_matter_type, sortField: this.practiceArea.client_matter_type}];
        break;
      }
    }
    localStorage.setItem(config.SAVED_FILTERS_NAME + this.userService.currentUser.id, JSON.stringify(temp_qs));

    window.location.href = '/#/app/client-dashboard/firm?practiceArea=' + this.practiceArea.client_matter_type;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
