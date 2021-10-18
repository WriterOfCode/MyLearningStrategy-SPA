import { EntityState } from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store'
import { MLSReducer } from '../../shared/state/app.reducer';
import { StrategyPageState } from '../strategy.page.state';
import { strategiesAdapter } from './strategy.entity.reducer';
import { Strategy } from "src/app/shared/models/strategy";

const compareStrategy = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function matchesStrategy(strategy: Strategy, term: string) {
    if (term === null || term.length === 0) { return true; }
    if (strategy.name !== null && strategy.name !== undefined && strategy.name.length > 0 ) {
      if (strategy.name.toLowerCase().includes(term.toLowerCase())) { return true; }
    }
    if (strategy.description  !== null && strategy.description !== undefined && strategy.description.length > 0 ) {
      if (strategy.description.toLowerCase().includes(term.toLowerCase())) { return true; }
    }
    return false;
  }

export interface strategyPageReducer extends MLSReducer {strategiesPage: StrategyPageState;}
export const selectStrategyPageState = createFeatureSelector<StrategyPageState>('strategyPage');

// strategy entitiy selectors
export interface strategiesEntityState extends EntityState<Strategy>{allStrategiesLoaded: boolean};
export const selectStrategiesState = createFeatureSelector<strategiesEntityState>('strategies');
const { selectAll } = strategiesAdapter.getSelectors()
export const selectAllStrategies = createSelector(
  selectStrategiesState,
  selectAll
);

export const selectFilteredStrategies = createSelector(
  selectAllStrategies,
  selectStrategyPageState,
  ( strategies, strategiesPageState ) => {
    if (strategiesPageState.searchTerm)
    { return strategies.filter( str => matchesStrategy(str, strategiesPageState.searchTerm))
    } else { return strategies; }
  }
);

export const selectStrategiesCount = createSelector(
  selectFilteredStrategies,
  strategies => strategies.length
);

export const selectSortedFilteredStrategies = createSelector(
  selectFilteredStrategies,
  selectStrategyPageState,
  ( strategies, strategiesPageState ) => strategies.sort((c1:Strategy,c2:Strategy)=>{
    const res = compareStrategy(`${c2[strategiesPageState.sortColumn]}`, `${c1[strategiesPageState.sortColumn]}`);
    return strategiesPageState.sortDirection === 'desc' ? res : -res;
  })
);

export const areStrategiesLoaded = createSelector(
  selectStrategiesState,
  state => state.allStrategiesLoaded
)

export const getCurrentStrategyId = createSelector(
  selectStrategyPageState,
  state => state.currentStrategyId ?  state.currentStrategyId: 0
);

export const getCurrentStrategy = createSelector(
  selectStrategyPageState,
  state => state.currentStrategy
);

export const getStrategyListError = createSelector(
  selectStrategyPageState,
  state => state.error
);

export const getStrategyListCurrentPage = createSelector(
  selectStrategyPageState,
  state => state.currentPage
);

export const getStratagyListPageSize = createSelector(
  selectStrategyPageState,
  state => state.pageSize
);

export const getStrategyListSearchTerm = createSelector(
  selectStrategyPageState,
  state => state.searchTerm
);

export const getStratagyListSortColumn = createSelector(
  selectStrategyPageState,
  state => state.sortColumn
);
