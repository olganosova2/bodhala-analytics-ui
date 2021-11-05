import {Component, Input, OnInit} from '@angular/core';
import {QbrService} from '../../qbr.service';
import {IPayloadDates, IQbrReport} from '../../qbr-model';
import {UserService} from 'bodhala-ui-common';

@Component({
  selector: 'bd-qbr-cover',
  templateUrl: './qbr-cover.component.html',
  styleUrls: ['../../qbr-css.scss', './qbr-cover.component.scss']
})
export class QbrCoverComponent implements OnInit {
  accountName: string;
  reportDates: IPayloadDates;
  @Input() qbr: IQbrReport;
  @Input() qbrData: any;
  @Input() page: number = 2;
  @Input() zoom: boolean;
  constructor(public qbrService: QbrService,
              public userService: UserService) {
    this.accountName = this.userService.currentUser.client_info.org.name;
  }

  ngOnInit(): void {
    const dates = this.qbrService.formatPayloadDates(this.qbr.start_date, this.qbr.report_type);
    this.reportDates = dates;
  }

}
