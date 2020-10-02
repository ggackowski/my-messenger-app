import { Component, OnInit } from '@angular/core';
import { ConversationDataService } from '../services/conversation-data.service';
import { UsersService } from 'src/app/users-manipulation/users.service';
import { MessageStatus } from 'src/app/models/message.model';

@Component({
  selector: 'app-sent-message-status',
  templateUrl: './sent-message-status.component.html',
  styleUrls: ['./sent-message-status.component.css']
})
export class SentMessageStatusComponent implements OnInit {
  public messageStatus: MessageStatus = undefined;

  constructor(private conversationDataService: ConversationDataService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.subscribeToMessageStatus();
  }

  public messageStatusNotificationText(): string {
    if (this.messageStatus === MessageStatus.NOTSENT) {
      return 'Not sent';
    } else if (this.messageStatus === MessageStatus.SENT) {
      return 'Sent';
    } else if (this.messageStatus === MessageStatus.DELIVERED) {
      return 'Delivered';
    } else if (this.messageStatus === MessageStatus.SEEN) {
      return 'Seen';
    } 
  }

  private subscribeToMessageStatus(): void {
   /* this.conversationDataService.getLastMessageFromActiveConversation()
    .subscribe(message => {
      console.log('message', message);
      if (message.author.name === this.usersService.getActiveUser().name) {
        this.messageStatus = message.status;
      } else {
        this.messageStatus = undefined;
      }
    }); */
  }

}
