import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StrategyApiActions, StrategyPageActions } from './actions/strategy-actions-index';
import { StrategiesService } from '../../shared/services/strategies.service';

@Injectable()
export class StrategyApiEffects {

  constructor(private actions$: Actions,
              private strategiesService: StrategiesService) { }

    loadStrategies$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(StrategyApiActions.loadStrategies),
          concatMap(() => this.strategiesService.getStrategies()
            .pipe(
              map(strategies => StrategyApiActions.loadStrategiesSuccess({ Strategies: strategies })),
              catchError(error => of(StrategyApiActions.strategyExceptionEvent({ error: error })))
            )
          )
        );
    });

    updateStrategy$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(StrategyApiActions.updateStrategy),
          concatMap(action =>
            this.strategiesService.updateStrategy(action.Strategy)
              .pipe(
                map(strategy => StrategyApiActions.updateStrategySuccess({ Strategy: strategy })),
                catchError(error => of(StrategyApiActions.strategyExceptionEvent({ error })))
              )
            )
        );
    });

    createStrategy$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(StrategyApiActions.createStrategy),
          concatMap(action =>
            this.strategiesService.addStrategy(action.Strategy)
              .pipe(
                map(strategy => StrategyApiActions.createStrategySuccess ({ Strategy: strategy })),
                catchError(error => of(StrategyApiActions.strategyExceptionEvent({ error })))
              )
            )
          );
    });

    deleteStrategy$ = createEffect(() => {
    return this.actions$
    .pipe(
        ofType(StrategyApiActions.deleteStrategy),
          mergeMap(action =>
            this.strategiesService.deleteStrategy(action.StrategyId).pipe(
              map(() => StrategyApiActions.deleteStrategySuccess({ StrategyId: action.StrategyId }),
              StrategyPageActions.clearCurrentStrategy()),
              catchError(error => of(StrategyApiActions.strategyExceptionEvent ({ error })))
            )
          )
        );
    });
}
