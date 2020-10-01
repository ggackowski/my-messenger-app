import { Component, OnInit } from '@angular/core';
import { ConversationDataService } from '../services/conversation-data.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  public messageInputText: string = '';

  constructor(private conversationDataService: ConversationDataService) { }

  ngOnInit(): void {
  }

  public onSendButtonClick(): void {
    if (this.messageInputText === '') { return; } 
    this.conversationDataService.sendMessage(this.messageInputText);
    this.messageInputText = '';
  }
}
