import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResponsePageState } from './response.page.state';

export const getResponsesPageState = createFeatureSelector<ResponsePageState>('responsesPage');

export const getCurrentResponse = createSelector(
  getResponsesPageState,
  state => state.currentResponse
);

export const getCurrentResponseId = createSelector(
  getResponsesPageState,
  state => state.currentResponseId
);

export const getResponseListError = createSelector(
  getResponsesPageState,
  statedata => statedata.error
);

export const getResponseListCurrentPage = createSelector(
  getResponsesPageState,
  statedata => statedata.currentPage
);

export const getResponseListPageSize = createSelector(
  getResponsesPageState,
  statedata => statedata.pageSize
);

export const getResponseListSearchTerm = createSelector(
  getResponsesPageState,
  statedata => statedata.searchTerm
);

export const getResponseListSortColumn = createSelector(
  getResponsesPageState,
  statedata => statedata.sortColumn
);

export const getResponseListSortDirection = createSelector(
  getResponsesPageState,
  statedata => statedata.sortDirection
);

export const getResponseListDeleteThis = createSelector(
  getResponsesPageState,
  state => state.deleteThis
);