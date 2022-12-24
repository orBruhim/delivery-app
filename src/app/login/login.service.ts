import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject = new Subject<LoginResponse>();

  get user$(): Observable<LoginResponse> {
    return this.userSubject.asObservable();
  }

  constructor(private http: HttpClient) {}
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { email, password } = loginRequest;
    return this.http
      .post<LoginResponse>('http://localhost:3000/login', {
        email,
        password,
      })
      .pipe(
        tap((user) => {
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
          this.userSubject.next(user);
        })
      );
  }
}
