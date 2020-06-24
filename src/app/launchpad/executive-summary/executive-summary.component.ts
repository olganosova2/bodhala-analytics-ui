import {Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import { ExecutiveSummaryService } from './executive-summary.service';
import { FiltersService } from '../../shared/services/filters.service';
import { columns } from './executive-summary.model';
import {HttpService} from 'bodhala-ui-common';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'bd-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.scss']
})
export class ExecutiveSummaryComponent implements OnInit {

  cards: Array<any> = [];
  requests = {};
  columns = columns;

  constructor(
    private filtersService: FiltersService,
    private executiveSummaryService: ExecutiveSummaryService,
    public httpService: HttpService,
    public commonServ: CommonService
    ) {
      // this.cards = this.executiveSummaryService.configureCards();
    }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.requests = this.executiveSummaryService.fetchData();
    // this.postLoad();
  }

  onCardLoaded() {
    // this.postLoad();
  }

  // bubbled up from card/cell clicks
  onClick(item) {
    // TODO - optionally handle click scenarios here
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (event.data.from !== 'child') {
      this.receiveMessage(event);
    }
  }

  receiveMessage(event) {
    // event.data contains the filters from the angularjs app
    this.filtersService.setCurrentUserFilters();
    this.load();
  }
  // postLoad() {
  //   // send messages back to the parent app
  //   if (window.parent) {
  //     setTimeout(() => {
  //       // send height of content to adjust iframe height
  //       const height = this.container.nativeElement.offsetHeight + this.insights.nativeElement.offsetHeight;
  //       window.parent.postMessage({height, from: 'child'}, '*');
  //     }, 100);
  //   }
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
