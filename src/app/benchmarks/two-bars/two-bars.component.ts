import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {IBenchmarkOverviewRow} from '../model';
import {BenchmarkService, BM_COLORS} from '../benchmark.service';
import {OverlayPanel} from 'primeng/overlaypanel';

@Component({
  selector: 'bd-two-bars',
  templateUrl: './two-bars.component.html',
  styleUrls: ['./two-bars.component.scss']
})
export class TwoBarsComponent implements OnInit, AfterViewInit {
  labelTop: string = '';
  labelBottom: string = '';
  topBarWidth: string = '500px';
  bottomBarWidth: string = '400px';
  topBarDollars: number = 0;
  bottomBarDollars: number = 0;
  topBarColor: string;
  bottomBarColor: string;
  floatDivX: string;
  floatDivWidth: string;
  @Input() highestRate: number = 0;
  @Input() dataRow: IBenchmarkOverviewRow;
  @Input() firmDetail: boolean = false;
  @ViewChild('chartPanel') chartPanel: ElementRef<HTMLElement>;

  constructor(public bmService: BenchmarkService) {
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
    this.highestRate =  !this.dataRow.isChild ? this.bmService.highestBarAvg : this.highestRate;
    this.labelTop = !this.dataRow.isChild ? 'Partner' : 'You Pay';
    this.labelBottom = !this.dataRow.isChild ? 'Associate' : 'Street Rate';
    if (!this.dataRow.isChild) {
      this.topBarDollars = this.dataRow.avg_partner_rate;
      this.topBarWidth = this.calculateBarWidth(this.dataRow.avg_partner_rate) + 'px';
      this.bottomBarDollars = this.dataRow.avg_associate_rate;
      this.bottomBarWidth = this.calculateBarWidth(this.dataRow.avg_associate_rate) + 'px';
    } else {
      if (this.dataRow.name.toLowerCase().indexOf('associate') >= 0) {
        this.topBarWidth = this.calculateBarWidth(this.dataRow.avg_associate_rate) + 'px';
        this.topBarDollars = this.dataRow.avg_associate_rate;
      } else {
        this.topBarWidth = this.calculateBarWidth(this.dataRow.avg_partner_rate) + 'px';
        this.topBarDollars = this.dataRow.avg_partner_rate;
      }
      this.bottomBarWidth = this.calculateBarWidth(this.dataRow.street) + 'px';
      this.bottomBarDollars = this.dataRow.street;
      const lowPx = this.calculateBarWidth(this.dataRow.low);
      const highPx = this.calculateBarWidth(this.dataRow.high);
      this.floatDivX = lowPx + 'px';
      this.floatDivWidth = (highPx - lowPx) + 'px';
    }
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
    if (!this.dataRow.isChild) {
      if (pos === 'top') {
        return this.bmService.getAvgBarColor('partner', this.dataRow);
      } else {
        return this.bmService.getAvgBarColor('associate', this.dataRow);
      }
    } else {
      if (pos === 'top') {
        return this.bmService.getStatusColor(this.dataRow);
      } else {
        return BM_COLORS.Default;
      }
    }
    return result;
  }
  showInfo(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);
  }
}
