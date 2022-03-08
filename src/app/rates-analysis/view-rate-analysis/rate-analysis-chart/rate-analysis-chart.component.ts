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
  @Input() internalData: any;
  @Input() marketAverageData: any;
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
    if (this.internalData.num_firms < 3) {
      this.validInternalBM = false;
      this.marketAverageHeight = '84px';
    }
    if (this.marketAverageData.num_firms < 3) {
      this.validMarketAverage = false;
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
      this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_blended_rate) + 'px';

      const lowerRange = this.calculateBarWidth(this.marketAverageData.blended_rate_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.blended_rate_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLowerRange = this.marketAverageData.blended_rate_lo;
      this.marketAverageUpperRange =  this.marketAverageData.blended_rate_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketAverageData.blended_rate_lo);
      this.marketAverageUpperRangeFormatted =  moneyFormatter.format(this.marketAverageData.blended_rate_hi);

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
        this.marketRateLowerDelta = this.selectedFirmData.blended_rate - this.marketAverageData.blended_rate_lo;
        this.marketRateUpperDelta  = this.selectedFirmData.blended_rate - this.marketAverageData.blended_rate_hi;
        this.withinRange = true;
      }

      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.blended_rate - this.internalData.avg_blended_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.selectedFirmData.blended_rate;
      this.internalRateDeltaPct *= 100;
    } else if (this.rateType === 'Partner') {

      if (this.marketAverageData.partner_hi > this.selectedFirmData.avg_partner_rate && this.marketAverageData.partner_hi > this.internalData.avg_partner_rate) {
        this.highestRate = this.marketAverageData.partner_hi;
      } else if (this.selectedFirmData.avg_partner_rate > this.marketAverageData.partner_hi && this.selectedFirmData.avg_partner_rate > this.internalData.avg_partner_rate) {
        this.highestRate = this.selectedFirmData.avg_partner_rate;
      } else if (this.internalData.avg_partner_rate > this.selectedFirmData.avg_partner_rate && this.internalData.avg_partner_rate > this.marketAverageData.partner_hi) {
        this.highestRate = this.internalData.avg_partner_rate;
      } else {
        this.highestRate = 5000;
      }
      this.topBarDollars = this.selectedFirmData.avg_partner_rate;
      this.topBarWidth = this.calculateBarWidth(this.selectedFirmData.avg_partner_rate) + 'px';
      this.bottomBarDollars = this.internalData.avg_partner_rate;
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_partner_rate) + 'px';

      this.marketAverageLowerRange = this.marketAverageData.partner_lo;
      this.marketAverageUpperRange = this.marketAverageData.partner_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketAverageData.partner_lo);
      this.marketAverageUpperRangeFormatted = moneyFormatter.format(this.marketAverageData.partner_hi);
      const lowerRange = this.calculateBarWidth(this.marketAverageData.partner_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.partner_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.selectedFirmData.avg_partner_rate > this.marketAverageData.partner_hi) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_partner_rate - this.marketAverageData.partner_hi;
        this.marketRateUpperDelta = this.selectedFirmData.avg_partner_rate - this.marketAverageData.partner_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.avg_partner_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.avg_partner_rate;
      } else if (this.selectedFirmData.avg_partner_rate < this.marketAverageData.partner_lo) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_partner_rate - this.marketAverageData.partner_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_partner_rate - this.marketAverageData.partner_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.avg_partner_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.avg_partner_rate;
      } else {
        this.marketRateLowerDelta = this.selectedFirmData.avg_partner_rate - this.marketAverageData.partner_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_partner_rate - this.marketAverageData.partner_hi;
        this.withinRange = true;
      }
      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.avg_partner_rate - this.internalData.avg_partner_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.selectedFirmData.avg_partner_rate;
      this.internalRateDeltaPct *= 100;

    } else if (this.rateType === 'Associate') {

      if (this.marketAverageData.associate_hi > this.selectedFirmData.avg_associate_rate && this.marketAverageData.associate_hi > this.internalData.avg_associate_rate) {
        this.highestRate = this.marketAverageData.associate_hi;
      } else if (this.selectedFirmData.avg_associate_rate > this.marketAverageData.associate_hi && this.selectedFirmData.avg_associate_rate > this.internalData.avg_associate_rate) {
        this.highestRate = this.selectedFirmData.avg_associate_rate;
      } else if (this.internalData.avg_associate_rate > this.selectedFirmData.avg_associate_rate && this.internalData.avg_associate_rate > this.marketAverageData.associate_hi) {
        this.highestRate = this.internalData.avg_associate_rate;
      } else {
        this.highestRate = 5000;
      }
      this.topBarDollars = this.selectedFirmData.avg_associate_rate;
      this.topBarWidth = this.calculateBarWidth(this.selectedFirmData.avg_associate_rate) + 'px';
      this.bottomBarDollars = this.internalData.avg_associate_rate;
      this.bottomBarWidth = this.calculateBarWidth(this.internalData.avg_associate_rate) + 'px';

      this.marketAverageLowerRange = this.marketAverageData.associate_lo;
      this.marketAverageUpperRange = this.marketAverageData.associate_hi;
      this.marketAverageLowerRangeFormatted = moneyFormatter.format(this.marketAverageData.associate_lo);
      this.marketAverageUpperRangeFormatted = moneyFormatter.format(this.marketAverageData.associate_hi);
      const lowerRange = this.calculateBarWidth(this.marketAverageData.associate_lo);
      const upperRange = this.calculateBarWidth(this.marketAverageData.associate_hi);
      const width = upperRange - lowerRange;
      if (width < 65) {
        this.modifyMarketDisplay = true;
      }
      this.marketAverageLeft = lowerRange + 'px';
      this.marketAverageWidth = width + 'px';

      if (this.selectedFirmData.avg_associate_rate > this.marketAverageData.associate_hi) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_associate_rate - this.marketAverageData.associate_hi;
        this.marketRateUpperDelta = this.selectedFirmData.avg_associate_rate - this.marketAverageData.associate_lo;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.avg_associate_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.avg_associate_rate;
      } else if (this.selectedFirmData.avg_associate_rate < this.marketAverageData.associate_lo) {
        this.marketRateLowerDelta = this.selectedFirmData.avg_associate_rate - this.marketAverageData.associate_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_associate_rate - this.marketAverageData.associate_hi;
        this.marketRateLowerDeltaPct = this.marketRateLowerDelta / this.selectedFirmData.avg_associate_rate;
        this.marketRateUpperDeltaPct = this.marketRateUpperDelta / this.selectedFirmData.avg_associate_rate;
      } else {
        this.marketRateLowerDelta = this.selectedFirmData.avg_associate_rate - this.marketAverageData.associate_lo;
        this.marketRateUpperDelta = this.selectedFirmData.avg_associate_rate - this.marketAverageData.associate_hi;
        this.withinRange = true;
      }
      this.marketRateLowerDeltaPct *= 100;
      this.marketRateUpperDeltaPct *= 100;

      this.internalRateDelta = this.selectedFirmData.avg_associate_rate - this.internalData.avg_associate_rate;
      this.internalRateDeltaPct = this.internalRateDelta / this.selectedFirmData.avg_associate_rate;
      this.internalRateDeltaPct *= 100;

    }
    this.bottomBarDollarFormatted = moneyFormatter.format(this.bottomBarDollars);
    this.topBarDollarFormatted = moneyFormatter.format(this.topBarDollars);
    this.topBarColor = this.getBarColor();
    this.internalRateColor = this.getRateColor(this.internalRateDeltaPct);
    this.marketRateColor = this.getRateColor(this.marketRateUpperDeltaPct);
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
