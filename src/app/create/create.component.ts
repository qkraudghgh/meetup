import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  num: number;
  startDate: any;
  endDate: any;
  finishSearch: boolean;

  category = [
    {value: 'meal', viewValue: 'Meal'},
    {value: 'drink', viewValue: 'Drink'},
    {value: 'coffee', viewValue: 'Coffee'},
    {value: 'coding', viewValue: 'Coding'}
  ];

  constructor(private route: ActivatedRoute, private serverService: ServerService) {
  }

  ngOnInit() {
    this.num = this.route.snapshot.params['id'];
  }

  searchLocation() {
  }

  clear() {
    this.finishSearch = false;
  }
}
