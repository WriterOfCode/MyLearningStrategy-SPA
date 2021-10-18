import { ResponsePageState } from './response.page.state';
import { createReducer, on } from '@ngrx/store';
import { ResponsePageActions } from './actions/index';

const initialResponsePageState: ResponsePageState = {
  currentResponseId: '',
  currentResponse: null,
  error: '',
  currentPage: 1,
  pageSize: 5,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
  deleteThis: null,
};

export const ResponsePageReducer = createReducer<ResponsePageState>(
  initialResponsePageState,
  on(ResponsePageActions.setCurrentResponse , (state, action): ResponsePageState => {
    return {
      ...state,
      currentResponse: action.currentResponse,
      currentResponseId: action.currentResponse.cloudRowId,
    };
  }),
  on(ResponsePageActions.clearCurrentResponse , (state): ResponsePageState => {
    return {
      ...state,
      currentResponse: null,
      currentResponseId: null,
    };
  }),
  on(ResponsePageActions.responseFilterEvent , (state, action): ResponsePageState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(ResponsePageActions.responsePageSizeEvent , (state, action): ResponsePageState => {
    return {
      ...state,
      pageSize: action.pageSize,
    };
  }),
  on(ResponsePageActions.responseCurrentPageEvent , (state, action): ResponsePageState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(ResponsePageActions.responseSortEvent , (state, action): ResponsePageState => {
    return {
      ...state,
      sortColumn: action.sortBy.column,
      sortDirection: action.sortBy.direction,
    };
  }),
  on(ResponsePageActions.responseDeleteEvent, (state, action): ResponsePageState => {
    return {
      ...state,
      deleteThis: action.response,
    };
  }),
  on(ResponsePageActions.responseErrorEvent , (state, action): ResponsePageState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
