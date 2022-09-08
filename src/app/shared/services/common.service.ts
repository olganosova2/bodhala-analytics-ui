import {Injectable} from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import {Subscription} from 'rxjs';
import {HttpService, UserService} from 'bodhala-ui-common';
import { FiltersService } from './filters.service';

import {IUiAnnotation} from '../components/annotations/model';
import {HELP_MODAL_CONFIG} from './config';
import {HelpModalComponent} from '../components/help-modal/help-modal.component';
import {MatDialog} from '@angular/material/dialog';
import * as _moment from 'moment';

const moment = _moment;

export interface IClient {
  bh_client_id: number;
  org_id: number;
  org_name: string;
}
export interface IHeaderColumn {
  label: string;
  field: string;
  direction?: number;
  width?: string;
}
export interface IBenchmarkFirm {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  pageTitle: string = '';
  pageSubtitle: string = '';
  exportImage = null;
  pdfLoading: boolean = false;
  pendingRequest: Subscription;
  pendingRequestHelp: Subscription;
  editorStyle = {
    height: '150px'
  };

  constructor(public httpService: HttpService,
              public userService: UserService,
              public filtersService: FiltersService,
              public dialog: MatDialog) {}

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
    this.httpService.makePostRequest('saveExport', params).subscribe(
      (data: any) => {
      }
    );
  }

  generatePdfOuter(title: string, divId: string, firmId: string) {
    this.pdfLoading = true;
    this.generatePDF(title, divId, firmId);
  }

  generatePDF(title: string, divId: string, firmId: string, orientation: string = 'p') {
    if (title.includes('Report Card')) {
      this.savePDFExport(firmId);
    }
    this.pdfLoading = true;
    let adjusters = [1, 1];
    if (orientation === 'l') {
      // adjusters = [1.75, 1.52];
      adjusters = [1.75, 1.52];
    }
    const docName = title ? title : 'Export PDF';
    const exportElement = document.getElementById(divId);
    if (!exportElement) {
      return;
    }
    const footerDiv = document.createElement('DIV');
    const logo = new Image();
    if (title === 'Executive Summary' || title.includes('Report Card')) {
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

      // const pdf = new jspdf(orientation, 'pt', [pdfWidth, pdfHeight]);
      const pdf = new jspdf(orientation, 'pt', [pdfWidth / adjusters[0], pdfHeight / adjusters[1]]);
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
      if (title === 'Executive Summary' || title.includes('Report Card')) {
        exportElement.removeChild(footerDiv);
      }
    })
      .catch(() => {
        this.pdfLoading = false;
        /* This is fired when the promise executes without the DOM */
      });
  }

  generatePDFQbr(title: string, divId: string) {
    this.pdfLoading = true;
    const docName = title ? title : 'Export PDF';
    const exportElement = document.getElementById(divId);
    const htmlHeight = exportElement.offsetHeight;
    const topLeftMargin =  0;
    const htmlWidth = 1920;
    const pdfHeight = 1080;
    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

    html2canvas(document.getElementById(divId), {
      useCORS: true,
      width: htmlWidth,
      height: htmlHeight,
      scrollY: -window.scrollY,
      scrollX: 0
    }).then(canvas => {

      canvas.getContext('2d');
      this.exportImage = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jspdf('l', 'pt', [htmlWidth, pdfHeight]);

      pdf.setFillColor('#FFFFFF');
      pdf.addImage(this.exportImage, 'JPG', topLeftMargin, topLeftMargin, htmlWidth, htmlHeight);
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(htmlWidth, pdfHeight);
        pdf.addImage(this.exportImage, 'JPG', topLeftMargin, -(pdfHeight * i), htmlWidth, htmlHeight);
        pdf.setFillColor('#FFFFFF');
      }
      pdf.save(docName);
      this.pdfLoading = false;
    })
      .catch(() => {
        this.pdfLoading = false;
        /* This is fired when the promise executes without the DOM */
      });
  }

  generatePdfRateBM(title: string, divId: string) {
    this.pdfLoading = true;
    const adjusters = [1, 1];
    const docName = title ? title : 'Export PDF';
    const exportElement = document.getElementById(divId);
    if (!exportElement) {
      return;
    }

    const htmlWidth = exportElement.offsetWidth;
    const htmlHeight = exportElement.offsetHeight;
    const topLeftMargin = 0;
    const pdfWidth = htmlWidth + (topLeftMargin * 2);
    let pdfHeight = htmlHeight;
    if (pdfHeight < pdfWidth) {
      pdfHeight = pdfWidth;
    }
    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;
    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

    html2canvas(document.getElementById(divId), {
      useCORS: true,
      width: htmlWidth,
      height: htmlHeight,
      scrollY: -window.scrollY,
      scrollX: 0
    }).then(canvas => {

      canvas.getContext('2d');
      this.exportImage = canvas.toDataURL('image/jpeg', 1.0);

      // const pdf = new jspdf(orientation, 'pt', [pdfWidth, pdfHeight]);
      const pdf = new jspdf('p', 'pt', [pdfWidth / adjusters[0], pdfHeight / adjusters[1]]);
      pdf.setFillColor('#FFFFFF');
      pdf.addImage(this.exportImage, 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
      pdf.rect(0, (pdfHeight - (topLeftMargin * 3)), pdfWidth, (topLeftMargin * 3), 'F');
      pdf.save(docName);
      this.pdfLoading = false;
    })
      .catch(() => {
        this.pdfLoading = false;
        /* This is fired when the promise executes without the DOM */
      });
  }

  capitalize(word: string): string {
    if (!word) {
      return '';
    }
    word = word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  lowCaseFirstLetter(word: string): string {
    if (!word) {
      return '';
    }
    return word.charAt(0).toLowerCase() + word.slice(1);
  }
  formatPath(path: string): string {
    let result = path;
    const ix = path.indexOf('?');
    if (ix >= 0) {
      result = path.substring(0, ix);
    }
    return result;
  }
  formatHtml(text: string): string {
    return text.replace(/\n/g, '<br/>');
  }
  formatInitials(note: IUiAnnotation): string {
    let firstLetter = '';
    let secondLetter = '';
    if (note.first_name && note.first_name.length > 0) {
      firstLetter = note.first_name.substring(0, 1);
    }
    if (note.last_name && note.last_name.length > 0) {
      secondLetter = note.last_name.substring(0, 1);
    }
    return firstLetter + secondLetter;
  }
  scrollToId(el: HTMLElement): void {
    el.scrollIntoView();
  }
  openHelpArticle(articleId: string): void {
    const params = {id: articleId};
    this.pendingRequestHelp = this.httpService.makeGetRequest('getTrainingMaterialsArticle', params).subscribe(
      (data: any) => {
        if (data.result) {
          const article = data.result;
          const modalConfig = {...HELP_MODAL_CONFIG, data: Object.assign([], article)};
          const dialogRef = this.dialog.open(HelpModalComponent, {...modalConfig });
        }
      }
    );
  }
  getClientPASetting(): string {
    let result = 'Client Practice Areas'; // make default
    if (this.userService.config !== undefined) {
      if ('analytics.practice.bodhala.areas' in this.userService.config) {
        const userConfigs = Object.values(this.userService.config);
        for (const config of userConfigs) {
          if (config.configs[0].description === 'config for analytics practice areas') {
            result = config.configs[0].value;
            break;
          }
        }
      }
    }
    return result;
  }
  sortDates(valueA: string, valueB: string): number {
    const dateA = new Date(valueA.substring(0, 10)).getTime();
    const dateB = new Date(valueB.substring(0, 10)).getTime();
    if (dateA === dateB) {
    return 0;
  }
    return dateA > dateB ? 1 : -1;
  }
  getStandardDeviation(array: Array<number>): number {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
  }
  numberOnly(event): boolean {
    const charCode = event.keyCode;
    if (charCode >= 44 && charCode <=  46) {
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  capitalizeFirstLetter(word: string): string {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  getClientConfigJson(setting: string): any {
    let result = null; // make default
    if (this.userService.config !== undefined) {
      const prop = this.userService.config[setting];
      if (!prop) {
        return result;
      }
      result = prop.configs[0] ? prop.configs[0].json_config : null;
    }
    return result;
  }
  getPageId(): string {
    return this.pageTitle + ' > ' + this.pageSubtitle;
  }
  saveReport(firmId: number, filterSet: any): any {
    const params = {} as any;
    params.filter_set = filterSet;
    params.firmId = firmId;
    params.pageName = this.getPageId();
    const saved = localStorage.getItem('saved_filter_' + this.userService.currentUser.id.toString());
    const savedView = saved ? saved : null;
    params.savedView = savedView;
    return this.httpService.makePostRequest('saveExport', params);
  }
  formatDatesPickerFilter(startDate: string, endDate: string): any {
    const tempFilters = localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    const tempFiltersDict = JSON.parse(tempFilters);
    let savedMaxDate = moment().format('YYYT-MM-DD');
    let savedMinDate = moment().add(-10, 'years').format('YYYT-MM-DD');
    const found = tempFiltersDict.dataFilters.find(e => e.fieldName === 'dateRange');
    if (found) {
      savedMaxDate = found.maxDate;
      savedMinDate = found.minDate;
    }
    return {
      display: true,
      displayName: 'Date Range',
      exclude: false,
      fieldName: 'dateRange',
      filterGroup: 'Dates',
      isCapped: false,
      isMatterTag: false,
      matterCollection: '',
      maxDate: savedMaxDate,
      maxRange: 0,
      minDate: savedMinDate,
      minRange: 0,
      options: null,
      ordered: false,
      preload: 0,
      step: null,
      type: 'DATERANGE',
      value: { startDate: moment(startDate), endDate: moment(endDate) }
    };
  }
}

