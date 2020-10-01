import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MockConversationDataManipulationService } from 'src/app/data-providers/mock-conversation-data-manipulation.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UsersService } from 'src/app/users-manipulation/users.service';
import { Conversation } from 'src/app/models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationDataService {
  private activeConversation: Conversation;
  private availableConversations: Observable<Conversation[]>;
  private activeConversationSubject = new BehaviorSubject<string>(undefined);

  constructor(private conversationDataManipulationService: MockConversationDataManipulationService,
    private usersService: UsersService) { 
      this.availableConversations = this.conversationDataManipulationService.getAvailableConversations();
    }

  public getActiveConversationId(): BehaviorSubject<string> {
    return this.activeConversationSubject;
  } 

  public getMessagesByConversationId(conversationId: string): Observable<Message[]> {
    return this.conversationDataManipulationService.getConversationMessagesByConversationId(conversationId);
  }

  public getAvailableConversations(): Observable<Conversation[]> {
    return this.availableConversations;
  }

  public setActiveConversation(conversationId: string): void {
    if (conversationId === undefined) {
      this.activeConversation = undefined;
      this.activeConversationSubject.next(undefined);
      return;
    }
    this.activeConversation = this.conversationDataManipulationService.getConversationById(conversationId);
    this.activeConversationSubject.next(this.activeConversation.conversationId);
  }

  public sendMessage(content: string) {
    const date = new Date();
    const message: Message = {
      date: date,
      content: content,
      author: this.usersService.getActiveUser()
    }
    this.conversationDataManipulationService.sendMessage(message, this.activeConversation.conversationId);
  }

}
