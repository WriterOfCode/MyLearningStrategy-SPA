import { throwError as _throw } from 'rxjs';
import { Component, ViewChildren, QueryList, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CategorySort } from './categories.page.state';
import { CategoriesListSortDirective } from './categories-list-sort.directive';
import { Category } from '../shared/models/category';
@Component({
  selector: 'mls-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {
  @ViewChildren(CategoriesListSortDirective) headers: QueryList<CategoriesListSortDirective>;

  @Output() search = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() categorySelected = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<number>();
  @Output() editCategory = new EventEmitter<Category>();
  @Output() addCategory = new EventEmitter<void>();
  @Output() sortCategories = new EventEmitter<CategorySort>();

  @Input() searchTerm: string;
  @Input() errorMessage: string;
  @Input() categories: Category[];
  @Input() selectedCategory: Category;
  @Input() pageSize: number;
  @Input() categoriesCount: number;
  @Input() currentPage: number;
  @Input() sort: CategorySort;

  constructor( ) { }

  onSort({column, direction}: CategorySort) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSCategoriesListSort !== column) {
        header.direction = '';
      }
    });
    this.sortCategories.emit({ column, direction } )
  }

  onPageSizeChange(pagesize: number)
  {
    this.pageSizeChange.emit(pagesize);
  }

  onPageChange(page: number)
  {
    this.currentPageChange.emit(page);
  }

  onDelete(selectedCategory: Category): void {
    if (confirm(`Do you realy want to detete the Category:  ${selectedCategory.categoryName}?`)) {
      this.deleteCategory.emit(selectedCategory.id);
    }
  }

  onEdit(selectedCategory: Category): void {
    this.editCategory.emit(selectedCategory);
  }

  onAdd(): void {
    this.addCategory.emit();
  }

  onSelected(category: Category): void {
    this.categorySelected.emit(category);
  }

  onSearchTermChanged(search: string) {
    this.search.emit(search);
  }
}
