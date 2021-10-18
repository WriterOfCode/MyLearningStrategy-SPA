import { AuthenticationUXActions, AuthenticationAPIActions } from './actions/';
import { UserProfileState } from '../../models/user-profile';
import { createReducer, on } from '@ngrx/store';

const initialUserProfileState: UserProfileState = {
  currentUserProfile: null,
  authenticatonAuthority: null,
  signedInAccount: null,
  authenticationResult: null,
  isBussy: false,
  isLoggedIn: false,
  error: '',
};

export const AuthenticationReducer = createReducer<UserProfileState>(
  initialUserProfileState,
  on(AuthenticationUXActions.logIn, (state, action): UserProfileState => {
    return {
      ...state,
    };
  }),
  on(AuthenticationAPIActions.logInSuccess, (state, action): UserProfileState => {
    return {
      ...state,
    };
  }),
  on(AuthenticationAPIActions.logInFailure, (state, action): UserProfileState => {
    return {
      ...state,
    };
  }),
  on(AuthenticationUXActions.logOut, (state, action): UserProfileState => {
    return {
      ...state,
      error: ''
    };
  }),
  on(AuthenticationAPIActions.logOutSucess, (state, action): UserProfileState => {
    return {
      ...state,
      error: ''
    };
  }),
  on(AuthenticationAPIActions.logOutFailure, (state, action): UserProfileState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AuthenticationAPIActions.setSignedInAccount, (state, action): UserProfileState => {
    return {
      ...state,
      signedInAccount: action.signedInAccount,
      error: ''
    };
  }),
  on(AuthenticationAPIActions.setAuthenticatonAuthority, (state, action): UserProfileState => {
    return {
      ...state,
      authenticatonAuthority: action.authenticatonAuthority,
      error: ''
    };
  }),
  on(AuthenticationAPIActions.setAuthenticationResult, (state, action): UserProfileState => {
    return {
      ...state,
      authenticationResult: action.AuthenticationResult,
      error: ''
    };
  }),
  on(AuthenticationAPIActions.setCurrentLoggedInUser, (state, action): UserProfileState => {
    return {
      ...state,
      currentUserProfile: action.currentLogedInUser,
      error: ''
    };
  }),
);
