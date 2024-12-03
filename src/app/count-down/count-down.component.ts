import { Component, Input } from '@angular/core';
import { map, timer, takeWhile } from 'rxjs';

import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'count-down',
    standalone: true,
    imports: [AsyncPipe, DatePipe],
    templateUrl: './count-down.component.html',
    styleUrls: ['./count-down.component.scss']
})
  export class CountDownComponent {

    @Input() seconds = 400;
  
    timeRemaining$ = timer(0, 1000).pipe(
      map(n => (this.seconds - n) * 1000),
      takeWhile(n => n >= 0),
    );
  
  }