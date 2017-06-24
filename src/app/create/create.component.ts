import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../server.service';
import { NgForm } from '@angular/forms';

declare const moment: any;

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  @ViewChild('f') eventForm: NgForm;

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

  constructor(private router: Router, private serverService: ServerService) {
  }

  ngOnInit() {
    this.serverService.getCategoryList()
      .subscribe(
        (data) => (this.category = data.sort((a, b) => (a.id - b.id))),
        (error) => (console.log(error))
      );
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
    return this.serverService.createEvent(this.requestData).subscribe(
      (res) => {
        this.router.navigateByUrl(`/details/${res.id}`);
      }
    );
  }

  validation() {
    const eventValues = this.eventForm.value;
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
    if (!eventValues.location) {
      alert('Please Write location detail');
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
