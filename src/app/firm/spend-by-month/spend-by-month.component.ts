import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as _moment from 'moment';
import {IFirm, spendByMonthOptions} from '../firm.model';
import {IPracticeArea} from '../../practice-area/practice-area.model';
import {Subscription} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';

const moment = _moment;

@Component({
  selector: 'bd-spend-by-month',
  templateUrl: './spend-by-month.component.html',
  styleUrls: ['./spend-by-month.component.scss']
})
export class SpendByMonthComponent implements OnInit, OnDestroy {
  spend: Array<any> = [];
  includeExpenses: boolean = false;
  chart: any = {};
  options: any;
  @Input() practiceArea: IPracticeArea;
  @Input() firmId: number;
  @Input() firm: IFirm;
  @Input() bodhalaPA: boolean;
  pendingRequest: Subscription;
  @ViewChild('spendByMonthDiv') spendByMonthDiv: ElementRef<HTMLElement>;

  constructor(private httpService: HttpService,
              public filtersService: FiltersService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart();
  }

  ngOnInit() {
    this.options = Object.assign({}, spendByMonthOptions);
    this.getSpendByMonth();
  }

  getSpendByMonth(): void {
    const params = this.filtersService.getCurrentUserCombinedFilters();
    const arr = [];
    if (this.firmId) {
      arr.push(this.firmId.toString());
      params.firms = JSON.stringify(arr);
    }
    if (this.practiceArea) {
      arr.push(this.practiceArea.client_matter_type);
      if (this.bodhalaPA === true) {
        params.bdPracticeAreas = JSON.stringify(arr);
      } else {
        params.practiceAreas = JSON.stringify(arr);
      }
    }
    this.pendingRequest = this.httpService.makeGetRequest('spendByMonth', params).subscribe(
      (data: any) => {
        this.spend = data.result;
        this.renderChart();
      }
    );
  }

  renderChart(): void {
    const result = [];
    for (const rec of this.spend) {
      const date = moment(rec.month).valueOf();
      const row = [date, this.filtersService.includeExpenses ? rec.total + rec.expenses : rec.total];
      result.push(row);
    }
    setTimeout(() => {
      this.chart.series[0].setData(result);
      this.resizeChart();
    });
  }

  resizeChart(): void {
    const width = this.spendByMonthDiv.nativeElement.offsetWidth - 50;
    // const height = this.spendByMonthDiv.nativeElement.offsetHeight - 10;
    try {
      this.chart.setSize(width, 450, false);
    } catch (err) {
      return;
    }
  }

  saveInstance(chartInstance): void {
    this.chart = chartInstance;
  }

  ngOnDestroy() {
    if (this.pendingRequest) {
      this.pendingRequest.unsubscribe();
    }
  }
}

