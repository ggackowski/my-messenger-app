import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/models/conversation.model';
import { ConversationDataService } from 'src/app/conversation-view-and-list/conversation-view/services/conversation-data.service';
import { Color } from 'src/app/enums/color.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conversation-list-content',
  templateUrl: './conversation-list-content.component.html',
  styleUrls: ['./conversation-list-content.component.css']
})
export class ConversationListContentComponent implements OnInit {
  public conversations: string[];
  public conversationsIds: string[];
  public clickedIndex = -1;
  constructor(private conversationDataService: ConversationDataService) { }

  ngOnInit(): void {
    this.subscribeToAvailableConversations();
  }

  subscribeToAvailableConversations(): void {
    this.conversationDataService.getAvailableConversationsData().subscribe(
      (conversations: [string[], string[]]) => { 
        console.log(conversations); 
        this.conversations = conversations[1];
        this.conversationsIds = conversations[0];
      }
    );
  }

  public onConversationClick(index: number) {
    console.log(this.conversations[index]);
    this.clickedIndex = index;
    console.log(this.conversationsIds[index]);
    this.conversationDataService.setActiveConversation(this.conversationsIds[index]);
  }

  public setClickedStyle() {
    return { backgroundColor: Color.primaryColor };
  }

}
