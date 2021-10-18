import { createReducer, on } from '@ngrx/store';
import { ApplicationActions } from './actions';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from "@ngrx/store";
import { AuthenticationReducer } from '../auth/state/auth.reducer';
import { mlsAppState } from './app.selectors';

const initialAppState: mlsAppState = {
  isBusy: false,
  alertMessages: [],
};

export interface appStateReducer extends MLSReducer { appState: mlsAppState;}

export const AppStateReducer = createReducer<mlsAppState>(
  initialAppState,
  on(ApplicationActions.IsBusy , (state, action): mlsAppState => {
    return {
      ...state,
      isBusy: action.IsBusy
    };
  }),
  on(ApplicationActions.AleartMessage , (state, action): mlsAppState => {
    return {
      ...state,
      alertMessages: [...state.alertMessages, action.alert]
    };
  }),
);

export interface MLSReducer {}
export const mlsReducers: ActionReducerMap<MLSReducer> = {
  router: routerReducer,
  userProfile: AuthenticationReducer,
  appState: AppStateReducer,
};

