import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface IFreshDeskArticle {
  id: number;
  type: number;
  category_id: number;
  folder_id: number;
  thumbs_up: number;
  thumbs_down: number;
  hits: number;
  tags: Array<string>;
  seo_data: any;
  agent_id: number;
  title: string;
  description: string;
  description_text: string;
  status: number;
  created_at: string;
  updated_at: string;
 }
@Component({
  selector: 'bd-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HelpModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IFreshDeskArticle) { }

  ngOnInit(): void {
  }

}
