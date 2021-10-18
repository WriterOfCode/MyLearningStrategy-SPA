import { EntityState } from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store'
import { MLSReducer } from '../../shared/state/app.reducer';
import { CategoryPageState } from '../categories.page.state';
import { categoriesAdapter } from './categories.entity.reducer';
import { Category } from 'src/app/shared/models/category';

const compareCategory = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function matchesCategory(category: Category, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (category.categoryName !== null && category.categoryName !== undefined && category.categoryName.length > 0 ) {
    if (category.categoryName.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

export interface categoryPageReducer extends MLSReducer { categoriesPage: CategoryPageState;}
export const selectCategoryPageState = createFeatureSelector<CategoryPageState>('categoriesPage');

// category entitiy selectors
export interface categoriesEntityState extends EntityState<Category>{allCategoriesLoaded: boolean};
export const selectCategoriesState = createFeatureSelector<categoriesEntityState>('categories');
const { selectAll } = categoriesAdapter.getSelectors();
export const selectAllCategories = createSelector(
  selectCategoriesState,
  selectAll
);

export const selectFilteredCategories = createSelector(
  selectAllCategories,
  selectCategoryPageState,
  ( categories, categoriesPageState ) => {
    if (categoriesPageState.searchTerm)
    { return categories.filter( str => matchesCategory(str, categoriesPageState.searchTerm));
    } else { return categories; }
  }
);

export const selectCategoriesCount = createSelector(
  selectFilteredCategories,
  categories => categories.length
);

export const selectSortedFilteredCategies = createSelector(
  selectFilteredCategories,
  selectCategoryPageState,
  ( categories, categoryPageState ) => categories.sort((c1:Category,c2:Category)=>{
    const res = compareCategory(`${c2[categoryPageState.sortColumn]}`, `${c1[categoryPageState.sortColumn]}`);
    return categoryPageState.sortDirection === 'desc' ? res : -res;
  })
);

export const areCategoriesLoaded = createSelector(
  selectCategoriesState,
  state => state.allCategoriesLoaded
)

export const getCurrentCategoryId = createSelector(
  selectCategoryPageState,
  state => state.currentCategoryId ? state.currentCategoryId : 0
);

export const getCurrentCategory = createSelector(
  selectCategoryPageState,
  state => state.currentCategory
);

export const getCategoryListError = createSelector(
  selectCategoryPageState,
  state => state.error
);

export const getCategoryListCurrentPage = createSelector(
  selectCategoryPageState,
  state => state.currentPage
);

export const getCategoryListPageSize = createSelector(
  selectCategoryPageState,
  state => state.pageSize
);

export const getCategoryListSearchTerm = createSelector(
  selectCategoryPageState,
  state => state.searchTerm
);

export const getCategoryListSortColumn = createSelector(
  selectCategoryPageState,
  state => state.sortColumn
);
