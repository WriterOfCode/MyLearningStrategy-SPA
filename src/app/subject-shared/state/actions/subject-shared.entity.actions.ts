import { CompleteSubject } from '../../../shared/models/subjects-complete'
import { createAction, props } from '@ngrx/store';

export const loadSharedSubjects = createAction('[SharedSubject/Entity] Load Shared Subjects', props<{ CompleteSubjects: CompleteSubject[] }>());
export const setSharedSubjects = createAction('[SharedSubject/Entity] Set Shared Subjects', props<{ CompleteSubjects: CompleteSubject[] }>());
export const setSharedSubject = createAction('[SharedSubject/Entity] Set Shared Subject', props<{ CompleteSubject: CompleteSubject }>());
export const clearSharedSubject = createAction('[SharedSubject/Entity] Clear Shared Subject');
