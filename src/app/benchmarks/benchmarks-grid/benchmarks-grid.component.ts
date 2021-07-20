import {Component, Input, OnInit} from '@angular/core';
import {IBenchmarkOverviewRow} from '../model';
import {BenchmarkService} from '../benchmark.service';

@Component({
  selector: 'bd-benchmarks-grid',
  templateUrl: './benchmarks-grid.component.html',
  styleUrls: ['./benchmarks-grid.component.scss']
})
export class BenchmarksGridComponent implements OnInit {
  @Input() dataRows: Array<IBenchmarkOverviewRow> = [];
  @Input() firmDetail: boolean = false;
  constructor(public bmService: BenchmarkService) { }

  ngOnInit() {
  }

}
