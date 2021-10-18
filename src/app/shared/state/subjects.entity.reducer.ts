import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SubjectsEntityActions } from './actions/index';
import { CompleteSubject } from 'src/app/shared/models/subjects-complete';

export interface completeSubjectsState extends EntityState<CompleteSubject> {
  // additional entities state properties
  allSubjectsLoaded: boolean;
}


export const subjectsAdapter: EntityAdapter<CompleteSubject> = createEntityAdapter<CompleteSubject>({selectId: subject => subject.cloudRowId});

export const initialSubjectsState: completeSubjectsState = subjectsAdapter.getInitialState({allSubjectsLoaded:false});

export const CompleteSubjectEntityReducer = createReducer(
  initialSubjectsState,
  on(SubjectsEntityActions.addCompleteSubject, (state, { CompleteSubject }) => {
    return subjectsAdapter.addOne(CompleteSubject, state)
  }),
  on(SubjectsEntityActions.setCompleteSubject, (state, { CompleteSubject }) => {
    return subjectsAdapter.setOne(CompleteSubject, state)
  }),
  on(SubjectsEntityActions.upsertCompleteSubject, (state, { CompleteSubject }) => {
    return subjectsAdapter.upsertOne(CompleteSubject, state);
  }),
  on(SubjectsEntityActions.addCompleteSubjects, (state, { CompleteSubjects }) => {
    return subjectsAdapter.addMany(CompleteSubjects, state);
  }),
  on(SubjectsEntityActions.upsertCompleteSubjects, (state, { CompleteSubjects }) => {
    return subjectsAdapter.upsertMany(CompleteSubjects, state);
  }),
  on(SubjectsEntityActions.updateCompleteSubject, (state, { update }) => {
    return subjectsAdapter.updateOne(update, state);
  }),
  on(SubjectsEntityActions.updateCompleteSubjects, (state, { updates }) => {
    return subjectsAdapter.updateMany(updates, state);
  }),
  on(SubjectsEntityActions.mapCompleteSubject, (state, { entityMap }) => {
    return subjectsAdapter.mapOne(entityMap, state);
  }),
  on(SubjectsEntityActions.mapCompleteSubjects, (state, { entityMap }) => {
    return subjectsAdapter.map(entityMap, state);
  }),
  on(SubjectsEntityActions.deleteCompleteSubject, (state, { id }) => {
    return subjectsAdapter.removeOne(id, state);
  }),
  on(SubjectsEntityActions.deleteCompleteSubjects, (state, { ids }) => {
    return subjectsAdapter.removeMany(ids, state);
  }),
  on(SubjectsEntityActions.deleteCompleteSubjectsByPredicate, (state, { predicate }) => {
    return subjectsAdapter.removeMany(predicate, state);
  }),
  on(SubjectsEntityActions.loadCompleteSubjects, (state, { CompleteSubjects }) => {
    return subjectsAdapter.setAll(CompleteSubjects, state);
  }),
  on(SubjectsEntityActions.clearCompleteSubjects, state => {
    return subjectsAdapter.removeAll({ ...state, selectedCompleteSubjectId: null });
  })
);

