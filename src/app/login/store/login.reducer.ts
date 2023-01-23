import { LoginRequest, LoginResponse } from '../login.model';
import { createReducer, on } from '@ngrx/store';
import { login, logout } from './login.actions';

export interface LoginState {
  user: LoginRequest | null;
  token: LoginResponse | null;
}

export const initialLoginState: LoginState = {
  user: null,
  token: null,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(login, (state, action) => {
    return {
      user: action.user,
      token: action.token,
    };
  }),
  on(logout, (state, action) => {
    return {
      user: null,
      token: null,
    };
  })
);
