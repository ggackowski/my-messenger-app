import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/models/conversation.model';
import { ConversationDataService } from 'src/app/conversation-view-and-list/conversation-view/services/conversation-data.service';
import { Color } from 'src/app/enums/color.enum';

@Component({
  selector: 'app-conversation-list-content',
  templateUrl: './conversation-list-content.component.html',
  styleUrls: ['./conversation-list-content.component.css']
})
export class ConversationListContentComponent implements OnInit {
  public conversations: Conversation[];
  public clickedIndex = -1;
  constructor(private conversationDataService: ConversationDataService) { }

  ngOnInit(): void {
    this.subscribeToAvailableConversations();
  }

  subscribeToAvailableConversations(): void {
    this.conversationDataService.getAvailableConversations().subscribe(
      (conversations: Conversation[]) => this.conversations = conversations
    );
  }

  public onConversationClick(index: number) {
    console.log(this.conversations[index]);
    this.clickedIndex = index;
    this.conversationDataService.setActiveConversation(this.conversations[index].conversationId);
  }

  public setClickedStyle() {
    return { backgroundColor: Color.primaryColor };
  }

}
