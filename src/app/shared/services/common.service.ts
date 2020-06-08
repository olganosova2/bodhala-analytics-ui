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
}
