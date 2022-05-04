import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IHeaderColumn} from '../../services/common.service';

@Component({
  selector: 'bd-table-header-sort',
  templateUrl: './table-header-sort.component.html',
  styleUrls: ['./table-header-sort.component.scss']
})
export class TableHeaderSortComponent implements OnInit {
  @Input() column: IHeaderColumn;
  @Output() sortDirectionChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  changeDirection(): void {
    if (!this.column.direction) {
      this.column.direction = 1;
    } else {
      this.column.direction =  -this.column.direction;
    }
    this.sortDirectionChanged.emit(this.column);
  }

}
