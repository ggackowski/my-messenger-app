import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Conversation } from './models/conversation.model';
import { Message } from './models/message.model';
import { User } from './models/user.model';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.getAvailableConversationIdsForUserId('e@mail.com').subscribe(
      a => console.log(a)
    )
    this.getConversationNameFromId('0').subscribe(
      a => console.log(a)
    )
  }

  public getAvailableConversationsData() {
    return zip(this.getAllAvailableConversationIds(),
               this.getAllAvailableConversationNames());
  }

  public getAvailableConversationIdsForUserId(userId: string) {
    return this.angularFireDatabase.list(`conversations/conversationParticipants`).snapshotChanges()
            .pipe(map(changes => this.initialMappingToKeyValuePairs(changes)),
             map(object => {
              const arr = []
              Object.keys(object).forEach(key => {
                arr.push({
                  ...object[key]
                })
              })
              console.log(arr.filter(el => el.value.includes(userId)));
              return arr.filter(el => el.value.includes(userId));
            }));
  }


  public getConversationNameFromId(conversationId: string): Observable<string> {
    return this.angularFireDatabase.object(`conversations/conversationNames/${conversationId}`)
            .snapshotChanges().pipe(map(a => a.payload.val() as string));
  }


  public sendMessage(message: Message, conversationId: string): void {
    // this.mapConversations(this.angularFireDatabase.list('conversations/')
  }

  public getAllAvailableConversationIds(): Observable<string[]> {
    return this.mapString(this.angularFireDatabase.list('conversations/conversationIds').snapshotChanges());
  }

  public getAllAvailableConversationNames(): Observable<string[]> {
    return this.mapString(this.angularFireDatabase.list('conversations/conversationNames').snapshotChanges());
  }

  private mapString(snapshot: Observable<SnapshotAction<unknown>[]>): Observable<string[]> {
    return snapshot.pipe(
      map(elements => elements.map(el => el.payload.val() as string))
    );
  }

  private getAllAvailableConversations(): Observable<Conversation[]> {
    return this.mapConversations(this.angularFireDatabase.list('conversations/conversations').snapshotChanges());
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
        messages: object.value.messages,
        participants: object.value.participants
      } as Conversation;
    });
  }

  private initialMappingToKeyValuePairs(changes): { key: string; value: {name: string, messages: Message[], participants: User[]}} [] {
    return changes.map(c => ({ key: c.payload.key, value: c.payload.val() }));
  }
}
