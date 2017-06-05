import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  private loggedIn: boolean;
  constructor(private authService: AuthService) {
    if (localStorage.getItem('session') === 'true') {
      this.loggedIn = localStorage.getItem('session') === 'true';
    } else {
      this.loggedIn = false;
    }

  }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login();
    this.storedToSession(this.authService.loggenIn);
  }

  onLogout() {
    this.authService.logout();
    this.storedToSession(this.authService.loggenIn);
  }

  private storedToSession(loggedIn) {
    this.loggedIn = loggedIn;
    localStorage.setItem('session', loggedIn.toString());
  }

}
