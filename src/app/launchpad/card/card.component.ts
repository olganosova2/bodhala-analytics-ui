import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  clicked: EventEmitter<any> = new EventEmitter();

  data: [];
  displayedColumns = [];

  constructor() { }

  async ngOnInit() {
    this.displayedColumns = this.columns.map(col => col.field);
    const response =  await this.request;
    this.data = response.result || response;
  }

  // bubbled up from cell clicks
  onClick(row) {
    this.clicked.emit(row);
  }
}
