import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as _moment from 'moment';
import {ITopMatter} from '../../shared/models/top-matters';
import {IPracticeArea, spendByMonthOptions} from '../practice-area.model';
import {Subscription, fromEventPattern} from 'rxjs';
import {HttpService} from 'bodhala-ui-common';
import {FiltersService} from '../../shared/services/filters.service';
import {PracticeAreaComponent} from '../practice-area.component'
import { FromUtcPipe } from 'angular2-moment';

const moment = _moment;

@Component({
  selector: 'bd-pa-spend-by-month',
  templateUrl: './pa-spend-by-month.component.html',
  styleUrls: ['./pa-spend-by-month.component.scss']
})
export class PaSpendByMonthComponent implements OnInit {
  errorMessage: any;
  spend: Array<any> = [];
  includeExpenses: boolean = false;
  chart: any = {};
  options: any;
  @Input() clientMatterType: string;
  @Input() practiceArea: IPracticeArea;
  pendingRequest: Subscription;
  @ViewChild('paSpendByMonthDiv', {static: false}) spendByMonthDiv: ElementRef<HTMLElement>;

  constructor(private httpService: HttpService,
              public filtersService: FiltersService,
              public practiceAreaComponent: PracticeAreaComponent) {
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
    arr.push(this.practiceAreaComponent.clientMatterType);
    params.practiceAreas = JSON.stringify(arr);
    console.log("PARAMS: ", params);
    this.pendingRequest = this.httpService.makeGetRequest('spendByMonth', params).subscribe(
      (data: any) => {
        this.spend = data.result;
        console.log("res call: ", data);
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
