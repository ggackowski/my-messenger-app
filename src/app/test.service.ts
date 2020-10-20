import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { map, tap, mergeMap } from 'rxjs/operators';
import { Conversation } from './models/conversation.model';
import { Message } from './models/message.model';
import { User } from './models/user.model';
import { Observable, zip, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.getAvailableConversationIdsForUserId('e@mail.com').subscribe(
      a => console.log(a)
    )
    this.getConversationNameById('0').subscribe(
      a => console.log(a)
    )
    this.getConversationParticipantsById('0').subscribe(
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

  public getConversationNameById(id: string): Observable<string> {
    return this.getConversationNameFromId(id)
      .pipe(mergeMap(name => {
        if (name) { return of(name); }
        console.log(name, id);
        return this.getConversationParticipantsById(id)
          .pipe(map(participants => participants.filter(participant => participant !== 'a@a.pl').reduce((acc, participant) => acc += `${participant} `, '')));
      }))
  }


  public getConversationNameFromId(conversationId: string): Observable<string> {
    const snapshot = this.angularFireDatabase.object(`conversations/conversationNames/${conversationId}`).snapshotChanges();
    return snapshot.pipe(map(a => { if (!a.key) { return null; } return a.payload.val() as string; }));
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
