import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users-manipulation/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-conversation-list-header',
  templateUrl: './conversation-list-header.component.html',
  styleUrls: ['./conversation-list-header.component.css']
})
export class ConversationListHeaderComponent implements OnInit {
  public activeUser: User;

  constructor(private usersService: UsersService) {
    this.subscribeToActiveUser();
   }

  ngOnInit(): void {
  }

  private subscribeToActiveUser(): void {
    this.usersService.getActiveUser().subscribe(user => this.activeUser = user);
  }

}
