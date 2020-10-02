import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const mockUser = {
  name: 'Jim'
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public getActiveUser(): User {
    return mockUser;
  }
}
