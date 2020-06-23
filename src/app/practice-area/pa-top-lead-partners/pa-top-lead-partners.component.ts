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

          for (const lp of this.leadPartners) {
            const leverage = lp.associate_hours / lp.partner_hours;
            const associateRate = (lp.associate_billed - lp.associate_writeoff) / (lp.associate_hours - lp.associate_writeoff_hours);
            const partnerRate = (lp.partner_billed - lp.partner_writeoff) / (lp.partner_hours - lp.partner_writeoff_hours);
            const bpi = partnerRate + (leverage * associateRate);
            if (bpi > 0) {
              lp.bpi = formatter.format(bpi);
            } else {
              lp.bpi = '--';
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

    window.location.href = '/#/app/client-dashboard/lead-attorneys?practiceArea=' + this.practiceArea.client_matter_type;
  }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
