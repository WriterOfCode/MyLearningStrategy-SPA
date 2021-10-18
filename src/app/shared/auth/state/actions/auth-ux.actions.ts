import { createAction } from '@ngrx/store';

export const logIn = createAction(
  '[Authenticaton UX] Log In'
);

export const logOut = createAction(
  '[Authenticaton UX] Log Out'
);

export const editProfile = createAction(
  '[Authenticaton UX] Edit Profile'
);

