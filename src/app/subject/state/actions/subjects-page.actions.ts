import { CompleteSubject } from '../../../shared/models/subjects-complete';
import { createAction, props } from "@ngrx/store";
import { SubjectSort } from '../../../shared/state/subjects-page.state';

export const setCurrentSubject = createAction('[Subject List Page] Set Current Complete Subject', props<{ Subject: CompleteSubject }>());
export const clearCurrentSubject = createAction('[Subject List Page] Clear Current Subject');
export const subjectPageSizeEvent = createAction('[Subject List Page] Subject Pagination Page size event', props<{ pageSize: number}>());
export const subjectCurrentPageEvent = createAction('[Subject List Page] Subject Pagination Current Page event', props<{currentPage: number}>());
export const subjectFilterEvent = createAction('[Subject List Page] Subject Filter Event', props<{ searchTerm: string}>());
export const subjectSortEvent = createAction('[Subject List Page] Subject List Sort Event',props<{ sortBy: SubjectSort }>());
export const subjectExceptionEvent = createAction('[Subject List Page] Exception Event',props<{ error: any }>());
