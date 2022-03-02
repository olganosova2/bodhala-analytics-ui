import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RatesAnalysisService } from '../../../rates-analysis.service';
import { moneyFormatter, percentFormatter } from '../../../rates-analysis.model';
import { InvokeFunctionExpr } from '@angular/compiler';
import { IBenchmarkRate } from 'src/app/benchmarks/model';
import { Subscription } from 'rxjs';
import { HttpService } from 'bodhala-ui-common';

@Component({
  selector: 'bd-granular-rate-chart',
  templateUrl: './granular-rate-chart.component.html',
  styleUrls: ['./granular-rate-chart.component.scss']
})
export class GranularRateChartComponent implements OnInit {
  pendingRequest: Subscription;
  @Input() selectedFirm: string;
  @Input() classification: string;
  @Input() seniority: string;
  @Input() overallSpendData: any;
  @Input() firmSpendData: any;
  @Input() benchmark: any;

  marketAverageLowerRange: number;
  marketAverageUpperRange: number;
  marketAverageLowerRangeFormatted: string;
  marketAverageUpperRangeFormatted: string;
  marketAverageLeft: string;
  marketAverageWidth: string;

  marketRateLowerDelta: number;
  marketRateUpperDelta: number;
  marketRateLowerDeltaPct: number;
  marketRateUpperDeltaPct: number;
  internalRateDelta: number;
  internalRateDeltaPct: number;
  withinRange: boolean = false;

  topBarWidth: string = '500px';
  bottomBarWidth: string = '400px';
  marketAverageHeight: string = '133px';
  topBarDollars: number = 0;
  topBarDollarFormatted: string;
  bottomBarDollars: number = 0;
  bottomBarDollarFormatted: string;
  topBarColor: string;
  bottomBarColor: string;
  marketRateColor: string = '#E5EAEC';
  internalRateColor: string = '#E5EAEC';
  floatDivX: string;
  floatDivWidth: string;
  highestRate: number = 0;
  validInternalBM: boolean = true;
  validMarketAverage: boolean = true;
  @ViewChild('chartPanel') chartPanel: ElementRef<HTMLElement>;

  constructor(public ratesService: RatesAnalysisService,
              public httpService: HttpService) {
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.resizeChart();
  // }

  ngOnInit(): void {
    console.log("GRANULAR CHART: ", this.seniority, this.benchmark)
    this.getData();
  }

  getData(): void {
    const params = {
      pa: this.benchmark.smart_practice_area,
      firmId: this.benchmark.bh_lawfirm_id,
      yyyy: this.benchmark.year,
      seniority: this.seniority,
      classification: this.classification
    };
    this.pendingRequest = this.httpService.makeGetRequest('getTKGranularityRateData', params).subscribe(
      (data: any) => {
        if (!data.result) {
          return;
        }
        const bm = data.result
      },
      err => {
        return {error: err};
      }
    )



  }




}
