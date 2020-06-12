import {Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { LaunchPadService } from './launchpad.service';
import { FiltersService } from '../shared/services/filters.service';
import { columns } from './launchpad.model';
import {AppStateService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../shared/services/common.service';
import {UserService} from 'bodhala-ui-common';
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
  logoImage = null;

  constructor(
    private filtersService: FiltersService,
    private launchPadService: LaunchPadService,
    public appStateService: AppStateService,
    public userService: UserService,
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

    pdfMake.fonts = {
      sharpSansDisplay: {
        normal: 'SharpSansDispNo1-Bold.ttf'
      }
    }
    let clientName = this.userService.currentUser.client_info.org.name;
    clientName += ' Executive Summary';

    let logoDiv = document.createElement('div');
    logoDiv.style.height = '40.67px';
    logoDiv.style.width = '198.83px';
    logoDiv.id = 'logoDiv';
    let logoImg = document.createElement('img');
    logoImg.style.height = '40.67px';
    logoImg.style.width = '198.83px';
    logoImg.src = 'assets/images/new_logo.png';
    logoDiv.appendChild(logoImg);
    document.body.append(logoDiv);
    html2canvas(document.getElementById('logoDiv')).then(canvas => {
      
      this.logoImage = canvas.toDataURL();

      document.body.removeChild(logoDiv);

      html2canvas(document.getElementById('launchpadtest')).then(canvas => {

        this.launchpadImage = canvas.toDataURL();

        const documentDefinition = { 
          pageMargins: [40, 100, 40, 60],
          header: {
            margin: 8,
            columns: [
              {
                table: {
                  widths: ['50%', '50%'],
                  body: [
                    [
                      { 
                        image: this.logoImage, alignment: 'center',
                        width: 200, height: 45,
                      },
                      { 
                        text: clientName, font: 'sharpSansDisplay', fontSize: 24, alignment: 'center',
                        width: 80, height: 100,
                      }
                    ]
                  ]
                },
                layout: 'noBorders',
                background: 'light gray'
              }
            ],
          },
          content: [{
            image: this.launchpadImage,
            width: 500,
          }]
        };

        pdfMake.createPdf(documentDefinition).download();
      });
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
