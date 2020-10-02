import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users-manipulation/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-conversation-list-header',
  templateUrl: './conversation-list-header.component.html',
  styleUrls: ['./conversation-list-header.component.css']
})
export class ConversationListHeaderComponent implements OnInit {
  public user: User;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.user = this.usersService.getActiveUser();
  }

  private subscribeToActiveUser(): void {

  }

}
