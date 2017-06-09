import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  startDate: any;
  endDate: any;
  finishSearch: boolean;
  category: number;
  title: string;
  lat: number;
  lng: number;

  constructor(private route: ActivatedRoute, private serverService: ServerService) {
  }

  ngOnInit() {
    this.serverService.getCategoryList()
      .subscribe(
        (data) => (this.category = data.json().sort((a, b) => (a.id - b.id))),
        (error) => (console.log(error))
      );
  }

  searchLocation(location: string) {
    this.serverService.getGeocode(location).subscribe(
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
}
