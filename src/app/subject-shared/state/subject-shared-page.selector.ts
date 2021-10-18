import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedSubjectPageState } from '../state/subject-shared-page.state';

import { MLSReducer } from 'src/app/shared/state/app.reducer';
export interface sharedSubjectPageReducer extends MLSReducer { subjectsPage: SharedSubjectPageState;}

export const selectSubjectSharedPageState = createFeatureSelector<SharedSubjectPageState>('subjectsPage');

export const getCurrentSubjectShared = createSelector(
  selectSubjectSharedPageState,
  state => state.currentSubject
);

export const getSubjectSharedError = createSelector(
  selectSubjectSharedPageState,
  state => state.error
);

export const getSubjectSharedCurrentPage = createSelector(
  selectSubjectSharedPageState,
  state => state.currentPage
);

export const getSubjectSharedPageSize = createSelector(
  selectSubjectSharedPageState,
  state => state.pageSize
);

export const getSubjectSharedSearchTerm = createSelector(
  selectSubjectSharedPageState,
  state => state.searchTerm
);

export const getSubjectSharedSortColumn = createSelector(
  selectSubjectSharedPageState,
  state => state.sortColumn
);

