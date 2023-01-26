import {Component, HostListener, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {RatesAnalysisService} from '../../../rates-analysis/rates-analysis.service';

@Component({
  selector: 'bd-iframe-wrapper',
  templateUrl: './iframe-wrapper.component.html',
  styleUrls: ['./iframe-wrapper.component.scss']
})
export class IframeWrapperComponent implements OnInit {
  name = 'Set iframe source';
  url: string = '/analytics-ui/rate-benchmarking/view-in-iframe';
  urlSafe: any;
  firmId: number;
  year: number;
  proposedRate: any;
  vendorFirmName: string;
  graduationYear: any;
  tkClassification: string;
  seniority: string;
  bdProfileId: string;

  constructor(private route: ActivatedRoute,
              public ratesService: RatesAnalysisService,
              public sanitizer: DomSanitizer) {
  }
  @HostListener('window:message', ['$event'])
  onMessage(e) {
    const x = e;
  }

  ngOnInit(): void {
    this.proposedRate = this.route.snapshot.queryParamMap.get('proposed_rate');
    this.vendorFirmName = this.route.snapshot.queryParamMap.get('vendor_name');
    this.tkClassification = this.route.snapshot.queryParamMap.get('tk_staff_classification');
   // this.tkClassification = this.tkClassification === 'PT' ? 'partner' : 'associate';
    this.bdProfileId = this.route.snapshot.queryParamMap.get('tk_id');
    this.graduationYear = Number(this.route.snapshot.queryParamMap.get('graduation_date'));

    if (!this.proposedRate) {
      this.proposedRate = 750;
      this.vendorFirmName = encodeURIComponent('Skadden, Arps, Slate, Meagher');
      this.graduationYear = 2012;
      this.tkClassification = 'PT'; // 'associate';
      this.bdProfileId = 'K0RYQ3h3dWpOK0FqbmtVa2ZiNUJZQT09'; // '6c3e288c-6953-11e7-8341-061c87c9764f'; // partner  K0RYQ3h3dWpOK0FqbmtVa2ZiNUJZQT09
      // this.bdProfileId = 'ZVJnTGQrajFML1BkNlI5Nk1ITVp0Zz09'; // '6efc29f2-6953-11e7-8341-061c87c9764f'; // associate ZVJnTGQrajFML1BkNlI5Nk1ITVp0Zz09
    }
    if (this.vendorFirmName) {
      this.url = this.url + '?proposed_rate=' + this.proposedRate.toString() + '&vendor_name=' + this.vendorFirmName + '&tk_staff_classification=' + this.tkClassification +
      '&tk_id=' + this.bdProfileId + '&graduation_date=' + this.graduationYear.toString();
    }
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
