import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IInsight} from '../models';
import {IInsightType} from '../../../launchpad/insights/models';


@Component({
  selector: 'bd-insights-card',
  templateUrl: './insights-card.component.html',
  styleUrls: ['./insights-card.component.scss'],
})
export class InsightsCardComponent implements OnInit {
  maxlength: number = 200;
  @Input() insight: IInsight;
  @Output() saveRequested = new EventEmitter<IInsight>();
  constructor() { }

  ngOnInit() {
    if (this.insight && (this.insight.insight_type === IInsightType.Matter || this.insight.insight_type === IInsightType.RateBM )) {
      this.maxlength = 2000;
    }
  }
  saveInsight(): void {
    this.saveRequested.emit(this.insight);
  }
  validateForm(): boolean {
    return (!this.insight.title || !this.insight.description);
  }
  toggle(): void {
    this.insight.is_enabled = !this.insight.is_enabled;
  }
}
