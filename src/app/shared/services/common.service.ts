import {Injectable} from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import {Subscription, Subject} from 'rxjs';
import {HttpService, UserService} from 'bodhala-ui-common';
import { FiltersService } from './filters.service';
// import {FirmRateCardComponent} from '../../firm/firm-rate-card/firm-rate-card.component';
// import {SavedReportsModalComponent} from '../../firm/saved-reports-modal/saved-reports-modal.component';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  pageTitle: string = '';
  pageSubtitle: string = '';
  exportImage = null;
  pdfLoading: boolean = false;
  pendingRequest: Subscription;
  invokeEvent: Subject<any> = new Subject();

  constructor(public httpService: HttpService,
              public userService: UserService,
              public filtersService: FiltersService) {}

  clearTitles(): void {
    this.pageSubtitle = '';
    this.pageTitle = '';
  }

  formatTkName(tkName: string): string {
    let result = tkName;
    if (result && result.length > 12) {
      result = result.substring(0, 12) + '...';
    }
    return result;
  }

  formatFirmName(firmName: string): string {
    let result = firmName;
    if (result && result.length > 15) {
      result = result.substring(0, 15) + '...';
    }
    return result;
  }

  formatLeadPartnerName(firmName: string): string {
    let result = firmName;
    if (result && result.length > 25) {
      result = result.substring(0, 25) + '...';
    }
    return result;
  }

  savePDFExport(firmId: string): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    let qs =  localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    qs = JSON.parse(qs);
    params.filter_set = qs;
    params.firmId = firmId;
    params.pageName = this.pageTitle;
    const savedView = localStorage.getItem('saved_filter_' + this.userService.currentUser.id.toString());
    params.savedView = savedView;
    console.log("params export: ", params);
    this.httpService.makePostRequest('saveExport', params).subscribe(
      (data: any) => {
        console.log("returned export data: ", data);
      }
    );
  }

  generatePDF(title: string, divId: string, firmId: string) {
    if (title.includes('Rate Card')) {
      this.savePDFExport(firmId);
    }
    this.pdfLoading = true;
    const docName = title ? title : 'Export PDF';
    const exportElement = document.getElementById(divId);
    const footerDiv = document.createElement('DIV');
    const logo = new Image();
    if (title === 'Executive Summary' || title.includes('Rate Card')) {
      footerDiv.innerHTML = 'Powered by';
      footerDiv.style.fontSize = '22px';
      footerDiv.style.fontFamily = 'Sharp Sans';
      footerDiv.style.textAlign = 'center';

      logo.src = '../../../analytics-ui/assets/images/new_logo.png';
      logo.style.height = '40px';
      logo.style.width = 'auto';
      logo.style.display = 'block';
      logo.style.marginLeft = 'auto';
      logo.style.marginRight = 'auto';
      footerDiv.appendChild(logo);

      exportElement.appendChild(footerDiv);
    }

    const htmlWidth = exportElement.offsetWidth;
    const htmlHeight = exportElement.offsetHeight;
    const topLeftMargin = 15;
    const pdfWidth = htmlWidth + (topLeftMargin * 2);
    const pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 2);
    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;
    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

    if (totalPDFPages > 3) {
      exportElement.removeChild(footerDiv);
      footerDiv.removeChild(logo);
      const bodhalaName = document.createElement('DIV');
      bodhalaName.innerHTML = 'Bodhala';
      bodhalaName.style.fontSize = '28px';
      bodhalaName.style.fontFamily = 'Sharp Sans';
      bodhalaName.style.textAlign = 'center';
      footerDiv.appendChild(bodhalaName);
      exportElement.appendChild(footerDiv);
    }

    html2canvas(document.getElementById(divId), {
      useCORS: true,
      width: htmlWidth,
      height: htmlHeight,
      scrollY: -window.scrollY,
      scrollX: 0
    }).then(canvas => {

      canvas.getContext('2d');
      this.exportImage = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jspdf('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.setFillColor('#FFFFFF');
      pdf.addImage(this.exportImage, 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
      pdf.rect(0, (pdfHeight - (topLeftMargin * 3)), pdfWidth, (topLeftMargin * 3), 'F');

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdfWidth, pdfHeight);
        pdf.addImage(this.exportImage, 'JPG', topLeftMargin, -(pdfHeight * i) + (topLeftMargin * (6 * i)), canvasImageWidth, canvasImageHeight);
        pdf.setFillColor('#FFFFFF');
        pdf.rect(0, (pdfHeight - (topLeftMargin * 3)), pdfWidth, (topLeftMargin * 3), 'F');
        pdf.rect(0, 0, pdfWidth, (topLeftMargin * 3), 'F');
      }
      pdf.save(docName);
      this.pdfLoading = false;
      if (title === 'Executive Summary' || title.includes('Rate Card')) {
        exportElement.removeChild(footerDiv);
      }
    })
      .catch(() => {
        /* This is fired when the promise executes without the DOM */
      });
  }

  capitalize(word: string): string {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
