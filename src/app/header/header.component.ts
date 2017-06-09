import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  private loggedIn: boolean;
  clientId = '193315155424.194788594150';
  authUrl = 'http://localhost:4200/auth';

  constructor(private authService: AuthService) {
    if (localStorage.getItem('session') === 'true') {
      this.loggedIn = localStorage.getItem('session') === 'true';
    } else {
      this.loggedIn = false;
    }

  }

  ngOnInit(): void {
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
