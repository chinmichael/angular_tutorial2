import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { // 템플릿에 바인딩되기에 public선언(public만 바인딩 가능)

  }

  ngOnInit(): void {
  }

}
