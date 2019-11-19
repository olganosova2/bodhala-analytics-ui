import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'bd-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit {

  @ViewChild('launchpad', {static: false})
  container: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  load(): void {

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
    // TODO - pass the filters to load() or set local storage
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
