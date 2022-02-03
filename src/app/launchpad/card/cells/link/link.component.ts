import {Component, Input, OnInit} from '@angular/core';
import { ICell } from '../cell.interface';
import { BaseCell} from '../base-cell';
import { Router} from '@angular/router';
import {CommonService} from '../../../../shared/services/common.service';

@Component({
  selector: 'bd-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent extends BaseCell implements OnInit, ICell {
  constructor(public router: Router, public commonServ: CommonService) {
    super(router, commonServ);
  }
  ngOnInit() {
  }

  onClick(data) {
    // add ' - [Smart]' to smart PA link in cards to ensure smart PA detail page loads correctly
    if (data.link_name) {
      data.practice_area = data.link_name;
      if (data.seniority) {
        data.top_practice = data.link_name;
      }
      if (data.client_matter_type) {
        data.client_matter_type = data.link_name;
      }
    }
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
      const etc = encodeURIComponent(data.id);
      data.id = encodeURIComponent(etc);
    }
    if (data.top_matter_id) {
      const etc = encodeURIComponent(data.top_matter_id);
      data.top_matter_id = encodeURIComponent(etc);
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
