import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,
    ReactiveFormsModule
], 
  templateUrl: './app.html'
})
export class AppComponent {
    showNavbar = true;

  constructor(private router: Router) {
    // Detect route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const hideNavbarRoutes = ['', '/login', '/register']; 
      this.showNavbar = !hideNavbarRoutes.includes(event.urlAfterRedirects);
    });
  }
}
