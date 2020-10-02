import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { MobileViewService } from '../mobile-view.service';
import { ThrowStmt } from '@angular/compiler';
import { ConversationDataService } from './conversation-view/services/conversation-data.service';
import { UsersService } from '../users-manipulation/users.service';


@Component({
  selector: 'app-conversation-view-and-list',
  templateUrl: './conversation-view-and-list.component.html',
  styleUrls: ['./conversation-view-and-list.component.css']
})
export class ConversationViewAndListComponent implements OnInit {
  public isViewMobile = false;
  public activeUser = undefined;

  constructor(private mobileViewService: MobileViewService,
              private conversationDataService: ConversationDataService,
              private usersService: UsersService) { 
    this.onScreenResize();
    this.subscribeToIsMobileSubject();
    this.subscribeToActiveUser();
  }

  public ngOnInit(): void {

  }

  private subscribeToActiveUser(): void {
    this.usersService.getActiveUser().subscribe(user => this.activeUser = user);
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
