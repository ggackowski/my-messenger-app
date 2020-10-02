import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { ConversationDataService } from '../services/conversation-data.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users-manipulation/users.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  public messages: Message[];
  private activeConversationId: string;
  private messagesSubscription = new Subscription();

  constructor(private conversationDataService: ConversationDataService,
              private usersService: UsersService) { }

  public ngOnInit(): void {
    this.subscribeToActiveConversationId();
    // this.subscribeToConversationMessages();
  }

  public ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }

  public setMessageAlign(message: Message) {
    if (message.author.name === this.usersService.getActiveUser().name) {
      return { justifyContent: 'flex-end' }
    }
  }

  public isSentByThisUser(message: Message): boolean {
    return message.author.name === this.usersService.getActiveUser().name
  }

  private subscribeToConversationMessages(): void {
    console.log('prg')
    console.log('aaaaaaaaaaaaaa', this.activeConversationId);
    this.messagesSubscription.add(
    this.conversationDataService.getMessagesByConversationId(this.activeConversationId)  
    .subscribe((messages: Message[]) => {
      console.log('SDFSDFSD')
      console.log(messages);
      this.messages = messages
    }));
  }

  private subscribeToActiveConversationId(): void {
      this.conversationDataService.getActiveConversationId().subscribe(conversationId => {
        this.activeConversationId = conversationId
        if (conversationId === undefined) {
        } else {
          console.log('asf')
          console.log(conversationId);
        // this.messagesSubscription.unsubscribe();
        this.subscribeToConversationMessages();
        }
      });
  }
}
