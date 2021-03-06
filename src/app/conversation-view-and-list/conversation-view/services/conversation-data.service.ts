import { Injectable } from '@angular/core';
import { Message, MessageStatus } from 'src/app/models/message.model';
import { MockConversationDataManipulationService } from 'src/app/data-providers/mock-conversation-data-manipulation.service';
import { Observable, Subject, BehaviorSubject, Subscription, zip, of } from 'rxjs';
import { UsersService } from 'src/app/users-manipulation/users.service';
import { Conversation } from 'src/app/models/conversation.model';
import { FirebaseConversationDataManipulationService } from 'src/app/data-providers/firebase-conversation-data-manipulation.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationDataService {
  private activeConversation = new BehaviorSubject<string>(undefined); 
  private activeConversationId: string;
  private activeUser = undefined;

  constructor(private conversationDataManipulationService: FirebaseConversationDataManipulationService,
    private usersService: UsersService) { 
      this.subscribeToCurrentUser();
  }

  private subscribeToCurrentUser(): void {
    this.usersService.getActiveUser().subscribe(
      user => this.activeUser = user
    );
  }

  public getActiveConversationId(): BehaviorSubject<string> {
    return this.activeConversation;
  } 

  public getMessagesByConversationId(conversationId: string): Observable<Message[]> {
    console.log('trying to get mess from conv ', conversationId);
    return this.conversationDataManipulationService.getConversationById(conversationId)
      .pipe(map(conversation => conversation.messages));
  }

  public getAvailableConversations(): Observable<string[]> {
    return this.conversationDataManipulationService.getAllAvailableConversationIds();
  }

  public getAvailableConversationsForUser(userId: string): Observable<string[]> {
    return this.conversationDataManipulationService.getAvailableConversationIdsForUserId(userId);
  }

  public getAvailableConversationsData() {
    return zip(this.conversationDataManipulationService.getAllAvailableConversationIds(),
               this.conversationDataManipulationService.getAllAvailableConversationNames());
  }

  public getConversationNameById(id: string): Observable<string> {
    return this.conversationDataManipulationService.getConversationNameFromId(id)
      .pipe(mergeMap(name => {
        if (name) { return of(name); }
        return this.conversationDataManipulationService.getConversationParticipantsById(id)
          .pipe(map(participants => participants.filter(participant => participant !== this.activeUser.name).reduce((acc, participant) => acc += `${participant} `, '')));
      }))
  }

  public getAvailableConversationNames(): Observable<string[]> {
    return this.conversationDataManipulationService.getAllAvailableConversationNames();
  }

  public getLastMessageFromActiveConversation(): BehaviorSubject<Message> {
    return undefined;
  }

  public getActiveConversationName(): Observable<string> {
    return undefined;
  }

  public setActiveConversation(conversationId: string): void {
    this.activeConversationId = conversationId;
    this.activeConversation.next(conversationId);
  }
  

  public sendMessage(content: string) {
    const date = new Date();
    const message: Message = {
      date: date,
      content: content,
      author: this.activeUser,
      status: MessageStatus.SENT,
    }
    console.log(this.activeConversationId)
    this.conversationDataManipulationService.sendMessage(message, this.activeConversationId);
  }
}
