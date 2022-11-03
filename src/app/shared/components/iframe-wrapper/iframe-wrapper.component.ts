import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bd-iframe-wrapper',
  templateUrl: './iframe-wrapper.component.html',
  styleUrls: ['./iframe-wrapper.component.scss']
})
export class IframeWrapperComponent implements OnInit {
  name = 'Set iframe source';
  url: string = '/analytics-ui/rate-benchmarking/view-in-iframe';
  urlSafe: SafeResourceUrl;
  firmId: number;

  constructor(private route: ActivatedRoute,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.firmId = Number(this.route.snapshot.queryParamMap.get('firmId'));
    if (this.firmId) {
      this.url = this.url + '?firmId=' + this.firmId.toString();
    }
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
