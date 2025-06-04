import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { tokenSignal } from './state/auth.state';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn(): boolean {
    return !!tokenSignal();
  }

  signout(): void {
    this.authService.clearToken();
    this.router.navigate(['/signin']);
  }
}
