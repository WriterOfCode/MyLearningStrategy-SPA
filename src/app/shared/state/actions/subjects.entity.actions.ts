import { CompleteSubject } from '../../models/subjects-complete';
import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';

export const loadCompleteSubjects = createAction('[CompleteSubject/Entity] Load CompleteSubjects', props<{ CompleteSubjects: CompleteSubject[] }>());
export const setCompleteSubjects = createAction('[CompleteSubject/Entity] Set CompleteSubjects', props<{ CompleteSubjects: CompleteSubject[] }>());
export const addCompleteSubject = createAction('[CompleteSubject/Entity] Add CompleteSubject', props<{ CompleteSubject: CompleteSubject }>());
export const addCompleteSubjects = createAction('[CompleteSubject/Entity] Add CompleteSubjects', props<{ CompleteSubjects: CompleteSubject[] }>());
export const setCompleteSubject = createAction('[CompleteSubject/Entity] Set CompleteSubject', props<{ CompleteSubject: CompleteSubject }>());
export const upsertCompleteSubject = createAction('[CompleteSubject/Entity] Upsert CompleteSubject', props<{ CompleteSubject: CompleteSubject }>());
export const upsertCompleteSubjects = createAction('[CompleteSubject/Entity] Upsert CompleteSubjects', props<{ CompleteSubjects: CompleteSubject[] }>());
export const updateCompleteSubject = createAction('[CompleteSubject/Entity] Update CompleteSubject', props<{ update: Update<CompleteSubject> }>());
export const updateCompleteSubjects = createAction('[CompleteSubject/Entity] Update CompleteSubjects', props<{ updates: Update<CompleteSubject>[] }>());
export const mapCompleteSubject = createAction('[CompleteSubject/Entity] Map CompleteSubject', props<{ entityMap: EntityMapOne<CompleteSubject> }>());
export const mapCompleteSubjects = createAction('[CompleteSubject/Entity] Map CompleteSubjects', props<{ entityMap: EntityMap<CompleteSubject> }>());
export const deleteCompleteSubject = createAction('[CompleteSubject/Entity] Delete CompleteSubject', props<{ id: string }>());
export const deleteCompleteSubjects = createAction('[CompleteSubject/Entity] Delete CompleteSubjects', props<{ ids: string[] }>());
export const deleteCompleteSubjectsByPredicate = createAction('[CompleteSubject/Entity] Delete CompleteSubjects By Predicate', props<{ predicate: Predicate<CompleteSubject> }>());
export const clearCompleteSubjects = createAction('[CompleteSubject/Entity] Clear CompleteSubjects');
