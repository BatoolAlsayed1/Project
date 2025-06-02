import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from './state/auth.selectors';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule,
    HttpClientModule,  
  ],
})
export class AppComponent {
  token!: Observable<string | null>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    // Listen to token from store:
    this.token = this.store.select(AuthSelectors.selectToken);
  }

  signout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
