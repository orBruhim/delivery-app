import { LoginRequest } from '../login.model';
import { createReducer, on } from '@ngrx/store';
import { login, logout, signup } from './login.actions';

export interface LoginState {
  user: LoginRequest | null;
}

export const initialLoginState: LoginState = {
  user: null,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(signup, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(logout, (state, action) => {
    return {
      user: null,
    };
  })
);
