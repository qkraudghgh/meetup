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
  category: any;

  constructor(private route: ActivatedRoute, private serverService: ServerService) {
  }

  ngOnInit() {
      this.serverService.getCategoryList()
          .subscribe(
          (data) => (this.category = data.json().sort((a, b) => (a.id - b.id))),
          (error) => (console.log(error))
      );
  }

  searchLocation() {
  }

  clear() {
    this.finishSearch = false;
  }
}
