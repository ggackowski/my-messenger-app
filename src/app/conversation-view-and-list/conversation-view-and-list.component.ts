import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { MobileViewService } from '../mobile-view.service';
import { ThrowStmt } from '@angular/compiler';
import { ConversationDataService } from './conversation-view/services/conversation-data.service';


@Component({
  selector: 'app-conversation-view-and-list',
  templateUrl: './conversation-view-and-list.component.html',
  styleUrls: ['./conversation-view-and-list.component.css']
})
export class ConversationViewAndListComponent implements OnInit {
  public isViewMobile = false;

  constructor(private mobileViewService: MobileViewService,
              private conversationDataService: ConversationDataService) { 
    this.onScreenResize();
  }

  public ngOnInit(): void {
    this.subscribeToIsMobileSubject();
  }

  @HostListener('window:resize', ['$event'])
  onScreenResize(event?) {
  if (window.innerWidth < 800) {
    this.mobileViewService.setMobileView();
  } else {
    this.mobileViewService.setDesktopView();
  }
  }

  public shouldDisplayList(): boolean {
    if (!this.isViewMobile) { return true; }
    return this.conversationDataService.getActiveConversationId().getValue() === undefined;
  }

  public shouldDisplayConversation(): boolean {
    if (!this.isViewMobile) { return true; }
    return this.conversationDataService.getActiveConversationId().getValue() !== undefined;
  }

  private subscribeToIsMobileSubject(): void {
    this.mobileViewService.getIsMobileSubject().subscribe(isMobile => {
      this.isViewMobile = isMobile;
    })
  }
}
