import { QuestionsPageState } from './questions.page.state';
import { createReducer, on } from '@ngrx/store';
import { QuestionsPageActions } from './actions/index';

const initialCategoryState: QuestionsPageState = {
  currentQuestionId: '',
  currentQuestion: null,
  error: '',
  currentPage: 1,
  pageSize: 5,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
  deleteThis: null,
};

export const QuestionsPageReducer = createReducer<QuestionsPageState>(
  initialCategoryState,
  on(QuestionsPageActions.setCurrentQuestion, (state, action): QuestionsPageState => {
    return {
      ...state,
      currentQuestionId: action.Question.cloudRowId,
      currentQuestion: action.Question,
    };
  }),
  on(QuestionsPageActions.clearCurrentQuestion, (state): QuestionsPageState => {
    return {
      ...state,
      currentQuestionId: null,
      currentQuestion: null,
      deleteThis: null,
    };
  }),
  on(QuestionsPageActions.questionFilterEvent, (state, action): QuestionsPageState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(QuestionsPageActions.questionPageSizeEvent , (state, action): QuestionsPageState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(QuestionsPageActions.questionCurrentPageEvent , (state, action): QuestionsPageState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(QuestionsPageActions.questionSortEvent , (state, action): QuestionsPageState => {
    return {
      ...state,
      sortColumn: action.sortBy.column,
      sortDirection: action.sortBy.direction,
    };
  }),
  on(QuestionsPageActions.questionDeleteEvent, (state, action): QuestionsPageState => {
    return {
      ...state,
      deleteThis: action.Question,
    };
  }),
  on(QuestionsPageActions.questionErrorEvent, (state, action): QuestionsPageState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
