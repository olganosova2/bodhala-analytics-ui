import { Injectable } from '@angular/core';
import { TopMattersService } from '../top-matters/top-matters.service';
import {SpendByPracticeAreaService} from '../practice-area/spend-by-practice-area.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchPadService {

  constructor(
    private topMattersService: TopMattersService,
    private practiceService: SpendByPracticeAreaService
    ) { }

  fetchData() {
    const requests: any = {};
    requests.topMatters = this.topMattersService.fetch();
    requests.spendByPractice = this.practiceService.fetch();
    // TODO - add all requests here
    return requests;
  }
}
