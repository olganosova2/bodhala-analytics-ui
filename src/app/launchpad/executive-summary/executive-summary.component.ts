import {Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'bd-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.scss']
})
export class ExecutiveSummaryComponent implements OnInit {

  // errorMessage: any;
  // summary: any;
  // isLoaded: boolean = false;
  // cards: Array<any> = [];
  // requests = {};
  // columns = columns;
  // pendingRequest: Subscription;
  // topFirms: Array<ITopFirmES>;
  // topFirmsByPA: Array<ITopFirmES>;
  // topMatters: Array<ITopMatterES>;
  // topMattersByPA: Array<ITopMatterES>;
  // topTKs: Array<ITopTimekeeper>;
  // topTKsByPA: Array<ITopTimekeeper>;

  constructor(public commonServ: CommonService) {}

  ngOnInit() {
  }


}
