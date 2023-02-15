import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from './login/store/login.selector';
import { logout } from './login/store/login.actions';
import { LoginService } from './login/store/login.service';

@Component({
  selector: 'delivery-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));

  constructor(private store: Store, private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
    this.store.dispatch(logout());
  }
}
