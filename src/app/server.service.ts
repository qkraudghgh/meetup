import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

const apiRootUrl = 'http://localhost:8080';

@Injectable()
export class ServerService {

  constructor(private http: Http) {}

  private setHeader() {
    const headers = new Headers();
    headers.append('Authorization', `Token ${localStorage.getItem('access_token')}`);
    return headers;
  }

  getEventList() {
    return this.http.get(`${apiRootUrl}/events`, {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  getEventDetail(eventId: number) {
    return this.http.get(`${apiRootUrl}/events/${eventId}`, {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  getCategoryList() {
    return this.http.get(`${apiRootUrl}/categories`, {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  getParticipants(eventId: number) {
    return this.http.get(`${apiRootUrl}/events/${eventId}/participants`, {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  getLoginToken(code: string) {
    return this.http.get(`${apiRootUrl}/auth?code=${code}&redirect_uri=http://localhost:4200/auth`);
  }

  getGeocode(location: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}& \
    key=${'AIzaSyDaPW1vqyEsyZfCmszXr9_yuWZJh9UrWlw'}`);
  }

  joinMeetup(eventId: number) {
    return this.http.put(`${apiRootUrl}/events/${eventId}/join`, {}, {
      headers: this.setHeader()
    });
  }

  disJoinMeetup(eventId: number) {
    return this.http.delete(`${apiRootUrl}/events/${eventId}/join`, {
      headers: this.setHeader()
    });
  }

  createEvent(req: object) {
    return this.http.post(`${apiRootUrl}/events`, req, {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  editEvent(eventId: number, req: object) {
    return this.http.put(`${apiRootUrl}/events/${eventId}`, req, {
      headers: this.setHeader()
    });
  }

  deleteEvent(eventId: number) {
    return this.http.delete(`${apiRootUrl}/events/${eventId}`, {
      headers: this.setHeader()
    });
  }

  getEventComments(eventId: number) {
    return this.http.get(`${apiRootUrl}/events/${eventId}/comments`, {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  postComment(eventId: number, req: object) {
    return this.http.post(`${apiRootUrl}/events/${eventId}/comments`, req, {
      headers: this.setHeader()
    }).map(res => res.json());
  }

  deleteComment(eventId: number, commentId: number) {
    return this.http.delete(`${apiRootUrl}/events/${eventId}/comments/${commentId}`, {
      headers: this.setHeader()
    });
  }
}
