import {Component, AfterViewInit, ElementRef, Input, OnInit, ViewChild, Renderer2} from '@angular/core';
import {SavingsCalculatorService} from '../savings-calculator.service';

@Component({
  selector: 'bd-progress-semi-circle',
  templateUrl: './progress-semi-circle.component.html',
  styleUrls: ['./progress-semi-circle.component.scss']
})
export class ProgressSemiCircleComponent implements OnInit, AfterViewInit {
  percent: number = 0;
  @Input() total: number = 0;
  @Input() grandTotal: number = 0;
  @ViewChild('barOverflow') barOverflow: ElementRef;
  @ViewChild('bar') bar: ElementRef;

  constructor(private renderer: Renderer2,
              public savingsService: SavingsCalculatorService) {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  updateValues(t: number, percent: number): void {
    this.total = t;
    this.percent  = percent;
    const transform = 'rotate(' + (45 + (this.percent * 1.8)) + 'deg)';
    this.renderer.setStyle(this.bar.nativeElement, 'transform', transform);
  }

}
