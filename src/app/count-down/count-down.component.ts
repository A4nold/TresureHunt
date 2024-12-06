import { Component, Input, OnInit, Output, EventEmitter, output, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { HINTS } from './mock-hints';


@Component({
    selector: 'count-down',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, CommonModule, MatToolbarModule, MatGridListModule,
      MatIconModule,],
    templateUrl: './count-down.component.html',
    styleUrls: ['./count-down.component.scss']
})
  export class CountDownComponent implements OnInit, OnDestroy {

    @Output() countdownFinished: EventEmitter<any> = new EventEmitter();
    showHint = false;
    hints = HINTS;

    constructor() {}
    
    ngOnInit(): void {
      this.showHint = false;
      // this.startTimer();
    }

    counter:number = 0;
    seconds:number = 60;
    timer:any;
    timerRunning:boolean = false;

    startTimer(){
      this.timer = setInterval(()=>{
        this.seconds--;

        if(this.seconds===0){
          clearInterval(this.timer);
          this.countdownFinished.emit(true);

          this.showHint = !this.showHint;
        }
      }, 1000)
    }

    toggleTimer(){
      if(this.timerRunning){
        clearInterval(this.timer);
      }else{
        this.startTimer();
      }
      this.timerRunning = !this.timerRunning;
    }

    resetTimer(){
      clearInterval(this.timer);
      this.seconds=60;
      this.timerRunning=true;
      this.showHint=false;
      this.counter++;

      if(this.counter > 9){
        this.counter = 0;
      }

      this.displayHints(this.counter);

      this.startTimer();
    }

    ngOnDestroy() {
      // Clear interval to prevent memory leaks
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  

    displayHints(index:number):string{
      return this.hints[index - 1].hint || 'No more hints available';
    }

    formatTime(seconds:number):string{
      const minutes:number = Math.floor(seconds/60);
      const remainingSeconds:number = seconds%60;

      const formattedMinutes:string = this.padNumber(minutes);
      const formattedSeconds:string = this.padNumber(remainingSeconds);

      return `${formattedMinutes}:${formattedSeconds}`;
    }

    private padNumber(number:number):string{
      return number < 10 ? `0${number}`:`${number}`
    }

    openLink(type: string) {
      switch(type) {
        case 'github':
          window.open('https://github.com', '_blank');
          break;
        case 'linkedin':
          window.open('https://linkedin.com', '_blank');
          break;
        case 'email':
          window.location.href = 'mailto:your-email@example.com';
          break;
      }
    }
  
  }