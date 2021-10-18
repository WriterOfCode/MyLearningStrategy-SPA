import { createAction, props } from '@ngrx/store';
import { StrategySort } from '../../strategy.page.state';
import { Strategy } from "../../../shared/models/strategy";


export const setCurrentStrategy = createAction(
  '[Strategy Page] Set Current Strategy',
  props<{ strategy: Strategy }>()
);

export const clearCurrentStrategy = createAction(
  '[Strategy Page] Clear Current Strategy'
);

export const initializeCurrentStrategy = createAction(
  '[Strategy Page] Initialize Current Strategy'
);

export const strategyPageSizeEvent = createAction(
  '[Strategy Page] Subject Pagination Page size event',
  props<{ pageSize: number}>()
);

export const strategyCurrentPageEvent = createAction(
  '[Strategy Page] Subject Pagination Current Page event',
  props<{currentPage: number}>()
);

export const strategyFilterEvent = createAction(
  '[Strategy Page] Strategy Filter Event',
  props<{ searchTerm: string}>()
);

export const strategySortEvent = createAction(
  '[Strategy Page] Strategy Sort Event',
  props<{ sortBy: StrategySort }>()
);