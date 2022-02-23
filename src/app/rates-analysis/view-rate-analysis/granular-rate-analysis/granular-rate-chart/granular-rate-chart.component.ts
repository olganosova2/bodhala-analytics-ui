import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RatesAnalysisService } from '../../../rates-analysis.service';
import { moneyFormatter, percentFormatter } from '../../../rates-analysis.model';

@Component({
  selector: 'bd-granular-rate-chart',
  templateUrl: './granular-rate-chart.component.html',
  styleUrls: ['./granular-rate-chart.component.scss']
})
export class GranularRateChartComponent implements OnInit {
  @Input() selectedFirm: string;
  @Input() clasification: string;
  @Input() seniority: string;
  @Input() overallSpend: any;

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

  constructor(public ratesService: RatesAnalysisService) {
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.resizeChart();
  // }

  ngOnInit(): void {
  }




}
