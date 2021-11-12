import {Component, Input, OnInit} from '@angular/core';
import {IPayloadDates, IQbrReport} from '../../qbr-model';
import {QbrService} from '../../qbr.service';

@Component({
  selector: 'bd-qbr-agenda',
  templateUrl: './qbr-agenda.component.html',
  styleUrls: ['../../qbr-css.scss', './qbr-agenda.component.scss']
})
export class QbrAgendaComponent implements OnInit {
  agendaItems: Array<any>;
  scopeAnalysis: string;
  reportDates: IPayloadDates;
  @Input() qbr: IQbrReport;
  @Input() qbrData: any;
  @Input() page: number = 2;
  @Input() zoom: boolean;
  constructor(public qbrService: QbrService) {
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
    if (this.page === 4) {
      this.formatScopeItems();
    }
  }
  formatScopeItems(): void {
    const dates = this.qbrService.formatPayloadDates(this.qbr.start_date, this.qbr.report_type);
    this.reportDates = dates;
    this.scopeAnalysis = this.qbr.report_type.substring(0, 3) + ' analysis';
  }

}
