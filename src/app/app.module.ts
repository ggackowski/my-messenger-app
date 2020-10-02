import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './conversation-view-and-list/conversation-view/message-list/message/message.component';
import { MessageListComponent } from './conversation-view-and-list/conversation-view/message-list/message-list.component';
import { ConversationHeaderComponent } from './conversation-view-and-list/conversation-view/conversation-header/conversation-header.component';
import { ConversationViewComponent } from './conversation-view-and-list/conversation-view/conversation-view.component';
import { MessageInputComponent } from './conversation-view-and-list/conversation-view/message-input/message-input.component';
import { ConversationListComponent } from './conversation-view-and-list/conversation-list/conversation-list.component';
import { ConversationListHeaderComponent } from './conversation-view-and-list/conversation-list/conversation-list-header/conversation-list-header.component';
import { ConversationListContentComponent } from './conversation-view-and-list/conversation-list/conversation-list-content/conversation-list-content.component';
import { ConversationViewAndListComponent } from './conversation-view-and-list/conversation-view-and-list.component';
import { SentMessageStatusComponent } from './conversation-view-and-list/conversation-view/sent-message-status/sent-message-status.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    MessageListComponent,
    ConversationHeaderComponent,
    ConversationViewComponent,
    MessageInputComponent,
    ConversationListComponent,
    ConversationListHeaderComponent,
    ConversationListContentComponent,
    ConversationViewAndListComponent,
    SentMessageStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
