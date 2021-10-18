import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mlsAppState } from '../../state/app.selectors';
import { UserProfileState } from '../../models/user-profile';

export interface State extends mlsAppState {
  userProfile: UserProfileState;
}

export const getUserProfile = createFeatureSelector<UserProfileState>('userProfile');

export const getCurrentUserProfile = createSelector(
  getUserProfile,
  state  =>  state.currentUserProfile
);

export const getSignedInAccount = createSelector(
  getUserProfile,
  state => state.signedInAccount
);

export const getAuthenticatonAuthority = createSelector(
  getUserProfile,
  state => state.authenticatonAuthority
);

export const isBussyAuth = createSelector(
  getUserProfile,
  state => state.isBussy
);
export const isLoggedIn = createSelector(
  getUserProfile,
  state => state.isLoggedIn
);
