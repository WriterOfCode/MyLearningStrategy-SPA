import { UserProfile } from '../../../models/user-profile';
import { createAction, props } from '@ngrx/store';
import { AuthenticationResult } from '@azure/msal-browser';

export const authIsBusy = createAction(
  '[Authenticaton API] Authentication is busy',
  props<{ IsBusy: boolean }>()
);

export const logInSuccess = createAction(
  '[Authenticaton API] msal:loginSuccess',
  props<{ payload: any }>()
);
export const logInFailure = createAction(
    '[Authenticaton API] msal:loginFailure',
    props<{ error: string }>()
);

export const acquireTokenSuccess = createAction(
    '[Authenticaton API] msal:acquireTokenSuccess',
    props<{ tokens: any }>()
);
export const acquireTokenFailure = createAction(
  '[Authenticaton API] msal:acquireTokenFailure',
  props<{ error: any }>()
);

export const logOutSucess = createAction(
  '[Authenticaton API] Log Out Success',
  props<{ success: string }>()
);
export const logOutFailure = createAction(
  '[Authenticaton API] Log Out Failure',
  props<{ error: string }>()
);

export const setAuthenticatonAuthority = createAction(
  '[Authenticaton API]  Set Authenticaton Authority',
  props<{ authenticatonAuthority: any }>()
);

export const setAuthenticationResult = createAction(
  '[Authenticaton API]  Set Authentication Result',
  props<{ AuthenticationResult: AuthenticationResult }>()
);

export const setSignedInAccount = createAction(
  '[Authenticaton API]  Set Account',
  props<{ signedInAccount: any }>()
);

export const setCurrentLoggedInUser = createAction(
  '[Authenticaton API] Authentication Current Logged In User',
  props<{ currentLogedInUser: any }>()
);


export const loadUserProfile = createAction(
  '[Authenticaton API] Get User Profile Success',
  props<{ CurrentUserProfile: UserProfile }>()
);

export const loadUserProfileFailure = createAction(
  '[Authenticaton API] Get User Profile Failure',
  props<{ error: any }>()
);

