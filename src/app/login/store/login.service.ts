import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { email, password } = loginRequest;
    return this.http.post<LoginResponse>(
      ' https://mock-stg.getpackage-dev.com/login',
      {
        email,
        password,
      }
    );
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
