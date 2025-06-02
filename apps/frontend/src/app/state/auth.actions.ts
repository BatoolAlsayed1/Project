import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ token: string; email: string }>()
);

export const logout = createAction('[Auth] Logout');
