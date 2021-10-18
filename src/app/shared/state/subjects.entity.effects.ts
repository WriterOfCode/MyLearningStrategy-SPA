import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubjectsApiActions, SubjectsEntityActions } from './actions/index';
import { SubjectsCompleteService } from '../services/subjects-complete.service';

@Injectable()
export class SubjectEntityApiEffects{
      constructor(private actions$: Actions,
                  private subjectsService: SubjectsCompleteService) { }
    loadSubjectsComplete$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(SubjectsApiActions.getSubjects),
          mergeMap(() => this.subjectsService.getSubjects()
            .pipe(
              map(subjects => SubjectsEntityActions.loadCompleteSubjects({ CompleteSubjects: subjects })),
              catchError(error => of(SubjectsApiActions.subjectException({error})))
            )
          )
        );
    });
    saveNewSubjectsComplete$ = createEffect(() => {
      return this.actions$
        .pipe(
            ofType(SubjectsApiActions.createSubject ),
              mergeMap(action =>
                this.subjectsService.saveNewSubject(action.Subject).pipe(
                  map(() => SubjectsEntityActions.addCompleteSubject({CompleteSubject: action.Subject})),
                  catchError(error => of(SubjectsApiActions.subjectException({error: "An error occured while deleting the subject. Subject was not deleted." })))
                )
              )
            );
      });
    updateSubjectComplete$ = createEffect(() => {
      return this.actions$
        .pipe(
            ofType(SubjectsApiActions.updateSubject),
              mergeMap(action =>
                this.subjectsService.updateSubject( action.Subject).pipe(
                  map(() => SubjectsEntityActions.upsertCompleteSubject({CompleteSubject: action.Subject})),
                  catchError(error => of(SubjectsApiActions.subjectException({error: "An error occured while deleting the subject. Subject was not deleted." })))
                )
              )
            );
      });
    deleteSubjectsComplete$ = createEffect(() => {
      return this.actions$
        .pipe(
            ofType(SubjectsApiActions.deleteSubject),
              mergeMap(action =>
                this.subjectsService.deleteSubject(action.Subject.subjectRowId).pipe(
                  map(() => SubjectsEntityActions.deleteCompleteSubject ({id: action.Subject.cloudRowId})),
                  catchError(error => of(SubjectsApiActions.subjectException({error: "An error occured while deleting the subject. Subject was not deleted." }))),
                )
              )
            );
      });
}

