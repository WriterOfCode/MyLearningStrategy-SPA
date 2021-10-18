import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mlsAppState } from 'src/app/shared/state/app.selectors';
import { SubjectsPageState } from '../../shared/state/subjects-page.state';
export interface SubjectStoreState extends mlsAppState {
  subjects: SubjectsPageState;
}

export const selectEditSubjectPageState = createFeatureSelector<SubjectsPageState>('subjectsPage');

export const getCurrentSubjectId = createSelector(
  selectEditSubjectPageState,
  state => state.currentSubjectId ? state.currentSubjectId : 0
);

export const getCurrentSubject = createSelector(
  selectEditSubjectPageState,
  state => state.currentSubject
);

export const getSubjectEditError = createSelector(
  selectEditSubjectPageState,
  state => state.error
);
