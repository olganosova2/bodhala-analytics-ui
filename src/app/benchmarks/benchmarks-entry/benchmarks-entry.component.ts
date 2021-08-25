import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';
import {MOCK_PRACTICE_AREAS, MOCK_YEARS} from '../../shared/unit-tests/mock-data/benchmarking';
import {IDropDown} from '../../shared/models/prime-ng';


@Component({
  selector: 'bd-benchmarks-entry',
  templateUrl: './benchmarks-entry.component.html',
  styleUrls: ['./benchmarks-entry.component.scss']
})
export class BenchmarksEntryComponent implements OnInit, OnDestroy {
  practiceAreaId: string;
  year: string;
  areasOptions: Array<IDropDown> = MOCK_PRACTICE_AREAS;
  yearOptions: Array<IDropDown> = MOCK_YEARS;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService) { }

  ngOnInit() {
    this.practiceAreaId = this.areasOptions[0].value;
    this.year = this.yearOptions[0].value;
  }
  select(): void {
    this.router.navigate(['/analytics-ui/benchmarks-firms/'], {
      queryParams: {
        area: this.practiceAreaId,
        year: this.year
      }
    });
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
  }
}
