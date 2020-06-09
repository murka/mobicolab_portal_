import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = undefined;
  subscription: Subscription;

  constructor(private dialog: MatDialog,
    private authService: AuthService ) { }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.subscription = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  openLoginForm() {
    const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

    loginRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }

  logOut() {
    this.username = undefined;
    this.authService.logOut();
  }

}
