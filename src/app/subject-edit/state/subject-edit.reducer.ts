import { SubjectPageActions } from './actions/index';
import { createReducer, on } from '@ngrx/store';
import { SubjectsPageState } from 'src/app/subject/state/subjects-page.state';
import { Guid } from 'guid-typescript';

const initialSubjectListState: SubjectsPageState = {
  currentSubjectId:  null,
  currentSubject: null,
  error:  '',
  currentPage:  1,
  pageSize:  5,
  searchTerm:  '',
  sortColumn:  undefined,
  sortDirection:  undefined,
};


export const SubjectEditReducer = createReducer<SubjectsPageState>(
  initialSubjectListState,
  on(SubjectPageActions.clearCurrentSubject, (state, action): SubjectsPageState => {
    return {
      ...state,
      currentSubject: null,
    };
  }),
  on(SubjectPageActions.subjectEditPageError, (state, action): SubjectsPageState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
