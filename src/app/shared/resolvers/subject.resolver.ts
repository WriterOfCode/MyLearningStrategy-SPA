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
import { areSubjectsLoaded } from '../state/subjects.entity.selector';


@Injectable({
  providedIn: 'root'
})
export class SubjectResolver implements Resolve<any> {
  isLoading: boolean = false;
  suceeded: boolean = true;
  constructor(private store: Store<mlsAppState>){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  return   this.store
    .pipe(
      select(areSubjectsLoaded),
      tap((subjectsLoaded)=>{
        if(!this.isLoading && !subjectsLoaded){
          this.isLoading=true;
          this.store.dispatch(ApplicationActions.IsBusy({IsBusy:true}));
          this.store.dispatch(SubjectsApiActions.getSubjects());
        }
      }),
      // filter(subjectsLoaded=>subjectsLoaded),
      first(),
      catchError(async (err) => {
        this.suceeded = false;
        this.store.dispatch(SubjectsApiActions.subjectException({error: JSON.stringify(err)}));
      }),
      finalize(()=>{
        this.isLoading=false;
        this.store.dispatch(ApplicationActions.IsBusy({IsBusy:false}));
      })
    );
  }
}
