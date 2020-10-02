import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FirebaseAuthService } from '../data-providers/firebase-auth.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { threadId } from 'worker_threads';

const mockUser = {
  name: 'Grzems'
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private activeUser: User;
  
  constructor(private authService: FirebaseAuthService) { 
    this.subscribeToActiveUser();
    this.logout();
  }

  public getActiveUser(): Observable<User> {
    return this.authService.getActiveUser();
  }

  public registerUser(email: string, password: string): Observable<string> {
    return this.authService.register(email, password);
  }

  public removeUser(email: string): void {

  }

  public logout(): Observable<void> {
    return this.authService.logout();
  }

  public loginWithCredentials(email: string, password: string): Observable<string> {
    console.log('LOGUJE SIE');
    return this.authService.login(email, password)
  }

  private subscribeToActiveUser(): void {
    this.authService.getActiveUser().subscribe(
      user => { this.activeUser = user;       console.log('gettin user', user); }
    )
  }
}
