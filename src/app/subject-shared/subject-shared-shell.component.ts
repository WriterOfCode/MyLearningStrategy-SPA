import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError as _throw, Observable, of} from 'rxjs';
/* NgRx */
import { Store } from '@ngrx/store';

import { CompleteSubject } from '../shared/models/subjects-complete';
import {
  subjectsEntityState,
  selectSubjectsSharedCount,
  selectFilteredSharedSubjects,
} from './state/subject-shared.entity.selector';

import {  SharedSubjectPageActions }  from './state/actions/subject-shared-actions-index';
import {
  sharedSubjectPageReducer,
  getCurrentSubjectShared,
  getSubjectSharedError,
  getSubjectSharedPageSize,
  getSubjectSharedCurrentPage,
  getSubjectSharedSearchTerm } from './state/subject-shared-page.selector';
import { SharedSubjectSort } from './state/subject-shared-page.state';
import { SubjectsApiActions } from '../shared/state/actions';
import { Guid } from 'guid-typescript';
import { UserProfile } from '../shared/models/user-profile';
import { getCurrentUserProfile } from '../shared/auth/state/auth.selectors';
import { compareCategories } from '../subject-edit/subject-edit-info.component';

@Component({
  selector: 'mls-subject-shared-shell',
  templateUrl: './subject-shared-shell.component.html',
  styleUrls: ['./subject-shared-shell.component.css']
})
export class SubjectSharedShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  subjects$: Observable<CompleteSubject[]>;
  selectedSubject$: Observable<CompleteSubject>;
  subjectsCount$: Observable<number>;
  pageSize$: Observable<number>;
  currentPage$: Observable<number>;
  searchTerm$: Observable<string>;
  userProfile: UserProfile;

  constructor(private router: Router,
    private subjectPageStore: Store<sharedSubjectPageReducer>,
    private subjectsStore: Store<subjectsEntityState> ) {
   }

  ngOnInit(): void {
    this.subjectsStore.select(getCurrentUserProfile).subscribe(data=>this.userProfile = data);
    this.subjects$ = this.subjectsStore.select(selectFilteredSharedSubjects);
    this.subjectsCount$ = this.subjectsStore.select(selectSubjectsSharedCount);
    this.errorMessage$ = this.subjectPageStore.select(getSubjectSharedError);
    this.searchTerm$ = this.subjectPageStore.select(getSubjectSharedSearchTerm);
    this.selectedSubject$ = this.subjectPageStore.select(getCurrentSubjectShared);
    this.pageSize$ = of(3) // this.subjectPageStore.select(getSubjectSharedPageSize);
    this.currentPage$ = this.subjectPageStore.select(getSubjectSharedCurrentPage);
  }

  onFilter(search: string) {
    this.subjectPageStore.dispatch(SharedSubjectPageActions.sharedSubjectFilterEvent({searchTerm: search}));
  }
  onSort(subjectSortEvent: SharedSubjectSort)
  {
    this.subjectPageStore.dispatch(SharedSubjectPageActions.sharedSubjectSortEvent({sortBy: subjectSortEvent}));
  }
  onPageChange(currentPage: number)
  {
    this.subjectPageStore.dispatch(SharedSubjectPageActions.sharedSubjectCurrentPageEvent({currentPage}));
  }
  onPageSizeChange(pagesize: number)
  {
    this.subjectPageStore.dispatch(SharedSubjectPageActions.sharedSubjectPageSizeEvent({ pageSize: 3}));
  }
  onSelected(selected: CompleteSubject): void {
    if (this.userProfile)
    {
      var copySubject : CompleteSubject = JSON.parse(JSON.stringify(selected))
      copySubject.originator = this.userProfile?.originator !== null ? this.userProfile.originator : null,
      copySubject.cloudRowId = Guid.create().toString(),
      this.subjectPageStore.dispatch(SubjectsApiActions.createSubject({ Subject: copySubject }));
      // this.subjectPageStore.dispatch(SubjectPageActions.subjectFilterEvent({searchTerm: copySubject.title}));
      this.router.navigate(['/subjects/list']);
    }
    else{
      console.log('You must log in first.')
    }
  }
}
