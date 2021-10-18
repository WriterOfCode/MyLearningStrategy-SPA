import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, filter, finalize, first, tap } from 'rxjs/operators';
import { props, select, Store } from '@ngrx/store';
import { mlsAppState } from '../state/app.selectors';
import { ApplicationActions } from '../state/actions'
import { CategoriesApiActions } from '../../categories/state/actions/categories-actions-index';
import { areCategoriesLoaded } from '../../categories/state/categories.entity.selectors';
import { AlertDuration, AlertTheam } from '../models/Alert';
import { Alert } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<any> {
  isLoading = false;
  suceeded = true;
  constructor(private store: Store<mlsAppState>){};
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
      select(areCategoriesLoaded),
      tap((categoriesLoaded)=>{
        if(!this.isLoading && !categoriesLoaded){
          this.isLoading=true;
          this.store.dispatch(ApplicationActions.IsBusy({IsBusy:true}));
          this.store.dispatch(CategoriesApiActions.loadCategories());
        }
      }),
      // filter(categoriesLoaded=>categoriesLoaded),
      catchError(async (err) => {this.suceeded = false;
        this.store.dispatch(ApplicationActions.AleartMessage({alert:
          {duration: AlertDuration.Closable, theam: AlertTheam.danger,title: 'Failed to load categories', message:JSON.stringify(err),  debug:''}}));
      }),
      first(),
      finalize(()=>{
        this.isLoading=false;
        this.store.dispatch(ApplicationActions.IsBusy({IsBusy:false}));
      })
    );
  }
}
