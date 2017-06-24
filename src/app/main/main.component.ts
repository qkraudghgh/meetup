import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

import * as _ from 'lodash';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainAppComponent implements OnInit {

  events: any;
  isLogin = false;
  clientId = environment.slackClientId;
  authUrl = `${environment.webUrl}/auth`;

  calendarOptions: Object = {
    fixedWeekCount : false,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,basicWeek,basicDay'
    },
    editable: false,
    height: 'parent',
    eventLimit: true, // allow "more" link when too many events
    timeFormat: 'H:mm',
    events: [],
  };

  constructor(private server: ServerService) {}

  ngOnInit(): void {
    if (localStorage.getItem('session') === 'true') {
      this.server.getEventList()
        .subscribe(
          (res) => {
            this.isLogin = true;
            this.events = _.map(res, data => {
              return {
                title: data['title'],
                start: data['datetime']['start'],
                end: data['datetime']['end'],
                url: `/details/${data['id']}`
              };
            });
            this.calendarOptions['events'] = this.events;
          },
          (error) => {
            alert('Fail to pull events');
          }
        );
    }
  }
}
