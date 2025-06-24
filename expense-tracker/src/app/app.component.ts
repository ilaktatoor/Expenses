import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './componets/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense-tracker';
   constructor(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        console.log('Navigation to:', e.url);
      }
    });
  }
}
