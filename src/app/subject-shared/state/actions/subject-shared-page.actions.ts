import { CompleteSubject } from '../../../shared/models/subjects-complete';
import { createAction, props } from "@ngrx/store";
import { SubjectSort } from '../../../shared/state/subjects-page.state';

export const setCurrentSharedSubject = createAction('[Shared Subject Page] Set Current Shared Subject', props<{ Subject: CompleteSubject }>());
export const clearCurrentSharedSubject = createAction('[Shared Subject Page] Clear Current Shared Subject');
export const sharedSubjectPageSizeEvent = createAction('[Shared Subject Page] Shared Subject Pagination Page size event', props<{ pageSize: number}>());
export const sharedSubjectCurrentPageEvent = createAction('[Shared Subject Page] Shared Subject Pagination Current Page event', props<{currentPage: number}>());
export const sharedSubjectFilterEvent = createAction('[Shared Subject Page] Shared Subject Filter Event', props<{ searchTerm: string}>());
export const sharedSubjectSortEvent = createAction('[Shared Subject Page] Shared Subject List Sort Event',props<{ sortBy: SubjectSort }>());
export const sharedSubjectExceptionEvent = createAction('[Shared Subject Page] Shared Subject Exception Event',props<{ error: any }>());
