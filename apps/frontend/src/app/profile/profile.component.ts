import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tokenSignal } from '../state/auth.state';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule],
})

 export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = tokenSignal();

    if (!token) {
      this.router.navigate(['/signin']);
      return;
    }

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
            this.authService.clearToken();
            this.router.navigate(['/signin']);
          }
        },
      });
  }
  signout() {
    this.authService.clearToken();
    this.router.navigate(['/signin']);
  }
}
