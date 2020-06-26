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
    // this.getExecutiveSummaryData();
  }

  // getExecutiveSummaryData(): void {
  //   this.isLoaded = false;
  //   const params = this.filtersService.getCurrentUserCombinedFilters(true);
  //   let d = new Date(new Date().getFullYear(), 0 , 1);
  //   let janOne = new Date(d).toISOString().slice(0, 10);
  //   janOne = janOne.replace('2020', '2019');
  //   let today = new Date().toISOString().slice(0, 10);
  //   params.startdate = janOne;
  //   params.enddate = today;
  //   console.log("params: ", params);

  //   this.pendingRequest = this.httpService.makeGetRequest('getExecutiveSummaryData', params).subscribe(
  //     (data: any) => {
  //       this.summary = data.result;
  //       if (data.result) {
  //         this.topFirms = data.result.firms;
  //         this.topFirmsByPA = data.result.firmsByPA;
  //         this.topMatters = data.result.matters;
  //         this.topMattersByPA = data.result.mattersByPA;
  //         this.topTKs = data.result.timekeepers;
  //         this.topTKsByPA = data.result.timekeepersByPA;

  //       }
  //       this.processFirmsData();
  //       // this.processMattersData();
  //       this.processTKData();
  //       this.isLoaded = true;
      
  //     },
  //     err => {
  //       this.errorMessage = err;
  //       this.isLoaded = true;
  //     }
  //   );
  // }
  // processFirmsData(): void {
  //   console.log("firms: ", this.topFirms);

  // }
  // processTKData(): void {
  //   for (let tk of this.topTKs) {
  //     if (tk.atty_hours > 0 && (tk.atty_hours !== null || tk.atty_hours !== undefined)) {
  //       tk.blended_rate = tk.atty_billed / tk.atty_hours;
  //     }
  //     if (tk.closed_matters > 0 && (tk.closed_matters !== null || tk.closed_matters !== undefined)) {
  //       tk.avg_matter_cost = tk.matter_cost_closed / tk.closed_matters;
  //     }
  //     tk.partner_billed_per = tk.total_partner_billed / tk.total_billed;
  //   }
  //   for (let tk of this.topTKsByPA) {
  //     if (tk.atty_hours > 0 && (tk.atty_hours !== null || tk.atty_hours !== undefined)) {
  //       tk.blended_rate = tk.atty_billed / tk.atty_hours;
  //     }
  //     if (tk.closed_matters > 0 && (tk.closed_matters !== null || tk.closed_matters !== undefined)) {
  //       tk.avg_matter_cost = tk.matter_cost_closed / tk.closed_matters;
  //     }
  //     tk.partner_billed_per = tk.total_partner_billed / tk.total_billed;
  //   }
  //   console.log("tk: ", this.topTKs);
  // }

  // hideShowFilters() {
  //   let temp = document.getElementById('filtersdiv');
  //   if (temp.style.display === '') {
  //     temp.style.display = 'None';
  //   } else if (temp.style.display === 'None' || temp.style.display === 'none') {
  //     temp.style.display = '';
  //   }
  // }
  ngOnDestroy() {
    this.commonServ.clearTitles();
  }

}
