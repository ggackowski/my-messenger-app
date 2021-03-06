import { Injectable } from '@angular/core';
import { Message, MessageStatus, DataMessage } from '../models/message.model';
import { of, Observable, Subject } from 'rxjs';
import { Conversation } from '../models/conversation.model';
import { AngularFireDatabase, SnapshotAction, AngularFireList } from '@angular/fire/database';
import { map, tap, filter } from 'rxjs/operators';
import { browser } from 'protractor';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConversationDataManipulationService {
  private conversationsListRef = this.angularFireDatabase.list('conversations/conversations');
  private conversationIdsListRef = this.angularFireDatabase.list('conversations/conversationIds');
  private conversationNamesListRef = this.angularFireDatabase.list('conversations/conversationNames');

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  public sendMessage(message: Message, conversationId: string): void {

    const convRef = this.angularFireDatabase.list(`conversations/conversations/${conversationId}/messages`);
    convRef.push(this.convertToDataMessage(message));
  }

  private convertToDataMessage(message: Message): DataMessage {
    return {
      ...message,
      messageId: null,
      date: message.date.toString()
    };
  }

  private convertToViewMessage(message: DataMessage): Message {
    return {
      content: message.content,
      date: new Date(message.date),
      author: message.author,
      status: message.status
    };
  }

  public getAvailableConversationIdsForUserId(userId: string) {
    return this.angularFireDatabase.list(`conversations/conversationParticipants`).snapshotChanges()
            .pipe(map(changes => this.initialMappingToKeyValuePairs(changes)),
             map(pairs => this.mapKeyValuePairsToArrayAndFilter(pairs, userId)));
  }

  public getConversationParticipantsById(conversationId: string) {
    return this.angularFireDatabase.list(`conversations/conversationParticipants/${conversationId}`).snapshotChanges()
      .pipe(map(changes => this.initialMappingToKeyValuePairs(changes)),
            map(pairs => this.mapKeyValuePairsToArray(pairs).map(el => el.value)));
  }



  private mapKeyValuePairsToArrayAndFilter(object: { key: string; value: { name: string; messages: Message[]; participants: User[]; }; }[], userId: string) {
    const arr = this.mapKeyValuePairsToArray(object);
    console.log(arr.filter(el => el.value.includes(userId)))
    return arr.filter(el => el.value.includes(userId)).map(el => el.key);
  }

  private mapKeyValuePairsToArray(object: { key: string; value: { name: string; messages: Message[]; participants: User[]; }; }[]) {
    const arr = [];
    this.createArrayFromObject(object, arr);
    return arr;
  }

  private createArrayFromObject(object: { key: string; value: { name: string; messages: Message[]; participants: User[]; }; }[], arr: any[]) {
    Object.keys(object).forEach(key => {
      arr.push({ ...object[key]});
    });
  }

  public getConversationNameFromId(conversationId: string): Observable<string> {
    const snapshot = this.angularFireDatabase.object(`conversations/conversationNames/${conversationId}`).snapshotChanges();
    return snapshot.pipe(map(a => { if (!a.key) { return null; } return a.payload.val() as string; }));
  }

  public getAllAvailableConversationIds(): Observable<string[]> {
    return this.mapString(this.conversationIdsListRef.snapshotChanges());
  }

  public getAllAvailableConversationNames(): Observable<string[]> {
    return this.mapString(this.conversationNamesListRef.snapshotChanges());
  }

  private mapString(snapshot: Observable<SnapshotAction<unknown>[]>): Observable<string[]> {
    return snapshot.pipe(
      map(elements => elements.map(el => el.payload.val() as string))
    );
  }

  private getAllAvailableConversations(): Observable<Conversation[]> {
    return this.mapConversations(this.conversationsListRef.snapshotChanges());
  }

  public getConversationById(conversationId: string): Observable<Conversation> {
    return this.mapConversations(this.angularFireDatabase.list('conversations/conversations', ref => ref.orderByKey().equalTo(conversationId)).snapshotChanges())
      .pipe(map(convs => convs[0]));
  }

  private mapConversations(snapshot: Observable<any>): Observable<Conversation[]> {
    return snapshot.pipe(
      map(elements => this.initialMappingToKeyValuePairs(elements)),
      map(objects => this.mapObjectsToConversations(objects)))
  }

  private mapObjectsToConversations(objects: { key: string; value: { name: string; messages: Message[]; participants: User[]; }; }[]): Conversation[] {
    return objects.map(object => {
      return {
        name: object.value.name,
        conversationId: object.key,
        messages: this.parseMessages(object.value.messages),
        participants: object.value.participants
      } as Conversation;
    });
  }

  private parseMessages(mess): Message[] {
    const messages = [];
    if (!mess) { return []; }
    Object.keys(mess).forEach(key => 
      messages.push(this.convertToViewMessage({
        ...mess[key],
        messageId: key
      } as DataMessage))  
    );
    return messages;
  }

  private initialMappingToKeyValuePairs(changes): { key: string; value: {name: string, messages: Message[], participants: User[]}} [] {
    console.log(changes.map(c => ({ key: c.payload.key, value: c.payload.val() })))
    return changes.map(c => ({ key: c.payload.key, value: c.payload.val() }));
  }

}
