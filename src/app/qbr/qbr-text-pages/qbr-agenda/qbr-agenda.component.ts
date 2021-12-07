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
  @Input() pageNum: number = 2;
  @Input() zoom: boolean;
  constructor(public qbrService: QbrService) {
    this.agendaItems = [
      {num: 'I.', label: 'Executive Summary'},
      {num: 'IV.', label: 'Deep Dives: Practice Area, Firms & Matters'},
      {num: 'II.', label: 'Key Trends'},
      {num: 'V.', label: 'Next steps: Action & Impact'},
      {num: 'III.', label: 'Insights & Opportunities'},
    ];
  }

  ngOnInit(): void {
    if (this.pageNum === 3) {
      this.formatScopeItems();
    }
  }
  formatScopeItems(): void {
    const dates = this.qbrService.formatPayloadDates(this.qbr.start_date, this.qbr.report_type);
    this.reportDates = dates;
    this.scopeAnalysis = this.qbr.report_type.substring(0, 3) + ' analysis';
  }

}
