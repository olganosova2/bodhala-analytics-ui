import {Component, Input, OnInit} from '@angular/core';
import {QbrService} from '../../qbr.service';

@Component({
  selector: 'bd-more-you-act',
  templateUrl: './more-you-act.component.html',
  styleUrls: ['../../qbr-css.scss', './more-you-act.component.scss']
})
export class MoreYouActComponent implements OnInit {
  @Input() pageNum: number = 13;
  @Input() zoom: boolean;
  items: Array<any> = [];
  constructor(public qbrService: QbrService) {
    this.items = [
      {label: 'Benchmarking',
      icon: 'key.png',
      text: 'Unlock better rates from the firms you already work with using Bodhala\'s proprietary benchmarking data.<br/>Benchmarking is available for any firm in the AmLaw 250.'
      },
      {label: 'Strategic Advisory',
        icon: 'notepad.png',
        text: 'Detailed direction from Bodhala\'s Expert Client Success team helps you target specific firms with specific recommendations for work allocation and other optimization strategies.'
      },
      {label: 'Rate Card RFP',
        icon: 'files.png',
        text: 'Complement Bodhala\'s benchmarking reports with a competitive Rate Card RFP process.<br/><br/> Get the best counsel for the best possible price.'
      }
    ];
  }

  ngOnInit(): void {
  }

}
