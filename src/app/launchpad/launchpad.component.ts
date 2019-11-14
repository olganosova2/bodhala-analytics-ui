import { Component, OnInit } from '@angular/core';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {Subscription} from 'rxjs';
import {FiltersService} from '../shared/services/filters.service';

@Component({
  selector: 'bd-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit {
  errorMessage: any;
  pendingRequest: Subscription;
  constructor(private httpService: HttpService,
              public filtersService: FiltersService,
              public userService: UserService,
              public appStateService: AppStateService) { }

  ngOnInit() {
    this.load();
  }
  load(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    this.pendingRequest = this.httpService.makeGetRequest('getTopMatters', params).subscribe(
      (data: any) => {
        const x = data;
      },
      err => {
        this.errorMessage = err;
      }
    );
  }

}
