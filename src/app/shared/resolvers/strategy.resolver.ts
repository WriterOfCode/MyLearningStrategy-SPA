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
import { ApplicationActions } from '../state/actions'
import { StrategyApiActions } from '../../strategy/state/actions/strategy-actions-index';
import { areStrategiesLoaded } from '../../strategy/state/strategy.entity.selectors';
import { AlertDuration, AlertTheam } from '../models/Alert';

@Injectable({
  providedIn: 'root'
})
export class StrategyResolver implements Resolve<any> {
  isLoading = false;
  suceeded = true;
  constructor(private store: Store<mlsAppState>){};
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
      select(areStrategiesLoaded),
      tap((strategiesLoaded)=>{
        if(!this.isLoading && !strategiesLoaded){
          this.isLoading=true;
          this.store.dispatch(ApplicationActions.IsBusy({IsBusy:true}));
          this.store.dispatch(StrategyApiActions.loadStrategies());
        }
      }),
      // filter(strategiesLoaded=>strategiesLoaded),
      catchError(async (err) => {
        this.isLoading = false;
        this.suceeded = false;
        this.store.dispatch(ApplicationActions.AleartMessage({alert:
          {duration: AlertDuration.Closable, theam: AlertTheam.danger,title: 'Load Strategies failed', message:JSON.stringify(err),  debug:''}}));
      }),
      first(),
      finalize(()=>{
        this.isLoading=false;
        this.store.dispatch(ApplicationActions.IsBusy({IsBusy:false}));
      })
    );
  }
}
