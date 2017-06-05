import { Component } from '@angular/core';

@Component({
  templateUrl: './calendar.component.html'
})

export class CalendarAppComponent {

  calendarOptions: Object = {
    fixedWeekCount : false,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,basicWeek,basicDay'
    },
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2017-06-01'
      },
      {
        title: 'Long Event',
        start: '2017-06-07',
        end: '2017-06-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2017-06-09T16:00:00',
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2017-06-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2017-06-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2017-06-12T10:30:00',
        end: '2017-06-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2017-06-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2017-06-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2017-06-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2017-06-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2017-06-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: '/details/1',
        start: '2017-06-28'
      }
    ],
  };
}
