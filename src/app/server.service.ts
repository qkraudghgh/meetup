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

    getCategoryList() {
        const headers = new Headers();
        headers.append('Authorization', `Token ${localStorage.getItem('access_token')}`);
        return this.http.get('http://localhost:8080/category', {
            headers: headers
        });
    }

    getLoginToken(code: string) {
        return this.http.get(`http://localhost:8080/auth?code=${code}&redirect_uri=http://localhost:4200/auth`);
    }

    getGeocode(location: string) {
      return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${'AIzaSyDaPW1vqyEsyZfCmszXr9_yuWZJh9UrWlw'}`);
    }
}
