import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  email: string | null;
}

export const initialState: AuthState = {
  token: localStorage.getItem('token'),
  email: null, // optional, we will set when login
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { token, email }) => ({
    ...state,
    token,
    email,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    email: null,
  }))
);
