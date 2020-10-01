import { Component, OnInit } from '@angular/core';
import { ConversationDataService } from './services/conversation-data.service';

@Component({
  selector: 'app-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.css']
})
export class ConversationViewComponent implements OnInit {
  private conversationSelected = false;
  constructor(private conversationDataService: ConversationDataService) { }

  ngOnInit(): void {
    this.subscribeToActiveConversation();
  }

  public isConversationSelected(): boolean {
    return this.conversationSelected;
  }

  public subscribeToActiveConversation(): void {
    this.conversationDataService.getActiveConversationId().subscribe(conv => {
      this.conversationSelected = conv !== undefined;
    })
  }

}
