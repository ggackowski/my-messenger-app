import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { of, Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class MockConversationDataManipulationService {

  private mockMessages = [
    {
      date: new Date(),
      content: 'Hi',
      author: {name: 'Me'}
    },
    {
      date: new Date(),
      content: 'Test',
      author: {name: 'Me'}
    },
    {
      date: new Date(),
      content: 'bleh bleh bleh bleh',
      author: {name: 'Me'}
    },
    {
      date: new Date(),
      content: 'Hello',
      author: {name: 'Not me'}
    },
    {
      date: new Date(),
      content: 'trrrrrrrrrrrrrrr r r r',
      author: {name: 'Me'}
    }
  ];

  private mockUsers = [
    { name: 'Me' },
    { name: 'They' },
    { name: 'Him '}
  ];

  private mockConversations = [
    {
      conversationId: '1',
      messages: [
        {
          date: new Date(),
          content: 'bleh bleh bleh bleh',
          author: {name: 'Me'}
        },
        {
          date: new Date(),
          content: 'Hello',
          author: {name: 'Not me'}
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
          author: {name: 'They'}
        },
        {
          date: new Date(),
          content: 'Aaaaa aa',
          author: {name: 'Me'}
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
}
