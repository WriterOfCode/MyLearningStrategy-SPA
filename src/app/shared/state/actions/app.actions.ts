import { createAction, props } from '@ngrx/store';
import { Alert } from "../../models/Alert";

export const IsBusy = createAction(
  '[Application] Application is busy',
  props<{ IsBusy: boolean }>()
);

export const AleartMessage = createAction(
  '[Application] Application Alert',
  props<{alert: Alert}>()
);
