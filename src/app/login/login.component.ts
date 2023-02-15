import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './store/login.service';
import { Store } from '@ngrx/store';
import { login } from './store/login.actions';
import { LoginRequest } from './login.model';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'delivery-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private loginService: LoginService,
    private store: Store,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.store.dispatch(login({ user: JSON.parse(user) }));
    }
  }

  login(): void {
    const { email, password } = this.loginForm.value;

    if (!(email && password)) {
      return;
    }
    const user: LoginRequest = {
      email,
      password,
    };

    this.loginService
      .login({ email, password })
      .pipe(
        tap((loginResponse) => {
          if (!loginResponse.token) {
            this.showPasswordErrorToast();
            return;
          }
          this.router.navigate(['/create']);
          this.store.dispatch(login({ user }));
        })
      )
      .subscribe();
  }

  private showPasswordErrorToast(): void {
    this._snackBar.open('Your password is incorrect', '', {
      duration: 1500,
    });
  }
}
