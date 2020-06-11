import {Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { LaunchPadService } from './launchpad.service';
import { FiltersService } from '../shared/services/filters.service';
import { columns } from './launchpad.model';
import {AppStateService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../shared/services/common.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import html2canvas from 'html2canvas';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'bd-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit, OnDestroy {
  pageName = 'app.client-dashboard.launchpad';
  @ViewChild('launchpad', {static: false})
  container: ElementRef;

  @ViewChild('insights', {read: ElementRef, static: false})
  insights: ElementRef;

  cards: Array<any> = []; // cards;
  requests = {};
  columns = columns;
  launchpadImage = null;

  constructor(
    private filtersService: FiltersService,
    private launchPadService: LaunchPadService,
    public appStateService: AppStateService,
    public commonServ: CommonService
    ) {
    this.cards = this.launchPadService.configureCards();
    this.commonServ.pageTitle = 'Launchpad';
    commonServ.pageSubtitle = '';
  }

  ngOnInit() {
    this.load();
    // this.generatePDF();
  }

  load(): void {
    this.requests = this.launchPadService.fetchData();
    this.postLoad();
  }

  onCardLoaded() {
    this.postLoad();
  }

  generatePDF() {
    html2canvas(document.getElementById('launchpadtest')).then(canvas => {
      this.launchpadImage = canvas.toDataURL();
      const documentDefinition = { 
        content: [{
          image: this.launchpadImage,
          width: 500,
        }]
      };
      console.log("asynchronous nature");
      pdfMake.createPdf(documentDefinition).download();
    });
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
  postLoad() {
    // send messages back to the parent app
    if (window.parent) {
      setTimeout(() => {
        // send height of content to adjust iframe height
        const height = this.container.nativeElement.offsetHeight + this.insights.nativeElement.offsetHeight;
        window.parent.postMessage({height, from: 'child'}, '*');
      }, 100);
    }
  }
  ngOnDestroy() {
    this.commonServ.clearTitles();
  }
}
