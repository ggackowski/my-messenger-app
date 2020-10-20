import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/models/conversation.model';
import { ConversationDataService } from 'src/app/conversation-view-and-list/conversation-view/services/conversation-data.service';
import { Color } from 'src/app/enums/color.enum';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/users-manipulation/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-conversation-list-content',
  templateUrl: './conversation-list-content.component.html',
  styleUrls: ['./conversation-list-content.component.css']
})
export class ConversationListContentComponent implements OnInit {
  public conversations = [];
  public conversationsIds = [];
  public clickedIndex = -1;
  private activeUser: User = undefined;

  constructor(private conversationDataService: ConversationDataService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.subscribeToCurrentUserAndConversations();
  }

  private subscribeToCurrentUserAndConversations(): void {
    this.usersService.getActiveUser().subscribe(user => 
     { this.activeUser = user;
      this.subscribeToAvailableConversations();
    });
  }

  private subscribeToAvailableConversations(): void {
    this.conversationDataService.getAvailableConversationsForUser(this.activeUser.name)
      .subscribe(conversationsIds => {
        this.conversations.length = 0;
        this.conversationsIds.length = 0;
        this.conversationsIds = conversationsIds;
        conversationsIds.forEach(
          conversationId => {  
            this.conversationDataService.getConversationNameById(conversationId)
              .subscribe(conversationName => this.conversations.push(conversationName)) }
        )
      });
  }

  private subscribeToActiveUser(): void {
    
  }

  public onConversationClick(index: number) {
    this.clickedIndex = index;
    this.conversationDataService.setActiveConversation(this.conversationsIds[index]);
  }

  public setClickedStyle() {
    return { backgroundColor: Color.primaryColor };
  }

}
