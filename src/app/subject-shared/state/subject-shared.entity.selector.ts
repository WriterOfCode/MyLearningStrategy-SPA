import { EntityState } from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store'
import { MLSReducer } from '../../shared/state/app.reducer';
import { SharedSubjectPageState } from './subject-shared-page.state'
import { subjectsAdapter } from './subject-shared.entity.reducer';
import { CompleteSubject } from '../../shared/models/subjects-complete'

const compareSubject = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function matchesSubject(subject: CompleteSubject, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (subject.title !== null && subject.title !== undefined && subject.title.length > 0 ) {
    if (subject.title.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

export interface sharedSubjectPageReducer extends MLSReducer { subjectsPage: SharedSubjectPageState;}
export const selectSharedSubjectPageState = createFeatureSelector<SharedSubjectPageState>('subjectsSharedPage');

// subject entitiy selectors
export interface subjectsEntityState extends EntityState<CompleteSubject>{allSubjectsLoaded: boolean};
export const selectSubjectsSharedState = createFeatureSelector<subjectsEntityState>('subjectsShared');
const { selectAll } = subjectsAdapter.getSelectors();
export const selectAllSubjects = createSelector(
  selectSubjectsSharedState,
  selectAll
);

export const selectFilteredSharedSubjects = createSelector(
  selectAllSubjects,
  selectSharedSubjectPageState,
  ( subjects, sharedSubjectsPageState ) => {
    if (sharedSubjectsPageState.searchTerm)
    { return subjects.filter( str => matchesSubject(str, sharedSubjectsPageState.searchTerm));
    } else { return subjects; }
  }
);

export const selectSubjectsSharedCount = createSelector(
  selectFilteredSharedSubjects,
  subjects => subjects.length
);

export const selectSortedFilteredSubjectsShared = createSelector(
  selectFilteredSharedSubjects,
  selectSharedSubjectPageState,
  ( subjects, subjectsPageState ) => subjects.sort((c1:CompleteSubject,c2:CompleteSubject)=>{
    const res = compareSubject(`${c2[subjectsPageState.sortColumn]}`, `${c1[subjectsPageState.sortColumn]}`);
    return subjectsPageState.sortDirection === 'desc' ? res : -res;
  })
);

export const areSharedSubjectsLoaded = createSelector(
  selectSubjectsSharedState,
  state => state.allSubjectsLoaded
)
