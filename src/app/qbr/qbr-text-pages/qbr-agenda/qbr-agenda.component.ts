import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bd-qbr-agenda',
  templateUrl: './qbr-agenda.component.html',
  styleUrls: ['../../qbr-css.scss', './qbr-agenda.component.scss']
})
export class QbrAgendaComponent implements OnInit {
 agendaItems: Array<any>;
  constructor() {
    this.agendaItems = [
      {num: 'I.', label: 'Progress Update'},
      {num: 'V.', label: 'Deep Dives: Practice Area, Firms & Matters'},
      {num: 'II.', label: 'Executive Summary'},
      {num: 'VI.', label: 'Next steps: Action & Impact'},
      {num: 'III.', label: 'Key Trends'},
      {num: 'VII.', label: 'Free Benchmark Sample & High Impact Opportunities'},
      {num: 'IV.', label: 'Insights & Opportunities'}
    ];
  }

  ngOnInit(): void {
  }

}
