import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bd-matter-title-bar',
  templateUrl: './matter-title-bar.component.html',
  styleUrls: ['./matter-title-bar.component.scss']
})
export class MatterTitleBarComponent implements OnInit {
 @Input() title: string;
 @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
