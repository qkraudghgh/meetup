import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerService {

  constructor(private http: Http) {}

  private setHeader() {
    const headers = new Headers();
    headers.append('Authorization', `Token ${localStorage.getItem('access_token')}`);
    return headers;
  }

  getEventList() {
    return this.http.get('http://localhost:8080/events', {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  getCategoryList() {
    return this.http.get('http://localhost:8080/categories', {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  getLoginToken(code: string) {
    return this.http.get(`http://localhost:8080/auth?code=${code}&redirect_uri=http://localhost:4200/auth`);
  }

  getGeocode(location: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}& \
    key=${'AIzaSyDaPW1vqyEsyZfCmszXr9_yuWZJh9UrWlw'}`);
  }

  createEvent(req: object) {
    return this.http.post(`http://localhost:8080/events`, req, {
      headers: this.setHeader()
    }).map(res => res.json());
  }
}
