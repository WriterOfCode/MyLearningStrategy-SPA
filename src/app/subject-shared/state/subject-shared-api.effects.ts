import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SharedSubjectApiActions, SharedSubjectEntityActions, SharedSubjectPageActions } from './actions/subject-shared-actions-index';
import { SubjectsCompleteService } from '../../shared/services/subjects-complete.service';

@Injectable()
export class SubjectSharedApiEffects{
      constructor(private actions$: Actions,
                  private subjectsService: SubjectsCompleteService) { }
    loadSubjectsSharedComplete$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(SharedSubjectApiActions.getSharedSubjects),
          mergeMap(() => this.subjectsService.getSharedSubjects()
            .pipe(
              map(subjects => SharedSubjectEntityActions.loadSharedSubjects({ CompleteSubjects: subjects })),
              catchError(error => of(SharedSubjectPageActions.sharedSubjectExceptionEvent({error})))
            )
          )
        );
    });
}
