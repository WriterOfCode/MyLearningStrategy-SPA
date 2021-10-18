import { SharedSubjectPageActions } from './actions/subject-shared-actions-index';
import { SharedSubjectPageState } from './subject-shared-page.state';
import { createReducer, on } from '@ngrx/store';

const initialSharedSubjectState: SharedSubjectPageState = {
  currentSubjectId: null,
  currentSubject: null,
  error:  '',
  currentPage:  1,
  pageSize:  5,
  searchTerm:  '',
  sortColumn:  '',
  sortDirection:  '',
};

import { MLSReducer } from 'src/app/shared/state/app.reducer';
export interface sharedSubjectPageReducer extends MLSReducer { subjectsPage: SharedSubjectPageState;}

export const SubjectSharedPageReducer = createReducer<SharedSubjectPageState>(
  initialSharedSubjectState,
  on(SharedSubjectPageActions.setCurrentSharedSubject, (state, action): SharedSubjectPageState => {
    return {
      ...state,
      currentSubjectId: action.Subject.subjectRowId,
      currentSubject: action.Subject,
    };
  }),
  on(SharedSubjectPageActions.clearCurrentSharedSubject, (state): SharedSubjectPageState => {
    return {
      ...state,
      currentSubjectId: null,
      currentSubject: null
    };
  }),
  on(SharedSubjectPageActions.sharedSubjectFilterEvent , (state, action): SharedSubjectPageState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(SharedSubjectPageActions.sharedSubjectPageSizeEvent , (state, action): SharedSubjectPageState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(SharedSubjectPageActions.sharedSubjectCurrentPageEvent , (state, action): SharedSubjectPageState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(SharedSubjectPageActions.sharedSubjectSortEvent, (state, action): SharedSubjectPageState => {
    return {
      ...state,
      sortColumn: action.sortBy.column,
      sortDirection: action.sortBy.direction
    };
  }),
  on(SharedSubjectPageActions.sharedSubjectExceptionEvent , (state, action): SharedSubjectPageState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
