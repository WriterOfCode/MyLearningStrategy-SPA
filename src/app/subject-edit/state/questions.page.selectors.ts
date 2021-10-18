import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionsPageState } from './questions.page.state';

export const selectQuestionsPageState = createFeatureSelector<QuestionsPageState>('questionsPage');

export const getCurrentQuestion = createSelector(
    selectQuestionsPageState,
  state => state.currentQuestion
);

export const getCurrentQuestionId = createSelector(
  selectQuestionsPageState,
state => state.currentQuestionId ? state.currentQuestionId : 0
);

export const getQuestionsListError = createSelector(
    selectQuestionsPageState,
  state => state.error
);

export const getQuestionsListCurrentPage = createSelector(
    selectQuestionsPageState,
  state => state.currentPage
);

export const getQuestionsListPageSize = createSelector(
    selectQuestionsPageState,
  state => state.pageSize
);

export const getQuestionsListSearchTerm = createSelector(
    selectQuestionsPageState,
  state => state.searchTerm
);

export const getQuestionsListSortColumn = createSelector(
    selectQuestionsPageState,
  state => state.sortColumn
);

export const getQuestionsListSortDirection = createSelector(
  selectQuestionsPageState,
state => state.sortDirection
);

export const getQuestionsListDeleteThis = createSelector(
  selectQuestionsPageState,
state => state.deleteThis
);