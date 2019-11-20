import { Injectable } from '@angular/core';
import { TopMattersService } from '../top-matters/top-matters.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchPadService {

  constructor(
    private topMattersService: TopMattersService
    ) { }

  fetchData() {
    const requests: any = {};
    requests.topMatters = this.topMattersService.fetch();
    // TODO - add all requests here
    return requests;
  }
}
