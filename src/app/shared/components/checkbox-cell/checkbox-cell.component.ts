import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import {AgRendererComponent, ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'bd-checkbox-cell',
  templateUrl: './checkbox-cell.component.html',
  styleUrls: ['./checkbox-cell.component.scss']
})
export class CheckboxCellComponent implements AgRendererComponent {

  @ViewChild('.checkbox') checkbox: ElementRef;

  public params: ICellRendererParams;

  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: any): boolean {
    return false;
  }

  public onChange(event) {
    if (event.checked) {
      // @ts-ignore
      this.params.onAdd(this.params);
    } else {
      // @ts-ignore
      this.params.onDelete(this.params);
    }
  }

}
