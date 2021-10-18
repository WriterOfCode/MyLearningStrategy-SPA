import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { StrategyApiActions } from './actions/strategy-actions-index'
import { Strategy } from "../../shared/models/strategy";


export const strategiesAdapter = createEntityAdapter<Strategy>({});

export const initialStrategiesState = strategiesAdapter.getInitialState({
  allStrategiesLoaded:false,
});

export const StrategiesEntityReducer = createReducer(
  initialStrategiesState,
  on( StrategyApiActions.loadStrategiesSuccess,
    (state, action) => strategiesAdapter.setAll (
      action.Strategies,
      {...state,error:'',allStrategiesLoaded:true } ),
  ),
  on( StrategyApiActions.createStrategySuccess,
    (state, action) => strategiesAdapter.addOne (
      action.Strategy,
      {...state,error:'', allStrategiesLoaded:false,currentStrategyId:action.Strategy.id } ),
  ),
  on( StrategyApiActions.deleteStrategySuccess,
    (state, action) => strategiesAdapter.removeOne (
      action.StrategyId,
      {...state,error:'',allStrategiesLoaded:true, currentStrategyId: null} ),
  ),
  on( StrategyApiActions.updateStrategySuccess,
    (state, action) => strategiesAdapter.setOne  (
      action.Strategy,
      {...state,error:'',allStrategiesLoaded:true } ),
  ),
  on( StrategyApiActions.strategyExceptionEvent,
    (state, action) => (
       {...state,error:action.error,allCategoriesLoaded:false } ),
  ),
)

