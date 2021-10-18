import { CategoriesApiActions, CategoriesPageActions } from './actions/categories-actions-index';
import { CategoryPageState } from '../categories.page.state';
import { createReducer, on } from '@ngrx/store';

const initialCategoryState: CategoryPageState = {
  currentCategoryId: null,
  currentCategory: null,
  error: '',
  currentPage: 1,
  pageSize: 5,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
};

export const CategoriesPageReducer = createReducer<CategoryPageState>(
  initialCategoryState,
  on(CategoriesPageActions.setCurrentCategory, (state, action): CategoryPageState => {
    return {
      ...state,
      currentCategoryId: action.category.id,
      currentCategory: action.category,
    };
  }),
  on(CategoriesPageActions.clearCurrentCategory, (state): CategoryPageState => {
    return {
      ...state,
      currentCategoryId: null,
      currentCategory: null
    };
  }),
  on(CategoriesPageActions.categoryFilterEvent , (state, action): CategoryPageState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(CategoriesPageActions.categoryPageSizeEvent , (state, action): CategoryPageState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(CategoriesPageActions.categoryCurrentPageEvent , (state, action): CategoryPageState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(CategoriesPageActions.categorySortEvent , (state, action): CategoryPageState => {
    return {
      ...state,
      sortColumn: action.sortBy.column,
      sortDirection: action.sortBy.direction,
    };
  }),
  on(CategoriesApiActions.categoryExceptionEvent, (state, action): CategoryPageState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);

