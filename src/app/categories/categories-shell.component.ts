import { throwError as _throw, Observable} from 'rxjs';
import { Component } from '@angular/core';
/* NgRx */
import { Store } from '@ngrx/store';
import {
  categoriesEntityState,
  getCurrentCategory,
  getCategoryListError,
  getCategoryListPageSize,
  getCategoryListCurrentPage,
  getCategoryListSearchTerm,
  categoryPageReducer,
  selectCategoriesCount,
  selectSortedFilteredCategies,
 } from './state/categories.entity.selectors';
import {
  CategoriesApiActions,
  CategoriesPageActions
} from './state/actions/categories-actions-index';
import { CategorySort } from './categories.page.state';
import { Router } from '@angular/router';
import { Category } from '../shared/models/category';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'mls-categories-shell',
  templateUrl: './categories-shell.component.html',
  styleUrls: ['./categories-shell.component.css']
})
export class CategoriesShellComponent {
  errorMessage$: Observable<string>;
  categories$: Observable<Category[]>;
  selectedCategory$: Observable<Category>;
  categoriesCount$: Observable<number>;
  pageSize$: Observable<number>;
  currentPage$: Observable<number>;
  searchTerm$: Observable<string>;
  userProfileId: number;
  constructor(private router: Router,
    private categoriesPageStore: Store<categoryPageReducer>,
    private categoriesStore:Store<categoriesEntityState> ) {
    this.categories$ = this.categoriesStore.select(selectSortedFilteredCategies);
    this.categoriesCount$ = this.categoriesStore.select(selectCategoriesCount);
    this.errorMessage$ = this.categoriesPageStore.select(getCategoryListError);
    this.searchTerm$ = this.categoriesPageStore.select(getCategoryListSearchTerm);
    this.selectedCategory$ = this.categoriesPageStore.select(getCurrentCategory);
    this.pageSize$ = this.categoriesPageStore.select(getCategoryListPageSize);
    this.currentPage$ = this.categoriesPageStore.select(getCategoryListCurrentPage);
  }

  filter(search: string)
  {
    this.categoriesPageStore.dispatch(CategoriesPageActions.categoryFilterEvent({searchTerm: search}));
  }
  onSort(categorySortEvent: CategorySort)
  {
    this.categoriesPageStore.dispatch(CategoriesPageActions.categorySortEvent({sortBy: categorySortEvent}));
  }
  currentPageChange(currentPage: number)
  {
    this.categoriesPageStore.dispatch(CategoriesPageActions.categoryCurrentPageEvent({currentPage}));
  }
  pageSizeChange(pagesize: number)
  {
    this.categoriesPageStore.dispatch(CategoriesPageActions.categoryPageSizeEvent({ pageSize: pagesize}));
  }
  deleteCategory(categoryId: number): void {
    this.categoriesPageStore.dispatch(CategoriesApiActions.deleteCategory({CategoryId: categoryId}));
  }
  editCategory(selectedCategory: Category): void {
    this.categoriesPageStore.dispatch(CategoriesPageActions.setCurrentCategory({ category: selectedCategory }));
    this.router.navigate(['/categories', 'edit']);
  }
  addCategory(): void {
    const newCategory: Category = {
      id: (Math.floor(Math.random() * 1000)  * -1),
      userProfileId: this.userProfileId,
      categoryName: '',
      imageDevice: '',
      imageCloud: '',
      imageHash: 0,
      lastModifiedOffset: new Date(),
      cloudRowId:  undefined
    };
    this.categoriesPageStore.dispatch(CategoriesPageActions.setCurrentCategory({ category: newCategory }));
    this.router.navigate(['/categories', 'edit']);
  }
  // tslint:disable-next-line: no-shadowed-variable
  onSelected(Category: Category): void {
    this.categoriesPageStore.dispatch(CategoriesPageActions.setCurrentCategory({ category: Category }));
  }
}
