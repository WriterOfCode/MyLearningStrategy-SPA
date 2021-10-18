import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { faExclamation, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { SubjectStoreState } from './state/subject-edit.selectors';
import { SubjectPageActions} from './state/actions/index';
import { SubjectEditService } from './subject-edit.service';

@Component({
  selector: 'mls-subject-edit-shell',
  templateUrl: './subject-edit-shell.component.html',
  styleUrls: ['./subject-edit-shell.component.css'],
})
export class SubjectEditShellComponent implements OnInit {
  isBusy$: Observable<boolean>;
  errorMessage$: Observable<string>;
  pageTitle = 'Edit';
  exclamationIcon = faExclamation;
  exclamationTriangelIcon = faExclamationTriangle;
  exclamatinoCircle = faExclamationCircle;

  constructor(private store: Store<SubjectStoreState>,
              public subjectEditService: SubjectEditService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.subjectEditService.currentSubject) {
      this.pageTitle = 'Subject not found';
      } else {
        if (this.subjectEditService.currentSubject.subjectRowId === null ||
          this.subjectEditService.currentSubject.subjectRowId === undefined) {
          this.pageTitle = 'Add Subject';
        } else {
          this.pageTitle = `Edit Subject:`;
        }
      }
  }

  get isDirty(): boolean {
    return this.subjectEditService.isDirty;
  }

  onDelete(): void {
    this.subjectEditService.deleteCurrentSubject();
    this.router.navigate(['/subjects']);
  }

  onSave(message?: string): void {
    this.subjectEditService.saveCurrentSubject();
    this.router.navigate(['/subjects']);
  }

  onCancel(message?: string): void {
    this.store.dispatch(SubjectPageActions.clearCurrentSubject());
    // Navigate back to the subjects list
    this.router.navigate(['/subjects']);
  }
}
