import { Injectable } from '@angular/core';
import { TopMattersFirmsService } from './services/top-matters-firms.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchPadService {

  constructor(
    private topMattersFirmsService: TopMattersFirmsService
    ) { }

  fetchData() {
    const requests: any = {};
    requests.topMatters = this.topMattersFirmsService.fetchMatters();
    requests.topFirms = this.topMattersFirmsService.fetchFirms();
    // TODO - add all requests here
    return requests;
  }
}
