import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
import {UtilService} from 'bodhala-ui-common';

@Component({
  selector: 'bd-ie-banner',
  templateUrl: './ie-banner.component.html',
  styleUrls: ['./ie-banner.component.scss']
})
export class IeBannerComponent implements OnInit {
  ieVersion: string = '';

  constructor(public utilService: UtilService) { }

  ngOnInit() {
    this.ieVersion = this.utilService.getIEVersion();
  }
}
