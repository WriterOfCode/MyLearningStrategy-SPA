import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubjectsPageState } from 'src/app/shared/state/subjects-page.state';

import { MLSReducer } from 'src/app/shared/state/app.reducer';
export interface subjectPageReducer extends MLSReducer { subjectsPage: SubjectsPageState;}

export const selectSubjectPageState = createFeatureSelector<SubjectsPageState>('subjectsPage');

export const getCurrentSubjectId = createSelector(
  selectSubjectPageState,
  state => state.currentSubjectId ? state.currentSubjectId : 0
);

export const getCurrentSubject = createSelector(
  selectSubjectPageState,
  state => state.currentSubject
);

export const getSubjectListError = createSelector(
  selectSubjectPageState,
  state => state.error
);

export const getSubjectListCurrentPage = createSelector(
  selectSubjectPageState,
  state => state.currentPage
);

export const getSubjectListPageSize = createSelector(
  selectSubjectPageState,
  state => state.pageSize
);

export const getSubjectListSearchTerm = createSelector(
  selectSubjectPageState,
  state => state.searchTerm
);

export const getSubjectListSortColumn = createSelector(
  selectSubjectPageState,
  state => state.sortColumn
);

