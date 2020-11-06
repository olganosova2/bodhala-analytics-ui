import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStateService, HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../../shared/services/common.service';
import {BenchmarkService, RATE_TABLE_HEADERS} from '../../../benchmarks/benchmark.service';
import {IBenchmarkRate} from '../../../benchmarks/model';

@Component({
  selector: 'bd-edit-benchmark-rate',
  templateUrl: './edit-benchmark-rate.component.html',
  styleUrls: ['./edit-benchmark-rate.component.scss']
})
export class EditBenchmarkRateComponent implements OnInit {
  excludes: Array<any> = [];
  headers: Array<string> = RATE_TABLE_HEADERS;
  @Input() rates: IBenchmarkRate;
  @Input() name: string;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private httpService: HttpService,
              public appStateService: AppStateService,
              public userService: UserService,
              public commonServ: CommonService,
              public utilService: UtilService,
              public benchmarkServ: BenchmarkService) { }

  ngOnInit(): void {

  }

}
