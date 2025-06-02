import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class SigninComponent {
  signinForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // First clear previous error
    this.errorMessage = '';

    if (this.signinForm.valid) {
      this.authService.signin(this.signinForm.value).subscribe({
        next: (res) => {
          console.log('Signin success:', res);
          this.authService.saveToken(res.access_token); // Save token in localStorage
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Signin failed:', err);
          this.errorMessage = 'Invalid email or password'; // Show message to user
        }
      });
    }
  }
}


