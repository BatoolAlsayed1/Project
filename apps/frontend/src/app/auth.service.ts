import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenSignal } from './state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.API_URL}/signup`, data);
  }

  signin(data: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(`${this.API_URL}/signin`, data);
  }

  saveToken(token: string) {
    tokenSignal.set(token);
  }

  clearToken() {
    tokenSignal.set(null);
  }

  getToken(): string | null {
    return tokenSignal();
  }
}
