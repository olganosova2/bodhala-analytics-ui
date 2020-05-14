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
}
