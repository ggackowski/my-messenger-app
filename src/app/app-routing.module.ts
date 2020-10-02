import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { ConversationViewAndListComponent } from './conversation-view-and-list/conversation-view-and-list.component';


const routes: Routes = [
{ path: 'log-in', component: LogInComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'conversation-view-and-list', component: ConversationViewAndListComponent },
{ path: '', redirectTo: '/log-in', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
