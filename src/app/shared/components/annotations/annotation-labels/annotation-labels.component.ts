import { Component, OnInit, Input } from '@angular/core';
import {HttpService, UserService, UtilService} from 'bodhala-ui-common';
import {CommonService} from '../../../services/common.service';
import * as _moment from 'moment';
import {IUiAnnotation} from '../model';

const moment = _moment;

@Component({
  selector: 'bd-annotation-labels',
  templateUrl: './annotation-labels.component.html',
  styleUrls: ['./annotation-labels.component.scss']
})
export class AnnotationLabelsComponent implements OnInit {
 @Input() note: IUiAnnotation;
  @Input() isPublicDefault: boolean = false;
  constructor(public userService: UserService,
              private httpService: HttpService,
              public utilService: UtilService,
              public commonServ: CommonService) { }

  ngOnInit(): void {
  }
  formatDate(note: IUiAnnotation): string {
    return moment(note.created_on).format('MMM DD, YYYY');
  }
  formatAuthor(note: IUiAnnotation): string {
    let result = '';
    if (note.user_id === this.userService.currentUser.id) {
      result = 'Me';
    } else if (this.isPublicDefault) {
      result = 'Bodhala Team';
    } else {
      result = note.first_name + ' ' + note.last_name;
    }
    return result;
  }

}
