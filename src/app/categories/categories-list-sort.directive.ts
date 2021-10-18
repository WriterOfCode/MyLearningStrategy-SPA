import { Directive, EventEmitter, Input, Output} from '@angular/core';
import { CategorySort, CategorySortColumn, CategorySortDirection} from './categories.page.state';

export type SortDirection = 'asc' | 'desc' | '';
// tslint:disable-next-line: object-literal-key-quotes
const rotate: {[key: string]: CategorySortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[mLSCategoriesListSort]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class CategoriesListSortDirective {
  @Input() mLSCategoriesListSort: CategorySortColumn = '';
  @Input() direction: CategorySortDirection = '';
  @Output() sort = new EventEmitter<CategorySort>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.mLSCategoriesListSort, direction: this.direction});
  }
}
