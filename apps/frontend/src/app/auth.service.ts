import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as AuthActions from './state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  signup(data: { name: string; email: string; password: string }) {
    return this.http.post('http://localhost:3000/api/auth/signup', data);
  }

  signin(data: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(
      'http://localhost:3000/api/auth/signin',
      data
    );
  }

  saveToken(token: string, email: string) {
    localStorage.setItem('token', token);
    this.store.dispatch(AuthActions.login({ token, email }));
  }
  clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(AuthActions.logout());
  }
}
