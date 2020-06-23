import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  pageTitle: string = '';
  pageSubtitle: string = '';
  exportImage = null;
  pdfLoading: boolean = false;

  constructor() { }
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
  generatePDF(firm) {
    let docName = '';
    if (firm.firm_name) {
      docName = firm.firm_name + ' Report Card.pdf';
    } else {
      docName = 'Firm Report Card.pdf';
    }

    const exportElement = document.getElementById('pdfDiv');

    const htmlWidth = exportElement.offsetWidth;
    const htmlHeight = exportElement.offsetHeight;
    const topLeftMargin = 15;
    const pdfWidth = htmlWidth + (topLeftMargin * 2);
    const pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 2);
    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;
    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

    html2canvas(document.getElementById('pdfDiv'), {
      width: htmlWidth,
      height: htmlHeight
    }).then(canvas => {

      canvas.getContext('2d');
      this.exportImage = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jspdf('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.setFillColor('#FFFFFF');
      pdf.addImage(this.exportImage , 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
      pdf.rect(0, (pdfHeight - (topLeftMargin * 3)), pdfWidth, (topLeftMargin * 3), 'F');

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdfWidth, pdfHeight);
        pdf.addImage(this.exportImage , 'JPG', topLeftMargin, -(pdfHeight * i) + (topLeftMargin * (6 * i)), canvasImageWidth, canvasImageHeight);
        pdf.setFillColor('#FFFFFF');
        pdf.rect(0, (pdfHeight - (topLeftMargin * 3)), pdfWidth, (topLeftMargin * 3), 'F');
        pdf.rect(0, 0, pdfWidth, (topLeftMargin * 3), 'F');
      }
      pdf.save(docName);
    });


  }

  capitalize(word: string): string {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
