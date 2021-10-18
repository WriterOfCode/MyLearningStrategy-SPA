import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Alert } from "../models/Alert";
export interface mlsAppState {
  isBusy: boolean;
  alertMessages: Alert[] | null;
}

export const selectMlsAppState = createFeatureSelector<mlsAppState>('appState');

export const getAppIsBusy = createSelector(
  selectMlsAppState,
  state => state.isBusy
);

export const getAlertMessages = createSelector(
  selectMlsAppState,
  state => state.alertMessages
);




