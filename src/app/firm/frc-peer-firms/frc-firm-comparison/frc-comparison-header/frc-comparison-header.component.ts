import { Component, OnInit } from '@angular/core';
import {IHeaderAngularComp} from 'ag-grid-angular';
import {IHeaderParams} from 'ag-grid-community';

@Component({
  selector: 'bd-frc-comparison-header',
  templateUrl: './frc-comparison-header.component.html',
  styleUrls: ['./frc-comparison-header.component.scss']
})
export class FrcComparisonHeaderComponent implements IHeaderAngularComp {
  public params: IHeaderParams;

  constructor() { }

  agInit(params: IHeaderParams): void {
    this.params = Object. assign({}, params) as any;
  }
  refresh(params: any): boolean {
    return false;
  }
  navigate(evt: any): void {
    // @ts-ignore
   this.params.goTo(this.params.column);
  }

}
