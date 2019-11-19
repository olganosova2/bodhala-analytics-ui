import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import {FiltersService} from '../shared/services/filters.service';
import {TopMattersComponent} from '../top-matters/top-matters.component';

@Component({
  selector: 'bd-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit {

  @ViewChild('launchpad', {static: false})
  container: ElementRef;

  @ViewChild(TopMattersComponent, {static: true}) topMatters: TopMattersComponent;

  constructor(private filtersService: FiltersService) { }

  ngOnInit() {
  }

  load(): void {
    this.topMatters.load().subscribe(() => {
      this.postLoad();
    });
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
