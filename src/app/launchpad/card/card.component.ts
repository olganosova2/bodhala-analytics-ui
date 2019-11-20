import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'bd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  header;

  @Input()
  columns: Array<any>;

  @Input()
  request: Promise<any>;

  @Output()
  selected: EventEmitter = new EventEmitter();

  data: [];
  displayedColumns = [];

  constructor() { }

  async ngOnInit() {
    this.displayedColumns = this.columns.map(col => col.field);
    const response =  await this.request;
    this.data = response.result || response;
  }

  onClick(row) {
    row.action(row);
    this.selected.emit(row);
  }
}
