import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SharedSubjectEntityActions } from './actions/subject-shared-actions-index';
import { CompleteSubject } from 'src/app/shared/models/subjects-complete';

export interface subjectsSharedState extends EntityState<CompleteSubject> {
  // additional entities state properties
  allSharedSubjectsLoaded: boolean;
}

export const subjectsAdapter: EntityAdapter<CompleteSubject> = createEntityAdapter<CompleteSubject>({selectId: subject => subject.cloudRowId});

export const initialSubjectsSharedState: subjectsSharedState = subjectsAdapter.getInitialState({allSharedSubjectsLoaded:false});

export const SubjectSharedEntityReducer = createReducer(
  initialSubjectsSharedState,
  on(SharedSubjectEntityActions.setSharedSubject, (state, { CompleteSubject }) => {
    return subjectsAdapter.setOne(CompleteSubject, state)
  }),
  on(SharedSubjectEntityActions.setSharedSubjects, (state, { CompleteSubjects }) => {
    return subjectsAdapter.setAll(CompleteSubjects, state)
  }),
  on(SharedSubjectEntityActions.loadSharedSubjects, (state, { CompleteSubjects }) => {
    return subjectsAdapter.setAll(CompleteSubjects, state);
  }),
  on(SharedSubjectEntityActions.clearSharedSubject , state => {
    return subjectsAdapter.removeAll({ ...state, selectedCompleteSubjectId: null });
  })
);

