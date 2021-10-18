import { EntityState } from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store'
import { MLSReducer } from '../../shared/state/app.reducer';
import { SubjectsPageState } from './subjects-page.state'
import { subjectsAdapter } from './subjects.entity.reducer';
import { CompleteSubject } from '../models/subjects-complete'

const compareSubject = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function matchesSubject(subject: CompleteSubject, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (subject.title !== null && subject.title !== undefined && subject.title.length > 0 ) {
    if (subject.title.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

export interface subjectPageReducer extends MLSReducer { subjectsPage: SubjectsPageState;}
export const selectSubjectPageState = createFeatureSelector<SubjectsPageState>('subjectsPage');

// subject entitiy selectors
export interface subjectsEntityState extends EntityState<CompleteSubject>{allSubjectsLoaded: boolean};
export const selectSubjectsState = createFeatureSelector<subjectsEntityState>('subjects');
const { selectAll } = subjectsAdapter.getSelectors();
export const selectAllSubjects = createSelector(
  selectSubjectsState,
  selectAll
);

export const selectFilteredSubjects = createSelector(
  selectAllSubjects,
  selectSubjectPageState,
  ( subjects, subjectsPageState ) => {
    if (subjectsPageState.searchTerm)
    { return subjects.filter( str => matchesSubject(str, subjectsPageState.searchTerm));
    } else { return subjects; }
  }
);

export const selectSubjectsCount = createSelector(
  selectFilteredSubjects,
  subjects => subjects.length
);

export const selectSortedFilteredSubjects = createSelector(
  selectFilteredSubjects,
  selectSubjectPageState,
  ( subjects, subjectsPageState ) => subjects.sort((c1:CompleteSubject,c2:CompleteSubject)=>{
    const res = compareSubject(`${c2[subjectsPageState.sortColumn]}`, `${c1[subjectsPageState.sortColumn]}`);
    return subjectsPageState.sortDirection === 'desc' ? res : -res;
  })
);

export const areSubjectsLoaded = createSelector(
  selectSubjectsState,
  state => state.allSubjectsLoaded
)
