import { throwError as _throw, Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
/* NgRx */
import { Store } from '@ngrx/store';
import {
  subjectsEntityState,
  selectSubjectsCount,
  selectSortedFilteredSubjects,
  selectAllSubjects,
  selectFilteredSubjects,
} from '../shared/state/subjects.entity.selector';
import { SubjectsApiActions }  from '../shared/state/actions/index';
import {
  subjectPageReducer,

  getCurrentSubject,
  getSubjectListError,
  getSubjectListPageSize,
  getSubjectListCurrentPage,
  getSubjectListSearchTerm, } from './state/subjects-page.selector';
import { SubjectPageActions } from './state/actions/subjects-actions-index';
import { SubjectSort } from '../shared/state/subjects-page.state'
import { Router } from '@angular/router';
import { CompleteSubject } from '../shared/models/subjects-complete';
import { getCurrentUserProfile } from '../shared/auth/state/auth.selectors';
import { UserProfile } from '../shared/models/user-profile';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'mls-subject-shell',
  templateUrl: './subject-shell.component.html',
  styleUrls: ['./subject-shell.component.css']
})
export class SubjectShellComponent implements OnInit{
  errorMessage$: Observable<string>;
  subjects$: Observable<CompleteSubject[]>;
  selectedSubject$: Observable<CompleteSubject>;
  subjectsCount$: Observable<number>;
  pageSize$: Observable<number>;
  currentPage$: Observable<number>;
  searchTerm$: Observable<string>;
  userProfile: UserProfile;

  constructor(private router: Router,
    private subjectPageStore: Store<subjectPageReducer>,
    private subjectsStore: Store<subjectsEntityState> ) {

   }
  ngOnInit(): void {
    this.subjectPageStore.select(getCurrentUserProfile).subscribe(data=>this.userProfile = data);
    this.subjects$ = this.subjectsStore.select(selectSortedFilteredSubjects);
    this.subjectsCount$ = this.subjectsStore.select(selectSubjectsCount);
    this.errorMessage$ = this.subjectPageStore.select(getSubjectListError);
    this.searchTerm$ = this.subjectPageStore.select(getSubjectListSearchTerm);
    this.selectedSubject$ = this.subjectPageStore.select(getCurrentSubject);
    this.pageSize$ = this.subjectPageStore.select(getSubjectListPageSize);
    this.currentPage$ = this.subjectPageStore.select(getSubjectListCurrentPage);
  }

  onFilter(search: string) {
    this.subjectPageStore.dispatch(SubjectPageActions.subjectFilterEvent({searchTerm: search}));
  }
  onSort(subjectSortEvent: SubjectSort)
  {
    this.subjectPageStore.dispatch(SubjectPageActions.subjectSortEvent({sortBy: subjectSortEvent}));
  }
  onPageChange(currentPage: number)
  {
    this.subjectPageStore.dispatch(SubjectPageActions.subjectCurrentPageEvent({currentPage}));
  }
  onPageSizeChange(pagesize: number)
  {
    this.subjectPageStore.dispatch(SubjectPageActions.subjectPageSizeEvent({ pageSize: pagesize}));
  }
  onDelete(selected: CompleteSubject): void {
    this.subjectPageStore.dispatch(SubjectsApiActions.deleteSubject({Subject: selected}));
  }
  onEdit(selected: CompleteSubject): void {
    this.subjectPageStore.dispatch(SubjectPageActions.setCurrentSubject({Subject: selected}));
    this.router.navigate(['/subject']);
  }
  onAdd(): void {
    const newSubject: CompleteSubject = {
                subjectRowId: null,
                originator: this.userProfile?.originator !== null ? this.userProfile.originator : null,
                title: '',
                description: '',
                imageDevice: '',
                imageCloud: '',
                isShared: false,
                hasBeenShared: false,
                tags: [],
                questions: [],
                categories: [],
                lastModifiedOffset: undefined,
                cloudRowId: Guid.create().toString(),
    }
    this.subjectPageStore.dispatch(SubjectPageActions.setCurrentSubject({Subject: newSubject}));
    this.router.navigate(['/subject']);
  }
  onSelected(selected: CompleteSubject): void {
    this.subjectPageStore.dispatch(SubjectPageActions.setCurrentSubject({Subject: selected}));
  }

}
