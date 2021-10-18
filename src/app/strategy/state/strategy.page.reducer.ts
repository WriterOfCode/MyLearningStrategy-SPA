import { StrategyApiActions, StrategyPageActions } from './actions/strategy-actions-index';
import { StrategyPageState } from '../strategy.page.state';
import { createReducer, on } from '@ngrx/store';

const initialStrategyState: StrategyPageState = {
  currentStrategyId: null,
  currentStrategy: null,
  error: '',
  currentPage: 1,
  pageSize: 5,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
};

export const StrategyPageReducer = createReducer<StrategyPageState>(
  initialStrategyState,
  on(StrategyPageActions.setCurrentStrategy, (state, action): StrategyPageState => {
    return {
      ...state,
      currentStrategyId: action.strategy.id,
      currentStrategy: action.strategy,
    };
  }),
  on(StrategyPageActions.clearCurrentStrategy, (state): StrategyPageState => {
    return {
      ...state,
      currentStrategyId: null,
      currentStrategy: null
    };
  }),
  on(StrategyPageActions.strategyFilterEvent , (state, action): StrategyPageState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(StrategyPageActions.strategyPageSizeEvent , (state, action): StrategyPageState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(StrategyPageActions.strategyCurrentPageEvent , (state, action): StrategyPageState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(StrategyPageActions.strategySortEvent , (state, action): StrategyPageState => {
    return {
      ...state,
      sortColumn: action.sortBy.column,
      sortDirection: action.sortBy.direction
    };
  }),
  on(StrategyApiActions.strategyExceptionEvent, (state, action): StrategyPageState => {
    return {
      ...state,
      error: action.error
    };
  }),
);
