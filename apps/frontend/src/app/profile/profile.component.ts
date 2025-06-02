import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../state/auth.selectors';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule],
})
export class ProfileComponent implements OnInit {
  token$!: Observable<string | null>;
  user: any = null;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {
    this.token$ = this.store.select(AuthSelectors.selectToken);
  }

  ngOnInit(): void {
    this.token$.subscribe((token) => {
      if (!token) {
        this.router.navigate(['/signin']);
      } else {
        this.http
          .get('http://localhost:3000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe({
            next: (res) => {
              console.log('Profile:', res);
              this.user = res;
            },
            error: (err) => {
              console.error('Profile error:', err);
              if (err.status === 401) {
                this.authService.logout();
                this.router.navigate(['/signin']);
              }
            },
          });
      }
    });
  }

  signout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
