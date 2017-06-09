import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ServerService {
    constructor(private http: Http) {}

    getEventList() {
        const headers = new Headers();
        headers.append('Authorization', `Token ${localStorage.getItem('access_token')}`);
        return this.http.get('http://localhost:8080/events', {
            headers: headers
        });
    }

    getLoginToken(code: string) {
        return this.http.get(`http://localhost:8080/auth?code=${code}&redirect_uri=http://localhost:4200/auth`);
    }
}
