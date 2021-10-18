import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/models/category';

export const loadCategoriesSuccess = createAction(
  '[Categories API] Categories Load Success',
  props<{ Categories: Category[] }>()
);

export const loadCategoriesFailed = createAction(
  '[Categories API] Categories Load Failed',
  props<{ error: string }>()
);

export const updateCategorySuccess = createAction(
  '[Category API] Update Category Success',
  props<{ Category: Category }>()
);

export const createCategorySuccess = createAction(
    '[Category API] Create Category Success',
    props<{ Category: Category }>()
);

export const deleteCategorySuccess = createAction(
    '[Category API] Delete Category Success',
    props<{ CategoryId: number }>()
);


export const loadCategories = createAction(
  '[Categories Page] Categories Load'
);

export const updateCategory = createAction(
  '[Category Page] Update Category',
  props<{ Category: Category }>()
);

export const createCategory = createAction(
  '[Category Page] Create Category',
  props<{ Category: Category }>()
);

export const deleteCategory = createAction(
  '[Category Page] Delete Category',
  props<{ CategoryId: number }>()
);

export const categoryExceptionEvent = createAction(
  '[Category API] Category Exception',
  props<{ error: string }>()
);
