import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../server.service';

declare const moment: any;
import * as _ from 'lodash';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  eventId: any;
  event: object = {
    lat: '',
    lng: '',
  };
  comment: string;
  comments: object;
  isAuthor: boolean;
  participants: object;
  isJoin: boolean;
  username: string;
  participantsNum: number;

  constructor(private router: Router, private route: ActivatedRoute, private server: ServerService) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.username = localStorage.getItem('username');
    this.getEventDetail(this.eventId);
    this.getEventComments(this.eventId);
    this.getParticipants(this.eventId);
  }

  getEventDetail(eventId: number) {
    this.server.getEventDetail(eventId).subscribe(
      (res) => {
        this.event = {
          title: res.title,
          author: res.owner.name,
          authorImgUrl: res.owner.avatar,
          categoryTitle: res.category.title,
          description: res.description,
          startDate: moment(res.datetime.start).format('YY-MM-DD HH:mm'),
          endDate: moment(res.datetime.end).format('YY-MM-DD HH:mm'),
          locationDetail: res.place.title,
          lat: res.place.lat,
          lng: res.place.lon,
          updated: moment(res.updated_at).fromNow()
        };

        if (this.event['author'] === this.username) {
          this.isAuthor = true;
        }
      },
      (error) => {
        alert('해당 모임이 존재하지 않습니다.');
        this.router.navigate(['../']);
      }
    );
  }

  getParticipants(eventId: number) {
    this.server.getParticipants(eventId).subscribe(
      (res) => {
        this.participants = res;
        this.participantsNum = res.length;
        this.isJoin = false;
        _.forEach(res, participant => {
          this.isJoin = participant.name === this.username;
        });
      },
      (error) => {

      }
    );
  }

  deleteEvent() {
    if (confirm('Are you sure you want to delete it?')) {
      return this.server.deleteEvent(this.eventId).subscribe(
        (res) => {
          alert('Successfully deleted.');
          this.router.navigate(['../']);
        },
        (error) => {
          alert('You can not delete it.');
        }
      );
    }
  }

  getEventComments(eventId: number) {
    this.server.getEventComments(eventId).subscribe(
      (res) => {
        let isAuth = false;
        this.comments = _.map(res, data => {
          if (data['writer'].name === localStorage.getItem('username')) {
            isAuth = true;
          }
          return {
            id: data['id'],
            authorName: data['writer'].name,
            authorImgUrl: data['writer'].avatar,
            updated: moment(data['updated_at']).fromNow(),
            content: data['content'],
            isAuth: isAuth
          };
        });
      }
    );
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure you want to delete it?')) {
      return this.server.deleteComment(this.eventId, commentId).subscribe(
        (res) => {
          this.getEventComments(this.eventId);
        },
        (error) => {
          alert('You can not delete it.');
        }
      );
    }
  }

  joinMeetup() {
    this.server.joinMeetup(this.eventId).subscribe(
      (res) => {
        this.getParticipants(this.eventId);
      }
    );
  }

  disJoinMeetup() {
    this.server.disJoinMeetup(this.eventId).subscribe(
      (res) => {
        this.getParticipants(this.eventId);
      }
    );
  }

  onSubmit() {
    if (!this.comment) {
      alert('Please write comment');
      return;
    }

    const req: object = {
      content: this.comment,
      event_id: parseInt(this.eventId, 10)
    };

    return this.server.postComment(this.eventId, req).subscribe(
      (res) => {
        $('#commentTextarea').val('');
        this.getEventComments(this.eventId);
      }
    );
  }
}
