import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  pageTitle: string = '';
  pageSubtitle: string = '';

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
}
