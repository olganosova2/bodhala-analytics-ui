import { Component, OnInit } from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../shared/services/filters.service';
import {MatTable} from '@angular/material';

import {TopMattersService} from './top-matters.service';
import {ITopMatter} from '../shared/models/top-matters';
import {environment} from '../../environments/environment';
import * as config from '../shared/services/config';

@Component({
  selector: 'bd-top-matters',
  templateUrl: './top-matters.component.html',
  styleUrls: ['./top-matters.component.scss']
})
export class TopMattersComponent implements OnInit {
  errorMessage: any;
  pendingRequest: Subscription;
  topMatters: Array<ITopMatter> = [];
  isProgress: boolean = false;
  displayedColumns: string[] = ['name', 'total_spend', 'lead_partner_name', 'client_matter_type'];
  constructor(private httpService: HttpService,
              public filtersService: FiltersService,
              public topMattersService: TopMattersService) { }

  ngOnInit() {
    this.load();
  }
  load(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    this.isProgress = true;
    const request = this.httpService.makeGetRequest('getTopMattersAndLeadPartners', params);
    this.pendingRequest = request.subscribe(
      (data: any) => {
        // this.topMatters = this.topMattersService.processTopMatters(data.result);
        this.topMatters = data.result;
        this.isProgress = false;
        // this.topMatters[0].bio_image_url = 'https://bodhala-assets.s3.amazonaws.com/img/firms/00064/profiles/0679e2dc-695a-11e7-a703-061c87c9764f.png';
      },
      err => {
        this.errorMessage = err;
        this.isProgress = false;
      }
    );
  }
  goToView(row: ITopMatter): void {
    const w = window.parent ? window.parent : window;
    w.location.href = environment.host + config.outerAppLinks.viewMatter + row.id;
  }

}
