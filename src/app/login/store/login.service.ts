import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
    return this.http
      .post<LoginResponse>(' https://mock-stg.getpackage-dev.com/login', {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          console.log(user.token);
          user && this.router.navigate(['/create']);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
