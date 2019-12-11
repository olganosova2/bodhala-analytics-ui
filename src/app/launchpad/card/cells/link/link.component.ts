import {Component, Input, OnInit} from '@angular/core';
import { ICell } from '../cell.interface';
import { BaseCell } from '../base-cell';

@Component({
  selector: 'bd-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent extends BaseCell implements OnInit, ICell {
  ngOnInit() {
  }

  onClick(data) {
    if (this.column.href) {
      this.goToView(this.column.href, data);
    }
    if (this.column.action) {
      this.column.action(data);
    }
    this.clicked.emit({column: this.column, data});
  }

  goToView(hrefTemplate, data): void {
    const href = this.inject(hrefTemplate, data);
    const w = window.parent ? window.parent : window;
    w.location.href = href;
  }

  inject(template, obj) {
    const keys = Object.keys(obj);
    const func = Function(...keys, 'return `' + template + '`;');
    return func(...keys.map(k => obj[k]));
  }
}
