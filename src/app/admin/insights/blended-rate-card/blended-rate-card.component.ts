import {Component, Input, OnInit} from '@angular/core';
import {ISummary} from '../models';

@Component({
  selector: 'bd-blended-rate-card',
  templateUrl: './blended-rate-card.component.html',
  styleUrls: ['./blended-rate-card.component.css']
})
export class BlendedRateCardComponent implements OnInit {
  @Input() summary: ISummary;
  constructor() { }

  ngOnInit() {
  }

}
