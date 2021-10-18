import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/models/category';
import { CategorySort } from '../../categories.page.state';

export const setCurrentCategory = createAction(
  '[Category Page] Set Current Category',
  props<{ category: Category }>()
);

export const clearCurrentCategory = createAction(
  '[Category Page] Clear Current Category'
);

export const initializeCurrentCategory = createAction(
  '[Category Page] Initialize Current Category'
);

export const categoryPageSizeEvent = createAction(
  '[Category Page] Category Pagination Page size event',
  props<{ pageSize: number}>()
);

export const categoryCurrentPageEvent = createAction(
  '[Category Page] Category Pagination Current Page event',
  props<{currentPage: number}>()
);

export const categoryFilterEvent = createAction(
  '[Category Page] Category Filter Event',
  props<{ searchTerm: string}>()
);

export const categorySortEvent = createAction(
  '[Category Page] Category Sort Event',
  props<{ sortBy: CategorySort }>()
);

export const categoryErrorEvent = createAction(
  '[Category Page] Category Error Event',
  props<{ error: any }>()
);

