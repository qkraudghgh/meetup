import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './auth-redirect.component.html'
})

export class AuthRedirectComponent implements OnInit {

    code: any;

    constructor(private route: ActivatedRoute, private service: ServerService, private authService: AuthService) {
    }

    ngOnInit() {
        // get code parameter
        this.code = /code=([^&]+)/.exec(window.location.href)[1];
        this.service.getLoginToken(this.code).subscribe(
            (token) => {
                const res = token.json();
                const accessToken = res['token'];
                const username = res['name'];
                if (accessToken) {
                    localStorage.setItem('access_token', accessToken);
                    if (username) {
                      localStorage.setItem('username', username);
                    }
                    this.authService.login();
                    const session = this.authService.loggenIn;
                    localStorage.setItem('session', session.toString());
                } else {
                    alert('로그인에 실패했습니다.');
                    console.log(accessToken);
                    localStorage.clear();
                    location.href = '/';
                }

            },
            (error) => {
                console.error(error);
            }
        );
    }

}
