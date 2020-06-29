import {Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.scss']
})
export class ExecutiveSummaryComponent implements OnInit {
  pendingRequest: Subscription;
  errorMessage: any;
  maxDate: string;
  // errorMessage: any;
  // summary: any;
  // isLoaded: boolean = false;
  // cards: Array<any> = [];
  // requests = {};
  // columns = columns;
  // pendingRequest: Subscription;
  // topFirms: Array<ITopFirmES>;
  // topFirmsByPA: Array<ITopFirmES>;
  // topMatters: Array<ITopMatterES>;
  // topMattersByPA: Array<ITopMatterES>;
  // topTKs: Array<ITopTimekeeper>;
  // topTKsByPA: Array<ITopTimekeeper>;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public commonServ: CommonService) {
  }

  ngOnInit() {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    this.pendingRequest = this.httpService.makeGetRequest('getDateRange', params).subscribe(
      (data: any) => {
        if (data) {
          this.maxDate = data.result.max;
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
  }


}
