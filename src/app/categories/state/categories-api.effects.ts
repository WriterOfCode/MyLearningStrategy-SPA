import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesApiActions, CategoriesPageActions } from './actions/categories-actions-index';
import { CategoriesService } from '../../shared/services/categories.service';

@Injectable()
export class CategoriesApiEffects{

  constructor(private actions$: Actions,
              private categoriesService: CategoriesService) { }

    loadCategories$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(CategoriesApiActions.loadCategories),
          concatMap(() => this.categoriesService.getCategories()
            .pipe(
              map(categories => CategoriesApiActions.loadCategoriesSuccess({ Categories: categories })),
              catchError(error => of(CategoriesApiActions.categoryExceptionEvent({ error })))
            )
          )
        );
    });
    
    updateCategory$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CategoriesApiActions.updateCategory),
        concatMap(action =>
          this.categoriesService.updateCategory(action.Category)
            .pipe(
              map(Category => CategoriesApiActions.updateCategorySuccess({ Category })),
              catchError(error => of(CategoriesApiActions.categoryExceptionEvent({ error })))
            )
          )
        );
    });

    createCategory$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CategoriesApiActions.createCategory),
          concatMap(action =>
            this.categoriesService.addCategory(action.Category)
              .pipe(
                map(Category => CategoriesApiActions.createCategorySuccess ({ Category })),
                catchError(error => of(CategoriesApiActions.categoryExceptionEvent({ error })))
              )
            )
          );
    });

    deleteCategory$ = createEffect(() => {
    return this.actions$
      .pipe(
          ofType(CategoriesApiActions.deleteCategory),
            mergeMap(action =>
              this.categoriesService.deleteCategory(action.CategoryId).pipe(
                map(() => CategoriesApiActions.deleteCategorySuccess({ CategoryId: action.CategoryId }),
                CategoriesPageActions.clearCurrentCategory()),
                catchError(error => of(CategoriesApiActions.categoryExceptionEvent ({ error })))
              )
            )
          );
    });
}
