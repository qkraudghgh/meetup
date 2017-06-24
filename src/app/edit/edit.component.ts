import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../server.service';
import { NgForm } from '@angular/forms';

declare const moment: any;

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  @ViewChild('f') eventForm: NgForm;

  eventId: number;
  startDate: any;
  endDate: any;
  finishSearch: boolean;
  category: any;
  categoryId = '';
  title: string;
  location: string;
  locationDetail: string;
  description: string;
  lat: number;
  lng: number;
  requestData: object;
  event: object;

  constructor(private router: Router, private route: ActivatedRoute, private serverService: ServerService) {
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.serverService.getCategoryList()
      .subscribe(
        (data) => (this.category = data.sort((a, b) => (a.id - b.id))),
        (error) => (console.log(error))
      );
    this.getEventDetail(this.eventId);
  }

  searchLocation() {
    this.serverService.getGeocode(this.location).subscribe(
      (data) => {
        const dataJson = data.json();
        if (dataJson.status === 'ZERO_RESULTS') {
          this.finishSearch = false;
          alert('찾을 수 없습니다.');
        }
        this.lat = dataJson.results[0].geometry.location.lat;
        this.lng = dataJson.results[0].geometry.location.lng;
        this.finishSearch = true;
      },
      (error) => {
        alert(error);
      }
    );
  }

  clear() {
    this.finishSearch = false;
    this.lat = null;
    this.lng = null;
  }

  onSubmit() {
    const eventValues = this.eventForm.value;
    if (!this.validation()) {
      return;
    }

    this.requestData = {
      title: eventValues.title,
      description: eventValues.description,
      place: {
        title: eventValues.locationDetail,
        lat: this.lat,
        lon: this.lng
      },
      datetime: {
        start: moment(eventValues.startDate).format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
        end: moment(eventValues.endDate).format('YYYY-MM-DD[T]HH:mm:ss[Z]')
      },
      category_id: parseInt(eventValues.categoryId, 10)
    };
    return this.serverService.editEvent(this.eventId, this.requestData).subscribe(
      (res) => {
        this.router.navigateByUrl(`/details/${this.eventId}`);
      }
    );
  }

  getEventDetail(eventId: number) {
    this.serverService.getEventDetail(eventId).subscribe(
      (res) => {
        this.startDate = res.datetime.start;
        this.endDate = res.datetime.end;
        this.categoryId = res.category.id;
        this.title = res.title;
        this.locationDetail = res.place.title;
        this.lat = res.place.lat;
        this.lng = res.place.lon;
        this.description = res.description;
        this.finishSearch = true;
        if (this.event['author'] !== localStorage.getItem('username')) {
          alert('수정 권한이 존재하지 않습니다.');
          this.router.navigate(['../']);
        }
      },
      (error) => {
        alert('해당 모임이 존재하지 않습니다.');
        this.router.navigate(['../']);
      }
    );
  }

  validation() {
    const eventValues = this.eventForm.value;
    console.log(eventValues);
    if (!eventValues.title) {
      alert('Please write Title');
      return false;
    }
    if (!eventValues.categoryId) {
      alert('Please select Category');
      return false;
    }
    if (!eventValues.startDate) {
      alert('Please select StartTime');
      return false;
    }
    if (!eventValues.endDate) {
      alert('Please select EndTime');
      return false;
    }
    if (!eventValues.description) {
      alert('Please Write Description');
      return false;
    }
    if (!this.lat || !this.lng) {
      alert('Please Search Location');
      return false;
    }
    if (moment(eventValues.endDate) - moment(eventValues.startDate) < 0) {
      alert('End date can not be earlier than start date');
      return false;
    }
    return true;
  }
}