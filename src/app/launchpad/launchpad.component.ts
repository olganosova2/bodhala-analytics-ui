import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {TopMattersService} from '../top-matters/top-matters.service';

@Component({
  selector: 'bd-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit {
  errorMessage: any;
  pendingRequest: Subscription;
  constructor() { }

  ngOnInit() {
  }
}
