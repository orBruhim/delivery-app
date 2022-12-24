import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'delivery-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginService: LoginService) {}

  login(): void {
    const { email, password } = this.loginForm.value;

    email &&
      password &&
      this.loginService.login({ email, password }).subscribe();
  }

  signUp(): void {
    const { email, password } = this.loginForm.value;

    email &&
      password &&
      this.loginService.signUp({ email, password }).subscribe();
  }
}
