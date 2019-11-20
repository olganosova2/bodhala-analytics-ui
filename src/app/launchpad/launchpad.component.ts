import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LaunchPadService } from './launchpad.service';
import { FiltersService } from '../shared/services/filters.service';
import { columns, cards } from './launchpad.model';

@Component({
  selector: 'bd-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit {

  @ViewChild('launchpad', {static: false})
  container: ElementRef;

  cards = cards;
  requests = {};
  columns = columns;

  constructor(
    private filtersService: FiltersService,
    private launchPadService: LaunchPadService
    ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.requests = this.launchPadService.fetchData();
    this.postLoad();
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

  postLoad() {
    if (window.parent) {
      setTimeout(() => {
        window.parent.postMessage({height: this.container.nativeElement.offsetHeight, from: 'child'}, '*');
      }, 100);
    }
  }
}
