import {Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { LaunchPadService } from './launchpad.service';
import { FiltersService } from '../shared/services/filters.service';
import {DatePipe} from '@angular/common';
import { columns } from './launchpad.model';
import {AppStateService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../shared/services/common.service';
import {UserService} from 'bodhala-ui-common';

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
    public commonServ: CommonService,
    private datePipe: DatePipe
    ) {
    this.cards = this.launchPadService.configureCards();
    this.commonServ.pageTitle = 'Launchpad';
    commonServ.pageSubtitle = '';
  }

  ngOnInit() {
    this.load();
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
    const clientName = this.userService.currentUser.client_info.org.name;

    const dateRange = '';

    const logoDiv = document.createElement('div');
    logoDiv.style.height = '120px';
    logoDiv.style.width = '600px';
    logoDiv.style.alignContent = 'middle';
    logoDiv.id = 'logoDiv';
    logoDiv.style.textAlign = 'center';

    const logoImg = document.createElement('img');
    logoImg.style.height = '20px';
    logoImg.style.width = '99.42px';
    logoImg.style.top = '30px';
    logoImg.style.display = 'inline';
    logoImg.src = 'assets/images/new_logo.png';

    const clientText = document.createElement('div');
    clientText.textContent = clientName + ' - Executive Summary';
    clientText.style.fontFamily = 'Sharp Sans Display';
    clientText.style.fontSize = '18px';
    clientText.style.textAlign = 'center';

    const params = this.filtersService.getCurrentUserCombinedFilters();
    // console.log('params: ', params);
    const startDate = this.datePipe.transform(params.startdate, 'MMMM yyyy');
    const endDate = this.datePipe.transform(params.enddate, 'MMMM yyyy');
    console.log('dates: ', startDate, endDate);
    const dateText = document.createElement('div');
    dateText.style.fontFamily = 'Sharp Sans';
    dateText.style.fontSize = '12px';
    dateText.textContent = 'Active Date Range: ' + startDate + ' - ' + endDate;

    //  const label = this.datePipe.transform(rec.month, 'MMM yyyy');

    logoDiv.appendChild(logoImg);
    // logoDiv.appendChild(esText);
    logoDiv.appendChild(clientText);
    logoDiv.appendChild(dateText);
    document.body.append(logoDiv);
    html2canvas(document.getElementById('logoDiv')).then(canvas => {

      this.logoImage = canvas.toDataURL();

      // document.body.removeChild(logoDiv);

      html2canvas(document.getElementById('launchpadtest')).then(canvas => {

        this.launchpadImage = canvas.toDataURL();

        const documentDefinition = {
          pageMargins: [40, 0, 40, 60],
          header: {
            margin: 8,
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        image: this.logoImage,
                        width: 600, height: 120, alignment: 'center'
                      }
                    ]
                  ]
                },
                layout: 'noBorders'
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

// header: {
//   margin: 8,
//   columns: [
//     {
//       table: {
//         widths: ['50%', '50%'],
//         body: [
//           [
//             {
//               image: this.logoImage, alignment: 'center',
//               width: 200, height: 45,
//             },
//             {
//               text: clientName, font: 'sharpSansDisplay', fontSize: 24, alignment: 'center',
//               width: 80, height: 100,
//             }
//           ]
//         ]
//       },
//       layout: 'noBorders'
//     }
//   ],
// },
