import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPracticeArea, IFirmData} from '../practice-area.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'bd-pa-top-firms',
  templateUrl: './pa-top-firms.component.html',
  styleUrls: ['./pa-top-firms.component.scss']
})
export class PaTopFirmsComponent implements OnInit {
  errorMessage: any;
  firms: Array<IFirmData> = [];
  firms_data: Array<IFirmData> = [];
  helpText: string = 'Total billed for each firm display how much was spent at each firm for this practice area.';
  // helpText: string = 'Hourly rates for each timekeeper display the most current rate for the time period selected.';
  @Input() clientMatterType: string;
  @Input() practiceArea: IPracticeArea;
  pendingRequest: Subscription;
  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              public commonServ: CommonService,
              public filtersService: FiltersService) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientMatterType = params.get('client_matter_type');
      this.getTopFirms();
    });
  }

  getTopFirms(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    arr.push(this.clientMatterType);
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
  // goToView(): void {
  //   window.location.href = '/analytics-ui/' + this.firmId.toString();
  // }
  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }

}
