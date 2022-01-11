import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from '../../../shared/services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bd-matter-title-bar',
  templateUrl: './matter-title-bar.component.html',
  styleUrls: ['./matter-title-bar.component.scss']
})
export class MatterTitleBarComponent implements OnInit {
  @Input() matterId: string;
  @Input() firmId: number;
  @Input() title: string;
  @Input() index: number;
  constructor(public commonServ: CommonService,
              public router: Router) { }

  ngOnInit(): void {
  }
  export(): void{
    this.commonServ.pdfLoading = true;
    const exportName = 'Matter Overview';

    setTimeout(() => {
      this.commonServ.generatePdfOuter(exportName, 'matterAnalysis', null);
    }, 200);
  }

}
