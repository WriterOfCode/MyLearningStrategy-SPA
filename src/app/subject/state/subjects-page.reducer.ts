import { SubjectPageActions } from './actions/subjects-actions-index';
import { SubjectsPageState } from '../../shared/state/subjects-page.state';
import { createReducer, on } from '@ngrx/store';

const initialSubjectState: SubjectsPageState = {
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
export interface subjectPageReducer extends MLSReducer { subjectsPage: SubjectsPageState;}

export const SubjectPageReducer = createReducer<SubjectsPageState>(
  initialSubjectState,
  on(SubjectPageActions.setCurrentSubject, (state, action): SubjectsPageState => {
    return {
      ...state,
      currentSubjectId: action.Subject.subjectRowId,
      currentSubject: action.Subject,
    };
  }),
  on(SubjectPageActions.clearCurrentSubject, (state): SubjectsPageState => {
    return {
      ...state,
      currentSubjectId: null,
      currentSubject: null
    };
  }),
  on(SubjectPageActions.subjectFilterEvent , (state, action): SubjectsPageState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(SubjectPageActions.subjectPageSizeEvent , (state, action): SubjectsPageState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(SubjectPageActions.subjectCurrentPageEvent , (state, action): SubjectsPageState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(SubjectPageActions.subjectSortEvent, (state, action): SubjectsPageState => {
    return {
      ...state,
      sortColumn: action.sortBy.column,
      sortDirection: action.sortBy.direction
    };
  }),
  on(SubjectPageActions.subjectExceptionEvent , (state, action): SubjectsPageState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
