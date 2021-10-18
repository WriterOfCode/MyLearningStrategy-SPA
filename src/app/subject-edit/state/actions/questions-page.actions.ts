import { createAction, props } from '@ngrx/store';
import { Question } from "src/app/shared/models/subjects-complete";
import { QuestionSort } from '../questions.page.state';

export const setCurrentQuestion = createAction(
  '[Question Page] Set Current Question',
  props<{ Question: Question }>()
);

export const clearCurrentQuestion = createAction(
  '[Question Page] Clear Current Question'
);

export const questionPageSizeEvent = createAction(
  '[Question Page] Question Pagination Page size event',
  props<{ pageSize: number}>()
);

export const questionCurrentPageEvent = createAction(
  '[Question Page] Question Pagination Current Page event',
  props<{currentPage: number}>()
);

export const questionFilterEvent = createAction(
  '[Question Page] Question Filter Event',
  props<{ searchTerm: string}>()
);

export const questionSortEvent = createAction(
  '[Question Page] Question Sort Event',
  props<{ sortBy: QuestionSort }>()
);

export const questionDeleteEvent = createAction(
  '[Question Page] Question Delete Event',
  props<{  Question: Question  }>()
);

export const questionErrorEvent = createAction(
  '[Question Page] Question Error Event',
  props<{ error: any }>()
);
