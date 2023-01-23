import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from '../login.model';

export const login = createAction(
  '[Login page] user login',
  props<{ user: LoginRequest; token: LoginResponse }>()
);

export const logout = createAction('[login page] user logout');
