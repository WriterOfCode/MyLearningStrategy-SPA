import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ResponseSort, ResponseSortColumn, ResponseSortDirection, ResponseSortIndicator } from '../state/response.page.state';

@Directive({
  selector: 'th[mLSResponseListSort]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class ResponsListSortDirective {
  @Input() mLSResponseListSort: ResponseSortColumn = '';
  @Input() direction: ResponseSortDirection = '';
  @Output() sort = new EventEmitter<ResponseSort>();

  rotate() {
    this.direction = ResponseSortIndicator[this.direction];
    this.sort.emit({column: this.mLSResponseListSort, direction: this.direction});
  }
}
