import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { moneyFormatter, percentFormatter } from '../../rates-analysis.model';

@Component({
  selector: 'bd-rate-analysis-chart',
  templateUrl: './rate-analysis-chart.component.html',
  styleUrls: ['./rate-analysis-chart.component.scss']
})
export class RateAnalysisChartComponent implements OnInit {
  @Input() selectedFirm: string;
  @Input() selectedFirmData: any;
  @Input() internalData: any;
  @Input() marketAverageData: any;
  @Input() blendedRate: boolean;

  marketAverageLowerRange: string;
  marketAverageUpperRange: string;
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
  topBarDollars: number = 0;
  bottomBarDollars: number = 0;
  topBarColor: string;
  bottomBarColor: string;
  floatDivX: string;
  floatDivWidth: string;
  highestRate: number = 0;
  @ViewChild('chartPanel') chartPanel: ElementRef<HTMLElement>;

  constructor(public ratesService: RatesAnalysisService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resizeChart();
    });
  }

  resizeChart(): void {
    this.calculateChartMetrics();
  }

  calculateChartMetrics(): void {
    // this.selectedFirmData.blended_rate = 400;
    if (this.blendedRate) {
      if (this.marketAverageData.blended_rate_hi > this.selectedFirmData.blended_rate && this.marketAverageData.blended_rate_hi > this.internalData.avg_blended_rate) {
        this.highestRate = this.marketAverageData.blended_rate_hi;
      } else if (this.selectedFirmData.blended_rate > this.marketAverageData.blended_rate_hi && this.selectedFirmData.blended_rate > this.internalData.avg_blended_rate) {
        this.highestRate = this.selectedFirmData.blended_rate;
      } else if (this.internalData.avg_blended_rate > this.selectedFirmData.blended_rate && this.internalData.avg_blended_rate > this.marketAverageData.blended_rate_hi) {
        this.highestRate = this.internalData.avg_blended_rate;
      } else {
        // random number - return to
        this.highestRate = 5000;
      }
      this.topBarDollars = this.selectedFirmData.blended_rate;
      this.topBarWidth = this.calculateBarWidth(this.selectedFirmData.blended_rate) + 'px';
      this.bottomBarDollars = this.internalData.avg_blended_rate;
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_blended_rate) + 'px';

      const lowerRange = this.calculateBarWidth(this.marketAverageData.blended_rate_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.blended_rate_hi);
      const width = upperRange - lowerRange;
      this.marketAverageLowerRange = moneyFormatter.format(this.marketAverageData.blended_rate_lo);
      this.marketAverageUpperRange =  moneyFormatter.format(this.marketAverageData.blended_rate_hi);

      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.selectedFirmData.blended_rate > this.marketAverageData.blended_rate_hi) {
        this.marketRateLowerDelta = this.selectedFirmData.blended_rate - this.marketAverageData.blended_rate_hi;
        this.marketRateUpperDelta  = this.selectedFirmData.blended_rate - this.marketAverageData.blended_rate_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.blended_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.blended_rate;
      } else if (this.selectedFirmData.blended_rate < this.marketAverageData.blended_rate_lo) {
        this.marketRateLowerDelta = this.selectedFirmData.blended_rate - this.marketAverageData.blended_rate_lo;
        this.marketRateUpperDelta  = this.selectedFirmData.blended_rate - this.marketAverageData.blended_rate_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.blended_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.blended_rate;
      } else {
        this.withinRange = true;
      }

      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.blended_rate - this.internalData.avg_blended_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.selectedFirmData.blended_rate;
      this.internalRateDeltaPct *= 100;
      console.log("internalRateDelta blended: ", this.selectedFirmData.blended_rate, this.internalData.avg_blended_rate, this.internalRateDelta)
    } else {
      if (this.marketAverageData.bpi_hi > this.selectedFirmData.bodhala_price_index && this.marketAverageData.bpi_hi > this.internalData.avg_bpi) {
        this.highestRate = this.marketAverageData.bpi_hi;
      } else if (this.selectedFirmData.bodhala_price_index > this.marketAverageData.bpi_hi && this.selectedFirmData.bodhala_price_index > this.internalData.avg_bpi) {
        this.highestRate = this.selectedFirmData.bodhala_price_index;
      } else if (this.internalData.avg_bpi > this.selectedFirmData.bodhala_price_index && this.internalData.avg_bpi > this.marketAverageData.bpi_hi) {
        this.highestRate = this.internalData.avg_bpi;
      } else {
        this.highestRate = 5000;
      }
      this.topBarDollars = this.selectedFirmData.bodhala_price_index;
      this.topBarWidth = this.calculateBarWidth(this.selectedFirmData.bodhala_price_index) + 'px';
      this.bottomBarDollars = this.internalData.avg_bpi;
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_bpi) + 'px';

      this.marketAverageLowerRange = moneyFormatter.format(this.marketAverageData.bpi_lo);
      this.marketAverageUpperRange = moneyFormatter.format(this.marketAverageData.bpi_hi);
      const lowerRange = this.calculateBarWidth(this.marketAverageData.bpi_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.bpi_hi);
      const width = upperRange - lowerRange;
      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.selectedFirmData.bodhala_price_index > this.marketAverageData.bpi_hi) {
        this.marketRateLowerDelta = this.selectedFirmData.bodhala_price_index - this.marketAverageData.bpi_hi;
        this.marketRateUpperDelta = this.selectedFirmData.bodhala_price_index - this.marketAverageData.bpi_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.blended_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.blended_rate;
      } else if (this.selectedFirmData.bodhala_price_index < this.marketAverageData.bpi_lo) {
        this.marketRateLowerDelta = this.selectedFirmData.bodhala_price_index - this.marketAverageData.bpi_lo;
        this.marketRateUpperDelta = this.selectedFirmData.bodhala_price_index - this.marketAverageData.bpi_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.blended_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.blended_rate;
      } else {
        this.withinRange = true;
      }
      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.bodhala_price_index - this.internalData.avg_bpi;
      console.log("internalRateDelta BPI: ", this.selectedFirmData.bodhala_price_index, this.internalData.avg_bpi, this.internalRateDelta)
      this.internalRateDeltaPct = this.internalRateDelta / this.selectedFirmData.bodhala_price_index;
      this.internalRateDeltaPct *= 100;
    }
    // console.log("this.withinRange: ", this.withinRange)
    console.log("this.internalRateDeltaPct: ", this.internalRateDeltaPct)
    // console.log("this.marketRateUpperDelta: ", this.marketRateUpperDelta)
    // console.log("this.marketRateLowerDeltaPct: ", this.marketRateLowerDeltaPct)
    // console.log("this.marketRateUpperDeltaPct: ", this.marketRateUpperDeltaPct)
    // // console.log("this.highestRate: ", this.highestRate)
    this.topBarColor = this.getBarColor('top');
    this.bottomBarColor = this.getBarColor('bottom');
  }

  calculateBarWidth(rate: number): number {
    let result = 0;
    const max = this.highestRate || 1;
    const divWidth = this.chartPanel.nativeElement.offsetWidth - 50;
    result = rate * divWidth / max;
    return result;
  }

  getBarColor(pos: string): string {
    const result = '';
    // if (!this.dataRow.isChild) {
    //   if (pos === 'top') {
    //     return this.bmService.getAvgBarColor('partner', this.dataRow);
    //   } else {
    //     return this.bmService.getAvgBarColor('associate', this.dataRow);
    //   }
    // } else {
    //   if (pos === 'top') {
    //     return this.bmService.getStatusColor(this.dataRow);
    //   } else {
    //     return BM_COLORS.Default;
    //   }
    // }
    return result;
  }

}
