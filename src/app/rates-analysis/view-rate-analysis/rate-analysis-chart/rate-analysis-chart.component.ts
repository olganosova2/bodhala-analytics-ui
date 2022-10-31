import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RatesAnalysisService } from '../../rates-analysis.service';
import { moneyFormatter } from '../../rates-analysis.model';

@Component({
  selector: 'bd-rate-analysis-chart',
  templateUrl: './rate-analysis-chart.component.html',
  styleUrls: ['./rate-analysis-chart.component.scss']
})
export class RateAnalysisChartComponent implements OnInit, AfterViewInit {
  @Input() selectedFirm: string;
  @Input() selectedFirmData: any;
  @Input() benchmark: any;
  @Input() rateType: string;

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
  modifyMarketDisplay: boolean = false;

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeChart();
  }

  ngOnInit() {
    if (this.rateType === 'Blended') {
      if (this.benchmark.blended_market_num_firms < 3) {
        this.validMarketAverage = false;
      }
      if (this.benchmark.blended_internal_num_firms < 1) {
        this.validInternalBM = false;
        this.marketAverageHeight = '84px';
      }
    } else if (this.rateType === 'Associate') {
      if (this.benchmark.associate_market_num_firms < 3) {
        this.validMarketAverage = false;
      }
      if (this.benchmark.associate_internal_num_firms < 1) {
        this.validInternalBM = false;
        this.marketAverageHeight = '84px';
      }
    } else if (this.rateType === 'Partner') {
      if (this.benchmark.partner_market_num_firms < 3) {
        this.validMarketAverage = false;
      }
      if (this.benchmark.partner_internal_num_firms < 1) {
        this.validInternalBM = false;
        this.marketAverageHeight = '84px';
      }
    }
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
    if (this.rateType === 'Blended') {
      if (this.benchmark.blended_market_hi > this.selectedFirmData.blended_rate && this.benchmark.blended_market_hi > this.benchmark.blended_internal) {
        this.highestRate = this.benchmark.blended_market_hi;
      } else if (this.selectedFirmData.blended_rate > this.benchmark.blended_market_hi && this.selectedFirmData.blended_rate > this.benchmark.blended_internal) {
        this.highestRate = this.selectedFirmData.blended_rate;
      } else if (this.benchmark.blended_internal > this.selectedFirmData.blended_rate && this.benchmark.blended_internal > this.benchmark.blended_market_hi) {
        this.highestRate = this.benchmark.blended_internal;
      } else {
        // random number - return to
        this.highestRate = this.selectedFirmData.blended_rate;
      }
      this.topBarDollars = this.selectedFirmData.blended_rate;
      this.topBarWidth = this.calculateBarWidth(this.selectedFirmData.blended_rate) + 'px';
      this.bottomBarDollars = this.benchmark.blended_internal;
      this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
      this.bottomBarWidth = this.calculateBarWidth(this.benchmark.blended_internal) + 'px';

      const lowerRange = this.calculateBarWidth(this.benchmark.blended_market_lo);
      const upperRange = this.calculateBarWidth(this.benchmark.blended_market_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLowerRange = this.benchmark.blended_market_lo;
      this.marketAverageUpperRange =  this.benchmark.blended_market_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.benchmark.blended_market_lo);
      this.marketAverageUpperRangeFormatted =  moneyFormatter.format(this.benchmark.blended_market_hi);

      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.selectedFirmData.blended_rate > this.benchmark.blended_market_hi) {
        this.marketRateLowerDelta = this.selectedFirmData.blended_rate - this.benchmark.blended_market_hi;
        this.marketRateUpperDelta  = this.selectedFirmData.blended_rate - this.benchmark.blended_market_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.benchmark.blended_market_hi;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.benchmark.blended_market_lo;
      } else if (this.selectedFirmData.blended_rate < this.benchmark.blended_market_lo) {
        this.marketRateLowerDelta = this.selectedFirmData.blended_rate - this.benchmark.blended_market_lo;
        this.marketRateUpperDelta  = this.selectedFirmData.blended_rate - this.benchmark.blended_market_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.benchmark.blended_market_lo;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.benchmark.blended_market_hi;
      } else {
        this.marketRateLowerDelta = this.selectedFirmData.blended_rate - this.benchmark.blended_market_lo;
        this.marketRateUpperDelta  = this.selectedFirmData.blended_rate - this.benchmark.blended_market_hi;
        this.withinRange = true;
      }

      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.blended_rate - this.benchmark.blended_internal;
      this.internalRateDeltaPct = this.internalRateDelta / this.benchmark.blended_internal;
      this.internalRateDeltaPct *= 100;
    } else if (this.rateType === 'Partner') {

      if (this.benchmark.partner_market_hi > this.selectedFirmData.avg_partner_rate && this.benchmark.partner_market_hi > this.benchmark.partner_internal) {
        this.highestRate = this.benchmark.partner_market_hi;
      } else if (this.selectedFirmData.avg_partner_rate > this.benchmark.partner_market_hi && this.selectedFirmData.avg_partner_rate > this.benchmark.partner_internal) {
        this.highestRate = this.selectedFirmData.avg_partner_rate;
      } else if (this.benchmark.partner_internal > this.selectedFirmData.avg_partner_rate && this.benchmark.partner_internal > this.benchmark.partner_market_hi) {
        this.highestRate = this.benchmark.partner_internal;
      } else {
        this.highestRate = this.selectedFirmData.avg_partner_rate;
      }
      this.topBarDollars = this.selectedFirmData.avg_partner_rate;
      this.topBarWidth = this.calculateBarWidth(this.selectedFirmData.avg_partner_rate) + 'px';
      this.bottomBarDollars = this.benchmark.partner_internal;
      this.bottomBarWidth = this.calculateBarWidth(this.benchmark.partner_internal) + 'px';

      this.marketAverageLowerRange = this.benchmark.partner_market_lo;
      this.marketAverageUpperRange = this.benchmark.partner_market_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.benchmark.partner_market_lo);
      this.marketAverageUpperRangeFormatted = moneyFormatter.format(this.benchmark.partner_market_hi);
      const lowerRange = this.calculateBarWidth(this.benchmark.partner_market_lo);
      const upperRange = this.calculateBarWidth(this.benchmark.partner_market_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.selectedFirmData.avg_partner_rate > this.benchmark.partner_market_hi) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_partner_rate - this.benchmark.partner_market_hi;
        this.marketRateUpperDelta = this.selectedFirmData.avg_partner_rate - this.benchmark.partner_market_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.benchmark.partner_market_hi;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.benchmark.partner_market_lo;
      } else if (this.selectedFirmData.avg_partner_rate < this.benchmark.partner_market_lo) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_partner_rate - this.benchmark.partner_market_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_partner_rate - this.benchmark.partner_market_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.benchmark.partner_market_lo;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.benchmark.partner_market_hi;
      } else {
        this.marketRateLowerDelta = this.selectedFirmData.avg_partner_rate - this.benchmark.partner_market_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_partner_rate - this.benchmark.partner_market_hi;
        this.withinRange = true;
      }
      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.avg_partner_rate - this.benchmark.partner_internal;
      this.internalRateDeltaPct = this.internalRateDelta / this.benchmark.partner_internal;
      this.internalRateDeltaPct *= 100;

    } else if (this.rateType === 'Associate') {

      if (this.benchmark.associate_market_hi > this.selectedFirmData.avg_associate_rate && this.benchmark.associate_market_hi > this.benchmark.associate_internal) {
        this.highestRate = this.benchmark.associate_market_hi;
      } else if (this.selectedFirmData.avg_associate_rate > this.benchmark.associate_market_hi && this.selectedFirmData.avg_associate_rate > this.benchmark.associate_internal) {
        this.highestRate = this.selectedFirmData.avg_associate_rate;
      } else if (this.benchmark.associate_internal > this.selectedFirmData.avg_associate_rate && this.benchmark.associate_internal > this.benchmark.associate_market_hi) {
        this.highestRate = this.benchmark.associate_internal;
      } else {
        this.highestRate = this.selectedFirmData.avg_associate_rate;
      }
      this.topBarDollars = this.selectedFirmData.avg_associate_rate;
      this.topBarWidth = this.calculateBarWidth(this.selectedFirmData.avg_associate_rate) + 'px';
      this.bottomBarDollars = this.benchmark.associate_internal;
      this.bottomBarWidth = this.calculateBarWidth(this.benchmark.associate_internal) + 'px';

      this.marketAverageLowerRange = this.benchmark.associate_market_lo;
      this.marketAverageUpperRange = this.benchmark.associate_market_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.benchmark.associate_market_lo);
      this.marketAverageUpperRangeFormatted = moneyFormatter.format(this.benchmark.associate_market_hi);
      const lowerRange = this.calculateBarWidth(this.benchmark.associate_market_lo);
      const upperRange = this.calculateBarWidth(this.benchmark.associate_market_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.selectedFirmData.avg_associate_rate > this.benchmark.associate_market_hi) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_associate_rate - this.benchmark.associate_market_hi;
        this.marketRateUpperDelta = this.selectedFirmData.avg_associate_rate - this.benchmark.associate_market_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.benchmark.associate_market_hi;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.benchmark.associate_market_lo;
      } else if (this.selectedFirmData.avg_associate_rate < this.benchmark.associate_market_lo) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_associate_rate - this.benchmark.associate_market_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_associate_rate - this.benchmark.associate_market_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.benchmark.associate_market_lo;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.benchmark.associate_market_hi;
      } else {
        this.marketRateLowerDelta = this.selectedFirmData.avg_associate_rate - this.benchmark.associate_market_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_associate_rate - this.benchmark.associate_market_hi;
        this.withinRange = true;
      }
      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.avg_associate_rate - this.benchmark.associate_internal;
      this.internalRateDeltaPct = this.internalRateDelta / this.benchmark.associate_internal;
      this.internalRateDeltaPct *= 100;

    }
    this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
    this.topBarDollarFormatted = moneyFormatter.format(this.topBarDollars);
    this.topBarColor = this.getBarColor();
    this.internalRateColor = this.getRateColor(this.internalRateDeltaPct);
  }

  calculateBarWidth(rate: number): number {
    let result = 0;
    const max = this.highestRate || 1;
    const divWidth = this.chartPanel.nativeElement.offsetWidth - 50;
    result = rate * divWidth / max;
    return result;
  }

  getBarColor(): string {
    let result = '';
    // should it be if either is > 20%?
    if ((this.topBarDollars / this.marketAverageUpperRange >= 1.2)) {
      result = '#FE3F56';
    } else if ((this.topBarDollars / this.marketAverageUpperRange) < 1.2 && this.topBarDollars > this.marketAverageUpperRange) {
      result = '#FF8B4A';
    } else if (this.topBarDollars <= this.marketAverageUpperRange && this.topBarDollars >= this.marketAverageLowerRange) {
      result = '#FFC327';
    } else if ((this.topBarDollars / this.marketAverageLowerRange) < 1) {
      result = '#3EDB73';
    } else {
      result = '#E5EAEC';
    }
    return result;
  }

  getRateColor(deltaPct: number): string {
    let result = '';
    if (deltaPct >= 20) {
      result = '#FE3F56';
    } else if (deltaPct >= 0 && deltaPct < 20) {
      result = '#FF8B4A';
    } else if (deltaPct < 0) {
      result = '#3EDB73';
    } else {
      result = '#FFC327';
    }
    return result;
  }

}
