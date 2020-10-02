import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users-manipulation/users.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public email: string;
  public password: string;
  public authenticationInProgress = false;
  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public onRegisterButtonClick(): void {
    this.router.navigate(['register']);
  }

  public onLogInButtonClick(): void {
    this.authenticationInProgress = true;
    this.usersService.loginWithCredentials(this.email, this.password)
      .pipe(take(1)).subscribe((response) => {
        if (response) { 
          this.authenticationInProgress = false;
          this.router.navigate(['conversation-view-and-list']);
        } else {
          console.log('err');
        }
      })
  }

}
