import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bd-score-badge',
  templateUrl: './score-badge.component.html',
  styleUrls: ['./score-badge.component.scss']
})
export class ScoreBadgeComponent implements OnInit {
  label: string = 'N/A';
  calculatedClass: string = '';
  @Input() bpr: boolean = false;
  @Input() percentale: number = 0;

  constructor() { }

  ngOnInit() {
   this.formatCard();
  }
  formatCard(): void {
    if (this.percentale === null || this.percentale === undefined) {
      return;
    }
    if (this.percentale >= .7) {
      this.calculatedClass = this.bpr ? 'score-badge-excellent-blank' : 'score-badge-excellent';
      this.label = 'Good';
    }
    if (this.percentale >= .3 && this.percentale < .7) {
      this.calculatedClass = this.bpr ? 'score-badge-fair-blank' :  'score-badge-fair';
      this.label = 'Fair';
    }
    if (this.percentale < .3 && this.percentale >= 0) {
      this.calculatedClass = this.bpr ? 'score-badge-poor-blank' : 'score-badge-poor';
      this.label = 'Poor';
    }
  }
}
