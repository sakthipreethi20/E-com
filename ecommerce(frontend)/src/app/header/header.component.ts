import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName: string | null = null;

  constructor(private loginservice: LoginService, private route: Router) {}

  logOut() {
    this.loginservice.loggedIn = false;
    this.userName = ' ';
    this.route.navigate(['/']);
  }
}
