import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {CompleteSubject} from '../shared/models/subjects-complete';
export type SubjectSortColumn = keyof CompleteSubject | '';
export type SubjectSortDirection = 'asc' | 'desc' | '';
// tslint:disable-next-line: object-literal-key-quotes
const rotate: {[key: string]: SubjectSortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SubjectSortEvent {
  column: SubjectSortColumn;
  direction: SubjectSortDirection;
}

@Directive({
  selector: 'th[mLSSubjectList]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SubjectListSortDirective {

  @Input() mLSSubjectList: SubjectSortColumn = '';
  @Input() direction: SubjectSortDirection = '';
  @Output() sort = new EventEmitter<SubjectSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.mLSSubjectList, direction: this.direction});
  }

}
