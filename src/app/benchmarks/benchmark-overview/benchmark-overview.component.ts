import {Component, OnDestroy, OnInit} from '@angular/core';
import {IDropDown} from '../../shared/models/prime-ng';
import {MOCK_PRACTICE_AREAS, MOCK_YEARS} from '../../shared/unit-tests/mock-data/benchmarking';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {IBenchmarkOverviewRow} from '../model';

@Component({
  selector: 'bd-benchmark-overview',
  templateUrl: './benchmark-overview.component.html',
  styleUrls: ['./benchmark-overview.component.scss']
})
export class BenchmarkOverviewComponent implements OnInit, OnDestroy {
  practiceAreaId: string;
  year: string;
  areasOptions: Array<IDropDown> = MOCK_PRACTICE_AREAS;
  yearOptions: Array<IDropDown> = MOCK_YEARS;
  benchmarks: Array<IBenchmarkOverviewRow> = [];
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService) {
    this.commonServ.pageTitle = 'Benchmarking';
  }

  ngOnInit() {
    this.practiceAreaId = this.areasOptions[0].value;
    this.year = this.yearOptions[0].value;
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
  }
}
