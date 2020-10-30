import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'bd-router-link-renderer',
  // template: '<a [routerLink]="[params.inRouterLink,params.value]"  (click)="navigate(params.inRouterLink)">{{params.label}}</a>',
  templateUrl: './router-link-renderer.component.html',
  styleUrls: ['./router-link-renderer.component.scss']
})
export class RouterLinkRendererComponent implements AgRendererComponent {
  params: any;

  constructor(
    private ngZone: NgZone,
    private router: Router) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  // This was needed to make the link work correctly
  navigate(link) {
    this.ngZone.run(() => {
      this.router.navigate([link, this.params.value]);
    });
  }
}
