import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject = new Subject<LoginResponse>();

  get user$(): Observable<LoginResponse> {
    return this.userSubject.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { email, password } = loginRequest;
    return this.http
      .post<LoginResponse>('http://localhost:3000/login', {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          user && this.router.navigate(['/create']);
          this.userSubject.next(user);
        })
      );
  }

  signUp(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { email, password } = loginRequest;

    return this.http
      .post<LoginResponse>('http://localhost:3000/register', {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          user && this.router.navigate(['/create']);

          this.userSubject.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
