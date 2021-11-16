import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'bd-router-link-renderer',
  templateUrl: './router-link-renderer.component.html',
  styleUrls: ['./router-link-renderer.component.scss']
})
export class RouterLinkRendererComponent implements AgRendererComponent {
  params: any;

  constructor(
    public ngZone: NgZone,
    public router: Router) { }

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
  navigateWithId(link) {
    this.ngZone.run(() => {
      this.router.navigate([link], { queryParams: { id: this.params.node.data.id } });
    });
  }
}
