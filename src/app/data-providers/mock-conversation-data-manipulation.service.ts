import { Injectable } from '@angular/core';
import { Message, MessageStatus } from '../models/message.model';
import { of, Observable, Subject } from 'rxjs';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class MockConversationDataManipulationService {
/*
  private mockUsers = [
    { name: 'Me' },
    { name: 'They' },
    { name: 'Him '}
  ];

  private mockConversations: Conversation[] = [
    {
      conversationId: '1',
      messages: [
        {
          date: new Date(),
          content: 'bleh bleh bleh bleh',
          author: {name: 'Me'},
          status: MessageStatus.SEEN
        },
        {
          date: new Date(),
          content: 'Hello',
          author: {name: 'Not me'},
          status: MessageStatus.SENT
        },
      ],
      participants: [
        { name: 'Me' },
        { name: 'Not me' }
      ]
    },

    {
      conversationId: '2',
      messages: [
        {
          date: new Date(),
          content: 'second convo',
          author: {name: 'They'},
          status: MessageStatus.DELIVERED
        },
        {
          date: new Date(),
          content: 'Aaaaa aa',
          author: {name: 'Me'},
          status: MessageStatus.DELIVERED
        },
      ],
      participants: [
        { name: 'Me' },
        { name: 'They' }
      ]
    }
  ]; 

  constructor() { }

  public getConversationMessagesByConversationId(conversationId: string): Observable<Message[]> {
    return of(this.getConversationById(conversationId).messages);
  }

  public sendMessage(message: Message, conversationId: string): void {
    this.getConversationById(conversationId).messages.push(message);
  }

  public getConversationById(conversationId: string): Conversation {
    return this.mockConversations.find((conversation) => conversation.conversationId === conversationId);
  }

  public getAvailableConversations(): Observable<Conversation[]> {
    return of(this.mockConversations);
  }
  */
}
