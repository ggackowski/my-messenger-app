import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private angularFireAuth: AngularFireAuth) { 

  }

  public login(email: string, password: string): Observable<string> {
    return from(this.angularFireAuth.signInWithEmailAndPassword(email, password)).pipe(map(x => x.user.uid));
  }

  public getActiveUser(): Observable<User> {
    return from(this.angularFireAuth.user).pipe(map(x => ({name: x.email} as User)));
  }

  public logout(): Observable<void> {
    return from(this.angularFireAuth.signOut());
  }

  public register(email: string, password: string): Observable<string> {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(email, password)).pipe(map(x => x.user.uid));
  }

  public removeUser(): Observable<void> {
    return of();
  }
}
