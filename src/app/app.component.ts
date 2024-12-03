import { Component } from '@angular/core';
import { CountDownComponent } from './count-down/count-down.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountDownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Treasure Hunt';
}
