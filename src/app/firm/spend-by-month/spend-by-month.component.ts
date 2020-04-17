import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as _moment from 'moment';
import {ITopMatter} from '../../shared/models/top-matters';
import {IFirm, spendByMonthOptions} from '../firm.model';
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
  errorMessage: any;
  spend: Array<any> = [];
  includeExpenses: boolean = false;
  chart: any = {};
  options: any;
  @Input() firmId: number;
  @Input() firm: IFirm;
  pendingRequest: Subscription;
  @ViewChild('spendByMonthDiv', {static: false}) spendByMonthDiv: ElementRef<HTMLElement>;

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
    arr.push(this.firmId.toString());
    params.firms = JSON.stringify(arr);
    this.pendingRequest = this.httpService.makeGetRequest('spendByMonth', params).subscribe(
      (data: any) => {
        this.spend = data.result;
        this.renderChart();
      },
      err => {
        this.errorMessage = err;
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
    const width = this.spendByMonthDiv.nativeElement.offsetWidth - 5;
    // const height = this.spendByMonthDiv.nativeElement.offsetHeight - 10;
    if (!this.chart || width <= 0) {
      return;
    }
    this.chart.setSize(width, 450, false);
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

