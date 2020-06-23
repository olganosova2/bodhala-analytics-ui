import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  pageTitle: string = '';
  pageSubtitle: string = '';
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
  capitalize(word: string): string {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
