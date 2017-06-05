import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit, OnDestroy {
  num: number;
  event: Object;

  paramsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.num = this.route.snapshot.params['id'];

    // TODO: api 콜해서 실패했을 때
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd ) {
    //     alert('해당 모임이 존재하지 않습니다.');
    //     this.router.navigate(['']);
    //   }
    // });

    // Todo: api Call

    // Dummy

    this.event = {
      name: '훠궈팟!!',
      author: '박명호',
      start: '',
      duration: '3시간',
      description: '대림에서 맛잇게 훠궈를 먹습니다.',
      numOfParticipants: 4,
      participantList: [
        '박명호',
        '김태환',
        '주원영',
        '최현묵'
      ]
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          // repeat Api call
          // this.num = params['id'];
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
