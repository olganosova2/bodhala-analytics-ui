import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../shared/services/common.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd-cirp-matter-summary',
  templateUrl: './cirp-matter-summary.component.html',
  styleUrls: ['./cirp-matter-summary.component.scss']
})
export class CirpMatterSummaryComponent implements OnInit {
  errorMessage: any;
  matterId: string;
  pendingRequest: Subscription;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public filtersService: FiltersService,
              public userService: UserService,
              public dialog: MatDialog,
              public commonServ: CommonService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.matterId = decodeURIComponent(params.get('id'));
      if (this.matterId) {
        this.loadSummary();
      }
    });
  }
  loadSummary(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters(true);
    const arr = [];
    arr.push(this.matterId);
    params.matters = JSON.stringify(arr);
    params.startdate = null;
    params.enddate = null;
    params.matterId = this.matterId;
    this.pendingRequest = this.httpService.makeGetRequest('getCirpMatterSummary', params).subscribe(
      (data: any) => {
        const firms = data.result;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

}
