import { createAction, props } from '@ngrx/store';
import { Strategy } from "src/app/shared/models/strategy";

export const loadStrategiesSuccess = createAction(
  '[Strategies API] Load Strategies Success',
  props<{ Strategies: Strategy[] }>()
);

export const loadStrategiesFailure = createAction(
  '[Strategies API] Load Strategies Fail',
  props<{ error: string }>()
);

export const updateStrategySuccess = createAction(
  '[Strategy API] Update Strategy Success',
  props<{ Strategy: Strategy }>()
);

export const createStrategySuccess = createAction(
    '[Strategy API] Create Strategy Success',
    props<{ Strategy: Strategy }>()
);

export const deleteStrategySuccess = createAction(
    '[Strategy API] Delete Strategy Success',
    props<{ StrategyId: number }>()
);

export const loadStrategies = createAction(
  '[Strategies Page] Strategies Load'
);

export const updateStrategy = createAction(
  '[Strategy Page] Update Strategy',
  props<{ Strategy: Strategy }>()
);

export const createStrategy = createAction(
  '[Strategy Page] Create Strategy',
  props<{ Strategy: Strategy }>()
);

export const deleteStrategy = createAction(
  '[Strategy Page] Delete Strategy',
  props<{ StrategyId: number }>()
);

export const strategyExceptionEvent = createAction(
  '[Strategy API] Strategy Exception',
  props<{ error: any }>()
);

