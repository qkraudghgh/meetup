import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './create.component.html',
})

export class CreateComponent implements OnInit {
  num: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.num = this.route.snapshot.params['id'];
  }
}
