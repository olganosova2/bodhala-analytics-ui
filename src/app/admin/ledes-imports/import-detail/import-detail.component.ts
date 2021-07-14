import {Component, Input, OnInit, Inject} from '@angular/core';
import {HttpService} from 'bodhala-ui-common';
import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'bd-import-detail',
  templateUrl: './import-detail.component.html',
  styleUrls: ['./import-detail.component.scss']
})
export class ImportDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public datePipe: DatePipe,
              public httpService: HttpService) { }

  ngOnInit(): void {
    console.log("this.data: ", this.data);
    if (this.data.data.adu !== null) {
      this.data.data.adu.created_on = this.datePipe.transform(this.data.data.adu.created_on, 'short');
    }
  }

  downloadAttachment() {
    const BASE_URL = environment.apiUrl;
    console.log("BASE: ", BASE_URL);
    // this.httpService.downloadAttachment('downloadAttachment', this.data.data.adu.attachment_id);
    window.open(BASE_URL + 'downloadAttachment' + '?id=' + this.data.data.adu.attachment_id, '_blank', '');
  }

}
