import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/shared/models/subjects-complete";
import { ResponseSort } from "../response.page.state";

export const setCurrentResponse = createAction(
  '[Response List Page] Set Current Response',
  props<{ currentResponse: Response }>()
);

export const clearCurrentResponse = createAction(
  '[Response List Page] Clear Current Response'
);

export const responsePageSizeEvent = createAction(
  '[Response List Page] Pagination Page size event',
  props<{ pageSize: number}>()
);

export const responseCurrentPageEvent = createAction(
  '[Response List Page] Pagination Current Page event',
  props<{currentPage: number}>()
);

export const responseFilterEvent = createAction(
  '[Response List Page] Filter Responses Event',
  props<{ searchTerm: string}>()
);

export const responseSortEvent = createAction(
  '[Response List Page] Responses List Sort Event',
  props<{ sortBy: ResponseSort }>()
);

export const responseDeleteEvent = createAction(
  '[Response Page] Response Delete Event',
  props<{  response: Response  }>()
);

export const responseErrorEvent = createAction(
  '[Response Page] Response Error Event',
  props<{ error: any }>()
);