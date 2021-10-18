import { CompleteSubject } from '../../models/subjects-complete';
import { createAction, props } from '@ngrx/store';

export const getSubjects = createAction('[Subject API] Get Subjects');
export const createSubject = createAction('[Subject API] Create Subject', props<{ Subject: CompleteSubject }>());
export const updateSubject = createAction('[Subject API] Update Subject', props<{ Subject: CompleteSubject }>());
export const deleteSubject = createAction('[Subject API] Delete Subject', props<{ Subject: CompleteSubject }>());
export const subjectException = createAction('[Subject API] Subject Exception', props<{ error: string }>());
