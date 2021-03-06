import { Component, OnInit } from '@angular/core';
import { MobileViewService } from 'src/app/mobile-view.service';
import { ConversationDataService } from '../services/conversation-data.service';

@Component({
  selector: 'app-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.css']
})
export class ConversationHeaderComponent implements OnInit {
  public isViewMobile = false;
  public conversationName = '';

  constructor(private mobileViewService: MobileViewService,
              private conversationDataService: ConversationDataService) { }

  ngOnInit(): void {
    this.subscribeToIsMobileSubject();
    this.subscribeToActiveConversationName();
  }

  public onBackButtonClick(): void {
    this.conversationDataService.setActiveConversation(undefined);
  }

  private subscribeToIsMobileSubject(): void {
    this.mobileViewService.getIsMobileSubject().subscribe(isMobile => {
      this.isViewMobile = isMobile;
    })
  }

  private subscribeToActiveConversationName(): void {
    this.conversationDataService.getActiveConversationId().subscribe(conversationId => {
      if (conversationId === undefined) {
      } else {
        this.conversationName = conversationId;
      }
    });
}

}
