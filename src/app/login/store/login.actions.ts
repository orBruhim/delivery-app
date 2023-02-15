import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../login.model';

export const login = createAction(
  '[Login page] user login',
  props<{ user: LoginRequest }>()
);

export const logout = createAction('[login page] user logout');
