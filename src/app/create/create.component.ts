import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.num = this.route.snapshot.params['id'];
  }

  searchLocation() {
    this.finishSearch = true;
  }

  clear() {
    this.finishSearch = false;
  }
}
