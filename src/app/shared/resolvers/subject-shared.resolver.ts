import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, filter, finalize, first, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { mlsAppState } from '../state/app.selectors';
import { ApplicationActions } from '../state/actions';
import { SubjectsApiActions } from '../state/actions/index';
import { areSharedSubjectsLoaded } from 'src/app/subject-shared/state/subject-shared.entity.selector';
import { SharedSubjectApiActions, SharedSubjectPageActions } from 'src/app/subject-shared/state/actions/subject-shared-actions-index';


@Injectable({
  providedIn: 'root'
})
export class SubjectSharedResolver implements Resolve<any> {
  isLoading: boolean = false;
  suceeded: boolean = true;
  constructor(private store: Store<mlsAppState>){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  return   this.store
    .pipe(
      select(areSharedSubjectsLoaded),
      tap((subjectsLoaded)=>{
        if(!this.isLoading && !subjectsLoaded){
          this.isLoading=true;
          this.store.dispatch(ApplicationActions.IsBusy({IsBusy:true}));
          this.store.dispatch(SharedSubjectApiActions.getSharedSubjects());
        }
      }),
      // filter(subjectsLoaded=>subjectsLoaded),
      first(),
      catchError(async (err) => {
        this.suceeded = false;
        this.store.dispatch(SharedSubjectPageActions.sharedSubjectExceptionEvent({error: JSON.stringify(err)}));
      }),
      finalize(()=>{
        this.isLoading=false;
        this.store.dispatch(ApplicationActions.IsBusy({IsBusy:false}));
      })
    );
  }
}
