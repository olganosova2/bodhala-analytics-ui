import {Component, Input, OnInit} from '@angular/core';
import { ICell } from '../cell.interface';
import { BaseCell } from '../base-cell';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../../../shared/services/filters.service';
import {CommonService} from '../../../../shared/services/common.service';

@Component({
  selector: 'bd-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent extends BaseCell implements OnInit, ICell {
  constructor(public router: Router) {
    super(router);
  }
  ngOnInit() {
  }

  onClick(data) {
    if (this.column.route) {
      this.router.navigate([this.column.route, data[this.column.route_params]]);
    } else if (this.column.href) {
      this.goToView(this.column.href, data);
    }
    if (this.column.action) {
      this.column.action(data);
    }
    this.clicked.emit({column: this.column, data});
  }

  goToView(hrefTemplate, data): void {
    if (data.id) {
      const enc = encodeURIComponent(data.id);
      data.id = encodeURIComponent(enc);
    }
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
