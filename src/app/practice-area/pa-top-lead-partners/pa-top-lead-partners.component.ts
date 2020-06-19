import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPracticeArea, ILeadPartner} from '../practice-area.model';
import {Subscription} from 'rxjs';
import {HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';
import * as config from '../../shared/services/config';
// import * as config from '../shared/services/config';

@Component({
  selector: 'bd-pa-top-lead-partners',
  templateUrl: './pa-top-lead-partners.component.html',
  styleUrls: ['./pa-top-lead-partners.component.scss']
})
export class PaTopLeadPartnersComponent implements OnInit, OnDestroy {
  errorMessage: any;
  leadPartners: Array<ILeadPartner> = [];
  helpText: string = 'Total amount billed and Bodhala Price Index for the top Lead Partners in this Practice Area.';
  @Input() clientMatterType: string;
  @Input() practiceArea: IPracticeArea;
  pendingRequest: Subscription;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public commonServ: CommonService,
              public filtersService: FiltersService,
              public userService: UserService) { }


  ngOnInit() {
    this.getLeadPartners();
  }

  getLeadPartners(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.practiceArea.client_matter_type);
    params.practiceAreas = JSON.stringify(arr);

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
  });

    this.pendingRequest = this.httpService.makeGetRequest('getTopLeadPartners', params).subscribe(
      (data: any) => {
        this.leadPartners = data.result;
        if (this.leadPartners !== undefined) {
          if (this.leadPartners.length > 10) {
            this.leadPartners = this.leadPartners.slice(0, 10);
          }
          for (let i = 0; i < this.leadPartners.length; i++) {
            const leverage = this.leadPartners[i].associate_hours / this.leadPartners[i].partner_hours;
            const associateRate = (this.leadPartners[i].associate_billed - this.leadPartners[i].associate_writeoff) / (this.leadPartners[i].associate_hours - this.leadPartners[i].associate_writeoff_hours);
            const partnerRate = (this.leadPartners[i].partner_billed - this.leadPartners[i].partner_writeoff) / (this.leadPartners[i].partner_hours - this.leadPartners[i].partner_writeoff_hours);
            const bpi = partnerRate + (leverage * associateRate);
            if (bpi > 0) {
              this.leadPartners[i].bpi = formatter.format(bpi);
            } else {
              this.leadPartners[i].bpi = '--';
            }
          }
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

    window.location.href = '/#/app/client-dashboard/lead-attorneys?practiceArea=' + this.practiceArea.client_matter_type;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
