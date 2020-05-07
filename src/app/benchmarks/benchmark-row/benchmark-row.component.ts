import {Component, Input, OnInit} from '@angular/core';
import {IBenchmarkOverviewRow} from '../model';
import {BenchmarkService} from '../benchmark.service';
import {OverlayPanel} from 'primeng';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bd-benchmark-row',
  templateUrl: './benchmark-row.component.html',
  styleUrls: ['./benchmark-row.component.scss']
})
export class BenchmarkRowComponent implements OnInit {
  isFirmDetail: boolean = false;
  @Input() dataRow: IBenchmarkOverviewRow;
  constructor(public bmService: BenchmarkService,
              public router: Router) {
    this.isFirmDetail = this.router.url.indexOf('benchmarking/firm') >= 0;
  }

  ngOnInit() {
  }
  formatDelta(delta: number): string {
    let result = '';
    if (!delta || isNaN(delta)) {
      return '0 %';
    }
    const add = delta > 0 ? '-' : '+';
    const rounded = Math.round(delta * 100) / 100;
    result = add + Math.abs(rounded).toString() + '%';
    return result;
  }
  openGroup(row: IBenchmarkOverviewRow): void {
    row.isExpanded = !row.isExpanded;
  }
  showPeers(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);
  }
  showFirm(): void {
    if (this.dataRow.isChild || this.isFirmDetail) {
      return;
    }
    this.router.navigate(['/analytics-ui/benchmarking/firm', this.dataRow.id]);
  }
}
