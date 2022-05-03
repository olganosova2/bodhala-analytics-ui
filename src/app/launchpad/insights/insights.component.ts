import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpService, UtilService} from 'bodhala-ui-common';
import {IInsight} from './models';
import {Subscription} from 'rxjs';
import * as config from '../../shared/services/config';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'bd-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  insights: Array<IInsight> = [];
  selectedInsight: IInsight;
  pendingRequest: Subscription;
  @Output() insightsLoaded: EventEmitter<any> = new EventEmitter<boolean>();
  constructor(private httpService: HttpService,
              public utilService: UtilService) { }

  ngOnInit() {
    this.loadInsights();
  }
  loadInsights(): void {
    this.pendingRequest = this.httpService.makeGetRequest<IInsight>('getClientInsights').subscribe(
      (data: any) => {
        this.insights = data.result.sort(this.utilService.dynamicSort('insight_type'));
        this.insights = this.insights.filter(e => e.insight_type !== 'Matter' && e.insight_type !== 'RateBM');
        if (this.insights.length > 0) {
          this.selectedInsight = this.insights[0];
          setTimeout(() => {
            this.insightsLoaded.emit(true);
          });
        }
      }
    );
  }
  selectInsight(ix: number): void {
    this.selectedInsight = this.insights[ix];
  }
  goToView(page: string): void {
    let link = '';
    switch (page) {
      case  'BB':
        link = config.outerAppLinks.viewBlockBilling;
        break;
      default: {
        link = config.outerAppLinks.viewBlockBilling;
        break;
      }
    }
    const w = window.parent ? window.parent : window;
    w.location.href = environment.host + link;
  }

}
