import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule],
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    // Now we assume token exists because the guard allowed us to reach this page!

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
          // If token expired → force signout
          if (err.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/signin']);
          }
        },
      });
  }

  signout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
