import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { email, password } = loginRequest;
    return this.http.post<LoginResponse>('http://localhost:3000/login', {
      email,
      password,
    });
  }

  signUp(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { email, password } = loginRequest;

    return this.http.post<LoginResponse>('http://localhost:3000/register', {
      email,
      password,
    });
  }
}
