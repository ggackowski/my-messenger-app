import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users-manipulation/users.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password1: string;
  public password2: string;
  public authenticationInProgress: boolean = false;

  constructor(private usersService: UsersService,
              private router: Router) { 

  }

  ngOnInit(): void {
    
  }

  public onLogInButtonClick(): void {
    this.router.navigate(['log-in']);
  }

  public onRegisterButtonClick(): void {
    this.authenticationInProgress = true;
    if (this.password1 !== this.password2) {
      console.log('err');
      return;
    }
    this.usersService.registerUser(this.email, this.password1)
      .pipe(take(1)).subscribe(
        () => {
          this.authenticationInProgress = false;
          this.router.navigate(['log-in']);
        }
      );
  }

}
