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
        this.startDate = moment(res.datetime.start, 'YYYY-MM-DD[T]HH:mm:ss[Z]').utc(0).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        this.endDate = moment(res.datetime.end, 'YYYY-MM-DD[T]HH:mm:ss[Z]').utc(0).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        this.categoryId = res.category.id;
        this.title = res.title;
        this.locationDetail = res.place.title;
        this.lat = res.place.lat;
        this.lng = res.place.lon;
        this.description = res.description;
        this.finishSearch = true;
        if (res['owner']['name'] !== localStorage.getItem('username')) {
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
    if (!eventValues.title) {
      alert('제목을 적어주세요');
      return false;
    }
    if (!eventValues.categoryId) {
      alert('카테고리를 선택해주세요');
      return false;
    }
    if (!eventValues.startDate) {
      alert('시작 시간을 정해주세요');
      return false;
    }
    if (!eventValues.endDate) {
      alert('종료 시간을 정해주세요');
      return false;
    }
    if (!eventValues.description) {
      alert('밋업 설명을 적어주세요');
      return false;
    }
    if (!this.lat || !this.lng) {
      alert('장소를 정해주세요');
      return false;
    }
    if (moment(eventValues.endDate) - moment(eventValues.startDate) < 0) {
      alert('종료시간이 시작시간보다 빠를 수 없습니다!');
      return false;
    }
    return true;
  }
}
