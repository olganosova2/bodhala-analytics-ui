import { Component, OnInit } from '@angular/core';
import {MessagingService} from 'bodhala-ui-common';

@Component({
  selector: 'bd-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent implements OnInit {

  constructor(public messageService: MessagingService) { }

  ngOnInit() {
  }

}
