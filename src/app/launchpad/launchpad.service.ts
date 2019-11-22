import { Injectable } from '@angular/core';
import { TopMattersFirmsService } from './services/top-matters-firms.service';
import {SpendByPracticeAreaService} from './services/spend-by-practice-area.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchPadService {

  constructor(
    private topMattersFirmsService: TopMattersFirmsService,
    private practiceService: SpendByPracticeAreaService

  ) { }

  fetchData() {
    const requests: any = {};
    requests.topMatters = this.topMattersFirmsService.fetchMatters();
    requests.topFirms = this.topMattersFirmsService.fetchFirms();
    requests.spendByPractice = this.practiceService.fetch();
    // TODO - add all requests here
    return requests;
  }
}
