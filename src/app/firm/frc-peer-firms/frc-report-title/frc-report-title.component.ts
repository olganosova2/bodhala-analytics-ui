import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'bd-frc-report-title',
  templateUrl: './frc-report-title.component.html',
  styleUrls: ['./frc-report-title.component.scss']
})
export class FrcReportTitleComponent implements OnInit {
  reportTitle: string = '';
  constructor(public dialogRef: MatDialogRef<FrcReportTitleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reportTitle = data.reportTitle;
  }

  ngOnInit(): void {
  }
  save(): void {
    this.dialogRef.close(this.reportTitle);
  }

}
