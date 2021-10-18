import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { CategoriesApiActions } from './actions/categories-actions-index';
import { Category } from 'src/app/shared/models/category';


export const categoriesAdapter = createEntityAdapter<Category>({});

export const initialCategoriesState = categoriesAdapter.getInitialState({
  allCategoriesLoaded:false,
});

export const CategoriesEntityReducer = createReducer(
  initialCategoriesState,
  on( CategoriesApiActions.loadCategoriesSuccess,
    (state, action) => categoriesAdapter.setAll (
      action.Categories,
      {...state,error:'',allCategoriesLoaded:true } ),
  ),
  on( CategoriesApiActions.createCategorySuccess,
    (state, action) => categoriesAdapter.addOne (
      action.Category,
      {...state,error:'', allCategoriesLoaded:false, currentCategoryId:action.Category.id } ),
  ),
  on( CategoriesApiActions.deleteCategorySuccess,
    (state, action) => categoriesAdapter.removeOne (
      action.CategoryId,
      {...state,error:'',allCategoriesLoaded:true, currentCategoryId: null } ),
  ),
  on( CategoriesApiActions.updateCategorySuccess,
    (state, action) => categoriesAdapter.setOne  (
      action.Category,
      {...state,error:'',allCategoriesLoaded:true } ),
  ),
  on( CategoriesApiActions.categoryExceptionEvent,
    (state, action) => (
       {...state,error:action.error,allCategoriesLoaded:false } ),
  ),
);

