import { throwError as _throw, Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
/* NgRx */
import { Store } from '@ngrx/store';
import {
  strategiesEntityState,
  getCurrentStrategy,
  getStrategyListError,
  getStratagyListPageSize,
  getStrategyListCurrentPage,
  getStrategyListSearchTerm,
  strategyPageReducer,
  selectStrategiesCount,
  selectSortedFilteredStrategies,
} from './state/strategy.entity.selectors';
import {
  StrategyApiActions,
  StrategyPageActions
} from './state/actions/strategy-actions-index';
import { StrategySort } from './strategy.page.state';
import { Strategy } from "../shared/models/strategy";
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'mls-strategy-shell',
  templateUrl: './strategy-shell.component.html',
  styleUrls: ['./strategy-shell.component.css']
})
export class StrategyShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  strategies$: Observable<Strategy[]>;
  selectedStrategy$: Observable<Strategy>;
  strategiesCount$: Observable<number>;
  pageSize$: Observable<number>;
  currentPage$: Observable<number>;
  searchTerm$: Observable<string>;
  userProfileId: number;
  constructor( private router: Router,
      private strategiesPageStore: Store<strategyPageReducer>,
      private strategiesStore:Store<strategiesEntityState>) {

  }
  ngOnInit(): void {
    this.strategies$ = this.strategiesStore.select(selectSortedFilteredStrategies);
    this.strategiesCount$ = this.strategiesStore.select(selectStrategiesCount)
    this.errorMessage$ = this.strategiesPageStore.select(getStrategyListError);
    this.searchTerm$ = this.strategiesPageStore.select(getStrategyListSearchTerm);
    this.selectedStrategy$ = this.strategiesPageStore.select(getCurrentStrategy);
    this.pageSize$ = this.strategiesPageStore.select(getStratagyListPageSize);
    this.currentPage$ = this.strategiesPageStore.select(getStrategyListCurrentPage);
  }


  filter(search: string)
  {
    this.strategiesPageStore.dispatch(StrategyPageActions.strategyFilterEvent({searchTerm: search}));
  }
  onSort(strategySort: StrategySort)
  {
    this.strategiesPageStore.dispatch(StrategyPageActions.strategySortEvent({sortBy: strategySort}));
  }
  currentPageChange(currentPage: number)
  {
    this.strategiesPageStore.dispatch(StrategyPageActions.strategyCurrentPageEvent({currentPage}));
  }
  pageSizeChange(pagesize: number)
  {
    this.strategiesPageStore.dispatch(StrategyPageActions.strategyPageSizeEvent({ pageSize: pagesize}));
  }
  deleteStrategy(strategyId: number): void {
    this.strategiesPageStore.dispatch(StrategyApiActions.deleteStrategy({StrategyId: strategyId}));
  }
  editStrategy(currentStrategy: Strategy): void {
    this.strategiesPageStore.dispatch(StrategyPageActions.setCurrentStrategy({ strategy: currentStrategy }));
    this.router.navigate(['/strategies', 'edit']);
  }
  addStrategy(): void {
    const newStrategy: Strategy = {
      id:  (Math.floor(Math.random() * 1000)  * -1),
      userProfileId: this.userProfileId,
      name: "",
      description: "",
      sortRuleId: 0,
      questionSelection: 0,
      responseSelection: 0,
      onlyCorrect:	false,
      recycleIncorrectlyAnswered:	true,
      lastModifiedOffset: new Date(),
      cloudRowId: undefined
    };
    this.strategiesPageStore.dispatch(StrategyPageActions.setCurrentStrategy({strategy: newStrategy}));
    this.router.navigate(['/strategies', 'edit']);
  }
  onSelected(currentStrategy: Strategy): void {
    this.strategiesPageStore.dispatch(StrategyPageActions.setCurrentStrategy({ strategy: currentStrategy }));
  }
}
