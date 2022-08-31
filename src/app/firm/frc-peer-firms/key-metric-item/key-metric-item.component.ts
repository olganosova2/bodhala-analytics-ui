import {Component, Input, OnInit} from '@angular/core';
import {IMetricDisplayData} from '../frc-service.service';
import {CommonService} from '../../../shared/services/common.service';

@Component({
  selector: 'bd-key-metric-item',
  templateUrl: './key-metric-item.component.html',
  styleUrls: ['./key-metric-item.component.scss']
})
export class KeyMetricItemComponent implements OnInit {
  isTrends: boolean = false;
  @Input() isLastCell: boolean = false;
  @Input() item: IMetricDisplayData;
  @Input() totalMetrics: number = 12;

  constructor(public commonServ: CommonService) { }

  ngOnInit(): void {
    const url = this.commonServ.formatPath(window.location.pathname);
    if (url.indexOf('frc-trends') > 0) {
      this.isTrends = true;
    }
  }

}
