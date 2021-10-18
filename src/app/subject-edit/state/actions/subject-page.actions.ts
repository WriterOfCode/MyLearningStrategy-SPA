// tslint:disable-next-line: quotemark
import { createAction, props } from "@ngrx/store";

export const clearCurrentSubject = createAction(
  '[Subject Edit Page] Clear Current Subject'
);
export const subjectEditPageError = createAction(
  '[Subject Edit Page] Is Subject Busy Event',
  props<{ error: string }>()
);